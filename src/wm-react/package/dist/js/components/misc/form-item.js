/* @copyright Stadt Wien - Wiener Melange 200 */
import '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { n } from '../../when-55b3d1d8.js';
import { e } from '../../class-map-68392fb3.js';
import { o } from '../../unsafe-html-2bcd6aa9.js';
import { FormWrapper } from './form-wrapper.js';
import { dispatchCustomEvent } from './utils.js';
import '../../directive-4c65af6a.js';
import './slot.js';
import './error-state-controller.js';
import './error-tracking.js';

const FormItem = (superClass) => {
	class FormItemElement extends FormWrapper(superClass) {
		/** @private */
		get _options() {
			return (
				this.shadowRoot
					?.querySelector('slot[name="options"]')
					.assignedNodes()[0] ?? null
			);
		}

		/** @private */
		get _renderdOptions() {
			return this.shadowRoot?.querySelectorAll(".option") ?? null;
		}

		/** @private */
		get _input() {
			return this.shadowRoot?.querySelector("input") ?? null;
		}

		/** @private */
		get _item() {
			return (
				this.shadowRoot?.querySelectorAll("input, select, textarea, [role='switch']")[0] ?? null
			);
		}

		/** @private */
		get _searchButton() {
			return this.shadowRoot?.querySelector(".search-button") ?? null;
		}

		/**
		 * @private
		 */
		static properties = {
			autocomplete: { type: String },
			disabled: { type: Boolean },
			hideLabel: { type: Boolean },
			info: { type: String },

			_hasInfo: { type: Boolean },
			_infoOpen: { type: Boolean },
			_optionItems: { type: Array },
			_originalOptionItems: { type: Array },
			_searchVisible: { type: Boolean, reflect: true },
			_selectedOption: { type: Number },
			_showOptions: { type: Boolean },
			_optionSelected: { type: Boolean },
		};

		constructor() {
			super();

			this.value = '';

			/**
			 * @type {String} - autocomplete-Attribut in HTML
			 */
			this.autocomplete = undefined;

			/**
			 * @type {Boolean} - (In)aktives Feld
			 */
			this.disabled = false;

			/**
			 * @type {Boolean} - Label visuell verbergen
			 */
			this.hideLabel = false;

			/**
			 * @type {String} - Infotext
			 */
			this.info = undefined;

			/**
			 * @type { Boolean } - Is there info text?
			 * @private
			 */
			this._hasInfo = false;

			/**
			 * @type { Boolean } - Is info text visible or not
			 * @private
			 */
			this._infoOpen = false;

			/**
			 * @type { Boolean } - id to connect a form item to a message via aria-describedby
			 * @private
			 */
			this._msgID = false;

			/**
			 * @type { Number } - Currently selected option
			 * @private
			 */
			this._selectedOption = -1;

			/**
			 * @type { Boolean } - Is the search field (if it is one) visible
			 * @private
			 */
			this._searchVisible = false;

			/**
			 * @type { Number } - List of options
			 * @private
			 */
			this._optionItems = [];

			/**
			 * @type { Number } - Cloned list of options
			 * @private
			 */
			this._originalOptionItems = [];

			/**
			 * Flag for showing options in comboboxes
			 * @private
			 */
			this._showOptions = false;

			/**
			 * Flag for determining whether a value was set by typing or by selecting an option
			 * @private
			 */
			this._optionSelected = false;
		}

		connectedCallback() {
			super.connectedCallback();
		}

		/**
		 * Called when the options slot changes.
		 * Gets all listem items an constructs an object.
		 * @private
		 */
		_updateOptions() {
			this._optionItems = [];

			if (this._options) {
				const items = this._getList(
					this._options.querySelectorAll(":scope >  li")
				);

				this._optionItems = items;
				this._originalOptionItems = items;
			}
		}

		/**
		 * Turn Nodelist into Array
		 * @param { Node } elements
		 * @returns Array of Nodes
		 * @private
		 */
		_getList(elements) {
			const items = [];
			let children = [];
			let text = "";

			for (const option of elements) {
				children = [];
				text =
					option.childNodes[0].innerHTML || option.childNodes[0].textContent;

				if (option.querySelectorAll("ul > li").length) {
					children = this._getList(option.querySelectorAll("ul > li"));
					text = option.childNodes[0].textContent;
				}

				if (option.querySelector("a")) {
					text = option.querySelector("a").textContent;
				}

				const item = {
					text: text,
					id: option.id,
					children: children,
					value:
						option.getAttribute("data-value") || option.getAttribute("value"),
				};

				if (option.querySelector("a")) {
					item.href = option.querySelector("a").getAttribute("href");
				}

				items.push(item);
			}
			return items;
		}

		/**
		 * @private
		 */
		updated(changedProperties) {
			super.updated(changedProperties);

			/**
			 * Set value for participation in form submission
			 */
			if (changedProperties.has("value")) {
				this._internals.setFormValue(this.value);
				// We have to trigger the input event for comoboxes
				// because otherwise there's an validation error
				if (this.value) {
					this._item.dispatchEvent(new Event("input", { bubbles: true }));
				}
			}

			this._hasInfo = this.info || this._slotController.hasNamedSlot("info");
		}

		/**
     * Method to show error without going through errorMixin
     * Now using ErrorStateController
     */
		showError(message) {
      this._errorController.setError(message);
		}

		/**
     * Method to clear error without going through errorMixin
     * Now using ErrorStateController
     */
		clearError() {
      this._errorController.clearError();
		}

		/** @private */
		_renderOption(item) {
			return x`
				${n(
					item.href,
					() =>
						x` ${n(
					item.children.length,
					() => x`
						<div class="option-heading">${item.text}</div>
						${item.children.map((subitem) => this._renderOption(subitem))}
					`,
					() => x`
						<a class="option" href="${item.href}" id="${item.id}">
							${n(
								item.file,
								() => x`
									<!-- Conditionally render image-container if item.file exists -->
									<div class="image-container">
										<img src="${item.file}" alt="">
									</div>
								`
							)}
							<div class="text-container">
								${n(
									item.text,
									() => x`
										<!-- Conditionally render main-content if item.text exists -->
										<span class="main-content">${o(item.text)}</span>
									`
								)}
								${n(
									item.subText,
									() => x`
										<!-- Conditionally render additional-content if item.subText exists -->
										<span class="additional-content">${o(item.subText)}</span>
									`
								)}
							</div>
						</a>
					`
				)}`,
					() =>
						x` ${n(
							item.children.length,
							() => x`<div class="option-heading">${item.text}</div>
								${item.children.map((subitem) =>
									this._renderOption(subitem)
								)} `,
							() =>
								x`<div
									class="option"
									role="option"
									aria-selected="false"
									tabindex="-1"
									value="${item.value}"
									id="${item.id}"
									data-row2="${item.row2}"
									data-row3="${item.row3}"
								>
									${o(this._highlightText(item.text))}
									${n(
										item.row2,
										() =>
											x`<br />${o(
													`<span class="row">${item.row2}</span>`
												)}`
									)}
									${n(
										item.row3,
										() =>
											x`<br />${o(
													`<span class="row">${item.row3}</span>`
												)}`
									)}
								</div>`
						)}`
				)}
			`;
		}

		/**
		 * Highlights the search term in text using mark tags
		 * @param {String} text The text to highlight
		 * @returns {String} The text with highlighted search terms
		 * @private
		 */
		_highlightText(text) {
			if (!this.value || !text || this.value.trim() === '') {
				return `<span class="text">${text}</span>`;
			}

			try {
					// Normalize the search term and text for matching
					// - Replace special characters with optional patterns
					// - Make hyphen and space interchangeable
					const searchValue = this.value
							.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')  // Escape regex special chars
							.replace(/[-\s]/g, '[-\\s]*');           // Make spaces/hyphens optional and interchangeable

					// Create flexible pattern that allows for differences in punctuation and spacing
					const regex = new RegExp(`(${searchValue})`, 'gi');

					// Create a working copy of text to highlight matches
					let workingText = text;

					// Check if there would be any matches with our regex
					if (text.toLowerCase().replace(/[-\s]/g, '').includes(
							this.value.toLowerCase().replace(/[-\s]/g, '')
					)) {
							// If we would match with normalized text, use our flexible regex
							workingText = text.replace(regex, '<mark style="padding: 0;">$1</mark>');
					}

					return `<span class="text">${workingText}</span>`;
			} catch (error) {
					// Fallback to the original simple replacement if regex fails
					return `<span class="text">${text.replace(
							this.value,
							`<mark style="padding: 0;">${this.value}</mark>`
					)}</span>`;
			}
		}

		/**
		 * @private
		 */
		_toggleSearch() {
			this._searchVisible = !this._searchVisible;

			setTimeout(() => {
				if (this._searchVisible) {
					this._input.focus();
				} else {
					this.hideOptions();
					this._cancelSearch();
				}
			}, 0);
		}

		/**
		 * @private
		 */
		_cancelSearch() {
			setTimeout(() => {
				if (this._searchButton) {
					this.value = "";
					this._searchButton.focus();
					this._searchVisible = false;
				}
			}, 0);
		}

		/**
		 * @private
		 * @param {Event} e Change Event
		 */
		_handleChange(e) {
			this.value = e.target.value;

			// Dispatch custom event
			dispatchCustomEvent(this, 'change', {
				value: this.value,
				target: e.target
			});

			// Update form association
			this._internals.setFormValue(this.value);

      // Validate if required
      if (this.validate) {
        this._errorController.validate();
      }
		}

		_handleInput(e) {
			this.value = e.target.value;

			// Dispatch custom event
			dispatchCustomEvent(this, 'input', {
				value: this.value,
				target: e.target
				});

      // Validate if required
      if (this.validate) {
        this._errorController.validate();
      }
		}

		_handleBlur(e) {
			// Validate on blur for better user experience
      if (this.validate) {
        this._errorController.validate();
      }

			// Dispatch custom event
			dispatchCustomEvent(this, 'blur', {
				value: e.target.value,
				target: e.composedPath()[0]
			});
		}

		_handleFocus(e) {
			// Dispatch custom event
			dispatchCustomEvent(this, 'focus', {
				value: e.target.value,
				target: e.composedPath()[0]
			});
		}

		_handleInvalid(errormessage) {
			this._errorController.setError(errormessage);
		}

		formAssociatedCallback(form) {
			this._form = form;
		}

		formDisabledCallback(disabled) {
				this.disabled = disabled;
		}

		formResetCallback() {
				this.value = this.defaultValue;
        this._errorController.clearError();
		}

		/**
		 * @private
		 */
		_renderItem(content) {
			const inputClass = {
				"input-visible": this._searchVisible,
			};
			return this._renderWrapper(x`
				${n(
					this.type === "checkbox" || this.type === "radio" || this.type === "switch",
					() => x`
						<wm-stack horizontal gap="xs">
							<div class="horizontal-form-control">
								${content} ${this._renderLabel()}
							</div>
						</wm-stack>
					`,
					() => x`
						${this._renderLabel()}
						${n(
							this._hasHint,
							() => x`
								<div id="hint">
									<div><slot name="hint">${this.hint}</slot></div>
								</div>
							`
						)}
						<wm-stack grow gap="xs" horizontal wrap>
							<div class="vertical-form-control" style="position:relative;">
								<div
									class="input ${e(inputClass)}"
									style="${this.type === "select" || !this.size
                    ? ""
                    : `max-width: ${this.size}ch`}"
								>
									${n(
										this.search,
										() => x` <wm-button
											kind="clean"
											class="btn-close-search"
										>
											<button
												@click="${this._toggleSearch}"
												aria-expanded="${this._searchVisible}"
											>
												<wm-icon iconid="chevron-left">Suche schließen</wm-icon>
											</button>
										</wm-button>`
									)}
									${content}
								</div>

								${n(
									this.search,
									() => x`
										<wm-button kind="clean" class="btn-search">
											<button
												@click="${this._toggleSearch}"
												aria-expanded="${this._searchVisible}"
												class="search-button"
											>
												${n(
													this.search === "hidden",
													() => x`<span aria-hidden="true">Suche</span>`
												)}
												<wm-icon iconid="search">Suche</wm-icon>
											</button>
										</wm-button>
									`
								)}
							</div>
						</wm-stack>
					`
				)}

				<div class="auto-suggest" ?hidden="${!this._optionItems.length}" part="auto-suggest">
					<slot
						name="options"
						@slotchange="${this._updateOptions}"
						hidden
					></slot>

					${n(this._optionItems.length && this._optionItems[0].type,
						() => x`
							<div ?hidden="${!this._showOptions}" id="options">
								${this._optionItems.map((item) => this._renderOption(item))}
							</div>
						`,
						() => x`
							<div role="listbox" aria-label="Vorschläge" ?hidden="${!this._showOptions}" id="options">
								${this._optionItems.map((item) => this._renderOption(item))}
							</div>
						`
					)}
				</div>
			`);
		}
	}
	return FormItemElement;
};

export { FormItem };
