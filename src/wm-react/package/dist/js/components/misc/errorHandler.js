/* @copyright Stadt Wien - Wiener Melange 200 */
import { dispatchCustomEvent } from './utils.js';
import { errorTracker } from './error-tracking.js';
import { ErrorStateController } from './error-state-controller.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../lit-html-0378a13e.js';
import '../../directive-4c65af6a.js';

// Import required utilities

/**
 * Central Error Management System for Form Components
 * --------------------------------------------------
 * This file provides centralized error handling for all form components in the system.
 *
 * PREFERRED APPROACH:
 * The recommended approach is now to use the ErrorStateController directly in components:
 *
 * ```js
 * // In your component constructor
 * this._errorController = new ErrorStateController(this);
 *
 * // To set an error
 * this._errorController.setError('Error message');
 *
 * // To clear an error
 * this._errorController.clearError();
 *
 * // To validate
 * this._errorController.validate();
 * ```
 *
 * Legacy functions are maintained for backwards compatibility but internally
 * use the controller when available.
 */

/**
 * Sets error state on a component using ErrorStateController if available
 *
 * @param {HTMLElement} element The component to apply the error to
 * @param {String} errorMessage The error message
 * @param {Object} options Additional options (announceToScreenReader, focusElement)
 *
 * @deprecated Use ErrorStateController.setError() directly in components
 */
const setError = (element, errorMessage, options = {}) => {
  // Check if element has an error controller
  if (element._errorController && element._errorController instanceof ErrorStateController) {
    element._errorController.setError(errorMessage, options);
    return;
  }

  // Fall back to legacy implementation
  setErrorState(element, errorMessage);
};

/**
 * Sets error state on a component using ErrorStateController if available
 *
 * @param {HTMLElement} element The component to apply the error to
 * @param {String} errorMessage The error message
 *
 * @deprecated Use setError() or ErrorStateController.setError() instead
 */
const applyErrorState = (element, errorMessage) => {
  console.warn('applyErrorState is deprecated. Use setError() instead.');
  setError(element, errorMessage);
};

/**
 * Clears error state from a component
 *
 * @param {HTMLElement} component The component to clear errors from
 *
 * @deprecated Use ErrorStateController.clearError() directly in components
 */
function clearError(component) {
  if (!component) return;

  // Use error controller if available
  if (component._errorController && component._errorController instanceof ErrorStateController) {
    component._errorController.clearError();
    return;
  }

  // Fall back to legacy implementation
  setErrorState(component, '');
}

/**
 * Legacy mixin for error handling
 * @deprecated Use ErrorStateController instead
 */
const errorMixin = (superClass) =>
  class extends superClass {
    /**
     * Set an error message on the component
     * @param {string} errorMessage The error message
     * @deprecated Use ErrorStateController.setError() instead
     */
    showError(errorMessage) {
      console.warn('showError is deprecated. Use ErrorStateController instead.');

      // Use error controller if available
      if (this._errorController && this._errorController instanceof ErrorStateController) {
        this._errorController.setError(errorMessage);
      } else {
        setError(this, errorMessage);
      }
    }

    /**
     * Clear any error message from the component
     * @deprecated Use ErrorStateController.clearError() instead
     */
    clearError() {
      // Use error controller if available
      if (this._errorController && this._errorController instanceof ErrorStateController) {
        this._errorController.clearError();
      } else {
        setError(this, "");
      }
    }

    /**
     * Validate the component
     * @returns {boolean} Whether validation passed
     * @deprecated Use ErrorStateController.validate() instead
     */
    validate() {
      if (this._errorController && this._errorController instanceof ErrorStateController) {
        return this._errorController.validate();
      }

      // Default implementation
      const errorMessage = typeof this._validateWithoutController === 'function'
        ? this._validateWithoutController()
        : "";

      if (errorMessage) {
        this.showError(errorMessage);
        return false;
      }

      this.clearError();
      return true;
    }
  };

/**
 * Updates the error summary with current validation errors
 *
 * @param {Array} errors - Array of error objects {nodeName, id, msg, summaryMsg}
 * @param {HTMLElement} errorSummary - Error summary element
 * @param {HTMLTemplateElement} itemTemplate - Template for error items
 */
