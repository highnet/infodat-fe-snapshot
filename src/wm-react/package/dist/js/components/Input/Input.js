/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { FormText } from '../misc/form-text.js';
import { o } from '../../if-defined-4084517f.js';
import { n } from '../../when-55b3d1d8.js';
import { dispatchCustomEvent } from '../misc/utils.js';
import { FormStateManager } from '../misc/form-state-manager.js';
import { ErrorStateController } from '../misc/error-state-controller.js';
import '../../form-item.styles-a1cceb44.js';
import '../../form.styles-a2bd9acf.js';
import '../misc/form-item.js';
import '../../class-map-68392fb3.js';
import '../../directive-4c65af6a.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../misc/form-wrapper.js';
import '../misc/slot.js';
import '../misc/error-tracking.js';
import '../misc/formValidation.js';
import '../../wiener-melange.bundle.min-0e2d13dc.js';
import '../misc/shared-info.js';

/**
 * @summary Button/Button, Icon/Icon, Stack/Stack
 */

/**
 * @cssprop --input-combobox-background-color - Hintergrund Combobox
 * @cssprop --input-combobox-background-color--active - Hintergrund hervorgehobenes Element
 */

class Input extends FormStateManager(FormText(s)) {
	static properties = {
		type: { type: String, reflect: true },
		dataset: { type: String },
		toggleButton: { type: Boolean },
		setvalue: { type: String },
		_originalType: { type: String },
		_passwordVisible: { type: Boolean },
		_value: { type: String },
		disabled: { type: Boolean, reflect: true },
		pattern: { type: String },
		hasError: { type: Boolean, reflect: true },
		showErrors: { type: Boolean, reflect: true },
		validate: { type: Boolean, reflect: true },
		value: { type: String },
		suppressError: { type: Boolean },
		errormessage: { type: String, attribute: 'errormessage' },
		summaryErrormessage: { type: String, attribute: 'summary-errormessage' },
		validator: { type: Function },
		_initialValue: { state: true },
		_hasInteracted: { state: true } // Tracks if the user has interacted with the input
	};

