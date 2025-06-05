/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { FormOption } from '../misc/form-option.js';
import { dispatchCustomEvent } from '../misc/utils.js';
import { n } from '../../when-55b3d1d8.js';
import { SharedInfoMixin } from '../misc/shared-info.js';
import { FormStateManager } from '../misc/form-state-manager.js';
import { processRadioOptions } from '../misc/radio-utils.js';
import { ErrorStateController } from '../misc/error-state-controller.js';
import '../misc/form-wrapper.js';
import '../misc/slot.js';
import '../../class-map-68392fb3.js';
import '../../directive-4c65af6a.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../misc/error-tracking.js';
import '../../form-item.styles-a1cceb44.js';
import '../../form.styles-a2bd9acf.js';
import '../../if-defined-4084517f.js';
import '../../live-ae266325.js';
import '../../wiener-melange.bundle.min-0e2d13dc.js';

// Use the SharedInfoMixin and FormStateManager to provide consistent functionality
const Base = FormStateManager(SharedInfoMixin(FormOption(s)));
class Radio extends Base {
    static properties = {
        ...super.properties,
        hasError: { type: Boolean, reflect: true },
        error: { type: String },
        errormessage: { type: String, attribute: "errormessage" },
        summaryErrormessage: { type: String, attribute: "summary-errormessage" },
        info: { type: String },
        _infoOpen: { type: Boolean },
        checked: { type: String, reflect: true },
        showErrors: { type: Boolean, reflect: true },
        validate: { type: Boolean, reflect: true },
        _initialCheckedValue: { state: true },
        disabled: { type: Boolean, reflect: true },  // global disable only
        disabledoptions: { type: String }            // per-option configuration
    };

    constructor() {
        super();
        /**
         * @type {'radio'} - Art des Eingabefelds
         * @private
         */
        this.type = "radio";

        /**
         * @type {String} - Ausgewählter Wert
         * @private
         */
        this.value = "";

        /**
         * @type {String} - Fehlermeldung bei ungültiger Eingabe
         */
        this.errormessage = "";

        /**
         * @type {String} - Spezifische Fehlermeldung für die Fehlerübersicht
         * Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
         * Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
         * Fehlermeldungen anzuzeigen, z.B. "Bitte wählen Sie eine Option bei 'Zahlungsart'"
         * statt nur "Auswahl erforderlich".
         */
        this.summaryErrormessage = "";

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
         * Wenn auf true gesetzt, werden Auswahländerungen sofort validiert und Fehler angezeigt,
         * ohne auf eine Formularübermittlung zu warten.
         * Wird typischerweise vom übergeordneten wm-form Element gesteuert.
         */
        this.validate = false;

        /**
         * @type {String} - Aktuelle Fehlermeldung
         */
        this.error = "";

        /**
         * @type {String} - Zusätzliche Informationen zum Feld
         */
        this.info = undefined;

        /**
         * @type {Boolean} - Steuerung der Info-Anzeige
         * @private
         */
        this._infoOpen = false;

        /**
         * @type {String} - Ausgewählter Wert (kann über 'checked' Attribut gesetzt werden)
         */
        this.checked = "";

        /**
         * @private
         * @type {String} - Initial checked value for reset functionality
         */
        this._initialCheckedValue = '';

        /**
         * @type {Boolean} - Global disabled state
         */
        this.disabled = false;

        /**
         * @type {String} - Per-option configuration for disabled state
         */
        this.disabledoptions = "";

        // Initialize error controller for centralized error handling
        this._errorController = new ErrorStateController(this);
    }

    connectedCallback() {
        super.connectedCallback?.();

        // Store initial checked value for reliable reset
        if (this.hasAttribute('checked')) {
            this._initialCheckedValue = this.getAttribute('checked');
        }
    }

