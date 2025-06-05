/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { FormText } from '../misc/form-text.js';
import { f as formItemStyles } from '../../form-item.styles-a1cceb44.js';
import { f as formStyles } from '../../form.styles-a2bd9acf.js';
import { o } from '../../if-defined-4084517f.js';
import { debounce, dispatchCustomEvent } from '../misc/utils.js';
import { FormStateManager } from '../misc/form-state-manager.js';
import { ErrorStateController } from '../misc/error-state-controller.js';
import { g as globalCSS } from '../../wiener-melange.bundle.min-0e2d13dc.js';
import '../misc/form-item.js';
import '../../when-55b3d1d8.js';
import '../../class-map-68392fb3.js';
import '../../directive-4c65af6a.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../misc/form-wrapper.js';
import '../misc/slot.js';
import '../misc/error-tracking.js';
import '../misc/formValidation.js';
import '../misc/shared-info.js';

const globalStyles = new CSSStyleSheet();
globalStyles.replaceSync(globalCSS);

// Use FormStateManager for consistent form behavior
class Select extends FormStateManager(FormText(s)) {
	static properties = {
		...super.properties,
		multiple: { type: Boolean },
		size: { type: Number },
		type: { type: String, reflect: true },
		disabled: { type: Boolean, reflect: true },
		errormessage: { type: String, attribute: "errormessage" },
		summaryErrormessage: { type: String, attribute: "summary-errormessage" },
		hasError: { type: Boolean, reflect: true },
		error: { type: String },
		options: { type: String },
		values: { type: String },
		selected: { type: String, reflect: true },
		validate: { type: Boolean, reflect: true },
		showErrors: { type: Boolean, reflect: true },
		_parsedOptions: { state: true },
		_optionsCache: { state: true },
		_lastOptionsSignature: { state: true },
		_debounceTimer: { state: true },
		_initialSelectedValues: { state: true },
		disabledoptions: { type: String }
	};

	static styles = [globalStyles, formItemStyles, formStyles];

	constructor() {
		super();

		/**
		 * @type {Number} - Anzahl der sichtbaren Optionen
		 */
		this.size = undefined;

		/**
		 * @type {Boolean} - Mehrere Auswählbar
		 */
		this.multiple = false;

		/**
		 * @type {'select'} - Art des Eingabefelds
		 * @private
		 */
		this.type = "select";

		/**
		 * @type {Boolean} - Gibt an, ob das Element deaktiviert ist oder nicht
		 */
		this.disabled = false;

		/**
		 * @type {String} - Fehlermeldung bei ungültiger Eingabe
		 * Diese Meldung wird direkt am Select-Element angezeigt, wenn es validiert wird und ungültig ist.
		 */
		this.errormessage = "";

		/**
		 * @type {String} - Spezifische Fehlermeldung für die Fehlerübersicht
		 * Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
		 * Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
		 * Fehlermeldungen anzuzeigen, z.B. "Bitte wählen Sie eine Option bei 'Personendaten-Typ - Art des Antrags'"
		 * statt nur "Auswahl erforderlich".
		 */
		this.summaryErrormessage = "";

		/**
		 * @type {Boolean} - Gibt an, ob das Element einen Fehler hat
		 */
		this.hasError = false;

		/**
		 * @type {String} - Aktuelle Fehlermeldung
		 */
		this.error = "";

		/**
		 * @type {Boolean} - Aktiviert die Validierung bei Eingabe
		 */
		this.validate = false;

		/**
		 * @type {Boolean} - Sofortige Fehleranzeige
		 */
		this.showErrors = false;

		/**
		 * @type {String} - Semikolon-getrennte Liste von Optionsbeschriftungen
		 */
		this.options = "";

		/**
		 * @type {String} - Semikolon-getrennte Liste von Optionswerten
		 */
		this.values = "";

		/**
		 * @type {String} - Semikolon-getrennte Liste von vorausgewählten Werten
		 */
		this.selected = "";

		/**
		 * @type {String} - Semikolon-getrennte Liste von deaktivierten Optionen (true/false)
		 * @deprecated Use 'disabled="true;false;true"' syntax instead
		 */
		this.disabledoptions = "";

		/**
		 * @private
		 * @type {Array} - Geparste Optionselemente
		 */
		this._parsedOptions = [];

		/**
		 * @type {Array|String} - Aktueller Wert des Select-Elements
		 */
		this.value = this.multiple ? [] : '';

		/**
		 * @private
		 * @type {Object} - Cache für generierte Optionen
		 */
		this._optionsCache = {};

		/**
		 * @private
		 * @type {String} - Signatur der letzten Optionen für Änderungserkennung
		 */
		this._lastOptionsSignature = '';

		/**
		 * @private
		 * @type {Function} - Debounced Funktion zur Verzögerung des Change-Events
		 */
		this._debouncedDispatchChange = debounce((value) => {
			dispatchCustomEvent(this, "change", { value });
		}, 200);

		/**
		 * @private
		 * @type {Array|String} - Initial ausgewählte Werte für die Zurücksetzfunktionalität
		 */
		this._initialSelectedValues = this.multiple ? [] : '';

		/**
		 * @private
		 * @type {Object} - Error-Controller für zentralisierte Fehlerbehandlung
		 */
		this._errorController = new ErrorStateController(this);
	}

