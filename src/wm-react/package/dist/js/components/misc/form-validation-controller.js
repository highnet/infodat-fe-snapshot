/* @copyright Stadt Wien - Wiener Melange 200 */
import { errorTracker } from './error-tracking.js';
import { dispatchCustomEvent } from './utils.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../lit-html-0378a13e.js';
import '../../directive-4c65af6a.js';

/**
 * FormValidationController - Handles form validation logic as a reactive controller
 *
 * This controller separates validation logic from the Form component following
 * the same pattern as ErrorStateController, allowing for better code organization
 * and potential reuse.
 */

class FormValidationController {
  /**
   * @param {import('lit').ReactiveElement} host - The host element (form component)
   * @param {import('./form-control-registry.js').FormControlRegistry} formControlRegistry - Registry of form controls
   */
  constructor(host, formControlRegistry) {
    this.host = host;
    this.formControlRegistry = formControlRegistry;
    this.errors = [];
    this.previousErrors = []; // Track previous errors to handle fixed select components
    this.hasValidationError = false;
  }

  /**
   * Validate the entire form
   * @returns {boolean} Whether validation passed
   */
  validate() {
    // Store previous errors before resetting
    this.previousErrors = [...this.errors];

    // Reset error state
    this.errors = [];
    errorTracker.reset();

    // Create a Set to track IDs we've seen to prevent duplicates
    const processedIds = new Set();
    // Track which fields are within form groups to avoid duplicating errors
    const fieldsInGroups = new Set();

    try {
      // Get references to form elements
      const fields = this.host._fields || [];

      // First, identify all form groups to handle their validation separately
      const formGroups = Array.from(this.host.querySelectorAll('wm-form-group'));
      const formGroupIds = new Set(formGroups.map(group => group.id).filter(Boolean));

      // Build a DOM index map for all form elements to use for sorting
      const allFormElements = Array.from(fields);
      const domPositionMap = new Map();

      // Create a map of element ID to its DOM position
      allFormElements.forEach((el, index) => {
        if (el && el.id) {
          domPositionMap.set(el.id, index);
        }
      });

      // Function to get DOM position for an element by ID
      const getDomPosition = (id) => {
        if (!id) return Number.MAX_SAFE_INTEGER;
        return domPositionMap.has(id) ? domPositionMap.get(id) : Number.MAX_SAFE_INTEGER;
      };

      // Pre-validate step: Force validation on all wm-select components first
      // This ensures their internal state is up-to-date before the main validation
      allFormElements.forEach(field => {
        if (!field || field.disabled === true || field.hasAttribute('disabled')) return;

        // Force pre-validation specifically on select components
        if (field.tagName.toLowerCase() === 'wm-select' && typeof field.checkValidity === 'function') {
          field.checkValidity();
        }
      });

      // Enable error display for all fields
      allFormElements.forEach(field => {
        if (!field || field.disabled === true || field.hasAttribute('disabled')) return;

        if ('showErrors' in field) {
          field.showErrors = true;
        }

        // Force interactive state to ensure validation works
        if ('_hasInteracted' in field) {
          field._hasInteracted = true;
        }
      });

      // First validate form groups
      this._validateFormGroups(formGroups, processedIds, fieldsInGroups, getDomPosition);

      // Then validate individual fields
      this._validateFields(fields, processedIds, fieldsInGroups, formGroupIds, getDomPosition);

      // Sort errors by DOM position to maintain visual flow of the form
      this.errors.sort((a, b) => (a.domPosition || 0) - (b.domPosition || 0));

      // Force a validation check on all form groups to ensure visual state is consistent
      formGroups.forEach(group => {
        if (group && typeof group.validateGroup === 'function') {
          group.validateGroup();
        }
      });

      // Fix for select components: explicitly check previously invalid fields
      this._checkPreviouslyInvalidFields();

      // Update validation state
      this.hasValidationError = this.errors.length > 0;

      return !this.hasValidationError;
    } catch (error) {
      console.error("Error in form validation:", error);
      return false;
    }
  }

