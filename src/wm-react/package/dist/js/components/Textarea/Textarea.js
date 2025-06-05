/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { FormText } from '../misc/form-text.js';
import { o } from '../../if-defined-4084517f.js';
import { f as formItemStyles } from '../../form-item.styles-a1cceb44.js';
import { dispatchCustomEvent } from '../misc/utils.js';
import { ErrorStateController } from '../misc/error-state-controller.js';
import { FormStateManager } from '../misc/form-state-manager.js';
import { g as globalCSS } from '../../wiener-melange.bundle.min-0e2d13dc.js';
import '../../form.styles-a2bd9acf.js';
import '../misc/form-item.js';
import '../../when-55b3d1d8.js';
import '../../class-map-68392fb3.js';
import '../../directive-4c65af6a.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../misc/form-wrapper.js';
import '../misc/slot.js';
import '../misc/formValidation.js';
import '../misc/shared-info.js';
import '../misc/error-tracking.js';

const styles = i`
  :host {
    display: block;
  }

  textarea {
    font-family: var(--textarea-font-family);
    font-size: var(--textarea-font-size);
    line-height: var(--textarea-line-height);
  }

  .info {
    display: none;
  }

  .info-visible {
    display: block;
  }
`;

const globalStyles = new CSSStyleSheet();
globalStyles.replaceSync(globalCSS);
class Textarea extends FormStateManager(FormText(s)) {
	static properties = {
		disabled: { type: Boolean, reflect: true },
		rows: { type: Number, reflect: true },
		pattern: { type: String }, // Add pattern property
		hasError: { type: Boolean, reflect: true }, // Add hasError property
		showErrors: { type: Boolean, reflect: true }, // Add showErrors property
		validate: { type: Boolean, reflect: true }, // Add validate property
		value: { type: String }, // Add value property
		defaultValue: { type: String }, // ensure a default value is defined
		errormessage: { type: String, attribute: "errormessage" },
		summaryErrormessage: { type: String, attribute: "summary-errormessage" },
		error: { type: String },
		_initialValue: { state: true }, // Add property to track initial value
		_hasInteracted: { state: true } // Add property to track user interaction
	};

	static styles = [globalStyles, formItemStyles, styles];

	constructor() {
		super();
		this.disabled = false;
		this.rows = 7;
		this.pattern = undefined;
		this.hasError = false;
		this.value = ''; // Initialize with empty string
		this.defaultValue = ''; // ensure a default value is defined
		this.showErrors = false; // Initialize showErrors
		this.validate = false; // Initialize validate

		/**
		 * @type {String} - Fehlermeldung bei ungültiger Eingabe
		 * Diese Meldung wird direkt am Textarea-Element angezeigt, wenn es validiert wird und ungültig ist.
		 */
		this.errormessage = "";

		/**
		 * @type {String} - Spezifische Fehlermeldung für die Fehlerübersicht
		 * Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
		 * Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
		 * Fehlermeldungen anzuzeigen, z.B. "Bitte geben Sie eine Beschreibung bei 'Projektinformationen' ein"
		 * statt nur "Dieses Feld ist erforderlich".
		 */
		this.summaryErrormessage = "";

		this.error = "";

		/**
		 * @type {String} - Initial value for reset functionality
		 * @private
		 */
		this._initialValue = '';

		/**
		 * @type {Boolean} - Track if user has interacted with the component
		 * @private
		 */
		this._hasInteracted = false;

		// Initialize error controller for centralized error handling
		this._errorController = new ErrorStateController(this);
	}

	connectedCallback() {
		super.connectedCallback();

		// Store initial value from attribute immediately
		if (this.hasAttribute('value')) {
			this._initialValue = this.getAttribute('value');
			this.value = this._initialValue;
		}
	}

	firstUpdated(changedProperties) {
		super.firstUpdated?.(changedProperties);

		// Store initial value from property or attribute if not already set
		if (!this._initialValue && (this.value || this.getAttribute('value'))) {
			this._initialValue = this.value || this.getAttribute('value');
		}
	}

	/**
	 * Resets the component to its initial state
	 * @public
	 */
	reset() {
		// Restore to initial value
		this.value = this._initialValue || '';

		// Reset UI state
		const textarea = this.shadowRoot?.querySelector('textarea');
		if (textarea) {
			textarea.value = this.value;
		}

		// Clear error states using controller
		this._errorController.clearError();

		// Reset internal form state
		this._internals?.setFormValue(this.value);

		// Reset interaction state
		this._hasInteracted = false;

		// Dispatch change event with reset flag
		dispatchCustomEvent(this, "change", {
			value: this.value,
			isReset: true
		});
	}

	formResetCallback() {
		super.formResetCallback?.();
		// Use the public reset method instead of direct value setting
		this.reset();
	}

	/**
	 * Validates the current value against constraints
	 * @returns {string} Error message if invalid, empty string if valid
	 * @public
	 */
	checkValidity() {
		let errorMsg = "";
		const textareaElement = this.shadowRoot?.querySelector('textarea');

		// First check required validation
		if (this.required && (!this.value || this.value.trim() === "")) {
			errorMsg = this.errormessage || "Dieses Feld ist erforderlich";
		}

		// Then check pattern validation if specified
		else if (this.pattern && this.value && !new RegExp(this.pattern).test(this.value)) {
			errorMsg = this.errormessage || "Eingabe entspricht nicht dem erforderlichen Format";
		}

		// Update native validation UI
		if (textareaElement) {
			try {
				if (errorMsg) {
					textareaElement.setCustomValidity(errorMsg);
				} else {
					textareaElement.setCustomValidity("");
				}
			} catch (e) {
				console.warn('Error setting custom validity:', e);
			}
		}

		// Always use the ErrorStateController for consistent behavior
		if (errorMsg) {
			this._errorController.setError(errorMsg);
		} else {
			this._errorController.clearError();
		}

		return errorMsg;
	}

