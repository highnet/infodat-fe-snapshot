/* @copyright Stadt Wien - Wiener Melange 200 */
import { i } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { n } from '../../when-55b3d1d8.js';
import { FormWrapper } from './form-wrapper.js';
import { f as formItemStyles } from '../../form-item.styles-a1cceb44.js';
import { f as formStyles } from '../../form.styles-a2bd9acf.js';
import { o } from '../../if-defined-4084517f.js';
import { l } from '../../live-ae266325.js';
import { dispatchCustomEvent } from './utils.js';
import { g as globalCSS } from '../../wiener-melange.bundle.min-0e2d13dc.js';
import './slot.js';
import '../../class-map-68392fb3.js';
import '../../directive-4c65af6a.js';
import './error-state-controller.js';
import './error-tracking.js';
import '../../unsafe-html-2bcd6aa9.js';

const globalStyles = new CSSStyleSheet();
globalStyles.replaceSync(globalCSS);

const FormOption = (superClass) => {
	class FormOptionElement extends FormWrapper(superClass) {
		/** @private */
		get _items() {
			return this.shadowRoot?.querySelectorAll("input") ?? null;
		}

		static properties = {
			legend: { type: String },
			labels: { type: String, reflect: true },
			values: { type: String, reflect: true },
			// Change this to properly handle both string and boolean values
			disabled: { type: String, reflect: true, attribute: 'disabled' },
			indeterminate: { type: Boolean, reflect: true },
			_options: { type: Array },
			checked: { type: String, reflect: true },
		};

		/** @private */
		static styles = [
			globalStyles,
			formStyles,
			formItemStyles,
			i`
				#hint {
					margin-block: var(--wm-spacing-xxs);
				}
			`,
		];

		constructor() {
			super();
			/**
			 * @type {String} - Legende für das fieldset
			 */
			this.legend = "";

			/**
			 * @private
			 * Array of options, either set via function or declaratively
			 */
			this._options = [];

			/**
			 * @type {String} - Liste der Labels getrennt durch ;
			 */
			this.labels = "";

			/**
			 * @type {String} - Liste von true oder false-Werten getrennt durch ;
			 */
			this.disabled = "";

			/**
			 * @type {String} - Liste der Werte getrennt durch ;
			 */
			this.values = "";

			/**
			 * @type {String} - Liste der ausgewählten Werte getrennt durch ;
			 */
			this.checked = "";
		}

		connectedCallback() {
			super.connectedCallback();

			this._setOptionViaAttributes();

			this._validateOptions();

			/** @type {CustomEvent} Web Component ist bereit.*/
			dispatchCustomEvent(this, 'defined', {});
		}
		/**
		 * @private
		 * Unterbindet Events und das Event-Bubbling, wenn das Element disabled ist.
		 * */
		_handleEvent(e) {
			if (this.disabled) {
				e.stopImmediatePropagation();
			}
		}

		/**
		 * @private
		 */
		_validateOptions() {
			setTimeout(() => {
				if (this._items) {
					this._items.forEach(item => {
						// Handle validation events
						item.addEventListener('change', () => {
							if (this.type === 'checkbox') {
								// For checkboxes, only validate the group as a whole
								const isValid = !this.required || this.value.length > 0;
								this._internals.setValidity(
									{ valueMissing: !isValid },
									isValid ? '' : 'Bitte wählen Sie mindestens eine Option aus'
								);
							} else {
								// For other types, validate individually
								this._internals.setValidity(
									item.validity,
									item.validationMessage,
									item
								);
							}

							if (this.validate) {
								this.checkValidity();
							}
						});
					});
				}
			}, 0);
		}

		// Add handlers for each event type
		_handleBlur(e) {
			dispatchCustomEvent(this, 'blur', {
				value: this.value,
				target: e.target
			});
		}

		_handleFocus(e) {
			dispatchCustomEvent(this, 'focus', {
				value: this.value,
				target: e.target
			});
		}

		_handleInput(e) {
			dispatchCustomEvent(this, 'input', {
				value: this.value,
				target: e.target
			});
		}

		/**
		 * @private
		 * Handle click events on options
		 */
		_handleClick(e) {
			if (!e || !e.target) return;

			// If the clicked input is disabled, do nothing
			if (e.target.disabled) return;

			// Dispatch custom event with click information
			dispatchCustomEvent(this, 'click', {
				value: e.target.value,
				target: e.target,
				checked: e.target.checked
			});
		}

		updated(changedProperties) {
			super.updated(changedProperties);

			if (
				changedProperties.has("disabled") ||
				changedProperties.has("labels") ||
				changedProperties.has("values") ||
				changedProperties.has("checked")
			) {
				this._setOptionViaAttributes();
			}
		}

		/**
		 * @private
		 */
		_handleChange(e) {
			// Get all checked values
			const checked = Array.from(this._items)
				.filter((option) => option.checked)
				.map((option) => option.value);

			this.value = checked;

			// Only set required on the first checkbox if none are checked
			if (this.required) {
				if (checked.length > 0) {
					this._items.forEach(item => item.removeAttribute("required"));
				} else {
					this._items.forEach(item => item.setAttribute("required", "required"));
				}
			}

			// Dispatch native change event
			this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

			// Dispatch custom event using utility
			dispatchCustomEvent(this, 'change', {
				value: this.value
			});

			// Update form value
			this._internals.setFormValue(this.value.join(','));
		}

		/**
		 * Optionen über Funktion setzen. Objekte mit text, value, checked, disabled
		 * @param {Array} arr Array mit Objekten
		 */
		setOptions(arr) {
			this._options = [...arr]; // Sicherstellen, dass _options ein neues Array ist, um Reaktivität auszulösen
			this.requestUpdate(); // Trigger a re-render after setting options as a safe measure - the update should be automatic according to how Lit's reactive properties work
		}

		/**
		 * Optionen abrufen
		 * @returns {Array} Array mit Objekten
		 */
		getOptions() {
			return this._options;
		}

		/**
		 * @private
		 * Enhanced validation of checked values and array lengths
		 */
		_validateInputArrays() {
			// First validate that required arrays exist
			if (!this._labels || !this._values) {
				console.error(`${this.tagName}: labels and values are required`);
				return false;
			}

			// Early validation for radio buttons to ensure single selection
			if (this.type === 'radio' && this._checkedValues && this._checkedValues.length > 0) {
				if (this._checkedValues.length > 1) {
					console.warn(`${this.tagName}: Radio buttons can only have one checked value. Using first value: ${this._checkedValues[0]}`);
					// Fix the problem rather than returning false - use first value only
					this._checkedValues = [this._checkedValues[0]];
				}

				// Also validate that the value exists in our values array
				if (!this._values.includes(this._checkedValues[0])) {
					console.warn(`${this.tagName}: Invalid radio value: ${this._checkedValues[0]}. Valid values are: [${this._values.join(',')}]`);
					// Clear invalid selection rather than preventing rendering
					this._checkedValues = [];
				}
			}

			// Continue with arrays length validation but make it more lenient
			if (this._labels.length !== this._values.length) {
				console.warn(`${this.tagName}: labels (${this._labels.length}) and values (${this._values.length}) have different lengths. Using shorter length.`);
				// Use shorter length rather than failing validation
				const minLength = Math.min(this._labels.length, this._values.length);
				this._labels = this._labels.slice(0, minLength);
				this._values = this._values.slice(0, minLength);
			}

			// Handle shorter disabled array by filling with defaults (false)
			if (this._disabled && this._disabled.length > 0 && this._disabled.length < this._values.length) {
				console.info(`${this.tagName}: disabled array length (${this._disabled.length}) is shorter than values length (${this._values.length}). Filling with false.`);
				// Fill remaining positions with false
				while (this._disabled.length < this._values.length) {
					this._disabled.push(false);
				}
			}

			// Validate checked values are valid
			if (this._checkedValues && this._checkedValues.length > 0) {
				const validValues = new Set(this._values); // Create a Set for faster lookups
				const invalidValues = this._checkedValues.filter(val => !validValues.has(val));

				if (invalidValues.length > 0) {
					console.warn(`${this.tagName}: Invalid checked values found: [${invalidValues.join(',')}]. These will be filtered out.`);

					// Filter to keep only valid values
					this._checkedValues = this._checkedValues.filter(val => validValues.has(val));
				}
			}

			return true; // Validation passed with potential fixes applied
		}

		/**
		 * @private
		 * Set options via attributes with improved error handling
		 */
		_setOptionViaAttributes() {
			if (this.labels === "") return;

			try {
				// Parse attributes into arrays
				this._labels = this.labels.split(";");
				this._values = this.values.split(";");

				// Parse disabled attribute safely

				this._disabled = [];

				// Handle disabled based on its type
				if (typeof this.disabled === 'boolean') {
					// If boolean, use single value for all options
					this._disabled = Array(this._values.length).fill(this.disabled);
				} else if (typeof this.disabled === 'string' && this.disabled) {
					// If string with content, split and convert values to booleans
					this._disabled = this.disabled.split(";").map(val => {
						return val.trim().toLowerCase() === "true";
					});
				}
				// Otherwise leave as empty array

				this._checkedValues = this.checked ? this.checked.split(";") : [];

				// Validate but continue anyway - use the helper to fix problems
				this._validateInputArrays();

				// Use minimum length to avoid out-of-bounds
				const minLength = Math.min(
					this._labels.length,
					this._values.length
				);

				const _options = [];
				for (let i = 0; i < minLength; i++) {
					const text = this._labels[i] || '';
					const value = this._values[i] || '';

					// Get disabled state safely
					const isDisabled = i < this._disabled.length ? this._disabled[i] : false;

					_options.push({
						text: text,
						value: value,
						disabled: isDisabled,
						checked: this.type === "radio"
							? value === this.checked
							: this._checkedValues.includes(value)
					});
				}

				this.setOptions(_options);
			} catch (error) {
				console.error(`Error in ${this.tagName} _setOptionViaAttributes:`, error);
				// Use empty options array as fallback
				this.setOptions([]);
			}
		}

		/**
		 * @private
		 */
		_renderOptionContainer(noFieldset = false) {
			let ids = "";

			if (noFieldset) {
				ids += "hint";
			}

			if (this.hasError) {
				ids += "error-message";
			}

			return x`
				${this._options.map(
					(item, i) => x`
						<div class="option-container">
							<input
								autocomplete=${o(this.autocomplete)}
								type="${this.type}"
								id="${this._formId}-${i}"
								.value=${item.value}
								@click="${this._handleClick}"
								@change="${this._handleChange}"
								@blur="${this._handleBlur}"
								@focus="${this._handleFocus}"
								.name=${l(this.name)}
								?checked=${item.checked}
								?disabled=${item.disabled}
								aria-disabled="${o(item.disabled ? true : undefined)}"
								aria-invalid="${o(this.hasError ? true : undefined)}"
								aria-describedby="${o(ids !== "" ? ids : undefined)}"
								?required=${this.required && i === 0}
							/>
							${this._renderLabel(item.text.trim(), `${this._formId}-${i}`)}
						</div>
					`
				)}
			`;
		}

		/**
		 * @private
		 */
		_renderItem(content) {
			return this._renderWrapper(x`
				${n(
					this.legend,
					() => x`
						<fieldset
							aria-describedby="${o(
								this._hasHint ? "hint" : ""
							)} ${o(this.hasError ? "error-message" : "")}"
							aria-invalid="${o(this.hasError ? "true" : undefined)}"
						>
							<legend>${this.legend} ${this._showRequired()}</legend>

							${n(
								this._hasHint,
								() => x`
									<div id="hint">
										<div><slot name="hint">${this.hint}</slot></div>
									</div>
								`
							)}
							${this._renderOptionContainer()}
						</fieldset>
					`,
					() => x`
						${this._renderOptionContainer(true)}
						${n(
							this._hasHint,
							() => x`
								<div id="hint">
									<div><slot name="hint">${this.hint}</slot></div>
								</div>
							`
						)}
					`
				)}
			`);
		}
	}
	return FormOptionElement;
};

export { FormOption };
