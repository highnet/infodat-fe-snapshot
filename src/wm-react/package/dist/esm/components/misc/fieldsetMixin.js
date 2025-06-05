/* @copyright Stadt Wien - Wiener Melange 200 */
import"../../lit-element-8d7b5fe2.js";import{x as e}from"../../lit-html-34d0b6a8.js";import{o as r}from"../../if-defined-d257cee1.js";const s=s=>class extends s{static properties={legend:{type:String},required:{type:Boolean,reflect:!0},...s.properties};constructor(){super(),this.legend="",this.required=!1}_showRequired(){return this.required?e`<span class="required" aria-hidden="true">*</span>`:""}_renderFieldset(s){const i=(this.hasError||this.hasGroupError)&&this._shouldShowError;return e`
            <fieldset
                class="${i?"error":""}"
                aria-invalid="${i?"true":"false"}"
                aria-describedby="${r(this._hasHint?"hint":void 0)} ${r(i?"error-message":void 0)}"
            >
                <legend>
                    ${this.legend} ${this._showRequired()}
                </legend>
                ${s}
            </fieldset>
        `}};export{s as fieldsetMixin};