    updated(changedProperties) {
        super.updated?.(changedProperties);

        // Debug logging to help identify issues
        // console.debug('wm-radio updated:', {
        //     changedProps: Array.from(changedProperties.keys()),
        //     checked: this.checked,
        //     disabled: this.disabled,
        //     values: this.values,
        //     labels: this.labels
        // });

        if (changedProperties.has('checked') && this.checked) {
            // When the checked attribute changes, find the option with matching value
            const values = this.values?.split(';') || [];
            const valueIndex = values.indexOf(this.checked);
            if (valueIndex > -1) {
                // If found, update the value
                this.value = this.checked;
                this._setOptionViaAttributes?.();

                // Store initial value when first set from attributes
                if (!this._initialCheckedValue) {
                    this._initialCheckedValue = this.checked;
                }
            }
        }
    }

    _handleChange(e) {
        const globalDisabled = this.disabled;
        if (globalDisabled) return;

        if (!e || !e.target) return;

        const newValue = e.target.value;
        this.value = newValue || "";
        this.checked = newValue || ""; // Update the checked attribute to reflect the selected value

        if (this.validate || this.showErrors) {
            // Use ErrorStateController for validation
            this.checkValidity();
        }

        this._internals?.setFormValue(this.value);
        dispatchCustomEvent(this, 'change', {
            value: this.value,
            checked: e.target?.checked
        });
    }

    _handleEvent(e) {
        if (!e || !e.target) return;

        // check if the clicked input is disabled.
        if (e.target.disabled) return;
        dispatchCustomEvent(this, e.type, {
            value: this.value,
            target: e.target,
            checked: e.target.checked
        });
        switch(e.type) {
            case 'change': this._handleChange(e); break;
            case 'input': this._handleInput?.(e); break;
            case 'focus': this._handleFocus?.(e); break;
            case 'blur': this._handleBlur?.(e); break;
        }
    }

