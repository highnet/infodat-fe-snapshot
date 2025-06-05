/* @copyright Stadt Wien - Wiener Melange 200 */
/**
 * FormControlRegistry - Manages registration and operations on form controls
 *
 * This utility helps manage collections of form controls and perform operations
 * on them, such as validation or resetting values.
 *
 * Use patterns:
 * 1. Create registry: const registry = new FormControlRegistry()
 * 2. Register controls: registry.register(element)
 * 3. Perform batch operations: registry.resetAll()
 */

class FormControlRegistry {
  constructor() {
    // Use WeakMap to avoid memory leaks
    this._controls = new WeakMap();
    // Use Set for order preservation
    this._controlOrder = new Set();
  }

  /**
   * Register a form control
   * @param {HTMLElement} element - The form control to register
   * @returns {boolean} Success flag
   */
  register(element) {
    if (!element || typeof element !== 'object') return false;

    try {
      this._controls.set(element, {
        initialValue: this._getElementValue(element),
        registered: new Date().getTime()
      });
      this._controlOrder.add(element);
      return true;
    } catch (error) {
      console.error('Error registering form control:', error);
      return false;
    }
  }

  /**
   * Unregister a form control
   * @param {HTMLElement} element - The form control to unregister
   */
  unregister(element) {
    if (!element) return;

    try {
      this._controls.delete(element);
      this._controlOrder.delete(element);
    } catch (error) {
      console.error('Error unregistering form control:', error);
    }
  }

  /**
   * Reset all registered controls to their initial state
   */
  resetAll() {
    this._controlOrder.forEach(element => {
      try {
        if (typeof element.reset === 'function') {
          element.reset();
        } else if (typeof element.formResetCallback === 'function') {
          element.formResetCallback();
        }
      } catch (error) {
        console.error('Error resetting form control:', error);
      }
    });
  }

  /**
   * Validate all registered controls
   * @returns {Array} Array of error objects
   */
  validateAll() {
    const errors = [];

    this._controlOrder.forEach(element => {
      try {
        // Skip validation for disabled elements per WCAG requirements
        if (element.disabled || element.hasAttribute('disabled')) return;

        if (typeof element.checkValidity === 'function') {
          const errorMsg = element.checkValidity();
          if (errorMsg) {
            errors.push({
              element,
              message: errorMsg,
              id: element.id || '',
              name: element.name || ''
            });
          }
        }
      } catch (error) {
        console.error('Error validating form control:', error);
      }
    });

    return errors;
  }

  /**
   * Get the current value of an element
   * @private
   */
  _getElementValue(element) {
    if (!element) return '';

    // Handle different element types
    if ('value' in element) {
      // Create proper deep copies of arrays for multi-select components
      if (Array.isArray(element.value)) {
        return [...element.value]; // Create a new array copy
      }
      return element.value;
    } else if (element.hasAttribute('value')) {
      return element.getAttribute('value');
    }

    return '';
  }
}

export { FormControlRegistry };