  /**
   * Check fields that were previously invalid but might now be valid
   * This specifically helps with wm-select components that don't properly
   * communicate their validation state changes
   * @private
   */
  _checkPreviouslyInvalidFields() {
    // Check each previously invalid field
    this.previousErrors.forEach(prevError => {
      // Skip if this error is still in the current errors list
      const stillInvalid = this.errors.some(e => e.id === prevError.id);

      if (!stillInvalid) {
        // Field is now valid - ensure it's properly cleared
        const field = this.host.querySelector(`#${prevError.id}`);
        if (field) {
          // Extra safety: force clear any error state
          if (field._errorController) {
            field._errorController.clearError();
          } else if (typeof field.clearError === 'function') {
            field.clearError();
          }

          // Dispatch event to notify that this field is now valid
          dispatchCustomEvent(field, 'valid', {
            id: field.id,
            value: field.value
          });
        }
      }
    });
  }

  /**
   * Validate all form groups
   * @private
   */
  _validateFormGroups(formGroups, processedIds, fieldsInGroups, getDomPosition) {
    formGroups.forEach(formGroup => {
      if (!formGroup || !formGroup.id) return;

      // Skip disabled form groups
      if (formGroup.disabled || formGroup.hasAttribute('disabled')) return;

      // Skip already processed form groups
      if (processedIds.has(formGroup.id)) return;

      // Force validation for the form group
      if ('_hasInteracted' in formGroup) {
        formGroup._hasInteracted = true;
      }

      // Ensure showErrors is enabled
      if ('showErrors' in formGroup) {
        formGroup.showErrors = true;
      }

      // Validate the form group
      let errorMessage = '';
      let invalidFieldId = '';

      if (typeof formGroup.validateGroup === 'function') {
        const result = formGroup.validateGroup();
        if (result && typeof result === 'object') {
          errorMessage = result.message;
          invalidFieldId = result.firstInvalidFieldId;

          // Collect all field IDs within this form group to skip them later
          if (result.invalidFields && Array.isArray(result.invalidFields)) {
            result.invalidFields.forEach(field => {
              if (field && field.id) {
                fieldsInGroups.add(field.id);
              }
            });
          } else {
            // Fallback: collect all fields with ids in the form group
            Array.from(formGroup.querySelectorAll('[id]'))
              .forEach(field => {
                if (field && field.id) {
                  fieldsInGroups.add(field.id);
                }
              });
          }
        } else if (result) {
          errorMessage = result;
        }
      } else if (typeof formGroup.checkValidity === 'function') {
        errorMessage = formGroup.checkValidity();
      }

      // If the form group has an error, add it to the errors array
      if (errorMessage) {
        processedIds.add(formGroup.id);

        // Use summary-errormessage if available, otherwise use the regular error message
        const summaryMessage = formGroup.getAttribute('summary-errormessage') || errorMessage;

        // Use the first invalid field's ID as the target for the group's error message
        let targetId = formGroup.id;
        if (invalidFieldId && invalidFieldId !== formGroup.id) {
          targetId = invalidFieldId;
          // Mark this ID as processed so we don't add it again later
          processedIds.add(invalidFieldId);
        }

        this.errors.push({
          nodeName: formGroup.nodeName,
          id: targetId,
          originId: formGroup.id,
          msg: errorMessage,
          summaryMsg: summaryMessage,
          isGroupError: true,
          domPosition: getDomPosition(targetId)
        });
      }
    });
  }

