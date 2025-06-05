/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { dispatchCustomEvent } from '../misc/utils.js';
import { FormControlRegistry } from '../misc/form-control-registry.js';
import { FormValidationController } from '../misc/form-validation-controller.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';
import '../misc/error-tracking.js';

/**
 * Beschreibung
 * @summary FormErrorsummary/FormErrorsummary
 *
 * @slot default - Contains the HTML form element und all form fields
 */
class Form extends s {
	/**
	 * The HTML form element
	 * @private
	 */
	get _form() {
		return this.querySelector("form") ?? null;
	}

	/**
	 * All possible form field web components
	 * @private
	 */
	get _fields() {
		return (
			this.querySelectorAll(
				"wm-input, wm-select, wm-textarea, wm-radio, wm-upload, wm-checkbox, wm-switch, wm-form-group, input, select, textarea"
			) ?? []
		);
	}

	// TODO: remove switched to reactive formerrorsummary
	/**
	 * The list of errors
	 * @private
	 */
	// get _errorSummary() {
	// 	return this.querySelector("wm-formerrorsummary") ?? null;
	// }
	// TODO: remove switched to reactive formerrorsummary
	/**
	 * Template for the list of errors
	 * @private
	 */
	// get _errorSummaryTemplate() {
	// 	return this.querySelector("#errorlist") ?? null;
	// }
	// TODO: remove switched to reactive formerrorsummary

	/**
	 * Template for items the list of errors
	 * @private
	 */
	// get _errorSummaryItemTemplate() {
	// 	return this.querySelector("#errorsummaryitem") ?? null;
	// }

	static properties = {
		validate: { type: Boolean },
		hideMaxlength: { type: Boolean },
		hasValidationError: { type: Boolean, reflect: true },
	};

	constructor() {
		super();

		/**
		 * @type {Boolean} - Eingabefeld live validieren
		 * Wenn auf true gesetzt, werden alle Kindelemente mit dem Attribut "validate" versehen,
		 * wodurch diese bei jeder Eingabe validiert werden und Fehlermeldungen sofort anzeigen.
		 * Dies ermöglicht eine sofortige Rückmeldung an den Benutzer, ohne auf die Formularübermittlung zu warten.
		 */
		this.validate = false;

		/**
		 * @type {Boolean} - Verfügbare Zeichenanzahl in Text-Eingabefeldern verbergen
		 */
		this.hideMaxlength = false;

		/**
		 * @type {Boolean} - Gibt an, ob das Formular Validierungsfehler enthält
		 * Wird auf true gesetzt, wenn nach einer Validierung Fehler vorhanden sind.
		 * Wird verwendet, um den Status des gesamten Formulars anzuzeigen.
		 */
		this.hasValidationError = false;

		/**
		 * @type {FormControlRegistry} - Form control registry for managing form elements
		 * @private
		 */
		this._formControlRegistry = new FormControlRegistry();

		// Create validation controller
		this._validationController = new FormValidationController(this, this._formControlRegistry);
	}

	connectedCallback() {
		super.connectedCallback();
	}

	firstUpdated() {
		// Use Promise.resolve().then instead of setTimeout for more reliable microtask scheduling
		Promise.resolve().then(() => {
			// Check if required elements exist before proceeding
			if (!this._form) {
				console.error("Form element not found");
				return;
			}

			// Attach error list in case we need to display errors
			// this._attachErrorList();

			// Disable native validation
			this._form.setAttribute("novalidate", "novalidate");

			// Register all form controls with the registry
			this._registerFormControls();

			// Propagate attribute values to children
			this._setGlobalFormOptions();

			// Validate form on submit
			this._onSubmit();

			// Handle form reset
			this._onReset();
		});
	}

	/**
	 * Register all form controls with the form control registry
	 * @private
	 */
	_registerFormControls() {
		if (!this._fields) return;

		this._fields.forEach(field => {
			if (!field) return;
			this._formControlRegistry.register(field);

			// Listen for dynamic control additions/removals
			if (field.tagName.toLowerCase() === 'wm-form-group') {
				field.addEventListener('control-added', e => {
					if (e.detail && e.detail.control) {
						this._formControlRegistry.register(e.detail.control);
						this._applyGlobalFormOptions(e.detail.control);
					}
				});

				field.addEventListener('control-removed', e => {
					if (e.detail && e.detail.control) {
						this._formControlRegistry.unregister(e.detail.control);
					}
				});
			}
		});
	}

  /**
   * Validate form on submit
   * @private
   */
  _onSubmit() {
    if (!this._form) return;

    this._form.addEventListener("submit", (e) => {
      this._form.setAttribute('data-submitting', '');

      // IMPORTANT: Clear any existing error summary before validation
      // This ensures we start with a clean slate on each submission
      const existingErrorSummary = this.querySelector("wm-formerrorsummary");
      if (existingErrorSummary) {
        existingErrorSummary.innerHTML = '';
        existingErrorSummary.setAttribute("hidden", "");
      }

      // Clear the validation controller's error state
      this._validationController.reset(false);

      // Enable error display for all fields
      if (this._fields) {
        this._fields.forEach(field => {
          if (field && 'showErrors' in field) {
            field.showErrors = true;
          }
        });
      }

      // Use the controller to validate - all special validation logic is in the controller
      const isValid = this._checkValidity();

      if (!isValid) {
        e.preventDefault();
        // Update error summary based on validation results
        this._handleErrors();
        dispatchCustomEvent(this, 'form-invalid', { errors: this._validationController.errors });
      } else {
        // If form is valid, ensure error summary is hidden
        const errorSummary = this.querySelector("wm-formerrorsummary");
        if (errorSummary) {
          errorSummary.innerHTML = '';
          errorSummary.setAttribute("hidden", "");
        }
      }

      if (this._form) {
        this._form.removeAttribute('data-submitting');
      }
    });
  }