	/** @private */
	get _selectElement() {
		return this.shadowRoot?.querySelector("select") ?? null;
	}

	/**
	 * Called when the element is connected to the DOM
	 * @override
	 * @private
	 */
	async connectedCallback() {
		super.connectedCallback();

		// Apply any disabledoptions attribute (legacy support)
		if (this.hasAttribute('disabledoptions')) {
			this.disabledoptions = this.getAttribute('disabledoptions');
		}

		// Store initial 'selected' attribute if it exists
		if (this.hasAttribute('selected')) {
			const selectedAttr = this.getAttribute('selected');
			// Store in _initialSelectedValues for reset functionality
			if (this.multiple) {
				this._initialSelectedValues = selectedAttr ? selectedAttr.split(';').map(s => s.trim()) : [];
			} else {
				this._initialSelectedValues = selectedAttr || '';
			}
		}

		// Parse options on connection
		this._parseOptionsFromAttributes();

		// Defer setup to ensure DOM is ready - using Promise instead of setTimeout
		await Promise.resolve();

		if (this._selectElement) {
			// Setup invalid event handler using ErrorStateController
			const setupInvalidHandler = () => {
				this._selectElement.addEventListener('invalid', (e) => {
					e.preventDefault();
					const errorMsg = this.errormessage || "Bitte wählen Sie eine Option aus";
					this._errorController.setError(errorMsg);
					setTimeout(() => setupInvalidHandler(), 0);
				}, { once: true });
			};
			setupInvalidHandler();

			// Regular input validation handler
			this._selectElement.addEventListener('input', () => {
				if (this.validate || this.showErrors) {
					this.checkValidity();
				}
			});
		}
	}

	/**
	 * Generiert eine eindeutige Signatur basierend auf den aktuellen Optionen und Werten
	 * @private
	 * @returns {String} Eindeutige Signatur
	 */
	_getOptionsSignature() {
		return `${this.options || ''}::${this.values || ''}`;
	}

	/**
	 * Parst die deaktivierten Optionen aus dem Attribut
	 * @private
	 * @returns {Array<Boolean>} Array mit Wahrheitswerten für deaktivierte Optionen
	 */
	_parseDisabledOptions() {
		// Check for disabledoptions attribute (for per-option disabling)
		if (this.hasAttribute('disabledoptions')) {
			const disabledOptionsStr = this.getAttribute('disabledoptions');
			if (disabledOptionsStr) {
				return disabledOptionsStr.split(';').map(val => val.trim().toLowerCase() === 'true');
			}
		}

		return [];
	}

	/**
	 * Parst die Optionen, Werte und ausgewählten Attribute, um Optionselemente zu erstellen
	 * @private
	 */
	_parseOptionsFromAttributes() {
		// Signatur der aktuellen Optionen generieren
		const currentSignature = this._getOptionsSignature();

		// Wenn die Signatur gleich geblieben ist und wir bereits Options haben, nicht neu parsen
		if (currentSignature === this._lastOptionsSignature && this._parsedOptions.length > 0) {
			return;
		}

		// Prüfen, ob wir diese Optionen bereits im Cache haben
		if (this._optionsCache[currentSignature]) {
			// Aus dem Cache verwenden
			this._parsedOptions = this._optionsCache[currentSignature].map(opt => opt.cloneNode(true));
			this._lastOptionsSignature = currentSignature;
			return;
		}

		// Parse options and values
		const optionLabels = this.options ? this.options.split(';').map(o => o.trim()) : [];
		const optionValues = this.values ? this.values.split(';').map(v => v.trim()) : [];
		const selectedValues = this.selected ? this.selected.split(';').map(s => s.trim()) : [];

		// Get per-option disabled states
		const disabledOptions = this._parseDisabledOptions();

		// Generate component ID if none exists (for debugging)
		const componentId = this.id || `select-${Math.random().toString(36).substring(2, 9)}`;

		// Determine how many options to create based on the longer array
		const optionCount = Math.max(optionLabels.length, optionValues.length);

		// Create option elements
		const optionElements = [];
		let anySelected = false; // Track if any option was marked as selected

		for (let i = 0; i < optionCount; i++) {
			const option = document.createElement('option');

			// Use value from values array if available, otherwise use the label
			if (i < optionValues.length && optionValues[i]) {
				option.value = optionValues[i];
			} else if (i < optionLabels.length) {
				option.value = optionLabels[i];
			}

			// Set the text content to the label or value if no label
			option.textContent = i < optionLabels.length ? optionLabels[i] : option.value;

			// Apply disabled state if specified - use per-option disabling or global disabled
			if (this.disabled) {
				// If the whole select is disabled, disable all options
				option.disabled = true;
			} else if (i < disabledOptions.length) {
				// Otherwise, use per-option disabled states if available
				option.disabled = disabledOptions[i];
			}

			// Mark as selected if in selectedValues
			if (this.multiple) {
				// For multiple selects, check if the value is in the selectedValues array
				if (selectedValues.includes(option.value)) {
					option.selected = true;
					anySelected = true;
				}
			} else {
				// For single selects, mark as selected if this value matches the first selected value
				if (selectedValues.length > 0 && option.value === selectedValues[0]) {
					option.selected = true;
					anySelected = true;
				}
			}

			optionElements.push(option);
		}

		// Optionen im Cache speichern (originale Elemente)
		this._optionsCache[currentSignature] = optionElements.map(opt => opt.cloneNode(true));
		this._lastOptionsSignature = currentSignature;
		this._parsedOptions = optionElements;

		// Set values based on selected options
		if (selectedValues.length > 0) {
			// If no option was marked as selected despite having selectedValues,
			// we may have a case of mismatched values - log a warning
			if (!anySelected) {
				console.warn(`Select ${componentId}: None of the selected values ${JSON.stringify(selectedValues)} match available options`);
			}

			if (this.multiple) {
				// Filter selected values to only include those that exist in optionValues
				const validSelectedValues = selectedValues.filter(val =>
					optionValues.includes(val)
				);

				// Store for reset functionality if not already set
				if (!this._initialSelectedValues || !Array.isArray(this._initialSelectedValues) || !this._initialSelectedValues.length) {
					this._initialSelectedValues = [...validSelectedValues];
				}

				this.value = [...validSelectedValues];
			} else {
				// For single select, check if the selected value exists in optionValues
				const validSelectedValue = optionValues.includes(selectedValues[0]) ? selectedValues[0] : '';

				// Store for reset functionality if not already set
				if (!this._initialSelectedValues && this._initialSelectedValues !== '') {
					this._initialSelectedValues = validSelectedValue;
				}

				this.value = validSelectedValue;
			}

			// Clear any existing error state when programmatically setting valid values
			if (this.required) {
				this.clearErrorState();
			}
		} else {
			// Explicitly initialize for empty selections
			if (this.multiple) {
				this.value = [];
			} else {
				this.value = '';
			}
		}
	}

