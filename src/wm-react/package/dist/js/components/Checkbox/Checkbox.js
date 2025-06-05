/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { FormOption } from '../misc/form-option.js';
import { dispatchCustomEvent } from '../misc/utils.js';
import '../../unsafe-html-2bcd6aa9.js';
import { n } from '../../when-55b3d1d8.js';
import { SharedInfoMixin } from '../misc/shared-info.js';
import { ErrorStateController } from '../misc/error-state-controller.js';
import { FormStateManager } from '../misc/form-state-manager.js';
import '../misc/form-wrapper.js';
import '../misc/slot.js';
import '../../class-map-68392fb3.js';
import '../../directive-4c65af6a.js';
import '../misc/error-tracking.js';
import '../../form-item.styles-a1cceb44.js';
import '../../form.styles-a2bd9acf.js';
import '../../if-defined-4084517f.js';
import '../../live-ae266325.js';
import '../../wiener-melange.bundle.min-0e2d13dc.js';

// Use the SharedInfoMixin to share the info display functionalities
const Base = FormStateManager(SharedInfoMixin(FormOption(s)));
class Checkbox extends Base {
    static properties = {
        ...super.properties,
        hasError: { type: Boolean, reflect: true },
        error: { type: String },
        errormessage: { type: String },
        summaryErrormessage: { type: String, attribute: "summary-errormessage" },
        validate: { type: Boolean, reflect: true },
        showErrors: { type: Boolean, reflect: true },
        info: { type: String },
        _infoOpen: { type: Boolean },
        _initialCheckedValues: { state: true },
    };

    constructor() {
        super();
        /**
         * @type {'checkbox'} - Art des Eingabefelds
         * @private
         */
        this.type = "checkbox";

        /**
         * @type {Array} - Selected values
         * @private
         */
        this.value = [];

        /**
         * @type {String} - Fehlermeldung bei ungültiger Eingabe
         * Diese Meldung wird direkt am Checkbox-Element angezeigt, wenn es validiert wird und ungültig ist.
         */
        this.errormessage = "";

        /**
         * @type {String} - Spezifische Fehlermeldung für die Fehlerübersicht
         * Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
         * Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
         * Fehlermeldungen anzuzeigen, z.B. "Bitte stimmen Sie den AGB bei 'Nutzungsbedingungen' zu"
         * statt nur "Bitte wählen Sie mindestens eine Option aus".
         */
        this.summaryErrormessage = "";

        /**
         * @type {Boolean} - Gibt an, ob das Element einen Fehler hat
         * Dies ist ein Statusattribut, das anzeigt, ob aktuell ein Validierungsfehler vorliegt.
         * Es wird auf true gesetzt, wenn die Validierung fehlschlägt, und auf false, wenn die Validierung erfolgreich ist.
         */
        this.hasError = false;

        /**
         * @type {String} - Aktuelle Fehlermeldung
         */
        this.error = "";

        /**
         * @type {Boolean} - Steuert die Anzeige von Fehlermeldungen
         * Im Gegensatz zu 'hasError' steuert dieses Attribut, ob Fehlermeldungen angezeigt werden sollen.
         * Wenn auf true gesetzt, werden Validierungsfehler sofort angezeigt, ohne auf eine Formularübermittlung zu warten.
         * Wird typischerweise vom übergeordneten wm-form Element gesteuert.
         */
        this.showErrors = false;

        /**
         * @type {Boolean} - Aktiviert die Validierung bei Eingabe
         * Wenn auf true gesetzt, werden Eingaben sofort validiert und Fehler angezeigt,
         * ohne auf eine Formularübermittlung zu warten.
         * Wird typischerweise vom übergeordneten wm-form Element gesteuert.
         */
        this.validate = false;

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
         * @private
         * @type {Array} - Initial checked values for reset functionality
         */
        this._initialCheckedValues = [];

        // Initialize error controller for centralized error handling
        this._errorController = new ErrorStateController(this);
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        if (changedProperties.has('checked')) {
            // Update internal value when checked attribute changes
            const newValue = this.checked ? this.checked.split(';') : [];
            this.value = newValue;

            // Store initial value the first time it's set from attributes
            if (!this._initialCheckedValues.length && newValue.length) {
                this._initialCheckedValues = [...newValue];
            }
        }
    }

    _handleChange(e) {
        const checked = Array.from(this._items)
            .filter((option) => option.checked)
            .map((option) => option.value);

        this.value = checked;
        this.checked = checked.join(';');

        // Update validation state
        if (this.validate || this.showErrors) {
            // Replace direct applyErrorState with ErrorStateController
            this._errorController.validate();
        }

        dispatchCustomEvent(this, 'change', {
            value: this.value,
            checked: checked.length > 0
        });

        this._internals.setFormValue(this.value.join(','));
    }

    /**
     * Override checkValidity to better handle error messages for the error summary
     */
    checkValidity() {
        // Get all checkbox inputs in the group
        const checkboxes = Array.from(this.shadowRoot?.querySelectorAll("input[type='checkbox']") || []);
        // Determine if at least one checkbox is checked
        const isChecked = checkboxes.some(cb => cb.checked);

        let errorMsg = "";
        if (this.required && !isChecked) {
            errorMsg = this.errormessage || "Bitte wählen Sie mindestens eine Option aus";

            // Set custom validity on all checkboxes
            checkboxes.forEach(cb => {
                if (cb && typeof cb.setCustomValidity === 'function') {
                    cb.setCustomValidity(errorMsg);
                }
            });

            // Use the ErrorStateController
            this._errorController.setError(errorMsg);
        } else {
            // Clear custom validity on all checkboxes
            checkboxes.forEach(cb => {
                if (cb && typeof cb.setCustomValidity === 'function') {
                    cb.setCustomValidity("");
                }
            });

            // Clear error using controller
            this._errorController.clearError();
        }

        return errorMsg;
    }

