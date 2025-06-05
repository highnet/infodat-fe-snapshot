/* @copyright Stadt Wien - Wiener Melange 200 */
/**
 * FormStateManager mixin - Provides consistent form reset behavior
 *
 * This mixin handles common form state management tasks:
 * - Storing initial values for reliable reset
 * - Form association behavior
 * - Centralized reset mechanism
 *
 * Components using this mixin should:
 * 1. Initialize _initialValue in connectedCallback
 * 2. Implement _setValue or similar method for value updates
 * 3. Call super.formResetCallback() in their formResetCallback
 */

const FormStateManager = (superClass) => class extends superClass {
  static properties = {
    ...superClass.properties,
    _initialValue: { state: true },
    defaultValue: { attribute: false },
    _componentState: { state: true },
    _previousState: { state: true },
    disabled: { type: Boolean, reflect: true },
    hasError: { type: Boolean, reflect: true },
    error: { type: String },
    validate: { type: Boolean, reflect: true },
    showErrors: { type: Boolean, reflect: true }
  };

  // Define component states as static constants
  static get STATES() {
    return {
      INITIAL: 'initial',          // Initial render, no validation
      NORMAL: 'normal',            // Normal operation
      DISABLED: 'disabled',        // Component is disabled
      JUST_ENABLED: 'enabled',     // Recently enabled from disabled state
      EDITING: 'editing',          // User is actively editing (especially deleting)
      VALIDATING: 'validating'     // Currently validating user input
    };
  }

  constructor() {
    super();

    /**
     * @private
     * @type {String} Current component state
     */
    this._componentState = this.constructor.STATES.INITIAL; // Start in INITIAL state

    /**
     * @private
     * @type {String} Previous component state for transitions
     */
    this._previousState = null;

    /**
     * @type {Boolean} Whether the component is disabled
     */
    this.disabled = false;

    /**
     * @type {Boolean} Whether the component has a validation error
     */
    this.hasError = false;

    /**
     * @type {String} Current error message
     */
    this.error = '';

    /**
     * @type {Boolean} Whether to validate on input
     */
    this.validate = false;

    /**
     * @type {Boolean} Whether to show validation errors immediately
     */
    this.showErrors = false;

    /**
     * @type {String} Initial value of the component
     */
    this._initialValue = '';

    /**
     * @type {String} Default value of the component
     */
    this.defaultValue = '';

    // Bind methods to avoid reference issues
    this._changeState = this._changeState.bind(this);
    this._updateErrorState = this._updateErrorState.bind(this);
  }

  /**
   * Store original value from attributes during connection
   * This happens before any user interaction
   */
  connectedCallback() {
    super.connectedCallback?.();

    // Store attribute value if present
    if (this.hasAttribute('value')) {
      this._initialValue = this.getAttribute('value') || '';
      this.defaultValue = this._initialValue;
    }

    // Use setTimeout instead of requestAnimationFrame for more reliable timing
    setTimeout(() => {
      // Only transition if still in INITIAL state
      if (this._componentState === this.constructor.STATES.INITIAL) {
        this._changeState(this.constructor.STATES.NORMAL);
      }
    }, 100); // Give enough time for options to be processed
  }

  /**
   * Captures initial value from DOM after first render
   */
  firstUpdated(changedProperties) {
    super.firstUpdated?.(changedProperties);

    // If no initial value was set from attributes, try to get it from the rendered DOM
    if (this._initialValue === '' && this.shadowRoot) {
      const inputElement = this._getInputElement();
      if (inputElement && inputElement.value) {
        this._initialValue = inputElement.value;
        this.defaultValue = inputElement.value;
      }
    }
  }

  /**
   * Form reset callback - called by parent forms
   * Provides standard reset behavior
   */
  formResetCallback() {
    try {
      // Call superclass implementation if it exists
      super.formResetCallback?.();

      // Use public reset method
      if (typeof this.reset === 'function') {
        this.reset();
      } else {
        // Fallback implementation if reset isn't defined
        this._resetToInitialValue();
      }

      // Allow microtask queue to process before forcing synchronization
      setTimeout(() => {
        const inputElement = this._getInputElement();
        if (inputElement && inputElement.value !== (this.value || '')) {
          inputElement.value = this.value || '';
          // Force event propagation
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 10);
    } catch (error) {
      console.error(`Error in ${this.tagName} formResetCallback:`, error);
    }
  }

  /**
   * Fallback reset implementation
   * @private
   */
  _resetToInitialValue() {
    // Reset to initial value
    this.value = this._initialValue || '';

    // Update DOM
    const inputElement = this._getInputElement();
    if (inputElement) {
      inputElement.value = this.value;
    }

    // Clear error state
    if ('hasError' in this) {
      this.hasError = false;
    }
    if ('error' in this) {
      this.error = '';
    }

    // Update form value
    if (this._internals && typeof this._internals.setFormValue === 'function') {
      this._internals.setFormValue(this.value);
    }
  }

  /**
   * Helper method to find input element in shadow DOM
   * @private
   */
  _getInputElement() {
    if (!this.shadowRoot) return null;

    // Try common selectors for form elements
    return this.shadowRoot.querySelector('input, select, textarea') ||
           this.shadowRoot.querySelector('[role="textbox"], [role="combobox"]') ||
           null;
  }

  /**
   * Transitions the component to a new state
   * @param {String} newState - The target state
   * @param {Object} options - Additional options for the transition
   * @private
   */
  _changeState(newState, options = {}) {
    if (this._componentState === newState) return;

    const oldState = this._componentState;
    this._previousState = oldState;
    this._componentState = newState;

    // Instead of duplicating state logic, delegate transition handling:
    processTransition(this, oldState, newState, options);
  }

  /**
   * Handle component-specific behavior for state transitions
   * @param {String} oldState - Previous state
   * @param {String} newState - New state
   * @param {Object} options - Additional options
   * @private
   */
  _handleStateTransition(oldState, newState, options = {}) {
    // Delegate to the helper
    processTransition(this, oldState, newState, options);
  }

  /**
   * Centralized method to update component error state
   * @param {String} errorMessage - Error message to display
   * @private
   */
  _updateErrorState(errorMessage) {
    const hasError = !!errorMessage;

    // Update component properties
    this.error = errorMessage || '';
    this.hasError = hasError;

    // Find the form control element in the shadow DOM
    const controlElement = this._getFormControlElement();
    if (controlElement) {
      if (hasError) {
        controlElement.setAttribute('aria-invalid', 'true');
        try {
          if (typeof controlElement.setCustomValidity === 'function') {
            controlElement.setCustomValidity(errorMessage);
          }
        } catch (err) {
          console.warn('Error setting custom validity:', err);
        }
      } else {
        controlElement.removeAttribute('aria-invalid');
        try {
          if (typeof controlElement.setCustomValidity === 'function') {
            controlElement.setCustomValidity('');
          }
        } catch (err) {
          console.warn('Error clearing custom validity:', err);
        }
      }
    }

    // Update form internals API
    if (this._internals) {
      try {
        this._internals.setValidity(
          hasError ? { customError: true } : {},
          errorMessage || '',
          controlElement
        );
      } catch (err) {
        console.warn('Error updating form internals:', err);
      }
    }

    // Dispatch appropriate event
    this.dispatchEvent(new CustomEvent(hasError ? 'invalid' : 'valid', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        message: errorMessage
      }
    }));
  }

  /**
   * Returns the form control element from shadow DOM
   * Components should override this to return their specific control element
   * @protected
   */
  _getFormControlElement() {
    return this.shadowRoot?.querySelector('input, select, textarea') || null;
  }

  /**
   * Announces state changes to screen readers
   * @param {String} state - State to announce
   * @private
   */
  _announceStateChange(state) {
    const output = document.querySelector('[role="status"]');
    if (!output) return;

    const label = this.label || this.getAttribute('label') || this.id || 'Field';
    output.textContent = `${label} is now ${state}`;
    setTimeout(() => {
      output.textContent = '';
    }, 2000);
  }

  /**
   * Override of updated lifecycle to handle attribute/property changes
   */
  updated(changedProperties) {
    super.updated?.(changedProperties);

    if (changedProperties.has('disabled')) {
      const isDisabled = this.disabled;
      const wasDisabled = changedProperties.get('disabled');

      // Only change state if we're not in initial state
      if (this._componentState !== this.constructor.STATES.INITIAL) {
        if (isDisabled) {
          this._changeState(this.constructor.STATES.DISABLED);
        }
        else if (wasDisabled === true) {
          this._changeState(this.constructor.STATES.JUST_ENABLED);
        }
      }
    }
  }

  /**
   * Standard validation method that respects component state
   * @public
   */
  checkValidity() {
    // Skip validation in special states
    if (this._componentState !== this.constructor.STATES.NORMAL) {
      return "";
    }

    // Perform validation
    const errorMessage = this._performValidation();

    // Update error state
    this._updateErrorState(errorMessage);

    return errorMessage;
  }

  /**
   * Component-specific validation logic
   * Should be overridden by component implementations
   * @protected
   */
  _performValidation() {
    // Default implementation for common cases
    const controlElement = this._getFormControlElement();
    if (!controlElement) return "";

    if (this.required && (!this.value || this.value === '')) {
      // Use German default message instead of English  // <-- ENGLISH DEFAULT HERE
      return this.errormessage || "Dieses Feld ist erforderlich";
    }

    return "";
  }

  /**
   * Public method to set a custom validation message
   * @param {String} message - Validation message
   * @public
   */
  setCustomValidity(message) {
    this._updateErrorState(message);
  }

  /**
   * Called when the element's form sets the disabled state
   * @param {boolean} disabled - Whether the control should be disabled
   */
  formDisabledCallback(disabled) {
    // Only update if we're actually changing state
    if (this.disabled !== disabled) {
      this.disabled = disabled;

      // When being re-enabled, ensure input is in a clean state
      if (!disabled) {
        // Allow a small delay for rendering to complete
        setTimeout(() => {
          try {
            // Clear any error states that might have been left
            this._updateErrorState('');

            // For input elements, ensure DOM value matches component value
            const inputElement = this._getFormControlElement();
            if (inputElement && typeof inputElement.value !== 'undefined' && 'value' in this) {
              // Synchronize values to ensure they match
              inputElement.value = this.value || '';
            }
          } catch (error) {
            console.warn('Error synchronizing state after enabling form control:', error);
          }
        }, 0);
      }
    }
  }
};

// Add a helper function to process state transitions:
function processTransition(ctx, oldState, newState, options = {}) {
  const STATES = ctx.constructor.STATES;
  if (newState === STATES.DISABLED) {
    ctx._updateErrorState('');
    ctx._announceStateChange('disabled');
  } else if (newState === STATES.JUST_ENABLED) {
    ctx._updateErrorState('');
    ctx._announceStateChange('enabled');
    setTimeout(() => {
      if (ctx._componentState === STATES.JUST_ENABLED) {
        ctx._changeState(STATES.NORMAL);
      }
    }, 300);
  } else if (newState === STATES.EDITING) {
    ctx._updateErrorState('');
    clearTimeout(ctx._editingTimer);
    ctx._editingTimer = setTimeout(() => {
      if (ctx._componentState === STATES.EDITING) {
        ctx._changeState(STATES.NORMAL);
      }
    }, 2000);
  } else if (newState === STATES.VALIDATING) {
    setTimeout(() => {
      if (ctx._componentState === STATES.VALIDATING) {
        ctx._changeState(STATES.NORMAL);
      }
    }, 100);
  }
}

export { FormStateManager };