	/**
	 * Aktualisiert das Select-Element mit geparsten Optionen
	 * @private
	 */
	_updateSelectWithParsedOptions() {
		if (!this._selectElement) return;

		// If there are no parsed options, don't update
		if (!this._parsedOptions.length) {
			return;
		}

		// Check if we actually need to update the select options
		const existingOptions = Array.from(this._selectElement.options || []);
		const needsUpdate = existingOptions.length !== this._parsedOptions.length ||
			existingOptions.some((opt, i) =>
				opt.value !== this._parsedOptions[i].value ||
				opt.textContent !== this._parsedOptions[i].textContent
			);

		if (!needsUpdate) {
			this._updateValueState();
			this._updateFormValue();
			return;
		}

		// 1. Clear existing options first
		this._selectElement.innerHTML = "";

		// 2. Append parsed options
		const fragment = document.createDocumentFragment();
		this._parsedOptions.forEach(option => fragment.appendChild(option.cloneNode(true)));
		this._selectElement.appendChild(fragment);

		// 3. Now set the value AFTER options exist
		// Special handling for multi-select
		if (this.multiple && Array.isArray(this.value)) {
			// For multi-select, we must set each option's selected property
			const options = Array.from(this._selectElement.options);
			options.forEach(option => {
				option.selected = this.value.includes(option.value);
			});
		} else if (this.value) {
			// For single select, we can set the value directly
			this._selectElement.value = this.value;
		}

		// 4. Update internal state
		this._updateValueState();
		this._updateFormValue();

		// 5. After updating options, ensure the selection is properly reflected in the DOM
		if (this.value) {
			// For multi-select, check each option
			if (this.multiple && Array.isArray(this.value)) {
				const options = Array.from(this._selectElement.options);
				let needsDispatch = false;

				options.forEach(option => {
					const shouldBeSelected = this.value.includes(option.value);
					if (option.selected !== shouldBeSelected) {
						option.selected = shouldBeSelected;
						needsDispatch = true;
					}
				});

				// Only dispatch if needed
				if (needsDispatch) {
					this._selectElement.dispatchEvent(new Event('change', { bubbles: true }));
				}
			}
			// For single select
			else if (this._selectElement.value !== this.value) {
				this._selectElement.value = this.value;
				this._selectElement.dispatchEvent(new Event('change', { bubbles: true }));
			}
		}
	}

	/**
	 * Update the <option> elements inside the select from light DOM.
	 * Maintained for backward compatibility.
	 * @param {Array<HTMLOptionElement>} newOptions - Array of option elements to add
	 * @public
	 */
	updateOptions(newOptions) {
		const select = this._selectElement;
		if (!select) return;

		// If we have attribute-based options, prioritize those
		if (this._parsedOptions && this._parsedOptions.length > 0) {
			this._updateSelectWithParsedOptions();
			return;
		}

		if (!Array.isArray(newOptions)) return;

		// Clear existing options
		select.innerHTML = "";

		// Append new options
		const fragment = document.createDocumentFragment();
		newOptions.forEach(option => {
			if (option instanceof HTMLOptionElement) {
				fragment.appendChild(option.cloneNode(true));
			}
		});
		select.appendChild(fragment);

		// Update selected value
		this._updateValueState();

		// Dispatch event
		dispatchCustomEvent(this, 'options-updated', {
			options: newOptions,
			value: this.value || ''
		});
	}