	constructor() {
		super();

		/**
		 * @type {'combobox'|'date'|'datetime-local'|'email'|'number'|'password'|'tel'|'text'|'time'|'url'} - Art des Eingabefelds
		 */
		this.type = "text";

		/**
		 * Ursprünglicher Eingabetyp (relevant für das Umschalten der Sichtbarkeit bei Passwort-Eingabefeldern)
		 * @private
		 */
		this._originalType = "text";

		/**
		 * @type {Boolean} - Info-Anzeige aktiv
		 * @private
		 */
		this._passwordVisible = false;

		/**
		 * @type {Boolean} - Combobox: Feld in der Response, das die Daten enthält, zum Beispiel bei OGD üblicherweise "features"
		 */
		this.dataset = "";

		/**
		 * @type {Boolean} - Button in Combobox anzeigen
		 */
		this.toggleButton = false;

		/**
		 * @type {Boolean} - Combobox: Wert programmatisch setzen
		 */
		this.setvalue = "";

		/**
		 * Eine Combobox kann einen sichtbaren Wert und einen übermittelten Wert haben. _value speichert den übermittelten Wert.
		 * @private
		 */
		this._value = undefined;

		/**
		 * @type {Boolean} - Gibt an, ob das Element deaktiviert ist oder nicht
		 */
		this.disabled = false;

		/**
		 * @type {String} - Regulärer Expressen RegEx für die Validierung
		 */
		this.pattern = undefined;

		/**
		 * @type {Boolean} - Gibt an, ob das Element einen Fehler hat
		 * Dies ist ein Statusattribut, das anzeigt, ob aktuell ein Validierungsfehler vorliegt.
		 * Es wird auf true gesetzt, wenn die Validierung fehlschlägt, und auf false zurückgesetzt,
		 * wenn die Validierung erfolgreich ist oder das Formular zurückgesetzt wird.
		 */
		this.hasError = false;

		/**
		 * @type {Boolean} - Steuert die Anzeige von Fehlermeldungen
		 * Im Gegensatz zu 'hasError' steuert dieses Attribut, ob Fehlermeldungen angezeigt werden sollen.
		 * Wenn auf true gesetzt, werden Validierungsfehler sofort angezeigt, ohne auf eine Formularübermittlung zu warten.
		 * Wird typischerweise vom übergeordneten wm-form Element gesteuert.
		 */
		this.showErrors = false;

		/**
		 * @type {Boolean} - Aktiviert die Validierung bei Eingabe
		 * Wenn auf true gesetzt, werden Eingaben sofort validiert und Fehler entsprechend angezeigt,
		 * ohne auf eine Formularübermittlung zu warten.
		 * Wird typischerweise vom übergeordneten wm-form Element gesteuert.
		 */
		this.validate = false;

		/**
		 * @type {String} - Aktueller Wert des Eingabefelds
		 */
		this.value = '';

		/**
		 * @type {String} - Standardwert für das Zurücksetzen des Formulars
		 * @private
		 */
		this.defaultValue = '';

		/**
		 * @type {Boolean} - Unterdrückt die Anzeige von Fehlermeldungen
		 */
		this.suppressError = false;

		/**
		 * @type {String} - Fehlermeldung bei ungültiger Eingabe
		 * Diese Meldung wird direkt am Eingabefeld angezeigt, wenn es validiert wird und ungültig ist.
		 */
		this.errormessage = "";

		/**
		 * @type {String} - Spezifische Fehlermeldung für die Fehlerübersicht
		 * Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
		 * Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
		 * Fehlermeldungen anzuzeigen, z.B. "Bitte geben Sie Ihren Namen bei 'Kontaktdaten' ein"
		 * statt nur "Dieses Feld ist erforderlich".
		 */
		this.summaryErrormessage = "";

		/**
		 * @type {String} - Initial value for reset functionality
		 * @private
		 */
		this._initialValue = '';

		/**
		 * @type {Boolean} - Tracks if the user has interacted with the input
		 * @private
		 */
		this._hasInteracted = false;

		// Initialize the ErrorStateController
		this._errorController = new ErrorStateController(this);
	}

	/**
	 * Umschalten der Info-Anzeige
	 * @private
	 */
	_showPassword() {
		if (!this.disabled) {
			try {
				this._passwordVisible = !this._passwordVisible;
				this.type = this._passwordVisible ? "text" : "password";
			} catch (error) {
				console.error("Error toggling password visibility:", error);
			}
		}
	}

	/**
	 * Store original value at the time of component initialization for reliable reset
	 */
	connectedCallback() {
		super.connectedCallback?.();

		// Store the initial input type
		this._originalType = this.type;

		// Capture the initial attribute value immediately at connection time
		// This is before any user interaction so we guarantee it's the "starting state"
		const attributeValue = this.hasAttribute('value') ? this.getAttribute('value') : '';
		this._initialValue = attributeValue;
		this.defaultValue = attributeValue;

		// Set comboxes to the HTML text type
		if (this._originalType === "combobox") {
			this.type = "text";
			this.autocomplete = "off";
			}

		// Update form value if form association is enabled
		this._updateFormValue();

		// Setup validation observers - important for live validation behavior
		this._setupValidationObservers();
	}

