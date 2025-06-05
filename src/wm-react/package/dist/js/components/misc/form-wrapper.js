/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { n } from '../../when-55b3d1d8.js';
import { SlotController } from './slot.js';
import { randomHash, dispatchCustomEvent } from './utils.js';
import { e } from '../../class-map-68392fb3.js';
import { ErrorStateController } from './error-state-controller.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';
import './error-tracking.js';

const FormWrapper = (superClass) => {
	class FormItemWrapper extends superClass {
		/** @private */
		get _item() {
			return (
				this.shadowRoot?.querySelectorAll(
					"input, select, textarea, [role='switch']"
				)[0] ?? null
			);
		}

		/**
		 * Allow fields to participate in form submission and validation
		 * @private
		 */
		static formAssociated = true;

		/**
		 * @private
		 */
		static shadowRootOptions = {
			...s.shadowRootOptions,
			delegatesFocus: true,
		};

		/**
		 * @private
		 */
		static properties = {
			error: { type: String },
			hasError: { type: Boolean, reflect: true },
			hideAsterisk: { type: Boolean },
			id: { type: String, reflect: true },
			hint: { type: String },
			label: { type: String },
			name: { type: String },
			required: { type: Boolean },
			requiredText: { type: String },
			validate: { type: Boolean },
			value: { type: String },
			_hasHint: { type: Boolean },
			_formId: { type: String, attribute: false },
			_id: { type: String, attribute: false }
		};

		constructor() {
			super();

			/**
			 * @type {String} - Fehlermeldung
			 */
			this.error = undefined;

			/**
			 * @type { Boolean } - Is there an error?
			 * @private
			 */
			this.hasError = false;

			/**
			 * @type {Boolean} - Text statt Sternchen darstellen
			 */
			this.hideAsterisk = false;

			/**
			 * @type {String} - optionale ID
			 */
			this.id = undefined;

			/**
			 * @type {String} - Name-Attribute in HTML
			 */
			this.name = undefined;

			/**
			 * @type {String} - Wert des Elements
			 */
			this.value = "";

			/**
			 * @type {String} - Bezeichnung des Eingabefeldes
			 */
			this.label = "";

			/**
			 * @type {Boolean} - Pflichtfeld
			 */
			this.required = false;

			/**
			 * @type {String} -  Text für Pflichtfeld-Hinweis
			 */
			this.requiredText = "Pflichtfeld";

			/**
			 * @type { Boolean } - Eingabefeld live validieren
			 */
			this.validate = false;

			/**
			 * Attach internals for form submission and validation
			 * @private
			 */
			this._internals = this.attachInternals();

			/**
			 * @type { class } - Slotcontroller
			 * @private
			 */
			this._slotController = new SlotController(this);

			/**
			 * @type { String } - Random id
			 * @private
			 */
			this._id = `${randomHash()}`;

			/**
			 * @type { String } - Form id
			 * @private
			 */
			this._formId = `wm-form-item-${this._id}`;

			/**
			 * @type {String} - Hinweis
			 */
			this.hint = undefined;

			/**
			 * @type { Boolean } - Is there a hint?
			 * @private
			 */
			this._hasHint = false;

      /**
       * Add error state controller for centralized error handling
       * @type {ErrorStateController}
       * @private
       */
      this._errorController = new ErrorStateController(this);
		}

		connectedCallback() {
			super.connectedCallback();

			// if there's no id attribute, generate an id
			if (!this.id) {
				this.id = this._id;
			}
		}

		/**
		 * @private
		 */
		firstUpdated() {
			if (this.label === "" || this.label === "true") {
				if (!this.type === "radio") {
					console.error(
						"Das label muss angegeben werden! Um labels zu verstecken, hideLabel verwenden."
					);
				}
			}

			// Check validity and set up the native API
			this._setValidity();
		}

		/**
		 * @private
		 */
		updated(changedProperties) {
			// if (changedProperties.has("value")) {
			// }

			if (changedProperties.has("id")) {
				this._id = this.id;
				this._formId = `wm-form-item-${this._id}`;
			}

			this.hasError = this.error || this._slotController.hasNamedSlot("error");
			this._hasHint = this.hint || this._slotController.hasNamedSlot("hint");
		}

		/**
		 * Überprüft, ob ein Element valide ist.
     * This method now uses the ErrorStateController for validation
		 * @returns Fehlermeldung oder leerer String
		 */
		checkValidity() {
			// First try to validate using the native input element
      if (this._item && typeof this._item.checkValidity === 'function') {
        if (!this._item.checkValidity()) {
          const msg = this._item.validationMessage;
          this._errorController.setError(msg);
          return msg;
        } else {
          this._errorController.clearError();
          return '';
        }
      }

      // If no native element or validation, use the controller
      this._errorController.validate();
      return this.error || '';
		}

		/**
		 * Define some custom error messages based on error and input type
		 * @private
		 */
		_defineErrorMessages() {
			// Add null check for _item
			if (!this._item) return;

			const validity = this._item.validity;
			if (!validity) return;

			this._item.setCustomValidity("");

			if (this.type === "switch" && this.required) {
				let switchNotChecked = "";

				if (!this.checked) {
					switchNotChecked = "Bestätigen Sie die Option";
				} else {
					switchNotChecked = "";
				}

				this._item.setCustomValidity(switchNotChecked);
			}

			if (validity.typeMismatch && this.type === "email") {
				this._item.setCustomValidity(
					"Geben Sie eine gültige E-Mail Adresse an"
				);
			}

			if (validity.typeMismatch && this.type === "url") {
				this._item.setCustomValidity(
					"Geben Sie eine gültige URL beginnend mit https:// an"
				);
			}

			if (validity.valueMissing) {
				let valueMissing = "Füllen Sie dieses Feld aus.";

				if (this.type === "password") {
					valueMissing = "Geben Sie ein Passwort ein.";
				}

				if (this._item.type === "file") {
					valueMissing = "Wählen Sie Dateien aus.";
				}

				if (this.type === "radio") {
					valueMissing = "Bitte wählen Sie eine Option aus.";
				}

				if (this.type === "checkbox") {
					valueMissing = "Bitte wählen Sie die Option aus.";
				}

				this._item.setCustomValidity(valueMissing);
			}
		}

		/**
		 * Allow custom element to participate in form validation
		 * @private
		 */
		_setValidity() {
			setTimeout(() => {
				// Add null check for _item
				if (!this._item) return;

				// Define some custom error messages
				this._defineErrorMessages();

				const validationMessage = this._item.validationMessage || "Invalid input";

				this._internals.setValidity(
					this._item.validity,
					validationMessage,
					this._item
				);
			}, 0);
		}

		/**
		 * @private
		 */
		_renderLabel(label, id) {
			const labelClass = {
				"has-error": this.hasError,
				"wm-h-vh": this.hideLabel,
			};

			return x`
				<label for="${id || this._formId}" class="${e(labelClass)}">
					${label || this.label}
					${n(this.type !== "radio" && this.type !== "checkbox", () => x` ${this._showRequired()} `)}
				</label>
			`;
		}

		/**
		 * Show * or required text
		 * @returns @private
		 */
		_showRequired() {
			return x`${n(
				this.required,
				() => x`
					${this.hideAsterisk
						? `(${this.requiredText})`
						: x`<abbr title="${this.requiredText}">*</abbr>`}
				`
			)}`;
		}

		_dispatchFormEvent(eventName, detail = {}) {
				// Always dispatch native event first
				this.dispatchEvent(
						new Event(eventName, {
								bubbles: true,
								composed: true
						})
				);
		}

		/**
		 * Helper method to dispatch events consistently
		 * @private
		 */
		_dispatchCustomEvent(eventName, detail = {}) {
			dispatchCustomEvent(this, eventName, detail);
		}

		/**
		 * Custom blur event
		 * @private
		 * @param {Event} e Blur Event
		 */
		_handleBlur(e) {
			// Dispatch native blur event
			this.dispatchEvent(new Event('blur', {
					bubbles: true,
					composed: true
			}));

			/**
			 * @type {CustomEvent} Fokus bewegt sich aus dem Eingabefeld.
			 * @summary { value, target }
			 * */

			this._dispatchCustomEvent('blur', {
				value: e.target.value,
				target: e.composedPath()[0]
			});
		}

		/**
		 * Custom focus event
		 * @private
		 * @param {Event} e focus Event
		 */
		_handleFocus(e) {

			// Dispatch native blur event
			// Always dispatch native
			this.dispatchEvent(new Event('focus', {
				bubbles: true,
				composed: true
		}));

			/**
			 * @type {CustomEvent} Das Eingabefeld wird fokussiert.
			 * @summary { value, target }
			 * */
			this._dispatchCustomEvent('focus', {
				value: e.target.value,
				target: e.composedPath()[0]
			});
		}

		/**
		 * Custom invalid event
		 * @private
		 */
		_handleInvalid(errormessage) {
			// Use the error controller to set the error
      this._errorController.setError(errormessage);

      // Also dispatch the standard "invalid" event for cross-framework validators
      this.dispatchEvent(
        new Event("invalid", {
          bubbles: true,
          composed: true
        })
      );
		}

		/**
		 * Reset the form control to its initial value
		 * @public
		 */
		reset() {
			this.value = '';
			this._value = undefined;
			this._errorController.clearError(); // Use controller to clear error
			this.hasError = false;

			// Reset the native input element if it exists
			if (this._item) {
				this._item.value = '';
			}

			// Dispatch native reset event
			this.dispatchEvent(
				new Event('reset', {
					bubbles: true,
					composed: true
				})
			);
		}

		/**
		 * @private
		 */
		_renderWrapper(content) {
			return x`
				${content}
				${n(
					this.hasError,
					() => x`
						<div class="wm-forms-message" id="error-message">
							<div class="has-error">
								<slot name="error">${this.error}</slot>
							</div>
						</div>
					`
				)}
			`;
		}
	}
	return FormItemWrapper;
};

export { FormWrapper };