	/**
	 * Shows an error message for this textarea component
	 * @param {string} message - The error message to display
	 * @public
	 */
	showError(message) {
		this._errorController.setError(message);
	}

	/**
	 * Clears any error state from this textarea component
	 * @public
	 */
	clearError() {
		this._errorController.clearError();
	}

	/**
	 * Forward setCustomValidity to underlying native textarea
	 * @param {string} message - The validation message
	 * @public
	 */
	setCustomValidity(message) {
		try {
			const textareaElement = this.shadowRoot?.querySelector('textarea');
			if (textareaElement && typeof textareaElement.setCustomValidity === 'function') {
				textareaElement.setCustomValidity(message || '');

				// Use error controller for consistent error handling
				if (message) {
					this._errorController.setError(message);
				} else {
					this._errorController.clearError();
				}
			}
		} catch (error) {
			console.error("Error setting custom validity:", error);
		}
	}

	/**
	 * Sets the disabled state of the textarea
	 * @param {boolean} isDisabled - Whether the textarea should be disabled
	 * @public
	 */
	setDisabled(isDisabled) {
		// Update disabled property
		this.disabled = Boolean(isDisabled);

		// Clear error state when disabled
		if (isDisabled) {
			this._errorController.clearError();
		}

		// Update native textarea element
		const textarea = this.shadowRoot?.querySelector('textarea');
		if (textarea) {
			if (isDisabled) {
				textarea.setAttribute('disabled', '');
			} else {
				textarea.removeAttribute('disabled');
			}
		}

		// Dispatch event
		dispatchCustomEvent(this, 'disabled-changed', {
			disabled: this.disabled
		});
	}

	/**
	 * Override _performValidation from FormStateManager
	 * @protected
	 */
	_performValidation() {
		// Skip validation entirely if the component is disabled
		if (this.disabled === true) return "";

		// Skip validation if user hasn't interacted yet and showErrors is false
		if (!this._hasInteracted && !this.showErrors) return "";

		let errorMsg = "";

		// Check required validation
		if (this.required && (!this.value || this.value.trim() === "")) {
			errorMsg = this.errormessage || "Dieses Feld ist erforderlich";
		}

		// Check pattern validation if specified
		else if (this.pattern && this.value && !new RegExp(this.pattern).test(this.value)) {
			errorMsg = this.errormessage || "Eingabe entspricht nicht dem erforderlichen Format";
		}

		// Set the error state using controller
		if (errorMsg) {
			this._errorController.setError(errorMsg);
		} else {
			this._errorController.clearError();
		}

		return errorMsg;
	}

	/**
	 * Override _getFormControlElement from FormStateManager
	 * @protected
	 */
	_getFormControlElement() {
		return this.shadowRoot?.querySelector('textarea');
	}

	_handleInput(e) {
		if (!this.disabled) {
			this._hasInteracted = true;
			this.value = e.target.value;

			// Validate only if the validate flag is set
			if (this.validate || this.showErrors) {
				this.checkValidity();
			}

			// Dispatch custom event
			dispatchCustomEvent(this, 'input', {
				value: this.value,
				valid: !this.hasError
			});
		}
	}

	_handleChange(e) {
		if (!this.disabled) {
			this._hasInteracted = true;
			this.value = e.target.value;

			// Always validate on change event
			if (this.validate || this.showErrors) {
				this.checkValidity();
			}

			// Dispatch custom event
			dispatchCustomEvent(this, 'change', {
				value: this.value,
				valid: !this.hasError
			});
		}
	}

	_handleBlur(e) {
		if (!this.disabled) {
			this._hasInteracted = true;

			// Validate on blur
			if (this.validate || this.showErrors) {
				this.checkValidity();
			}

			dispatchCustomEvent(this, 'blur', {
				value: this.value,
				target: e.target
			});
		}
	}

	render() {
		return this._renderElement(x`
				<textarea
					class="${this.hasError ? 'has-error' : ''}"
					autocomplete=${o(this.autocomplete)}
					aria-describedby="${o(
						this._hasHint || this.hasError ? "message" : undefined
					)}"
					aria-disabled="${o(this.disabled ? true : undefined)}"
					aria-invalid="${o(this.hasError ? true : undefined)}"
					placeholder="${o(this.placeholder)}"
					?required=${this.required}
					maxlength="${o(this.maxlength)}"
					rows="${o(this.rows)}"
					pattern="${o(this.pattern)}"
					.value="${this.value ?? ''}"
					@input="${this.disabled ? undefined : this._handleInput}"
					id="${this._formId}"
					@blur="${this.disabled ? undefined : this._handleBlur}"
					@focus="${this.disabled ? undefined : this._handleFocus}"
					@change="${this.disabled ? undefined : this._handleChange}"
					?disabled=${this.disabled}
					>${this.value ?? ''}</textarea>
		`);
	}

	updated(changedProperties) {
		super.updated?.(changedProperties);
		if (changedProperties.has('value')) {
			// Ensure internals are updated with the current value
			this._internals?.setFormValue(this.value ?? '');

			// Store initial value when first set but ONLY if no initial value exists yet
			if (!this._initialValue && this.value) {
				this._initialValue = this.value;
			}

			// Clear error state if value has been corrected
			if (this.hasError && this.value && this.required) {
				this.checkValidity();
			}
		}
	}
}
customElements.define("wm-textarea", Textarea);

export { Textarea };