	/**
	 * Sets up observers to trigger validation when validate attributes change
	 * This is essential for proper live validation behavior
	 * @private
	 */
	_setupValidationObservers() {
		// Use MutationObserver to watch for attribute changes
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === "attributes") {
					if (mutation.attributeName === "validate" ||
						mutation.attributeName === "showerrors") {
						// If validate or showErrors becomes true, immediately validate
						if (this.validate || this.showErrors) {
							// Use microtask timing for consistent behavior
							queueMicrotask(() => this._errorController.validate());
						}
					}
				}
			}
		});

		// Start observing the element for attribute changes
		observer.observe(this, { attributes: true });
	}

	/**
	 * Updates the form value if this element is form-associated
	 * @private
	 */
	_updateFormValue() {
		try {
			// If internals is available (form-associated custom elements)
			if (this.internals && typeof this.internals.setFormValue === 'function') {
				this.internals.setFormValue(this.value || '');
				console.log("Form value updated:", this.value);
			}
		} catch (error) {
			console.error("Error updating form value:", error);
		}
	}

	firstUpdated() {
		// Don't override the initial value that was already set in connectedCallback
		// Only use the DOM element's value as a fallback
		if (this._initialValue === '') {
			const inputElement = this.shadowRoot?.querySelector('input');
			if (inputElement && inputElement.value) {
				this._initialValue = inputElement.value;
				this.defaultValue = inputElement.value;
				}
			}

			// Store a reference to the input element
			this._inputElement = this.shadowRoot?.querySelector('input');
	}

	/**
	 * Abrufen von Optionen aus einer Datenquelle
	 *
	 * Diese Methode bietet Combobox-Komponenten die Möglichkeit, Daten von einer API abzurufen.
	 * Im folgenden Format sollten die zurückgegebenen Daten genutzt werden:
	 * ```
	 * [
	 *   {
	 *     text: "Anzeigetext",
	 *     value: "tatsächlicher_wert",
	 *     children: [] // Optional für verschachtelte Optionen
	 *   }
	 * ]
	 * ```
	 *
	 * @param {String} value - Der aktuelle Eingabewert für die Suche
	 * @param {String} url - Die URL, von der Daten abgerufen werden sollen
	 * @returns {Promise<Array|null>} - Ein Array von Optionen oder null bei Fehlern
	 * @public
	 */
	async getOptions(value, url) {
		try {
			// If it's a combobox
			if (this._originalType === "combobox") {
				// Only if there are more than two characters in the input field
				if (value && value.length > 2 && url) {
					try {
						// Fetch data and return the response
						const response = await fetch(url);
						if (!response.ok) {
							console.warn(`Error fetching options: ${response.status} ${response.statusText}`);
							return null;
						}
						const data = await response.json();
						return data && this.dataset ? data[this.dataset] : null;
					} catch (error) {
						console.error("Error fetching combobox options:", error);
						return null;
					}
				} else {
					this.hideOptions?.();
					return null;
				}
			}
			return null;
		} catch (error) {
			console.error("Error in getOptions:", error);
			return null;
		}
	}

	/**
	 * Liste in Combobox befüllen
	 *
	 * Diese Methode legt dynamisch Optionen für die Combobox fest.
	 * Optionen sollten im folgenden Format bereitgestellt werden:
	 * ```
	 * [
	 *   {
	 *     text: "Anzeigetext", // Der Text, der angezeigt wird
	 *     value: "eigentlicher_wert", // Der Wert, der im Formular übermittelt wird
	 *     children: [] // Optional für verschachtelte Optionen
	 *   }
	 * ]
	 * ```
	 *
	 * Für Barrierefreiheit und optimale Nutzung beachten Sie:
	 * - Begrenzen Sie die Anzahl der Optionen für bessere Leistung
	 * - Stellen Sie sicher, dass jede Option eindeutige Werte hat
	 *
	 * @param {Array} structuredData - Array von Option-Objekten im erforderlichen Format
	 * @public
	 */
	setOptions(structuredData) {
		try {
			if (!structuredData) {
				console.warn("Cannot set options: No data provided");
				return;
			}
			this._optionItems = structuredData;
			this._originalOptionItems = structuredData;
			this._showOptions = true;
		} catch (error) {
			console.error("Error setting options:", error);
		}
	}

	/**
	 * Click Event on combobox when this.toggleButton is true
	 * @private
	 */
	_handleClick() {
		if (this.toggleButton && !this.disabled) {
			try {
				this._toggleOptions?.();
			} catch (error) {
				console.error("Error handling click:", error);
			}
		}
	}

	_handleInput(e) {
		if (!this.disabled) {
			try {
				if (!e || !e.target) return;
				// Mark as interacted
				this._hasInteracted = true;
				// Use _setValue for value updating
				this._setValue(e.target.value);
				// Validate using ErrorStateController if available
				if ((this.validate || this.showErrors) && this._hasInteracted) {
					if (this._errorController && this._errorController instanceof ErrorStateController) {
						this._errorController.validate();
					} else {
						this.checkValidity();
					}
				}
				// Update form value
				this._updateFormValue();
				dispatchCustomEvent(this, 'input', { value: this.value, target: e.target });
			} catch (error) {
				console.error("Error handling input:", error);
			}
		}
	}

	_handleChange(e) {
		if (!this.disabled) {
			try {
				if (!e || !e.target) return;

				// Log change event
				console.log("Change event triggered:", e.target.value);

				this._setValue(e.target.value || '');

				// Update form value
				this._updateFormValue();

				dispatchCustomEvent(this, 'change', {
					value: this.value,
					target: e.target
				});
			} catch (error) {
				console.error("Error handling change:", error);
			}
		}
	}

	_handleBlur(e) {
		if (!this.disabled) {
			try {
				// Mark as interacted
				this._hasInteracted = true;
				// Validate on blur using centralized error handling
				if (this.validate && this._hasInteracted) {
					if (this._errorController && this._errorController instanceof ErrorStateController) {
						this._errorController.validate();
					} else {
						this.checkValidity();
					}
				}
				dispatchCustomEvent(this, 'blur', { value: this.value, target: e?.target });
			} catch (error) {
				console.error("Error handling blur:", error);
			}
		}
	}

	_handleFocus(e) {
		if (!this.disabled) {
			try {
				// Dispatch custom event
				dispatchCustomEvent(this, 'focus', {
					value: this.value,
					target: e?.target
				});
			} catch (error) {
				console.error("Error handling focus:", error);
			}
		}
	}

	_handleKeyDown(e) {
		if (!this.disabled) {
			try {
				if (!e) return;

				// Dispatch custom event
				dispatchCustomEvent(this, 'keydown', {
					value: this.value,
					key: e.key,
					target: e.target
				});
			} catch (error) {
				console.error("Error handling keydown:", error);
			}
		}
	}

	_handleKeyUp(e) {
		if (!this.disabled) {
			try {
				if (!e) return;

				// Dispatch custom event
				dispatchCustomEvent(this, 'keyup', {
					value: this.value,
					key: e.key,
					target: e.target
				});
			} catch (error) {
				console.error("Error handling keyup:", error);
			}
		}
	}

	/**
	 * Resets the component to its initial state
	 * @public
	 */
	reset() {
		try {
			// Store the original value for reference (may be empty or undefined)
			const originalValue = this.value;

			// First set value to empty to ensure clean slate
			this._setValue('');

			// Then restore initial value if it existed
			if (this._initialValue !== undefined) {
				this._setValue(this._initialValue);
			}

			// Ensure the native input is updated
			const inputElement = this.shadowRoot?.querySelector('input');
			if (inputElement) {
				inputElement.value = this.value || '';

				// Force a DOM update to ensure the input has the correct value
				// This helps with frameworks like React or when browser keeps outdated value
				setTimeout(() => {
					if (inputElement) {
						inputElement.value = this.value || '';
					}
				}, 0);
			}

			// Clear error states using the controller
			this._errorController.clearError();

			// Update form value
			this._updateFormValue();

			// Dispatch change event with reset flag
			dispatchCustomEvent(this, "change", {
				value: this.value,
				isReset: true,
				previousValue: originalValue
			});
		} catch (error) {
			console.error('Error in wm-input reset method:', error);
		}
	}

	/**
	 * Reset the component to its initial state (called by forms)
	 */
	formResetCallback() {
		try {
			super.formResetCallback?.();
			// Use the public reset method
			this.reset();

			// Additional cleanup for edge cases
			setTimeout(() => {
				const inputElement = this.shadowRoot?.querySelector('input');
				if (inputElement && inputElement.value !== (this.value || '')) {
					inputElement.value = this.value || '';
					// Force a synthetic input event to ensure value propagation
					inputElement.dispatchEvent(new Event('input', { bubbles: true }));
				}
			}, 10);
		} catch (error) {
			console.error('Error in wm-input formResetCallback:', error);
		}
	}

	/**
	 * Public method to set the input value programmatically
	 * This ensures all side effects are properly triggered
	 *
	 * @param {string} value - The new value to set
	 * @param {Object} options - Additional options
	 * @param {boolean} options.validate - Whether to validate after setting (default: true)
	 * @param {boolean} options.silent - Whether to skip dispatching events (default: false)
	 * @public
	 * @returns {string} The new value
	 */
	setValue(value, options = {}) {
		const shouldValidate = options.validate !== false;
		const isSilent = options.silent === true;

		// Store original value for event
		const previousValue = this.value;

		// Set the value using the internal method
		this._setValue(value !== undefined ? value : '');

		// Validate if needed (and not disabled)
		if (shouldValidate && !this.disabled) {
			this._errorController.validate();
		}

		// Dispatch events if not silent
		if (!isSilent) {
			dispatchCustomEvent(this, 'change', {
				value: this.value,
				previousValue,
				isProgrammatic: true
			});
		}

		return this.value;
	}

	/**
	 * Sets or removes disabled state
	 * @param {boolean} isDisabled - Whether the component should be disabled
	 * @public
	 */
	setDisabled(isDisabled) {
		this.disabled = Boolean(isDisabled);
		// Ensure appropriate UI updates
		this.requestUpdate();
	}

	/**
	 * Forces validation of the component
	 * @returns {string} Error message if invalid, empty string if valid
	 * @public
	 */
	validateField() {
		return this.checkValidity();
	}

	/**
	 * Explicitly forces the component to update its UI state
	 * @public
	 */
	updateUI() {
		this.requestUpdate();
	}

	/**
	 * Helper to ensure proper value setting with all necessary side effects
	 * @param {string} newValue - Value to set
	 * @private
	 */
	_setValue(newValue) {
		// Update component value
		this.value = newValue || '';

		// Update native input if available
		const inputElement = this._inputElement || this.shadowRoot?.querySelector('input');
		if (inputElement && inputElement.value !== this.value) {
			inputElement.value = this.value;
		}

		// Store for reset functionality if not defined yet
		if (this.defaultValue === undefined) {
			this.defaultValue = this.value;
		}

		// Update form value if form association is enabled
		this._updateFormValue();
	}

	checkValidity() {
		try {
			// Perform direct validation without the controller to avoid circular references
			const errorMessage = this._validateWithoutController();

			// Update internal state first
			this.hasError = !!errorMessage;
			this.error = errorMessage || "";

			// Then update the controller state if available
			// This is important: only update the controller if we're not being called FROM the controller
			if (this._errorController && !this._errorController._isValidating) {
				if (errorMessage) {
					this._errorController.setError(errorMessage);
				} else {
					this._errorController.clearError();
				}
			}

			// Return the error message or an empty string if valid
			return errorMessage || "";
		} catch (error) {
			console.error("Error checking validity:", error);
			return this.errormessage || "Validierungsfehler";
		}
	}

	// Forward setCustomValidity to underlying native input
	setCustomValidity(message) {
		try {
			const inputElement = this.shadowRoot?.querySelector('input');
			if (inputElement && typeof inputElement.setCustomValidity === 'function') {
				inputElement.setCustomValidity(message || '');

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

	// Forward reportValidity to underlying native input
	reportValidity() {
		try {
			const inputElement = this.shadowRoot?.querySelector('input');
			return inputElement && typeof inputElement.reportValidity === 'function' ?
				inputElement.reportValidity() : true;
		} catch (error) {
			console.error("Error reporting validity:", error);
			return false;
		}
	}

	/**
	 * Combobox-Optionen ausblenden
	 *
	 * Schließt das Dropdown der Combobox-Optionen.
	 * In Verbindung mit benutzerdefinierten Ereignishandlern nützlich.
	 *
	 * @public
	 */
	// hideOptions() {
	// 	try {
	// 		if (this._originalType === 'combobox') {
	// 			this._showOptions = false;
	// 		}
	// 	} catch (error) {
	// 		console.error("Error hiding options:", error);
	// 	}
	// }

	/**
	 * Combobox-Optionen umschalten
	 *
	 * Schaltet die Sichtbarkeit des Dropdown-Menüs der Combobox um.
	 * Dies wird intern verwendet, wenn der Benutzer auf den Toggle-Button klickt.
	 *
	 * @private
	 */
	_toggleOptions() {
		try {
			if (this._originalType === 'combobox') {
				this._showOptions = !this._showOptions;
			}
		} catch (error) {
			console.error("Error toggling options:", error);
		}
	}

	/**
	 * Cancel search/reset filtering state when Escape is pressed.
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
	 * Liste in Combobox verbergen
	 * @param {Boolean} setFocus Fokus auf Input legen (true)
	 */
	hideOptions(setFocus = true) {
		try {
			this._showOptions = false;
			if (setFocus) {
				// Use _inputElement instead of _input
				if (this._inputElement) {
					this._inputElement.focus();
				}
			}
		} catch (error) {
			console.error("Error hiding options:", error);
		}
	}

	updated(changedProperties) {
		try {
			super.updated?.(changedProperties);

			// Avoid unnecessary updates by checking specific properties
			if (changedProperties.has('disabled') && !this.disabled) {
				this._errorController.clearError();
				const inputElement = this._inputElement || this.shadowRoot?.querySelector('input');
				if (inputElement) {
					inputElement.removeAttribute('aria-invalid');
					inputElement.setCustomValidity("");
					if (inputElement.value !== this.value) {
						inputElement.value = this.value || '';
					}
				}
			}

			if (changedProperties.has('value')) {
				this._updateFormValue();
			}
		} catch (error) {
			console.error("Error in updated lifecycle method:", error);
		}
	}

	render() {
		try {
			let ids = "";
			if (this._hasHint) {
				ids += "hint";
			}
			if (this.hasError) {
				ids += " error-message";
			}
			return this._renderElement(x`
				<input
					type="${this.type || 'text'}"
					autocomplete=${o(this.autocomplete)}
					pattern="${o(this.pattern)}"
					aria-describedby="${o(ids !== "" ? ids : undefined)}"
					aria-disabled="${o(this.disabled ? true : undefined)}"
					aria-invalid="${o(this.hasError ? true : undefined)}"
					placeholder="${o(this.placeholder)}"
					?required=${this.required}
					?multiple=${this.multiple}
					maxlength="${o(this.maxlength)}"
					id="${this._formId || ''}"
					.value=${this.value || ''}
					@input="${this.disabled ? undefined : this._handleInput}"
					@blur="${this.disabled ? undefined : this._handleBlur}"
					@focus="${this.disabled ? undefined : this._handleFocus}"
					@change="${this.disabled ? undefined : this._handleChange}"
					@keydown="${this.disabled ? undefined : this._handleKeyDown}"
					@keyup="${this.disabled ? undefined : this._handleKeyUp}"
					?disabled=${this.disabled}
					@click="${this.disabled ? undefined : this._handleClick}"
					role="${o(
						this._originalType === "combobox" ? "combobox" : undefined
					)}"
					aria-expanded="${o(
						this._originalType === "combobox" ? this._showOptions : undefined
					)}"
					aria-activedescendant="${o(
						this._highlightedOptionID ? this._highlightedOptionID : undefined
					)}"
					aria-owns="${o(
						this._originalType === "combobox" ? "options" : undefined
					)}"
					aria-controls="${o(
						this._originalType === "combobox" ? "options" : undefined
					)}"
					part="input"
				/>
				${n(
					this._originalType === "password",
					() => x`
						<wm-button
							kind="clean"
							class="password-button"
							@click="${this.disabled ? undefined : this._showPassword}"
							?disabled=${this.disabled}
						>
							<button
								aria-pressed="${this._passwordVisible ? "true" : "false"}"
								type="button"
								?disabled=${this.disabled}
							>
								<wm-icon iconid="${this._passwordVisible ? "hide" : "show"}">
									Info anzeigen
								</wm-icon>
							</button>
						</wm-button>
					`
				)}
				${n(
					this.toggleButton,
					() => x`
						<wm-button
							kind="clean"
							class="input-button"
							@click="${this.disabled ? undefined : this._toggleOptions}"
							?disabled=${this.disabled}
						>
							<button
								aria-pressed="${this._showOptions ? "true" : "false"}"
								type="button"
								?disabled=${this.disabled}
							>
								<wm-icon
									iconid="${this._showOptions ? "chevron-up" : "chevron-down"}"
								>
									Vorschläge zeigen
								</wm-icon>
							</button>
						</wm-button>
					`
				)}
			`);
		} catch (error) {
			console.error("Error rendering input component:", error);
			return x`<div>Error rendering component</div>`;
		}
	}

	/**
	 * Shows an error message for this input
	 * @param {string} message - The error message to display
	 */
	showError(message) {
		if (this._errorController && this._errorController instanceof ErrorStateController) {
			this._errorController.setError(message);
		}
	}

	/**
	 * Clears any error state from this input
	 */
	clearError() {
		if (this._errorController && this._errorController instanceof ErrorStateController) {
			this._errorController.clearError();
		}
	}

	/**
	 * Override _performValidation from FormStateManager to use ErrorStateController
	 * @protected
	 */
	_performValidation() {
		// Skip validation entirely if the component is disabled
		if (this.disabled === true) return "";

		const errorMsg = this._validateWithoutController();

		if (errorMsg) {
			this._errorController.setError(errorMsg);
		} else {
			this._errorController.clearError();
		}

		return errorMsg;
	}

	/**
	 * Validation method that doesn't use the controller to avoid circular references
	 * @private
	 * @returns {string} Error message or empty string if valid
	 */
	_validateWithoutController() {
		try {
			// Skip validation if disabled
			if (this.disabled) return "";

			const inputElement = this.shadowRoot?.querySelector('input');
			if (!inputElement) return "";

			// Clear any existing custom validity
			inputElement.setCustomValidity("");

			let errorMsg = "";

			// Only validate if the user has interacted with the field OR showErrors is true
			if (this._hasInteracted || this.showErrors) {
				// First check required constraint
				if (this.required && (!this.value || this.value.trim() === "")) {
					errorMsg = this.errormessage || "Dieses Feld ist erforderlich";
				}
				// Then check pattern constraint if a pattern is specified
				else if (this.pattern && this.value && !new RegExp(this.pattern).test(this.value)) {
					errorMsg = this.errormessage || "Bitte geben Sie einen Wert im erforderlichen Format ein";
				}
				// Finally, check custom validator function if provided
				else if (typeof this.validator === 'function' && this.value) {
					// Call validator with the current value
					const validatorResult = this.validator(this.value);

					// If validator returns a non-empty string, it's an error message
					if (validatorResult && typeof validatorResult === 'string') {
						errorMsg = validatorResult;
					}
				}

				// Set validity state on the native input element if we have an error
				if (errorMsg && inputElement && typeof inputElement.setCustomValidity === 'function') {
					inputElement.setCustomValidity(errorMsg);
				}
			}

			return errorMsg;
		} catch (error) {
			console.error("Error validating input:", error);
			return this.errormessage || "Validierungsfehler";
		}
	}
}

customElements.define("wm-input", Input);

const tagName = "wm-input";

export { Input, tagName };