	/**
	 * Handles form reset events
	 *
	 * Resets all form fields, including custom components with formResetCallback
	 * methods like wm-select.
	 *
	 * @private
	 */
	_onReset() {
		if (!this._form) return;

		this._form.addEventListener("reset", (e) => {
			// Prevent the default reset behavior so our custom reset can fully control the process
			e.preventDefault();

			// Reset error states
			this._errors = [];

			if (this._errorSummary) {
				this._errorSummary.setAttribute("hidden", "hidden");
			}

			this.hasValidationError = false;

			// Use the registry to reset all controls
			this._formControlRegistry.resetAll();

			// Dispatch reset event
			dispatchCustomEvent(this, 'form-reset', {
				timestamp: new Date().toISOString(),
			});

			// Allow a re-render cycle to complete before dispatching complete event
			// Wait for Lit's update cycle to complete
			this.updateComplete.then(() => {
				dispatchCustomEvent(this, 'form-reset-complete', {
					timestamp: new Date().toISOString(),
				});
			});
		});
	}

  /**
   * Iterate over fields and check validity
   * @private
   */
  _checkValidity() {
    // Delegate to validation controller
    const isValid = this._validationController.validate();
    this.hasValidationError = !isValid;
    return isValid;
  }

/**
   * Toggle error summary and manage focus
   * @private
   */
  _handleErrors() {
    try {
      // Get errors from validation controller
      const errors = this._validationController.errors;

      // Set reactive state flags
      this.hasValidationError = errors.length > 0;

      // Dispatch event about the current error state
      dispatchCustomEvent(this, 'validation-state-changed', {
        hasErrors: this.hasValidationError,
        errorCount: errors.length,
        errors: [...errors] // Send copy of errors array
      });

      // Update or create the error summary element at the correct position
      this.updateComplete.then(() => {
        // First, check if there's an existing error summary
        let errorSummary = this.querySelector("wm-formerrorsummary");

        // If not found or we need to create a new one
        if (!errorSummary) {
          errorSummary = document.createElement("wm-formerrorsummary");

          // Find the form element to insert before
          const form = this._form;
          if (form) {
            // Insert at the beginning of the form component
            this.insertBefore(errorSummary, form);
          } else {
            // Fallback: insert at the beginning of the component
            this.prepend(errorSummary);
          }
        }

        // Update the error summary content and visibility
        if (errors.length > 0) {
          // Clear existing content
          errorSummary.innerHTML = '';

          // Add error items
          errors.forEach(error => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${error.id}`;
            a.textContent = error.summaryMsg || error.msg;
            li.appendChild(a);
            errorSummary.appendChild(li);
          });

          errorSummary.removeAttribute("hidden");
        } else {
          errorSummary.setAttribute("hidden", "");
        }

        // Focus the first invalid field if there's exactly one error
        if (errors.length === 1 && errors[0].id) {
          const errorElement = this.querySelector(`#${errors[0].id}`);
          if (errorElement && typeof errorElement.focus === 'function') {
            errorElement.focus();
          }
        }
      });
		} catch (error) {
      console.error("Error handling form errors:", error);
    }
  }

	/**
	 * Propagate form options to all form fields
	 * @private
	 */
	_setGlobalFormOptions() {
		if (!this._fields) return;

		this._fields.forEach(field => {
			if (!field) return;

			// Propagate validate attribute
			if (this.validate) {
				field.setAttribute("validate", "");

				// Key change: Prevent initial error display by ensuring showErrors is false
				if ('showErrors' in field) {
					field.showErrors = false;
				}

				// Ensure _hasInteracted is initialized to false
				if ('_hasInteracted' in field) {
					field._hasInteracted = false;
				}
			}

			// Propagate hideMaxlength attribute
			if (this.hideMaxlength) {
				if (["INPUT", "WM-INPUT", "TEXTAREA", "WM-TEXTAREA"].includes(field.nodeName)) {
					field.setAttribute("hideMaxlength", true);
				}
			}
		});
	}

	/**
	 * Attach error list to the form
	 * @private
	 */
	// _attachErrorList() {
	// 	Promise.resolve().then(() => {
	// 		if (!this._form || !this._errorSummaryTemplate) {
	// 			console.error("Cannot attach error list: form or template not found");
	// 			return;
	// 		}

	// 		try {
	// 			const errorSummary = this._errorSummaryTemplate.content.cloneNode(true);
	// 			this._form.prepend(errorSummary);
	// 		} catch (error) {
	// 			console.error("Error attaching error list:", error);
	// 		}
	// 	});
	// }

  /**
   * Public method to set errors externally
   * @param {Array} errors - Array of error objects { nodeName, id, msg }
   */
  setErrors(errors) {
    this._validationController.setErrors(errors);
    this._handleErrors();
  }

  /**
   * Public method to get current errors
   * @returns {Array} - Array of error objects
   */
  getErrors() {
    return this._validationController.getErrors();
  }

	/**
	 * @private
	 */
	createRenderRoot() {
		// Use light DOM instead of shadow DOM
		// This allows direct access to form elements using querySelector
		// This is an intentional deviation from Lit best practices for this specific use case
		return this;
	}

	/**
	 * Render the error summary based on reactive state
	 */
	render() {
		// We don't actually need to render anything since we're using light DOM
		// The form is rendered by the parent already, and we'll manually position
		// the error summary when needed
		return x`<slot></slot>`;
	}
}

customElements.define("wm-form", Form);

const tagName = "wm-form";

export { Form, tagName };
