/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { FormWrapper } from '../misc/form-wrapper.js';
import { n } from '../../when-55b3d1d8.js';
import { o } from '../../if-defined-4084517f.js';
import { l } from '../../live-ae266325.js';
import { dispatchCustomEvent } from '../misc/utils.js';
import { ErrorStateController } from '../misc/error-state-controller.js';
import { FormStateManager } from '../misc/form-state-manager.js';
import '../misc/slot.js';
import '../../class-map-68392fb3.js';
import '../../directive-4c65af6a.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../misc/error-tracking.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  .switch-inner {
    align-items: center;
    gap: 0.5rem;
    display: flex;
  }

  [role="switch"] {
    background-color: var(--switch-background-color) !important;
    border: 1px solid var(--switch-border-color) !important;
    border-radius: 32px;
    border-width: 2px;
    block-size: 1.85rem;
    cursor: pointer;
    inline-size: 3.4375rem;
    padding: 0;
    position: relative;
  }

  [aria-checked="true"] {
    --switch-background: var(--switch-background-color--active);
  }

  [role="switch"]::before {
    background-color: var(--switch-background-knob-color) !important;
    border-radius: 16px;
    block-size: 1.25rem;
    content: "";
    top: 3px;
    left: 3px;
    inline-size: 1.25rem;
    position: absolute;
    transition: .2s;
  }

  [aria-checked="true"]::before {
    transform: translateX(1.525rem);
  }

  .switch:has([aria-invalid="true"]) {
    color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));
  }

  .switch:has([aria-invalid="true"]) ~ .wm-forms-message {
    font-size: var(--wm-font-size-xs);
    color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));
  }
