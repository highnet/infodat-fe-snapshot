/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as r}from"../../lit-html-34d0b6a8.js";import{FormText as s}from"../misc/form-text.js";import{o as i}from"../../if-defined-d257cee1.js";import{f as a}from"../../form-item.styles-b671e7a9.js";import{dispatchCustomEvent as o}from"../misc/utils.js";import{ErrorStateController as l}from"../misc/error-state-controller.js";import{FormStateManager as h}from"../misc/form-state-manager.js";import{g as n}from"../../wiener-melange.bundle.min-ae18d627.js";import"../../form.styles-3cb5bbeb.js";import"../misc/form-item.js";import"../../when-741bb8d9.js";import"../../class-map-b15037ef.js";import"../../directive-16e189ed.js";import"../../unsafe-html-4e49b66a.js";import"../misc/form-wrapper.js";import"../misc/slot.js";import"../misc/formValidation.js";import"../misc/shared-info.js";import"../misc/error-tracking.js";const d=t`
  :host {
    display: block;
  }

  textarea {
    font-family: var(--textarea-font-family);
    font-size: var(--textarea-font-size);
    line-height: var(--textarea-line-height);
  }

  .info {
    display: none;
  }

  .info-visible {
    display: block;
  }
`,u=new CSSStyleSheet;u.replaceSync(n);class m extends(h(s(e))){static properties={disabled:{type:Boolean,reflect:!0},rows:{type:Number,reflect:!0},pattern:{type:String},hasError:{type:Boolean,reflect:!0},showErrors:{type:Boolean,reflect:!0},validate:{type:Boolean,reflect:!0},value:{type:String},defaultValue:{type:String},errormessage:{type:String,attribute:"errormessage"},summaryErrormessage:{type:String,attribute:"summary-errormessage"},error:{type:String},_initialValue:{state:!0},_hasInteracted:{state:!0}};static styles=[u,a,d];constructor(){super(),this.disabled=!1,this.rows=7,this.pattern=void 0,this.hasError=!1,this.value="",this.defaultValue="",this.showErrors=!1,this.validate=!1,this.errormessage="",this.summaryErrormessage="",this.error="",this._initialValue="",this._hasInteracted=!1,this._errorController=new l(this)}connectedCallback(){super.connectedCallback(),this.hasAttribute("value")&&(this._initialValue=this.getAttribute("value"),this.value=this._initialValue)}firstUpdated(t){super.firstUpdated?.(t),this._initialValue||!this.value&&!this.getAttribute("value")||(this._initialValue=this.value||this.getAttribute("value"))}reset(){this.value=this._initialValue||"";const t=this.shadowRoot?.querySelector("textarea");t&&(t.value=this.value),this._errorController.clearError(),this._internals?.setFormValue(this.value),this._hasInteracted=!1,o(this,"change",{value:this.value,isReset:!0})}formResetCallback(){super.formResetCallback?.(),this.reset()}checkValidity(){let t="";const e=this.shadowRoot?.querySelector("textarea");if(!this.required||this.value&&""!==this.value.trim()?this.pattern&&this.value&&!new RegExp(this.pattern).test(this.value)&&(t=this.errormessage||"Eingabe entspricht nicht dem erforderlichen Format"):t=this.errormessage||"Dieses Feld ist erforderlich",e)try{t?e.setCustomValidity(t):e.setCustomValidity("")}catch(t){console.warn("Error setting custom validity:",t)}return t?this._errorController.setError(t):this._errorController.clearError(),t}showError(t){this._errorController.setError(t)}clearError(){this._errorController.clearError()}setCustomValidity(t){try{const e=this.shadowRoot?.querySelector("textarea");e&&"function"==typeof e.setCustomValidity&&(e.setCustomValidity(t||""),t?this._errorController.setError(t):this._errorController.clearError())}catch(t){console.error("Error setting custom validity:",t)}}setDisabled(t){this.disabled=Boolean(t),t&&this._errorController.clearError();const e=this.shadowRoot?.querySelector("textarea");e&&(t?e.setAttribute("disabled",""):e.removeAttribute("disabled")),o(this,"disabled-changed",{disabled:this.disabled})}_performValidation(){if(!0===this.disabled)return"";if(!this._hasInteracted&&!this.showErrors)return"";let t="";return!this.required||this.value&&""!==this.value.trim()?this.pattern&&this.value&&!new RegExp(this.pattern).test(this.value)&&(t=this.errormessage||"Eingabe entspricht nicht dem erforderlichen Format"):t=this.errormessage||"Dieses Feld ist erforderlich",t?this._errorController.setError(t):this._errorController.clearError(),t}_getFormControlElement(){return this.shadowRoot?.querySelector("textarea")}_handleInput(t){this.disabled||(this._hasInteracted=!0,this.value=t.target.value,(this.validate||this.showErrors)&&this.checkValidity(),o(this,"input",{value:this.value,valid:!this.hasError}))}_handleChange(t){this.disabled||(this._hasInteracted=!0,this.value=t.target.value,(this.validate||this.showErrors)&&this.checkValidity(),o(this,"change",{value:this.value,valid:!this.hasError}))}_handleBlur(t){this.disabled||(this._hasInteracted=!0,(this.validate||this.showErrors)&&this.checkValidity(),o(this,"blur",{value:this.value,target:t.target}))}render(){return this._renderElement(r`
				<textarea
					class="${this.hasError?"has-error":""}"
					autocomplete=${i(this.autocomplete)}
					aria-describedby="${i(this._hasHint||this.hasError?"message":void 0)}"
					aria-disabled="${i(!!this.disabled||void 0)}"
					aria-invalid="${i(!!this.hasError||void 0)}"
					placeholder="${i(this.placeholder)}"
					?required=${this.required}
					maxlength="${i(this.maxlength)}"
					rows="${i(this.rows)}"
					pattern="${i(this.pattern)}"
					.value="${this.value??""}"
					@input="${this.disabled?void 0:this._handleInput}"
					id="${this._formId}"
					@blur="${this.disabled?void 0:this._handleBlur}"
					@focus="${this.disabled?void 0:this._handleFocus}"
					@change="${this.disabled?void 0:this._handleChange}"
					?disabled=${this.disabled}
					>${this.value??""}</textarea>
		`)}updated(t){super.updated?.(t),t.has("value")&&(this._internals?.setFormValue(this.value??""),!this._initialValue&&this.value&&(this._initialValue=this.value),this.hasError&&this.value&&this.required&&this.checkValidity())}}customElements.define("wm-textarea",m);export{m as Textarea};