function updateErrorSummary(errors, errorSummary, itemTemplate) {
  if (!errors || !errorSummary || !itemTemplate) {
    console.error("Missing required parameters for updateErrorSummary");
    return;
  }

  // Use the dedicated method if available (for instances of FormErrorsummary)
  if (typeof errorSummary.updateWithErrors === 'function') {
    // Filter out errors that should be suppressed
    const filteredErrors = errors.filter(error => !error.id || !errorTracker.isErrorSuppressed(error.id));
    errorSummary.updateWithErrors(filteredErrors, itemTemplate);
    return;
  }

  // Fallback for compatibility with older versions
  try {
    // Clear existing error items
    while (errorSummary.firstChild) {
      errorSummary.removeChild(errorSummary.firstChild);
    }

    // Reset error tracking specifically for this summary
    errorTracker.reset();

    // Create a Set to track IDs we've seen to prevent duplicates
    const processedIds = new Set();

    // Create error items from template - filter out suppressed errors
    errors.forEach(error => {
      if (!error.id) return;

      // Skip duplicate and suppressed errors
      if (processedIds.has(error.id) || errorTracker.isErrorSuppressed(error.id)) return;
      processedIds.add(error.id);

      const template = itemTemplate.content.cloneNode(true);
      const li = template.querySelector("li");
      const a = li.querySelector("a");

      if (a) {
        a.href = `#${error.id}`;
        // Use summaryMsg if available, otherwise fall back to msg
        a.textContent = error.summaryMsg || error.msg;
      }

      errorSummary.appendChild(template);
    });

    // Update error count if property exists
    if ('errors' in errorSummary) {
      errorSummary.errors = processedIds.size;
    }
  } catch (error) {
    console.error("Error updating error summary:", error);
  }
}

/**
 * Legacy function for setting error state on a component
 *
 * @param {HTMLElement} component The component to set error state on
 * @param {String} message The error message
 * @param {Object} options Additional options
 *
 * @deprecated Use setError() or ErrorStateController.setError() instead
 */
function setErrorState(component, message, options = {}) {
  console.warn('setErrorState is deprecated. Use setError() instead.');
  if (!component) return;

  // If an error controller is available, delegate
  if (component._errorController instanceof ErrorStateController) {
    component._errorController.setError(message, options);
    return;
  }

  // Use the component's own synchronization if available
  if (typeof component._synchronizeErrorState === 'function') {
    component._synchronizeErrorState(message);
    return;
  }

  // Legacy support – update error state, ensuring accessibility attributes are set.
  component.hasError = !!message;
  component.error = message || '';

  // Use optional chaining to safely access elements
  const inputElement = component._item || component.selectElement || component.shadowRoot?.querySelector('input, select, textarea');
  if (inputElement) {
    if (message) {
      inputElement.setAttribute('aria-invalid', 'true');
      try {
        inputElement.setCustomValidity(message);
      } catch (e) {
        console.warn('Error setting custom validity:', e);
      }
    } else {
      inputElement.removeAttribute('aria-invalid');
      try {
        inputElement.setCustomValidity('');
      } catch (e) {
        console.warn('Error clearing custom validity:', e);
      }
    }
  }

  // Update form association if available
  if (component._internals) {
    try {
      if (message) {
        component._internals.setValidity(
          { customError: true },
          message,
          inputElement || component
        );
      } else {
        component._internals.setValidity(
          {},
          '',
          inputElement || component
        );
      }
    } catch (e) {
      console.warn('Error updating form internals validity', e);
    }
  }

  // Dispatch event
  dispatchCustomEvent(component, message ? 'invalid' : 'valid', {
    value: component.value,
    message: message || ''
  });
}

/**
 * Clears error state from a component
 *
 * @param {HTMLElement} component The component to clear errors from
 *
 * @deprecated Use clearError() or ErrorStateController.clearError() instead
 */
function clearErrorState(component) {
  console.warn('clearErrorState is deprecated. Use clearError() instead.');
  clearError(component);
}

export { setError as applyError, applyErrorState, clearError, clearError as clearErrorMessage, clearErrorState, errorMixin, setError, setErrorState, updateErrorSummary };