	/** @private */
	// Aktualisiert den Wert des Select-Elements basierend auf den aktuellen Optionen und dem ausgewählten Wert
	_updateValueState() {
		if (!this._selectElement) return;

		if (this.multiple) {
			if (!Array.isArray(this.value)) {
				this.value = typeof this.value === 'string' && this.value ? [this.value] : [];
			}

			Array.from(this._selectElement.options).forEach(opt => {
				if (opt && opt.value) {
					opt.selected = this.value.includes(opt.value);
				}
			});
		} else {
			if (this.value === undefined || this.value === null) {
				this.value = "";
			}
		}

		// Fehlerstatus nur einmal prüfen & zurücksetzen
		if (this.required && this.value.length > 0 && this.hasError) {
			this.clearErrorState();
		}
	}

	/**
	 * Called when the element's first update is complete
	 * @param {Map} changedProperties - Map of changed properties
	 * @override
	 * @protected
	 */
	firstUpdated(changedProperties) {
		super.firstUpdated?.(changedProperties);

		// Check for attribute-based options first
		if (this.options || this.values) {
			// Ensure options are parsed
			if (!this._parsedOptions.length) {
				this._parseOptionsFromAttributes();
			}

			// Update the select with parsed options
			this._updateSelectWithParsedOptions();
		} else {
			// Fall back to slotted content for backward compatibility
			const options = Array.from(this.children || []).filter(
				child => child && !child.hasAttribute("slot")
			);

			// Determine initial selection by explicitly looking for selected attribute on options
			const selectedOptions = Array.from(options)
				.filter(opt => opt && opt.hasAttribute('selected'))
				.map(opt => opt.value)
				.filter(Boolean);

			if (selectedOptions.length > 0) {
				// Important: Set this as both the value and internal selected state
				if (this.multiple) {
					this.value = [...selectedOptions];
					this.selected = selectedOptions.join(';');
				} else {
					this.value = selectedOptions[0];
					this.selected = selectedOptions[0];
				}

				// Store for reset functionality
				if (this.multiple) {
					this._initialSelectedValues = [...selectedOptions];
				} else {
					this._initialSelectedValues = selectedOptions[0];
				}
			} else if (this.hasAttribute('value')) {
				const valueAttr = this.getAttribute('value');

				if (this.multiple && valueAttr) {
					const valueArray = valueAttr.includes(';') ?
						valueAttr.split(';').map(v => v.trim()).filter(Boolean) :
						[valueAttr];

					this.value = valueArray;
					this.selected = valueArray.join(';');
				} else {
					this.value = valueAttr;
					this.selected = valueAttr;
				}
			}
			// Handle 'selected' attribute separately even when no options/values are set
			else if (this.hasAttribute('selected') && !this.value) {
				const selectedAttr = this.getAttribute('selected');
				const selectedValues = selectedAttr ? selectedAttr.split(';').map(s => s.trim()) : [];

				if (selectedValues.length > 0) {
					if (this.multiple) {
						this.value = [...selectedValues];
						// selected attr should already be set
					} else {
						this.value = selectedValues[0];
						// selected attr should already be set
					}
				}
			}

			// Update options in shadow DOM
			this.updateOptions(options);
		}

		// Store initial selection values if not already set
		if (this.multiple) {
			if (!this._initialSelectedValues || !Array.isArray(this._initialSelectedValues) || !this._initialSelectedValues.length) {
				this._initialSelectedValues = Array.isArray(this.value) ? [...this.value] : [];
			}
		} else {
			if (this._initialSelectedValues === undefined) {
				this._initialSelectedValues = this.value || '';
			}
		}

		// Set initial form value
		this._updateFormValue();

		// If no explicit selection was made, select first non-disabled option with non-empty value
		if (!this.value && this._selectElement && this._selectElement.options.length) {
			for (let i = 0; i < this._selectElement.options.length; i++) {
				const option = this._selectElement.options[i];
				if (!option.disabled && option.value) {
					this.value = option.value;
					this._selectElement.value = option.value;

					// Clear any error state since we've selected a valid option
					this.clearErrorState();
					break;
				}
			}
		}

		// Force UI synchronization after initialization
		setTimeout(() => {
			this._syncUIWithValue();
		}, 0);
	}

	/**
	 * Updates the form value with the current selection(s)
	 * @private
	 */
	_updateFormValue() {
		if (!this.name) return;

		if (this.multiple && Array.isArray(this.value)) {
			const formData = new FormData();
			this.value.forEach(val => {
				if (val !== undefined && val !== null) {
					formData.append(this.name, val);
				}
			});
			this._internals?.setFormValue(formData);
		} else {
			this._internals?.setFormValue(this.value || '');
		}
	}

	/**
	 * Handles input events from the select element
	 * @param {Event} e - The input event
	 * @private
	 */
	_handleInput(e) {
		if (this.disabled) return;

		const select = this._selectElement;
		if (!select) return;

		// For input events, we maintain the immediate feedback
		dispatchCustomEvent(this, 'input', { value: select.value });
	}

