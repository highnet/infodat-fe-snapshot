/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { o } from '../../if-defined-4084517f.js';
import { FormWrapper } from '../misc/form-wrapper.js';
import { f as formStyles } from '../../form.styles-a2bd9acf.js';
import { n } from '../../when-55b3d1d8.js';
import { ErrorStateController } from '../misc/error-state-controller.js';
import { dispatchCustomEvent } from '../misc/utils.js';
import { g as globalCSS } from '../../wiener-melange.bundle.min-0e2d13dc.js';
import '../misc/slot.js';
import '../../class-map-68392fb3.js';
import '../../directive-4c65af6a.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../misc/error-tracking.js';

const globalStyles = new CSSStyleSheet();
globalStyles.replaceSync(globalCSS);

/**
 * Gruppiert Formularelemente und führt Validierung für die gesamte Gruppe durch.
 *
 * Eine FormGroup fasst thematisch zusammengehörige Formularelemente in einer
 * Fieldset-Struktur zusammen und ermöglicht die Validierung aller enthaltenen
 * Elemente als Einheit. Bei Validierungsfehlern wird eine Fehlermeldung für die
 * gesamte Gruppe angezeigt.
 *
 * Beispiel:
 * ```html
 * <wm-form-group legend="Adressdaten" errormessage="Bitte füllen Sie alle Adressdaten aus">
 *   <wm-input id="street" label="Straße" required></wm-input>
 *   <wm-input id="city" label="Stadt" required></wm-input>
 * </wm-form-group>
 * ```
 *
 * @summary Form/Form, FormBlock/FormBlock
 *
 * @slot default - Formularelemente, die gruppiert werden sollen
 * @slot error - Benutzerdefinierte Fehlermeldung (optional)
 */
class FormGroup extends FormWrapper(s) {
  static properties = {
    errormessage: { type: String, attribute: "errormessage" },
    summaryErrormessage: { type: String, attribute: "summary-errormessage" },
    hasGroupError: { type: Boolean, reflect: true },
    error: { type: String },
    legend: { type: String, reflect: true },
    _hasInteracted: { type: Boolean, state: true },
    validate: { type: Boolean, reflect: true }
  };
  static styles = [globalStyles, formStyles];

  constructor() {
    super();
    /**
     * @type {String} - Fehlermeldung bei ungültiger Gruppeneingabe
     * Diese Meldung wird angezeigt, wenn die Validierung der Gruppe fehlschlägt,
     * z.B. wenn Pflichtfelder in der Gruppe nicht ausgefüllt sind.
     */
    this.errormessage = "";

    /**
     * @type {String} - Spezifische Fehlermeldung für die Fehlerübersicht
     * Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
     * Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
     * Fehlermeldungen anzuzeigen, z.B. "Bitte geben Sie alle erforderlichen Adressdaten ein"
     * statt nur "Group validation error".
     */
    this.summaryErrormessage = "";

    /**
     * @type {Boolean} - Gibt an, ob die Gruppe einen Fehler hat
     * Wird auf "true" gesetzt, wenn mindestens ein Feld in der Gruppe nicht gültig ist.
     * Steuert die Anzeige der Fehlermeldung und der visuellen Fehlermarkierung.
     */
    this.hasGroupError = false;

    /**
     * @type {String} - Aktuelle Fehlermeldung der Gruppe
     * @private
     */
    this._error = "";

    /**
     * @type {String} - Text für die Legende des Fieldsets
     * Dieser Text wird als Beschriftung der Formulargruppe verwendet.
     * Kann sowohl über das legend-Attribut als auch über einen legend-Slot angepasst werden.
     */
    this.legend = "Gruppe";

    /**
     * @type {Boolean} - Whether the user has interacted with the group
     * @private
     */
    this._hasInteracted = false;

    /**
     * @type {Boolean} - Whether to validate on input
     */
    this.validate = false;

    /**
     * Add error state controller for centralized error handling
     * @type {ErrorStateController}
     * @private
     */
    this._errorController = new ErrorStateController(this);

    /**
     * @type {Boolean} - Flag to prevent infinite recursion in error handling
     * @private
     */
    this._inErrorSetting = false;

    /**
     * @type {Boolean} - Flag to prevent infinite recursion in validation
     * @private
     */
    this._isValidating = false;
  }

  connectedCallback() {
    super.connectedCallback();

    // Set up mutation observer to watch for child elements being added/removed
    this._setupMutationObserver();

    // Add event listeners after a short delay to ensure all children are ready
    setTimeout(() => {
      this._setupChildEventListeners();
    }, 0);
  }

