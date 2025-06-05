/* @copyright Stadt Wien - Wiener Melange 200 */
import { dispatchCustomEvent } from './utils.js';
import { errorTracker } from './error-tracking.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../lit-html-0378a13e.js';
import '../../directive-4c65af6a.js';

/**
 * Reactive controller for managing error states in form components
 *
 * This controller provides a centralized way to manage error states,
 * including setting/clearing errors, managing aria attributes,
 * and handling form validation states.
 */
class ErrorStateController {
  /**
   * @param {import('lit').ReactiveElement} host - The host element
   */
  constructor(host) {
    this.host = host;
    this.errorMessage = '';
    this.hasError = false;
    this.previousErrorStates = new Map();
    this._isValidating = false;
    this._pendingErrorMessage = '';

    // Add a flag to track if this is the initial validation
    this._isInitialValidation = true;

    // Connect to host lifecycle
    this.host.addController(this);

    // Set a timer to clear the initial validation flag
    setTimeout(() => {
      this._isInitialValidation = false;
    }, 500); // After component has fully rendered
  }

  /**
   * Called when the host element is connected to the document
   */
  hostConnected() {
    // Initialize error state from host properties if available
    // but only if explicitly requested via showErrors/validate
    if (this.host.error && (this.host.showErrors || this.host.validate)) {
      this.errorMessage = this.host.error;
      this.hasError = true;
    }
  }

  /**
   * Called when the host is updated
   * @param {Map|undefined} changedProperties - Map of changed properties or undefined
   */
  hostUpdated(changedProperties) {
    // Ensure changedProperties exists and is a Map before using it
    if (changedProperties && typeof changedProperties.has === 'function') {
      // If the error property changed externally, synchronize our state
      if (changedProperties.has('error') && this.host.error !== this.errorMessage) {
        this.setError(this.host.error || '');
      }

      // Handle validation-related properties
      if ((changedProperties.has('showErrors') && this.host.showErrors) ||
          (changedProperties.has('validate') && this.host.validate)) {
        // If a form field has showErrors or validate turned on, show any pending errors
        if (this._pendingErrorMessage) {
          this.setError(this._pendingErrorMessage);
          this._pendingErrorMessage = '';
        }
      }
    }
  }

  /**
   * Sets an error message and updates all related state
   * @param {string} message - The error message to set, or empty string to clear
   * @param {Object} options - Additional options
   * @param {boolean} options.announceToScreenReader - Whether to announce the error to screen readers
   * @param {boolean} options.focusElement - Whether to focus the element with the error
   */
  setError(message, options = {}) {
    const oldHasError = this.hasError;

    this.errorMessage = message || '';
    this.hasError = !!message;

    // Update host properties to ensure compatibility with existing code
    this.host.error = this.errorMessage;
    this.host.hasError = this.hasError;

    // Only show errors visually if we're past initial render or validation is requested
    const shouldShowErrors = !this._isInitialValidation ||
                            this.host.showErrors ||
                            this.host.validate;

    this._synchronizeDOM(!shouldShowErrors && this.hasError);

    // Track this error in the global tracker if we have an ID and it's a new error
    if (this.hasError && this.host.id && (!oldHasError || oldHasError !== this.hasError)) {
      errorTracker.trackError(this.host.id, {
        message: this.errorMessage,
        summaryMessage: this.host.getAttribute('summary-errormessage') || this.errorMessage,
        nodeName: this.host.nodeName
      });
    }

    // Handle options for accessibility (only if we're showing errors)
    if (shouldShowErrors) {
      if (options.announceToScreenReader && this.hasError) {
        this._announceError();
      }

      if (options.focusElement && this.hasError) {
        this._focusElement();
      }
    } else if (this.hasError) {
      // Store for later use when validation becomes active
      this._pendingErrorMessage = message;
    }
  }

  /**
   * Clears the current error state
   */
  clearError() {
    this._pendingErrorMessage = '';
    this.setError('');
  }