`];

/**
 * Toggle-Switch in Formularen
 *
 * @slot default - Text
 */

/**
 * @cssprop --switch-background-color - Hintergrundfarbe inaktiv
 * @cssprop --switch-background-color--active - Hintergrundfarbe aktiv
 * @cssprop --switch-background-knob-color - Hintergrundfarbe des Reglers
 * @cssprop --switch-border-color - Farbe des Rahmens
 */

class Switch extends FormStateManager(FormWrapper(s)) {
	static properties = {
		label: { type: String, reflect: true },
		checked: { type: Boolean },
		disabled: { type: Boolean, reflect: true },
		errormessage: { type: String, attribute: "errormessage" },
		summaryErrormessage: { type: String, attribute: "summary-errormessage" },
		hasError: { type: Boolean, reflect: true },
		error: { type: String },
		validate: { type: Boolean, reflect: true },
		showErrors: { type: Boolean, reflect: true },
		_initialValue: { state: true },
		_hasInteracted: { state: true }
	};

	static styles = [styles];

	constructor() {
		super();

		this.label = "Aktivieren";
		this.checked = false;
		this.disabled = false;
		this.hasError = false;
		this.error = "";
		this.errormessage = "";
		this.summaryErrormessage = "";
		this.validate = false;
		this.showErrors = false;
		this.type = "switch";
		this.value = "0";
		this._initialValue = "0";
		this._hasInteracted = false;

		this._errorController = new ErrorStateController(this);
	}

	connectedCallback() {
		super.connectedCallback();

		if (this.checked) {
			this.value = "1";
		}

		this._initialValue = this.value;
	}

	_toggle(e) {
		if (!this.disabled) {
			this._hasInteracted = true;
			this.checked = !this.checked;
			this.value = this.checked ? "1" : "0";

			dispatchCustomEvent(this, "change", {
				value: this.value,
				checked: this.checked,
				target: e.composedPath()[0]
			});

			if (this.validate || this.showErrors) {
				this.checkValidity();
			}
		}
	}

	checkValidity() {
		let errorMsg = "";
		const switchElement = this.shadowRoot?.querySelector('button[role="switch"]');

		if (this.required && (!this.checked || this.value !== "1")) {
			errorMsg = this.errormessage || "Diese Auswahl ist erforderlich";
		}

		if (switchElement) {
			try {
				if (errorMsg) {
					switchElement.setAttribute("aria-invalid", "true");
				} else {
					switchElement.removeAttribute("aria-invalid");
				}
			} catch (e) {
				console.warn("Error updating aria-invalid state:", e);
			}
		}

		if (errorMsg) {
			this._errorController.setError(errorMsg);
		} else {
			this._errorController.clearError();
		}

		return errorMsg;
	}

	showError(message) {
		this._errorController.setError(message);
	}

	clearError() {
		this._errorController.clearError();
	}

	_performValidation() {
		if (this.disabled === true) return "";

		if (!this._hasInteracted && !this.showErrors) return "";

		const errorMsg =
			this.required && (!this.checked || this.value !== "1")
				? this.errormessage || "Diese Auswahl ist erforderlich"
				: "";

		if (errorMsg) {
			this._errorController.setError(errorMsg);
		} else {
			this._errorController.clearError();
		}

		return errorMsg;
	}

	_getFormControlElement() {
		return this.shadowRoot?.querySelector('button[role="switch"]');
	}

	reset() {
		this.value = this._initialValue;
		this.checked = this._initialValue === "1";

		this._hasInteracted = false;

		this._errorController.clearError();

		this._internals?.setFormValue(this.value);

		dispatchCustomEvent(this, "change", {
			value: this.value,
			checked: this.checked,
			isReset: true
		});
	}

	formResetCallback() {
		super.formResetCallback?.();
		this.reset();
	}

	_handleFocus(e) {
		if (!this.disabled) {
			dispatchCustomEvent(this, "focus", {
				value: this.value,
				checked: this.checked,
				target: e.target
			});
		}
	}

	_handleBlur(e) {
		if (!this.disabled) {
			this._hasInteracted = true;

			if (this.validate || this.showErrors) {
				this.checkValidity();
			}

			dispatchCustomEvent(this, "blur", {
				value: this.value,
				checked: this.checked,
				target: e.target
			});
		}
	}

	_handleChange(e) {
		if (!this.disabled) {
			this._hasInteracted = true;

			if (this.validate || this.showErrors) {
				this.checkValidity();
			}

			dispatchCustomEvent(this, "change", {
				value: this.value,
				checked: this.checked,
				target: e.target
			});
		}
	}

	/**
	 * Sets the disabled state of the switch
	 * @param {boolean} isDisabled - Whether the switch should be disabled
	 * @public
	 */
	setDisabled(isDisabled) {
		// Update disabled property
		this.disabled = Boolean(isDisabled);

		// Clear error state when disabled
		if (isDisabled) {
			this._errorController.clearError();
		}

		// Update the switch button element
		const switchElement = this.shadowRoot?.querySelector('button[role="switch"]');
		if (switchElement) {
			if (isDisabled) {
				switchElement.setAttribute('disabled', '');
			} else {
				switchElement.removeAttribute('disabled');
			}
		}

		// Dispatch event
		dispatchCustomEvent(this, 'disabled-changed', {
			disabled: this.disabled
		});
	}

	updated(changedProperties) {
		super.updated?.(changedProperties);

		if (changedProperties.has("value") || changedProperties.has("checked")) {
			if (changedProperties.has("checked") && !changedProperties.has("value")) {
				this.value = this.checked ? "1" : "0";
			} else if (changedProperties.has("value") && !changedProperties.has("checked")) {
				this.checked = this.value === "1";
			}

			this._internals?.setFormValue(this.value);

			if (!this._initialValue && this.value) {
				this._initialValue = this.value;
			}

			if (this.required && (this._hasInteracted || this.showErrors)) {
				this.checkValidity();
			}
		}
	}

	render() {
		return this._renderWrapper(x`
			<div class="switch">
				${n(
					this._hasHint,
					() => x`
						<div id="hint">
							<div><slot name="hint">${this.hint}</slot></div>
						</div>
					`
				)}

				<div class="switch-inner">
					${this._renderLabel(this.label, `${this._formId}`)}

					<button
						id="${this._formId}"
						role="switch"
						aria-checked="${this.checked}"
						aria-labelledby="toggle"
						@click="${this.disabled ? undefined : this._toggle}"
						@blur="${this.disabled ? undefined : this._handleBlur}"
						@focus="${this.disabled ? undefined : this._handleFocus}"
						@change="${this.disabled ? undefined : this._handleChange}"
						aria-invalid="${o(this.hasError ? true : undefined)}"
						?required=${this.required}
						.value=${l(this.value)}
						?disabled=${this.disabled}
					></button>
				</div>
			</div>
		`);
	}
}

customElements.define("wm-switch", Switch);

const tagName = "wm-switch";

export { Switch, tagName };
