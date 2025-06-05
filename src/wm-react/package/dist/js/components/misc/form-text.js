/* @copyright Stadt Wien - Wiener Melange 200 */
import '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { f as formItemStyles } from '../../form-item.styles-a1cceb44.js';
import { f as formStyles } from '../../form.styles-a2bd9acf.js';
import { FormItem } from './form-item.js';
import { dispatchCustomEvent, removeEmptyFieldsFromObject } from './utils.js';
import { e } from '../../class-map-68392fb3.js';
import { n } from '../../when-55b3d1d8.js';
import '../../unsafe-html-2bcd6aa9.js';
import { FormStateManager } from './form-state-manager.js';
import { validateInput } from './formValidation.js';
import { g as globalCSS } from '../../wiener-melange.bundle.min-0e2d13dc.js';
import { SharedInfoMixin } from './shared-info.js';
import './form-wrapper.js';
import './slot.js';
import './error-state-controller.js';
import './error-tracking.js';
import '../../directive-4c65af6a.js';
import '../../if-defined-4084517f.js';

const globalStyles = new CSSStyleSheet();
globalStyles.replaceSync(globalCSS);

const FormText = (superClass) => {
	// Use FormStateManager in the mixin chain
	const Base = SharedInfoMixin(FormStateManager(FormItem(superClass)));
	class FormTextElement extends Base {
		static properties = {
			announcementText: { type: String },
			hideMaxlength: { type: Boolean },
			maxlength: { type: Number },
			placeholder: { type: String },
			search: { type: String, reflect: true },
			size: { type: String },
			filter: { type: Boolean },
			_highlightedOptionID: { type: String },
			maxlengthText: { type: String },
			info: { type: String },
			_infoOpen: { type: Boolean },
			validate: { type: Boolean, reflect: true },
			showErrors: { type: Boolean, reflect: true }
		};

		static styles = [globalStyles, formStyles, formItemStyles];

		get _output() {
			return document.querySelector('[role="status"]') ?? null;
		}

		constructor() {
			super();

			/**
			 * @type {String} - Text, der angekündigt wird, wenn Optionen angezeigt werden
			 */
			this.announcementText =
				"Suchvorschläge werden angezeigt. Verwenden Sie Pfeiltasten um zu navigieren";

			/**
			 * @type {Number} - Maximale Zeichenanzahl, die eingegeben werden darf
			 */
			this.maxlength = undefined;

			/**
			 * @type {String} - placeholder-Attribut in HTML
			 */
			this.placeholder = undefined;

			/**
			 * @type {'hidden'|'visible'|'hiddenmobile'} - Art des Suchfeldes
			 */
			this.search = undefined;

			/**
			 * @type {String} - size-Attribute in HTML
			 */
			this.size = undefined;

			/**
			 * @type {Boolean} - Liste in Combobox beim Tippen filtern
			 */
			this.filter = false;

			/**
			 * @type {Boolean} - Verfügbare Zeichenanzahl verbergen
			 */
			this.hideMaxlength = false;

			/**
			 * @type {String} - id of the currently Highlight Option
			 * @private
			 */
			this._highlightedOptionID = undefined;

			/**
			 * @type {String} - Text for maxlength message
			 */
			this.maxlengthText = "Es sind noch {remaining} Zeichen verfügbar";

			/**
			 * @type {String} - Pattern validation message
			 */
			this.patternMismatchMessage = "Bitte geben Sie einen gültigen Wert ein";
			this.info = undefined;
			this._infoOpen = false;
			this.value = '';
			this.validate = false;
			this.showErrors = false;
		}

		connectedCallback() {
			super.connectedCallback();
			this._addEvents();

			// Set up validation event handling with careful recursion prevention
			const setupSafeValidationHandling = () => {
				if (this._item) {
					// Use a debounce flag to prevent infinite recursion
					let isHandlingInput = false;

					this._item.addEventListener('input', (event) => {
						// Prevent recursive calls
						if (isHandlingInput) return;

						try {
							isHandlingInput = true;
							if (this.validate || this.showErrors) {
								// Call validation through the error controller
                this._errorController.validate();
							}
						} finally {
							// Always reset the flag to allow future handling
							isHandlingInput = false;
						}
					});

					this._item.addEventListener('invalid', (e) => {
						e.preventDefault();
						// Again protect against recursion
						if (!isHandlingInput) {
							try {
								isHandlingInput = true;
								this._errorController.validate();
							} finally {
								isHandlingInput = false;
							}
						}
					});
				}
			};

			// Ensure DOM is ready before attaching handlers
			if (document.readyState === 'loading') {
				document.addEventListener('DOMContentLoaded', setupSafeValidationHandling);
			} else {
				setupSafeValidationHandling();
			}
		}

		updated(changedProperties) {
			super.updated(changedProperties);

			/**
			 * Reset the select item when the list of options changes
			 */
			if (changedProperties.has("_optionItems")) {
				this._selectedOption = -1;
				this._setAriaSelected(null);
			}
			if (changedProperties.has("setvalue")) {
				setTimeout(() => {
					const option = this.shadowRoot.querySelector(
						`[role="option"][value="${this.setvalue}"]`
					);
					if (option) {
						this._selectOption(option);
					}
				}, 300); // Magic number but we have to wait some time until the list is ready
				}
			if (changedProperties.has('error') && this.error) {
				this._defineErrorMessages();
			}
		}

		/**
		 * @private
		 * @param {*} current
		 */
		_setAriaSelected(current) {
			// If there's a selected option, remove the selection
			if (this.shadowRoot.querySelector('[aria-selected="true"]')) {
				this.shadowRoot
					.querySelector('[aria-selected="true"]')
					.setAttribute("aria-selected", false);
			}

			// select the current
			if (current) {
				current.setAttribute("aria-selected", true);
			}
		}

		/**
		 * Close submenus automatically when leaving sub menu list using the keyboard
		 * @private
		 */
		_handleInput(e) {
			if (this._optionSelected) {
				e.preventDefault();
				this._optionSelected = false;
				return;
			}
			if (!this.disabled) {
				this.value = e.target.value ?? '';
				dispatchCustomEvent(this, 'input', {
					value: this.value,
					target: e.composedPath()[0]
					});

        // Use the controller for validation
        if (this.validate || this.showErrors) {
          this._errorController.validate();
        }

				if (this._originalType === "combobox") {
					this.showOptions();
					this._filterOptions(e);
				}
			}
		}

		/**
		 * Filter existing options in a filterable combobox
		 * @private
		 */
		_filterOptions(e) {
			if (this.filter) {
				this.showOptions();
				const items = structuredClone(this._originalOptionItems);
				this._optionItems = items.filter((item) => {
					const needle = e.target.value.toLowerCase();
					let match = false;
					if (!item.children.length) {
						if (item.text.toLowerCase().indexOf(needle) > -1) {
							match = true;
						}
					} else {
						item.children = item.children.filter((subitem) => {
							if (subitem.text.toLowerCase().indexOf(needle) > -1) {
								match = true;
							}
							return subitem.text.toLowerCase().indexOf(needle) > -1;
						});
					}
					return match;
				});
			}
		}

		/**
		 * Add click and key events for option list
		 * @private
		 */
		_addEvents() {
			this.addEventListener("keydown", (e) => {
				// If in the input for, focus the first item in the list
				if (
					e.composedPath()[0].nodeName === "INPUT" &&
					this._renderdOptions.length
				) {
					if (e.code === "ArrowUp") {
						e.preventDefault();
						this._selectedOption--;
					}
					if (e.code === "ArrowDown") {
						e.preventDefault();
						this._selectedOption++;
					}
					if (e.code === "ArrowUp" || e.code === "ArrowDown") {
						this.showOptions();
						if (this._selectedOption === this._renderdOptions.length) {
							this._selectedOption = 0;
						}
						if (this._selectedOption < 0) {
							this._selectedOption = this._renderdOptions.length - 1;
						}
						this._markOption(this._selectedOption);
					}
					if (e.code === "Enter") {
						if (this._selectedOption > -1) {
							const option = this._renderdOptions[this._selectedOption];
							if (option.nodeName !== "A") {
								e.preventDefault();
								this._selectOption(option);
							} else {
								option.click();
							}
						}
					}
				}

				// close list when pressing tab
				if (e.code === "Tab") {
					if (this._showOptions) {
						this.hideOptions(false);
					}
				}

				// close list when pressing escape
				if (e.code === "Escape") {
					// check if there are options rendered
					if (this._optionItems && this._optionItems.length > 0) {
						this.hideOptions();
						this._cancelSearch();
					} else {
						// if no options, then simply blur the input to fully close the combobox
						this._input.blur();
					}
				}
			});

			// select option on click
			this.addEventListener("click", (e) => {
				if (e.composedPath()[0].closest('[role="option"]')) {
					e.preventDefault();
					this._selectOption(e.composedPath()[0]);
				}
			});
			document.addEventListener("click", this._clickOutSide.bind(this));

			// We need setTimeout here because connectedcallback gets called before the document has been fully parsed in some browsers
			// Details here: https://github.com/WICG/webcomponents/issues/551
			// PS: Not the best solution, but seems to work
			setTimeout(() => {
				if (this._item) {
					this._item.addEventListener("input", () => {
						this._defineErrorMessages();
						this._internals.setValidity(
							this._item.validity,
							this._item.validationMessage,
							this._item
						);
						if (this.validate) {
							this.checkValidity();
						}
					});
				}
			}, 0);
		}

		/**
		 * Highlight the current option in the list of options
		 * @private
		 * @param {Number} index
		 */
		_markOption(index) {
			this._setAriaSelected(this._renderdOptions[index]);
			this._highlightedOptionID = this._renderdOptions[index].id;
			// Only start scrolling if there are more than 5 items
			if (index > 5) {
				this._renderdOptions[index].scrollIntoView(false);
			}
			// Do not update the input's value while navigating with arrow keys
			// this.value = this._renderdOptions[index].textContent.trim();
			// Mark flag to indicate that an option has been highlighted (but not yet selected)
			this._optionSelected = false;
		}

		/**
		 * @private
		 * Called when a click occurs outside the widget.
		 */
		_clickOutSide(e) {
			if (e.target.closest("wm-input") !== this) {
				if (this.search) {
					// Only close if the search field is open, don't reopen it.
					if (this._searchVisible) {
						this._toggleSearch();
					}
				} else if (this._showOptions) {
					this.hideOptions(false);
				}
			}
		}

		/**
		 * Liste in Combobox verbergen
		 * @param {Boolean} setFocus Fokus auf Input legen (true)
		 */
		hideOptions(setFocus = true) {
			this._showOptions = false;
			if (setFocus) {
				// Find input before trying to focus it
				const inputElement = this.shadowRoot?.querySelector('input');
				if (inputElement) {
					inputElement.focus();
				}
			}
			this._selectedOption = -1;
		}

		/**
		 * Liste in Combobox anzeigen
		 */
		showOptions() {
			if (!this._showOptions) {
				this._announceOptions();
			}
			this._showOptions = true;
		}

		/**
		 * @private
		 * Communicate to screen readers that options are visible
		 */
		_announceOptions() {
			if (this._output) {
				this._output.textContent = this.announcementText;
				setTimeout(() => {
					this._output.textContent = "";
				}, 2000);
			} else {
				console.error(
					'Live region <div role="status" class="wm-h-vh"></div> fehlt im Dokument.'
				);
			}
		}

		/**
		 * Toggle options
		 * @private
		 */
		_toggleOptions() {
			this._showOptions = !this._showOptions;
		}

		/**
		 * Turn Nodelist into Array
		 * @param { Node } elements
		 * @returns Array of Nodes
		 * @private
		 */
		_selectOption(cur) {
			const current = cur.closest('[role="option"]');

			// If the option has no value attribute, it is a "no results" option. Ignore selection.
			if (!current.getAttribute("value")) {
				this.hideOptions(false);
				return;
			}
			this._optionSelected = true;
			this._setAriaSelected(current);

			// _value should store the actual value (for form submission)
			this._value = current.getAttribute("value") || current.textContent.trim();
			// value should store the display text (what the user sees)
			this.value = current.textContent.trim();

			// Clear existing error state upon successful selection
			if (this._item) {
				this._item.setCustomValidity("");
			}
			this.error = "";
			this.hasError = false; // explicitly clear error flag
			if (typeof this.clearError === "function") {
				this.clearError();
			}
			const data = removeEmptyFieldsFromObject({
				text: current.querySelector(".text").textContent.trim(),
				value: current.getAttribute("value"),
				id: current.getAttribute("id"),
				row2: current.dataset.row2,
				row3: current.dataset.row3,
			});
			dispatchCustomEvent(this, 'input-selected', { data });
			this.hideOptions(false);
		}

		/**
		* Cancel search/reset filtering state when Escape is pressed.
		* @private
		*/
		_cancelSearch() {
				// Reset the selected option index
				this._selectedOption = -1;
				// Reset the options list to the original unfiltered items
				this._optionItems = this._originalOptionItems;
				// Clear any visual highlights
				this._setAriaSelected(null);

					// Get the input element properly
					const inputElement = this.shadowRoot?.querySelector('input');

					// If the input exists, properly handle the focus
					if (inputElement) {
						inputElement.value = '';
						this.value = '';
					}

				// Dispatch a custom event to notify parent components using the utility
				dispatchCustomEvent(this, 'search-cancelled', { value: '' });

				// Force re-render to ensure layout is restored
				this.requestUpdate();
		}

		/**
		 * @private
		 */
		_renderElement(content) {
			const maxLengthClass = { "wm-h-vh": this.hideMaxlength };
			let message = '';
			if (this.maxlength && this.value) {
				const remaining = this.maxlength - this.value.length;
				message = this.maxlengthText.replace('{remaining}', remaining);
			}
			return this._renderItem(x`
				${content}
				<div role="status" ?hidden="${!this.maxlength}" class="${e(maxLengthClass)} max-characters">
					${message}
				</div>
				${n(this.hasInfo, () => this._renderInfoButton())}
				${n(this.hasInfo, () => this._renderInfoText())}
			`);
		}

		/**
		 * @private
		 */
		_defineErrorMessages() {
			if (!this._item) return;

			// Check if the input is valid - if it is, clear any custom validity message
			if (this._item.validity.valid) {
				this._item.setCustomValidity('');
				return;
			}

			// Map error types to component properties with fallbacks
			// This uses the ValidityState object properties directly
			const errorMessages = {
				valueMissing: this.requiredMessage || "Dieses Feld ist erforderlich",
				typeMismatch: this.typeMismatchMessage || "Bitte geben Sie einen gültigen Wert ein",
				patternMismatch: this.patternMismatchMessage || "Bitte geben Sie einen Wert im erforderlichen Format ein",
				tooLong: this.tooLongMessage || `Maximal ${this.maxlength} Zeichen erlaubt`,
				tooShort: this.tooShortMessage || `Mindestens ${this.minlength} Zeichen erforderlich`,
				rangeOverflow: this.rangeOverflowMessage || `Wert muss kleiner oder gleich ${this.max} sein`,
				rangeUnderflow: this.rangeUnderflowMessage || `Wert muss größer oder gleich ${this.min} sein`,
				badInput: this.badInputMessage || "Bitte geben Sie einen gültigen Wert ein",
				stepMismatch: this.stepMismatchMessage || "Bitte geben Sie einen gültigen Wert ein",
				customError: this._item.validationMessage || "Dieses Feld ist ungültig"
			};

			// Find the first error type that applies
			for (const [errorType, message] of Object.entries(errorMessages)) {
				if (this._item.validity[errorType]) {
					this._item.setCustomValidity(message);

					// Let the controller handle the rest of error management
					return;
				}
			}

			// Fallback for any other unhandled validation errors
			if (!this._item.validity.valid) {
				this._item.setCustomValidity(this.errormessage || "Bitte geben Sie einen gültigen Wert ein");
			}
		}

		/**
		 * Centralizes validation handling for consistent behavior
		 * @private
		 */
		_handleValidation() {
			// Set a flag on the instance to prevent recursion
			if (this._isValidating) return;

			try {
				this._isValidating = true;
				this._defineErrorMessages();

				// Get the validation message
				let message = '';

				if (this._item && !this._item.checkValidity()) {
					message = this._item.validationMessage || this.errormessage || "Bitte geben Sie einen gültigen Wert ein";
				}

				// Use the centralized error state method
				this._synchronizeErrorState(message);
			} finally {
				// Always clear the flag
				this._isValidating = false;
			}
		}

		/**
		 * Clear error state and validation message
		 * @public
		 */
		clearErrorState() {
			this._synchronizeErrorState('');
		}

		/**
		 * Synchronizes the error state between component, underlying input,
		 * and form association API
		 * @param {String} message Error message or empty string to clear error
		 * @private
		 */
		_synchronizeErrorState(message = '') {
			// Update component error state
			this.hasError = !!message;
			this.error = message;

			// Update native input
			if (this._item) {
				if (message) {
					this._item.setAttribute('aria-invalid', 'true');
					try {
						this._item.setCustomValidity(message);
					} catch (err) {
						console.warn('Error setting custom validity:', err);
					}
				} else {
					this._item.removeAttribute('aria-invalid');
					try {
						this._item.setCustomValidity('');
					} catch (err) {
						console.warn('Error clearing custom validity:', err);
					}
				}
			}

			// Update form API
			if (this._internals) {
				try {
					if (message) {
						this._internals.setValidity(
							{ customError: true },
							message,
							this._item || undefined
						);
					} else {
						this._internals.setValidity(
							{},
							'',
							this._item || undefined
						);
					}
				} catch (err) {
					console.warn('Error updating form internals validity:', err);
				}
			}

			// Dispatch validation event
			dispatchCustomEvent(this, this.hasError ? 'invalid' : 'valid', {
				value: this.value,
				message: message
			});
		}

		/**
		 * Override _performValidation from FormStateManager
		 * @protected
		 */
		_performValidation() {
			const inputElement = this._getInputElement();
			if (!inputElement) return "";

				// Apply translations first
				this._defineErrorMessages();

				// If the element already has an error from _defineErrorMessages
				if (inputElement.validity && !inputElement.validity.valid) {
					return inputElement.validationMessage;
				}

				// Run additional validation
				return validateInput(inputElement, {
					value: this.value,
					required: this.required,
					pattern: this.pattern,
					validator: this.validator,
					errormessage: this.errormessage || "Bitte geben Sie einen gültigen Wert ein"
				});
		}

		/**
		 * Override _getFormControlElement from FormStateManager
		 * @protected
		 */
		_getFormControlElement() {
			return this._item || this._getInputElement();
		}
	}
	return FormTextElement;
};

export { FormText };