  /**
   * Sets up a mutation observer to track when form elements are added or removed
   * @private
   */
  _setupMutationObserver() {
    this._observer = new MutationObserver((mutations) => {
      let shouldRevalidate = false;
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' &&
            (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
          shouldRevalidate = true;
        }
      });

      if (shouldRevalidate) {
        // Re-setup event listeners when DOM changes
        this._setupChildEventListeners();

        // If we already have errors, revalidate to see if they're still valid
        if (this.hasGroupError) {
          this.validateGroup();
        }
      }
    });

    this._observer.observe(this, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Sets up event listeners on all child form elements
   * @private
   */
  _setupChildEventListeners() {
    const fields = this.querySelectorAll(
      "wm-input, wm-select, wm-textarea, wm-radio, wm-checkbox, wm-upload, wm-switch, input, select, textarea"
    );

    fields.forEach(field => {
      // Remove previous listeners to prevent duplicates
      field.removeEventListener('input', this._onChildInput);
      field.removeEventListener('change', this._onChildChange);
      field.removeEventListener('blur', this._onChildBlur);

      // Add new listeners
      field.addEventListener('input', this._onChildInput.bind(this));
      field.addEventListener('change', this._onChildChange.bind(this));
      field.addEventListener('blur', this._onChildBlur.bind(this));
    });
  }

  /**
   * Handles input events from child elements
   * @param {Event} event - The input event
   * @private
   */
  _onChildInput(event) {
    this._hasInteracted = true;

    // Validate if the validate property is true
    if (this.validate) {
      this._debounceValidation();
    }
  }

  /**
   * Handles change events from child elements
   * @param {Event} event - The change event
   * @private
   */
  _onChildChange(event) {
    this._hasInteracted = true;

    // Always validate on change
    this._debounceValidation();
  }

  /**
   * Handles blur events from child elements
   * @param {Event} event - The blur event
   * @private
   */
  _onChildBlur(event) {
    this._hasInteracted = true;

    // Validate on blur
    this._debounceValidation();
  }

  /**
   * Debounces validation to prevent excessive validation calls
   * @private
   */
  _debounceValidation() {
    clearTimeout(this._validationTimer);
    this._validationTimer = setTimeout(() => {
      if (!this._isValidating) {
        this.validateGroup();
      }
    }, 50);
  }

  /**
   * Disconnects and cleans up event listeners and observers
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    // Clean up the observer
    if (this._observer) {
      this._observer.disconnect();
    }

    // Clear any pending timer
    clearTimeout(this._validationTimer);
  }

  /**
   * Bridge method to support Form's validation flow
   * @returns {String} Error message if validation fails, empty string otherwise
   */
  checkValidity() {
    // Just return the error message if there is one, without triggering validation again
    if (this.hasGroupError && this.errormessage) {
      return this.errormessage;
    }

    // Otherwise perform validation
    const validationResult = this.validateGroup();

    // If validation failed, return the error message
    if (validationResult && typeof validationResult === 'object' && validationResult.message) {
      return validationResult.message;
    }

    // Validation passed
    return '';
  }

  /**
   * Validiert alle untergeordneten Formularfelder in der Gruppe.
   *
   * Diese Methode durchläuft alle unterstützten Formularelemente innerhalb der Gruppe
   * und prüft deren Gültigkeit. Wenn mindestens ein Element ungültig ist, wird die
   * Gruppe als fehlerhaft markiert.
   *
   * @returns {Object|String} Bei Fehlern ein Objekt mit message und firstInvalidFieldId,
   *                         andernfalls ein leerer String
   */
  validateGroup() {
    if (this._isValidating) return '';

    try {
      this._isValidating = true;
      let errorFound = false;
      let firstInvalidFieldId = null;
      const invalidFields = [];

      // Don't show errors immediately on load, only after interaction
      // Only validate if the user has interacted with the fields or showErrors is explicitly set
      if (!this._hasInteracted && !this.showErrors) {
        return '';
      }

      // Include all form field types for complete validation
      const fields = this.querySelectorAll("wm-input, wm-select, wm-textarea, wm-radio, wm-checkbox, wm-upload, wm-switch, input, select, textarea");

      fields.forEach(field => {
        if (typeof field.checkValidity === "function") {
          const result = field.checkValidity();
          // Fix: safely handle different value types (string, array, etc)
          const isEmpty = field.hasAttribute("required") && (
            !field.value ||
            (typeof field.value === "string" && field.value.trim() === "") ||
            (Array.isArray(field.value) && field.value.length === 0)
          );

          // Also check if the field has been flagged with an error externally (e.g. via server-side validation)
          if ((result !== "" && result !== true) || isEmpty || field.hasError) {
            // Make sure to update all error related properties
            field.hasError = true;

            // Always set the attribute to ensure DOM consistency
            if ('setAttribute' in field) {
              field.setAttribute('haserror', '');
            }

            // Collect invalid fields for reporting
            invalidFields.push(field);

            // If the field has an error controller, use it
            if (field._errorController) {
              const errorMsg = field.errormessage || result || "Invalid input";
              field._errorController.setError(errorMsg);
            }

            errorFound = true;
            if (!firstInvalidFieldId && field.id) {
              firstInvalidFieldId = field.id;
            }
          }
        }
      });

      const previousErrorState = this.hasGroupError;
      this.hasGroupError = errorFound;

      if (errorFound && !firstInvalidFieldId) {
        if (!this.id) this.id = "wm-form-group-" + Math.random().toString(36).substr(2, 9);
        firstInvalidFieldId = this.id;
      }

      // Use our error controller to update the error state
      if (errorFound) {
        const errorMessage = this.errormessage || "Group validation error.";
        this._errorController.setError(errorMessage, {
          announceToScreenReader: previousErrorState !== errorFound
        });

        dispatchCustomEvent(this, 'group-invalid', {
          message: errorMessage,
          fieldId: firstInvalidFieldId,
          invalidFields: invalidFields
        });

        return {
          message: errorMessage,
          firstInvalidFieldId,
          invalidFields: invalidFields
        };
      } else {
        // Clear the error
        this._errorController.clearError();

        if (previousErrorState !== errorFound) {
          dispatchCustomEvent(this, 'group-valid', {});
        }

        return "";
      }
    } finally {
      this._isValidating = false;
    }
  }

  /**
   * Internal method to set error state without triggering recursion
   * @param {String} value - Error message to set
   * @private
   */
  _setErrorDirectly(value) {
    this._error = value;
    this.requestUpdate();
  }

  /**
   * Gibt die aktuelle Fehlermeldung zurück.
   *
   * Bei einem Gruppenfehler wird die errormessage verwendet, ansonsten
   * der intern gespeicherte Fehlerwert.
   *
   * @returns {String} Die aktuelle Fehlermeldung
   */
  get error() {
    return this.hasGroupError ? this.errormessage : this._error;
  }

  /**
   * Setzt eine benutzerdefinierte Fehlermeldung für die Gruppe.
   *
   * @param {String} value - Die anzuzeigende Fehlermeldung
   */
  set error(value) {
    // Guard against infinite recursion
    if (this._inErrorSetting) return;

    this._inErrorSetting = true;
    this._error = value;

    try {
      // Ensure _errorController is initialized before using it
      if (this._errorController && value !== undefined) {
        if (value) {
          this.hasGroupError = true;
          // Update error state without calling back into the setter
          this._errorController.setError(value);
        } else {
          this.hasGroupError = false;
          // Update error state without calling back into the setter
          this._errorController.clearError();
        }
      }

      this.requestUpdate();
    } finally {
      this._inErrorSetting = false;
    }
  }

  /**
   * Add showError and clearError methods that use the errorController
   */
  showError(message) {
    if (this._inErrorSetting) return;

    this._inErrorSetting = true;
    try {
      this.hasGroupError = !!message;
      this._error = message || '';
      if (message) {
        this._errorController.setError(message);
      } else {
        this._errorController.clearError();
      }
      this.requestUpdate();
    } finally {
      this._inErrorSetting = false;
    }
  }

  clearError() {
    this.showError('');
  }

  /**
   * Sets the disabled state of the form group and all its child form elements
   * @param {boolean} isDisabled - Whether the form group should be disabled
   * @public
   */
  setDisabled(isDisabled) {
    // Update the disabled property/attribute
    this.disabled = Boolean(isDisabled);

    // Clear error state when disabled
    if (isDisabled) {
      this._errorController.clearError();
      this.hasGroupError = false;
    }

    // Update disabled state on all child form elements
    const fields = this.querySelectorAll(
      "wm-input, wm-select, wm-textarea, wm-radio, wm-checkbox, wm-upload, wm-switch"
    );

    fields.forEach(field => {
      if (typeof field.setDisabled === 'function') {
        // Use the component's setDisabled method if available
        field.setDisabled(isDisabled);
      } else {
        // Fallback to setting the disabled property/attribute directly
        field.disabled = isDisabled;
        if (isDisabled) {
          field.setAttribute('disabled', '');
        } else {
          field.removeAttribute('disabled');
        }
      }
    });

    // Also update native form elements
    const nativeFields = this.querySelectorAll(
      "input, select, textarea, button"
    );

    nativeFields.forEach(field => {
      if (isDisabled) {
        field.setAttribute('disabled', '');
      } else {
        field.removeAttribute('disabled');
      }
    });

    // Dispatch event
    dispatchCustomEvent(this, 'disabled-changed', {
      disabled: this.disabled
    });
  }

  render() {
    return x`
      <fieldset
        class="${this.hasGroupError ? 'group-error' : ''}"
        aria-invalid="${o(this.hasGroupError ? "true" : undefined)}"
        aria-describedby="${o(this.hasGroupError && this.error ? 'error-message' : undefined)}"
      >
        <legend>
          ${this.legend}
        </legend>
        <slot></slot>
      </fieldset>

      ${n(
        this.hasGroupError && this.error,
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

customElements.define("wm-form-group", FormGroup);

export { FormGroup };