  /**
   * Validates the host element and sets error state accordingly
   * @returns {boolean} - Whether validation passed
   */
  validate() {
    // Prevent recursive validation
    if (this._isValidating) return !this.hasError;

    try {
      this._isValidating = true;

      // Skip showing errors during initial validation unless explicitly requested
      const shouldShowErrors = !this._isInitialValidation ||
                               this.host.showErrors ||
                               this.host.validate;

      // Allow components to define error messages if needed
      if (typeof this.host._defineErrorMessages === 'function') {
        this.host._defineErrorMessages();
      }

      // Get the validation result - prioritize the component's validation method
      let errorMessage;
      if (typeof this.host._validateWithoutController === 'function') {
        errorMessage = this.host._validateWithoutController();
      } else if (typeof this.host._performValidation === 'function') {
        errorMessage = this.host._performValidation();
      } else if (typeof this.host.checkValidity === 'function') {
        errorMessage = this.host.checkValidity();
      } else {
        // Try to get message from element
        const element = this._getFormControlElement();
        if (element && !element.validity.valid) {
          errorMessage = element.validationMessage;
        } else {
          errorMessage = ""; // No known validation method
        }
      }

      // Only show errors if appropriate based on state
      if (shouldShowErrors) {
        this.setError(errorMessage, {
          announceToScreenReader: !this._isInitialValidation && !!errorMessage
        });
      } else if (errorMessage) {
        // Store error without displaying
        this._pendingErrorMessage = errorMessage;

        // Still need to update validity state without UI
        this._synchronizeDOM(true);
      }

      return !errorMessage; // Return validation result
    } finally {
      this._isValidating = false;

      // Mark as not initial once validation has been performed
      if (this.host.validate || this.host.showErrors) {
        this._isInitialValidation = false;
      }
    }
  }

  /**
   * Updates DOM attributes and properties related to error state
   * @param {boolean} suppressVisual - Whether to suppress visual error display
   * @private
   */
  _synchronizeDOM(suppressVisual = false) {
    const input = this._getFormControlElement();

    // Update aria attributes and validity
    if (input) {
      if (this.hasError) {
        // Only set visual indicators if not suppressing
        if (!suppressVisual) {
          input.setAttribute('aria-invalid', 'true');
        }

        // Always update validity for form submission
        if (typeof input.setCustomValidity === 'function') {
          // Preserve existing validity message if it's already set
          // This helps preserve German translations from _defineErrorMessages
          const currentMessage = input.validationMessage;
          if (!currentMessage || suppressVisual) {
            try {
              input.setCustomValidity(this.errorMessage);
            } catch (e) {
              console.warn('Error setting custom validity:', e);
            }
          }
        }
      } else {
        // Clear all error states
        input.removeAttribute('aria-invalid');
        try {
          if (typeof input.setCustomValidity === 'function') {
            input.setCustomValidity('');
          }
        } catch (e) {
          console.warn('Error clearing custom validity:', e);
        }
      }
    }

    // Always update form validity
    this._updateFormValidity();

    // Only dispatch events when not suppressing visual errors
    if (!suppressVisual) {
      this._dispatchEvents();
    }
  }

  /**
   * Updates the form validity state using the ElementInternals API
   * @private
   */
  _updateFormValidity() {
    if (!this.host._internals) return;

    try {
      if (this.hasError) {
        this.host._internals.setValidity(
          { customError: true },
          this.errorMessage,
          this._getFormControlElement() || undefined
        );
      } else {
        this.host._internals.setValidity({});
      }
    } catch (e) {
      console.warn('Error updating form internals validity:', e);
    }
  }

  /**
   * Dispatches appropriate events based on error state
   * @private
   */
  _dispatchEvents() {
    dispatchCustomEvent(this.host, this.hasError ? 'invalid' : 'valid', {
      value: this.host.value,
      message: this.errorMessage || ''
    });
  }

  /**
   * Gets the form control element to focus and validate
   * @private
   * @returns {HTMLElement|null} - The input element or null
   */
  _getFormControlElement() {
    // First try the host's method if available
    if (typeof this.host._getFormControlElement === 'function') {
      return this.host._getFormControlElement();
    }

    // Fall back to standard ways to find the input element
    return (
      this.host._item ||
      this.host.selectElement ||
      this.host.shadowRoot?.querySelector('input, select, textarea, [role="switch"]')
    );
  }

  /**
   * Focuses the element with the error
   * @private
   */
  _focusElement() {
    const input = this._getFormControlElement();
    if (input && typeof input.focus === 'function') {
      setTimeout(() => {
        input.focus();
      }, 0);
    }
  }

  /**
   * Announces the error to screen readers
   * @private
   */
  _announceError() {
    // Find or create a live region for screen reader announcements
    let liveRegion = document.getElementById('error-announcer');

    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'error-announcer';
      liveRegion.setAttribute('aria-live', 'assertive');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'wm-h-vh';
      document.body.appendChild(liveRegion);
    }

    // Announce the error
    liveRegion.textContent = this.errorMessage;

    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
}

export { ErrorStateController };