	/**
	 * Handles change events from the select element
	 * @param {Event} e - The change event
	 * @private
	 */
	_handleChange(e) {
		if (this.disabled) return;

		const select = this._selectElement;
		if (!select) return;

		let value;

		if (this.multiple) {
			value = Array.from(select.selectedOptions || [])
				.map(opt => opt?.value || '')
				.filter(Boolean);
		} else {
			value = select.value;
		}

		this.value = value;

		// Update the selected attribute to reflect current selections
		if (this.multiple) {
			this.selected = Array.isArray(value) ? value.join(';') : '';
		} else {
			this.selected = value || '';
		}

		// Important fix: Clear error state immediately when a valid value is selected
		if ((value !== undefined && value !== null) &&
			(value !== '' && (!Array.isArray(value) || value.length > 0))) {
			// Immediately clear any error state - don't wait for validation
			this.clearErrorState();
		} else if (this.validate || this.showErrors) {
			// Only validate if explicitly requested or if empty and required
			this.checkValidity();
		}

		// Update form value
		this._updateFormValue();

		// Update internals validity state
		if (this._internals && this._selectElement) {
			this._internals.setValidity(
				this._selectElement.validity,
				this._selectElement.validationMessage || '',
				this._selectElement
			);
		}

		// Use debounced event dispatch for change events
		// This significantly reduces event spam in multiple selects
		this._debouncedDispatchChange(this.value);
	}

	/**
	 * Handles focus events from the select element
	 * @param {Event} e - The focus event
	 * @private
	 */
	_handleFocus(e) {
		if (this.disabled) return;
		dispatchCustomEvent(this, 'focus', { target: e.target });
	}

	/**
	 * Handles blur events from the select element
	 * @param {Event} e - The blur event
	 * @private
	 */
	_handleBlur(e) {
		if (this.disabled) return;

		// Validate on blur if needed
		if (this.validate || this.showErrors) {
			this.checkValidity();
		}

		dispatchCustomEvent(this, 'blur', { target: e.target });
	}

	/**
	 * Validates the current value against the required constraint
	 * @returns {string} Error message if invalid, empty string if valid
	 * @public
	 */
	checkValidity() {
		try {
			const selectElement = this._selectElement;
			if (!selectElement) return "";

			// Clear previous validation state
			try {
				selectElement.setCustomValidity("");
			} catch (err) {
				console.warn('Error clearing custom validity:', err);
			}

			// Check various validity conditions
			let isValid = true;
			let errorMsg = "";

			// Required check - FIXED: More comprehensive empty value check
			if (this.required) {
				let isEmpty =
					this.value === undefined ||
					this.value === null ||
					this.value === "" ||
					(Array.isArray(this.value) && this.value.length === 0);

				// Check if selected option has empty value (even if this.value isn't empty)
				// This can happen if the option value is non-empty but isn't properly registered
				if (!isEmpty && selectElement.selectedIndex === 0) {
					const firstOption = selectElement.options[0];
					if (firstOption && (!firstOption.value || firstOption.value === "")) {
						isEmpty = true;
					}
				}

				if (isEmpty) {
					errorMsg = this.errormessage || "Bitte wählen Sie eine Option aus";
					isValid = false;
				}
			}

			// Apply appropriate error state using ErrorStateController consistently
			if (!isValid) {
				// Always use the ErrorStateController
				this._errorController.setError(errorMsg);
				return errorMsg;
			} else {
				// Always use the ErrorStateController
				this._errorController.clearError();
				return "";
			}
		} catch (error) {
			console.error('Error in wm-select checkValidity:', error);
			return "";
		}
	}

	/**
	 * Clears the error state of the component
	 * @public
	 */
	clearErrorState() {
		try {
			// Always use the ErrorStateController for consistent behavior
			this._errorController.clearError();

			// Notify parent forms about the validation state change
			dispatchCustomEvent(this, 'valid', { value: this.value });
		} catch (error) {
			console.error('Error in wm-select clearErrorState:', error);
		}
	}

	/**
	 * Shows an error message for this select component
	 * @param {string} message - The error message to display
	 * @public
	 */
	showError(message) {
		this._errorController.setError(message);
	}

	/**
	 * Clears any error state from this select component
	 * @public
	 */
	clearError() {
		this._errorController.clearError();
	}

	/**
	 * Updates the error state synchronization between the component and form association API
	 * @private
	 */
	_synchronizeErrorState(message = '') {
		if (message) {
			this._errorController.setError(message);
		} else {
			this._errorController.clearError();
		}

		// Dispatch appropriate event
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
        try {
            if (!this._selectElement) return "";

            // Skip validation entirely if disabled
            if (this.disabled) return "";

            // Check various validity conditions
            if (this.required) {
                let isEmpty =
                    this.value === undefined ||
                    this.value === null ||
                    this.value === "" ||
                    (Array.isArray(this.value) && this.value.length === 0);

                // Important: Make sure we don't incorrectly flag preselected values as empty
                // This fixes the issue with preselected value="test1" showing error on submit
                if (!isEmpty) {
                    // Double-check if this is a real value and not some edge case
                    const actualValue = Array.isArray(this.value)
                      ? this.value[0]
                      : this.value;

                    // Do any options match this value? If not, it could be a phantom value
                    const hasMatchingOption = Array.from(this._selectElement?.options || [])
                      .some(opt => opt.value === actualValue);

                    // If no options match, consider it empty despite having a value
                    if (!hasMatchingOption) {
                      console.warn(`Select has value "${actualValue}" but no matching option exists`);
                      isEmpty = true;
                    }
                }

                if (isEmpty) {
                    const errorMsg = this.errormessage || "Bitte wählen Sie eine Option aus";

                    // Set error using ErrorStateController
                    this._errorController.setError(errorMsg);

                    return errorMsg;
                }
            }

            // Clear error if validation passes
            this._errorController.clearError();
            return "";
        } catch (error) {
            console.error('Error in Select _performValidation:', error);
            return "";
        }
    }

