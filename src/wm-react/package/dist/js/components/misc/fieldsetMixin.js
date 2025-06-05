/* @copyright Stadt Wien - Wiener Melange 200 */
import '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { o } from '../../if-defined-4084517f.js';

/**
 * Mixin that provides shared accessibility features for fieldset-based components
 */
const fieldsetMixin = (superClass) => class extends superClass {
    static properties = {
        legend: { type: String },
        required: { type: Boolean, reflect: true },
        ...superClass.properties
    };

    constructor() {
        super();
        this.legend = "";
        this.required = false;
    }

    _showRequired() {
        return this.required ? x`<span class="required" aria-hidden="true">*</span>` : '';
    }

    _renderFieldset(content) {
        const showError = (this.hasError || this.hasGroupError) && this._shouldShowError;

        return x`
            <fieldset
                class="${showError ? 'error' : ''}"
                aria-invalid="${showError ? 'true' : 'false'}"
                aria-describedby="${o(this._hasHint ? 'hint' : undefined)} ${o(showError ? 'error-message' : undefined)}"
            >
                <legend>
                    ${this.legend} ${this._showRequired()}
                </legend>
                ${content}
            </fieldset>
        `;
    }
};

export { fieldsetMixin };