  /**
   * Validate all individual form fields
   * @private
   */
  _validateFields(fields, processedIds, fieldsInGroups, formGroupIds, getDomPosition) {
    fields.forEach(field => {
      if (!field || !field.id) return;

      // Skip disabled fields
      if (field.disabled || field.hasAttribute('disabled')) return;

      // Skip already processed fields
      if (processedIds.has(field.id)) return;

      // Skip fields that are part of a form group with errors
      if (fieldsInGroups.has(field.id)) {
        // Still validate the field for visual error display but don't add to error summary
        if (typeof field.checkValidity === 'function') {
          field.checkValidity();
        } else if (typeof field._validateWithoutController === 'function') {
          field._validateWithoutController();
        }
        return;
      }

      // Skip fields that are in a form group
      const parentGroup = field.closest('wm-form-group');
      if (parentGroup && parentGroup.id && formGroupIds.has(parentGroup.id)) {
        // Still validate the field for visual display
        if (typeof field.checkValidity === 'function') {
          field.checkValidity();
        } else if (typeof field._validateWithoutController === 'function') {
          field._validateWithoutController();
        }
        return;
      }

      // Force validation during form submission
      if ('_hasInteracted' in field) {
        field._hasInteracted = true;
      }

      // Special handling for wm-select components
      if (field.tagName.toLowerCase() === 'wm-select') {
        // SPECIAL FIX FOR MULTI-SELECT: Check directly if the field has a value
        // This is crucial for multiple selects where the DOM state might not match attributes
        let hasValidValue = false;

        const isMultiple = field.hasAttribute('multiple');

        // Direct DOM property access - most reliable method
        if ('value' in field) {
          if (isMultiple && Array.isArray(field.value)) {
            // For multi-select, check if the array has values
            hasValidValue = field.value.length > 0;
          } else if (!isMultiple) {
            // For single select, check for non-empty value
            hasValidValue = field.value !== undefined && field.value !== null && field.value !== '';
          }
        }

        // For multiple select, also check the DOM directly
        if (isMultiple && !hasValidValue) {
          // Try to find any selected options directly in the DOM
          const selectedOptions = field.querySelectorAll('option[selected]');
          hasValidValue = selectedOptions.length > 0;
        }

        // Force a fresh validation
        let errorMessage = '';

        if (field.required) {
          if (hasValidValue) {
            // If we detected valid value, force clear any error state
            if (field._errorController) {
              field._errorController.clearError();
            } else if (typeof field.clearError === 'function') {
              field.clearError();
            }
            // Also clear any haserror attribute
            field.removeAttribute('haserror');
            errorMessage = ''; // Force no error
          } else {
            // Let the field's validation determine the error message
            if (typeof field.checkValidity === 'function') {
              errorMessage = field.checkValidity();
            }
          }
        } else {
          // For non-required fields, just call normal validation
          if (typeof field.checkValidity === 'function') {
            errorMessage = field.checkValidity();
          }
        }

        // If there's an error, add it to the errors array
        if (errorMessage) {
          processedIds.add(field.id);
          const summaryMessage = field.getAttribute('summary-errormessage') || errorMessage;
          this.errors.push({
            nodeName: field.nodeName,
            id: field.id,
            msg: errorMessage,
            summaryMsg: summaryMessage,
            domPosition: getDomPosition(field.id)
          });
        }
      } else {
        // Standard validation for non-select fields
        let errorMessage = '';
        if (typeof field.checkValidity === 'function') {
          errorMessage = field.checkValidity();
        } else if (typeof field._validateWithoutController === 'function') {
          errorMessage = field._validateWithoutController();
        }

        // If there's an error, add it to the errors array
        if (errorMessage) {
          processedIds.add(field.id);
          const summaryMessage = field.getAttribute('summary-errormessage') || errorMessage;
          this.errors.push({
            nodeName: field.nodeName,
            id: field.id,
            msg: errorMessage,
            summaryMsg: summaryMessage,
            domPosition: getDomPosition(field.id)
          });
        }
      }
    });
  }

  /**
   * Set errors manually (e.g., from server-side validation)
   */
  setErrors(errors) {
    this.previousErrors = [...this.errors];
    this.errors = Array.isArray(errors) ? errors : [];
    this.hasValidationError = this.errors.length > 0;
    return this.errors;
  }

  /**
   * Get current errors
   */
  getErrors() {
    return this.errors;
  }

  /**
   * Reset validation state and clear errors
   * @param {boolean} preserveHistory - Whether to keep track of previous errors
   */
  reset(preserveHistory = false) {
    if (preserveHistory) {
      this.previousErrors = [...this.errors];
    } else {
      this.previousErrors = [];
    }

    this.errors = [];
    this.hasValidationError = false;
    errorTracker.reset();

    // Clear error state from all form elements to ensure a fresh validation
    try {
      const fields = this.host._fields || [];
      fields.forEach(field => {
        if (!field) return;

        // Special handling for fields with errorController
        if (field._errorController) {
          field._errorController.clearError();
        }

        // Remove error attributes
        if (field.hasAttribute('haserror')) {
          field.removeAttribute('haserror');
        }

        // For wm-select fields, ensure they're properly cleaned up
        if (field.tagName.toLowerCase() === 'wm-select') {
          if (typeof field.clearError === 'function') {
            field.clearError();
          }

          // Force remove any visual error indicators
          field.removeAttribute('haserror');
        }
      });
    } catch (error) {
      console.error("Error during form control error state reset:", error);
    }

    // Dispatch an event to notify listeners that validation state has been reset
    dispatchCustomEvent(this.host, 'validation-reset', {});

    return true;
  }

  // Reactive controller lifecycle hooks
  hostConnected() {}
  hostDisconnected() {}
}

export { FormValidationController };