    /**
     * Public method to show an error message
     * @param {string} message Error message to display
     */
    showError(message) {
        this._errorController.setError(message);
    }

    /**
     * Public method to clear error state
     */
    clearError() {
        this._errorController.clearError();
    }

    /**
     * Sets the disabled state of the checkbox component and all its options
     * @param {boolean} isDisabled - Whether the checkbox component should be disabled
     * @public
     */
    setDisabled(isDisabled) {
        // Update the disabled state
        this.disabled = Boolean(isDisabled);

        // Clear error state when disabled
        if (isDisabled) {
            this._errorController.clearError();
        }

        // Update all checkbox inputs
        const checkboxes = this.shadowRoot?.querySelectorAll('input[type="checkbox"]');
        if (checkboxes) {
            checkboxes.forEach(checkbox => {
                if (isDisabled) {
                    checkbox.setAttribute('disabled', '');
                } else {
                    checkbox.removeAttribute('disabled');
                }
            });
        }

        // Dispatch event for external listeners
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

        // Get all checkbox inputs in the group
        const checkboxes = Array.from(this.shadowRoot?.querySelectorAll("input[type='checkbox']") || []);
        // Determine if at least one checkbox is checked
        const isChecked = checkboxes.some(cb => cb.checked);

        const errorMsg = this.required && !isChecked
            ? (this.errormessage || "Bitte wählen Sie mindestens eine Option aus")
            : "";

        if (errorMsg) {
            // Set custom validity on checkboxes
            checkboxes.forEach(cb => {
                if (cb && typeof cb.setCustomValidity === 'function') {
                    cb.setCustomValidity(errorMsg);
                }
            });

            // Set error state using controller
            this._errorController.setError(errorMsg);
        } else {
            // Clear custom validity
            checkboxes.forEach(cb => {
                if (cb && typeof cb.setCustomValidity === 'function') {
                    cb.setCustomValidity("");
                }
            });

            // Clear error state using controller
            this._errorController.clearError();
        }

        // Update form internals state if available
        if (this._internals && typeof this._internals.setValidity === 'function') {
            try {
                if (errorMsg) {
                    this._internals.setValidity({ customError: true }, errorMsg, checkboxes[0]);
                } else {
                    this._internals.setValidity({}, "", checkboxes[0]);
                }
            } catch (e) {
                console.warn('Error updating form internals validity:', e);
            }
        }

        return errorMsg;
    }

    _handleEvent(e) {
        if (!this.disabled) {
            // Dispatch native and custom event using our utils function
            dispatchCustomEvent(this, e.type, {
                value: this.value,
                target: e.target
            });

            // Then handle specific events
            switch(e.type) {
                case 'change':
                    this._handleChange(e);
                    break;
                case 'input':
                    this._handleInput(e);
                    break;
                case 'focus':
                    this._handleFocus(e);
                    break;
                case 'blur':
                    this._handleBlur(e);
                    break;
            }
        }
    }

    reset() {
        try {
            // Reset to INITIAL values (not empty values)
            const initialValues = this._initialCheckedValues || [];
            this.value = [...initialValues];
            this.checked = initialValues.join(';');

            // Reset UI state - check only initially checked boxes
            if (this._items) {
                this._items.forEach(item => {
                    if (!item) return;
                    item.checked = initialValues.includes(item.value);

                    // Clear validation state on each checkbox
                    if (typeof item.setCustomValidity === 'function') {
                        item.setCustomValidity('');
                    }
                    item.removeAttribute('aria-invalid');
                });
            }

            // Clear error states using controller
            this._errorController.clearError();

            // Reset internal form state
            if (this._internals) {
                this._internals.setFormValue(this.value.join(','));

                // Clear form validity state
                try {
                    this._internals.setValidity({}, '');
                } catch (err) {
                    console.warn('Error clearing form internals validity during reset:', err);
                }
            }

            // Dispatch change event with reset flag
            dispatchCustomEvent(this, "change", {
                value: this.value,
                checked: initialValues.length > 0,
                isReset: true
            });
        } catch (error) {
            console.error('Error in wm-checkbox reset method:', error);
        }
    }

    formResetCallback() {
        super.formResetCallback?.();
        // Use the public reset method
        this.reset();
    }

    async firstUpdated(changedProperties) {
        // Call the parent implementation if it exists
        if (super.firstUpdated) {
            super.firstUpdated(changedProperties);
        }

        // Ensure the component is fully rendered before dispatching the event
        // by waiting for the updateComplete promise to resolve
        await this.updateComplete;

        // Dispatch the 'defined' event after the component is fully rendered
        console.log('Checkbox component dispatching wm-defined event');
        dispatchCustomEvent(this, 'defined', {
            component: this.tagName.toLowerCase(),
            id: this.id
        });
    }

    render() {
        const infoButtonStyle = "--button-min-height:30px; --button-min-width:30px; touch-action: manipulation; --info-button-pos-top:0; --info-button-pos-right:-14px;";

        return x`
            ${this._renderItem()}
            ${n(this.hasInfo, () => this._renderInfoButton(infoButtonStyle))}
            ${n(this.hasInfo, () => this._renderInfoText())}
        `;
    }
}
customElements.define("wm-checkbox", Checkbox);

const tagName = "wm-checkbox";

export { Checkbox, tagName };