    /**
     * Validates the current value against constraints
     * @returns {string} Error message if invalid, empty string if valid
     * @public
     */
    checkValidity() {
        let errorMsg = "";
        // Get all radio input elements (assuming they are grouped inside this component)
        const radios = Array.from(this.shadowRoot?.querySelectorAll("input[type='radio']") || []);
        const isChecked = radios.some(radio => radio.checked);

        // Check required validation
        if (this.required && !isChecked) {
            errorMsg = this.errormessage || "Bitte wählen Sie eine Option aus";
            radios.forEach(radio => {
                try {
                    radio.setCustomValidity(errorMsg);
                } catch (err) {
                    console.warn('Error setting radio validity:', err);
                }
            });
        } else {
            radios.forEach(radio => {
                try {
                    radio.setCustomValidity("");
                } catch (err) {
                    console.warn('Error clearing radio validity:', err);
                }
            });
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
     * Shows an error message for this radio component
     * @param {string} message - The error message to display
     * @public
     */
    showError(message) {
        this._errorController.setError(message);
    }

    /**
     * Clears any error state from this radio component
     * @public
     */
    clearError() {
        this._errorController.clearError();
    }

    /**
     * Override _performValidation from FormStateManager
     * @protected
     */
    _performValidation() {
        // Skip validation entirely if the component is disabled
        if (this.disabled === true) return "";

        // Check required validation
        const errorMsg = this.required && !this.value
            ? (this.errormessage || "Bitte wählen Sie eine Option aus")
            : "";

        // Update the native elements' validation state
        if (errorMsg) {
            const radios = this.shadowRoot?.querySelectorAll('input[type="radio"]');
            if (radios) {
                radios.forEach(radio => {
                    try {
                        radio.setCustomValidity(errorMsg);
                    } catch (err) {
                        console.warn('Error setting radio validity in _performValidation:', err);
                    }
                });
            }

            // Set error using ErrorStateController
            this._errorController.setError(errorMsg);
        } else {
            // Clear validation state on all radio buttons
            const radios = this.shadowRoot?.querySelectorAll('input[type="radio"]');
            if (radios) {
                radios.forEach(radio => {
                    try {
                        radio.setCustomValidity("");
                    } catch (err) {
                        console.warn('Error clearing radio validity in _performValidation:', err);
                    }
                });
            }

            // Clear error using ErrorStateController
            this._errorController.clearError();
        }

        return errorMsg;
    }

    /**
     * Resets the component to its initial state
     * @public
     */
    reset() {
        try {
            // Reset to INITIAL values (not empty values)
            const initialValue = this._initialCheckedValue || '';
            this.value = initialValue;
            this.checked = initialValue;

            // Reset UI state - update radio buttons to match initial state
            const items = this.shadowRoot?.querySelectorAll('input[type="radio"]') || [];
            items.forEach(item => {
                if (!item) return;
                // Check the initially checked radio button and uncheck others
                item.checked = (item.value === initialValue);
            });

            // Clear error states using controller
            this._errorController.clearError();

            // Reset internal form state
            this._internals?.setFormValue(this.value);

            // Dispatch change event with reset flag
            dispatchCustomEvent(this, "change", {
                value: this.value,
                checked: !!initialValue,
                isReset: true
            });
        } catch (error) {
            console.error('Error in wm-radio reset method:', error);
        }
    }

    formResetCallback() {
        try {
            super.formResetCallback?.();
            // Use the public reset method
            this.reset();

            // Additional cleanup to ensure full reset
            setTimeout(() => {
                // Force event propagation if needed
                if (this._items && this._items.length) {
                    const selectedItem = Array.from(this._items).find(item => item.value === this.value);

                    if (selectedItem) {
                        dispatchCustomEvent(selectedItem, 'change', {
                            value: selectedItem.value,
                            checked: true,
                            isReset: true
                        });
                    }
                }
            }, 10);
        } catch (error) {
            console.error('Error in wm-radio formResetCallback:', error);
        }
    }

    /**
     * Sets the disabled state of the radio component and all its options
     * @param {boolean} isDisabled - Whether the radio component should be disabled
     * @public
     */
    setDisabled(isDisabled) {
        // Update the global disabled state
        this.disabled = Boolean(isDisabled);

        // Clear error state when disabled
        if (isDisabled) {
            this._errorController.clearError();
        }

        // Update all radio buttons
        const radios = this.shadowRoot?.querySelectorAll('input[type="radio"]');
        if (radios) {
            radios.forEach(radio => {
                if (isDisabled) {
                    radio.setAttribute('disabled', '');
                } else {
                    // When enabling, respect individual option's disabled state
                    const optValue = radio.value;
                    const disabledOptions = (this.disabledoptions || '').split(';').filter(Boolean);
                    const isOptionDisabled = disabledOptions.includes(optValue);

                    if (isOptionDisabled) {
                        radio.setAttribute('disabled', '');
                    } else {
                        radio.removeAttribute('disabled');
                    }
                }
            });
        }

        // Dispatch event
        dispatchCustomEvent(this, 'disabled-changed', {
            disabled: this.disabled
        });
    }

    /**
     * @private
     * Set options via attributes with enhanced error handling
     */
    _setOptionViaAttributes() {
        if (!this.labels) return;

        try {
            // Use the processRadioOptions utility to safely generate options
            const rawDisabled = this.getAttribute('disabledoptions') || ""; // now uses disabledoptions
            let options = processRadioOptions({
                labels: this.labels,
                values: this.values,
                disabled: rawDisabled, // pass raw value so it’s parsed into an array
                type: 'radio',
                checked: this.checked
            });

            // If the component is globally disabled, override all option disabled states to true
            if (this.disabled) {
                options = options.map(opt => ({ ...opt, disabled: true }));
            }

            // Update component options
            this.setOptions(options);

            // Also update value based on checked
            if (this.checked) {
                this.value = this.checked;
            }
        } catch (error) {
            console.error(`Error in ${this.tagName} _setOptionViaAttributes:`, error);
        }
    }

    render() {
        const infoButtonStyle = "--button-min-height:30px; --button-min-width:30px; touch-action: manipulation; --info-button-pos-top:0; --info-button-pos-right:-14px;";

        return x`
            ${this._renderItem?.() || ''}
            ${n(this.hasInfo, () => this._renderInfoButton(infoButtonStyle))}
            ${n(this.hasInfo, () => this._renderInfoText())}
        `;
    }
}

customElements.define("wm-radio", Radio);
const tagName = "wm-radio";

export { Radio, tagName };