	reset() {
		try {
			// Restore initial selection state
			if (this.multiple) {
				this.value = Array.isArray(this._initialSelectedValues) ?
					[...this._initialSelectedValues] : [];
			} else {
				// For single select, handle the empty value case specially
				this.value = this._initialSelectedValues || '';

				// If there was no initial selection but we have a first option (like "Please select")
				if (!this.value && this._selectElement && this._selectElement.options && this._selectElement.options.length > 0) {
					// Use the first non-disabled option as the default value after reset
					for (let i = 0; i < this._selectElement.options.length; i++) {
						const option = this._selectElement.options[i];
						if (!option.disabled && option.value) {
							this.value = option.value;
							this._selectElement.value = option.value;
							break;
						}
					}
				}
			}

			// Update the selected attribute to match initial state
			// This ensures the attribute reflects in the DOM
			if (this.multiple) {
				this.selected = Array.isArray(this._initialSelectedValues) ?
					this._initialSelectedValues.join(';') : '';
			} else {
				// For single selects, if there was no initial selection but we defaulted to first option
				if (!this._initialSelectedValues && this.value) {
					this.selected = this.value;
				} else {
					this.selected = this._initialSelectedValues || '';
				}
			}

			// Update the native select element UI - with additional safety checks for React
			if (this._selectElement) {
				if (this.multiple && Array.isArray(this.value)) {
					const options = Array.from(this._selectElement.options || []);
					options.forEach(opt => {
						if (!opt) return;
						try {
							opt.selected = this.value.includes(opt.value);
						} catch (err) {
							console.warn('Error setting option selected state during reset:', err);
						}
					});
				} else {
					// For single select, ensure a value is selected
					try {
						if (this.value) {
							this._selectElement.value = this.value;
						} else if (this._selectElement.options && this._selectElement.options.length > 0) {
							// Default to first option if no value is set
							this._selectElement.selectedIndex = 0;
							this.value = this._selectElement.options[0].value;
						}
					} catch (err) {
						console.warn('Error setting select value during reset:', err);
					}
				}
			}

			// Clear error states using controller
			this._errorController.clearError();

			// Update form value
			this._updateFormValue();

			// Dispatch change event with reset flag
			dispatchCustomEvent(this, "change", {
				value: this.value,
				isReset: true
			});

			// Ensure propagation of selection to visual UI after reset
			setTimeout(() => {
				if (this._selectElement) {
					// For multiple selects, manually set the selected state of each option
					if (this.multiple && Array.isArray(this.value)) {
						const options = Array.from(this._selectElement.options || []);
						options.forEach(opt => {
							if (!opt) return;
							try {
								opt.selected = this.value.includes(opt.value);
							} catch (err) {
								console.warn('Error setting option selected state during reset:', err);
							}
						});
					}

					// Force a change event to ensure UI updates
					this._selectElement.dispatchEvent(new Event('change', { bubbles: true }));
				}
			}, 0);
		} catch (error) {
			console.error('Error in wm-select reset method:', error);
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
				const selectElement = this.shadowRoot?.querySelector('select');
				if (selectElement) {
					// Force a synthetic change event to ensure value propagation
					selectElement.dispatchEvent(new Event('change', { bubbles: true }));
				}
			}, 10);
		} catch (error) {
			console.error('Error in wm-select formResetCallback:', error);
		}
	}

	/**
	 * Called when the element's properties have changed
	 * @param {Map} changedProperties - Map of changed properties
	 * @override
	 * @protected
	 */
	updated(changedProperties) {
		try {
			super.updated(changedProperties);

			// Handle error state changes
			if (changedProperties.has('hasError')) {
				if (this.hasError && this._selectElement) {
					this._selectElement.setAttribute('aria-invalid', 'true');
					const errorMsg = this.error || this.errormessage;
					if (errorMsg && this._selectElement) {
						try {
							this._selectElement.setCustomValidity(errorMsg);
						} catch (err) {
							console.warn('Error setting custom validity for error state:', err);
						}
					}
				} else if (this._selectElement) {
					// Make sure aria-invalid is completely cleared when hasError is false
					this._selectElement.removeAttribute('aria-invalid');
					try {
						this._selectElement.setCustomValidity('');
					} catch (err) {
						console.warn('Error clearing custom validity for no-error state:', err);
					}
				}
			}

			// Handle selected attribute changes
			if (changedProperties.has('selected')) {
				this._handleSelectedAttributeChange();
			}

			// Handle value property changes
			if (changedProperties.has('value') && !changedProperties.has('selected')) {
				// Only process value changes that weren't triggered by selected attribute changes
				this._handleValuePropertyChange(changedProperties.get('value'));
			}

			// Effiziente Verarbeitung von Änderungen an Options-Attributen
			// Nur neu parsen, wenn sich tatsächlich options oder values geändert haben
			const optionsChanged = changedProperties.has('options');
			const valuesChanged = changedProperties.has('values');

			if (optionsChanged || valuesChanged) {
				// Vollständiges Parsing und Update der Optionen
				this._parseOptionsFromAttributes();
				this._updateSelectWithParsedOptions();
			}

			// Handle change in multiple mode - ensure value is always the right type
			if (changedProperties.has('multiple')) {
				// Convert value to proper type based on multiple attribute
				this.value = this.multiple ?
					(Array.isArray(this.value) ? this.value : (this.value ? [this.value] : [])) :
					(Array.isArray(this.value) ? (this.value.length > 0 ? this.value[0] : '') : this.value);

				this._syncUIWithValue();
			}

			// Handle disabled state changes
			if (changedProperties.has('disabled')) {
				// When the entire component is disabled/enabled, update all options
				if (this._selectElement) {
					Array.from(this._selectElement.options).forEach(opt => {
						if (this.disabled) {
							// When component is disabled, disable all options
							opt.disabled = true;
						} else {
							// When enabled, reapply individual option disabled states
							const index = Array.from(this._selectElement.options).indexOf(opt);
							const disabledOptions = this._parseDisabledOptions();
							opt.disabled = index < disabledOptions.length ? disabledOptions[index] : false;
						}
					});
				}
			}

			// Handle disabledoptions attribute changes
			if (changedProperties.has('disabledoptions')) {
				// Only update if the component itself isn't disabled
				if (!this.disabled && this._selectElement) {
					const disabledOptions = this._parseDisabledOptions();
					Array.from(this._selectElement.options).forEach((opt, index) => {
						if (index < disabledOptions.length) {
							opt.disabled = disabledOptions[index];
						}
					});
				}
			}

			// Check for value changes that might resolve validation errors
			if (changedProperties.has('value')) {
				const isValid = this.required ?
					(this.multiple ? (Array.isArray(this.value) && this.value.length > 0) : !!this.value) :
					true;

				if (isValid && this.hasError) {
					this.clearErrorState();
				}
			}
		} catch (error) {
			console.error('Error in wm-select updated lifecycle:', error);
		}
	}

	/**
	 * Called when the element is disconnected from the DOM
	 * @override
	 * @protected
	 */
	disconnectedCallback() {
		// Clean up any potentially pending timeouts
		if (this._debouncedDispatchChange && typeof this._debouncedDispatchChange.cancel === 'function') {
			this._debouncedDispatchChange.cancel();
		}

		super.disconnectedCallback?.();
	}

	/**
	 * The hidden slot prevents duplicate display of options in the DOM.
	 * Option elements are slotted in the light DOM for API access
	 * but rendered only in the shadow DOM's select element.
	 */
	render() {
		return this._renderElement(x`
			<select
				id="${this._formId}"
				name="${o(this.name)}"
				size="${o(this.size !== undefined ? Number(this.size) : undefined)}"
				?required=${this.required}
				?multiple=${this.multiple}
				aria-disabled="${o(this.disabled ? true : undefined)}"
				@input="${this._handleInput}"
				@blur="${this._handleBlur}"
				@focus="${this._handleFocus}"
				@change="${this._handleChange}"
				?disabled=${this.disabled}
				aria-invalid="${o(this.hasError ? true : undefined)}"
				part="select"
				>
			</select>
			<slot style="display: none;"></slot>
		`);
	}

	/**
	 * Öffentliche Methode zum programmatischen Setzen des Auswahlwerts
	 * Dies stellt sicher, dass alle Seiteneffekte ordnungsgemäß ausgelöst werden
	 *
	 * @param {string|Array} value - Der neue zu setzende Wert
	 * @param {Object} options - Zusätzliche Optionen
	 * @param {boolean} options.validate - Ob nach dem Setzen validiert werden soll (Standard: true)
	 * @param {boolean} options.silent - Ob das Versenden von Events übersprungen werden soll (Standard: false)
	 * @public
	 * @returns {string|Array} Der neue Wert
	 */
	setValue(value, options = {}) {
		const shouldValidate = options.validate !== false;
		const isSilent = options.silent === true;

		// Store original value for event
		const previousValue = this.value;

		// Handle multiple vs single select
		if (this.multiple) {
			this.value = Array.isArray(value) ? [...value] : (value ? [value] : []);
		} else {
			this.value = value !== undefined ? value : '';
		}

		// Update the selected attribute to reflect current selections
		if (this.multiple) {
			this.selected = Array.isArray(this.value) ? this.value.join(';') : '';
		} else {
			this.selected = this.value || '';
		}

		// Update the native select element if available
		if (this._selectElement) {
			if (this.multiple && Array.isArray(this.value)) {
				// For multi-select, we must set each option's selected property
				Array.from(this._selectElement.options).forEach(option => {
					option.selected = this.value.includes(option.value);
				});
			} else {
				// For single select, we can set the value directly
				this._selectElement.value = this.value;
			}
		}

		// Update form value
		this._updateFormValue();

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
	 * Setzt oder entfernt den deaktivierten Zustand
	 * @param {boolean} isDisabled - Gibt an, ob die Komponente deaktiviert werden soll
	 * @public
	 */
	setDisabled(isDisabled) {
		this.disabled = Boolean(isDisabled);

		// Update all options if needed
		if (this._selectElement) {
			const disabledOptions = this._parseDisabledOptions();
			Array.from(this._selectElement.options).forEach((opt, index) => {
				opt.disabled = this.disabled ? true : (index < disabledOptions.length ? disabledOptions[index] : false);
			});
		}

		// Ensure appropriate UI updates
		this.requestUpdate();
	}

	/**
	 * Erzwingt die Validierung der Komponente
	 * @returns {string} Fehlermeldung wenn ungültig, leerer String wenn gültig
	 * @public
	 */
	validateField() {
		return this.checkValidity();
	}

	/**
	 * Erzwingt ausdrücklich ein Update des UI-Zustands der Komponente
	 * @public
	 */
	updateUI() {
		// Force select element to reflect current value
		if (this._selectElement) {
			if (this.multiple && Array.isArray(this.value)) {
				Array.from(this._selectElement.options).forEach(option => {
					option.selected = this.value.includes(option.value);
				});
			} else if (this.value) {
				this._selectElement.value = this.value;
			}
		}

		this.requestUpdate();
	}

	/**
	 * Helper method to convert from the selected attribute string to the value property
	 * @private
	 */
	_selectedToValue(selectedStr) {
		if (!selectedStr) return this.multiple ? [] : '';

		const values = selectedStr.split(';').map(s => s.trim());
		return this.multiple ? values : values[0] || '';
	}

	/**
	 * Helper method to convert from value property to selected attribute string
	 * @private
	 */
	_valueToSelected(value) {
		if (this.multiple) {
			return Array.isArray(value) ? value.join(';') : '';
		}
		return value || '';
	}

	/**
	 * Synchronizes the UI with the current value
	 * @private
	 */
	_syncUIWithValue() {
		if (!this._selectElement) return;

		if (this.multiple) {
			// For multi-select, set each option's selected property
			Array.from(this._selectElement.options).forEach(option => {
				option.selected = Array.isArray(this.value) && this.value.includes(option.value);
			});
		} else {
			// For single select, set the value directly
			this._selectElement.value = this.value || '';

			// If the value doesn't match what we set (browser behavior with single selects),
			// find and select the matching option or first option explicitly
			if (this._selectElement.value !== this.value) {
				// Find matching option
				const options = Array.from(this._selectElement.options);
				const matchingOption = options.find(opt => opt.value === this.value);

				if (matchingOption) {
					matchingOption.selected = true;
				} else if (this.value === '' && options.length > 0) {
					// Special handling for empty value - select first option with empty value if exists
					const emptyOption = options.find(opt => !opt.value);
					if (emptyOption) {
						emptyOption.selected = true;
					} else {
						// Default to first option
						this._selectElement.selectedIndex = 0;
					}
				}
			}
		}

		// Update form value
		this._updateFormValue();
	}

	/**
	 * Handle the selected attribute changes specifically
	 * @private
	 */
	_handleSelectedAttributeChange() {
		// Only process if we have the selected attribute
		if (this.hasAttribute('selected')) {
			// Convert from selected attribute to value property
			this.value = this._selectedToValue(this.selected);

			// Store for reset functionality if not already set
			if (this.multiple) {
				if (!this._initialSelectedValues || !Array.isArray(this._initialSelectedValues) || !this._initialSelectedValues.length) {
					this._initialSelectedValues = Array.isArray(this.value) ? [...this.value] : [];
				}
			} else {
				if (!this._initialSelectedValues && this._initialSelectedValues !== '') {
					this._initialSelectedValues = this.value;
				}
			}

			// Update the UI to reflect this change
			this._syncUIWithValue();

			// Dispatch event to notify of the change
			dispatchCustomEvent(this, 'change', {
				value: this.value,
				selected: this.selected,
				source: 'attribute-change'
			});
		}
	}

	/**
	 * Handle value property changes
	 * @private
	 */
	_handleValuePropertyChange(oldValue) {
		// Ensure value has the correct type based on multiple attribute
		if (this.multiple && !Array.isArray(this.value)) {
			this.value = this.value ? [this.value] : [];
		} else if (!this.multiple && Array.isArray(this.value)) {
			this.value = this.value.length > 0 ? this.value[0] : '';
		}

		// Update the selected attribute to match the value
		const newSelected = this._valueToSelected(this.value);
		if (this.selected !== newSelected) {
			this.selected = newSelected;
		}

		// Update the UI
		this._syncUIWithValue();

		// Dispatch change event if value changed externally
		const valueChanged = JSON.stringify(this.value) !== JSON.stringify(oldValue);

		if (valueChanged) {
			dispatchCustomEvent(this, 'change', {
				value: this.value,
				previousValue: oldValue,
				source: 'property-change'
			});
		}
	}
}
customElements.define("wm-select", Select);

const tagName = "wm-select";

export { Select, tagName };
