/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as e,s as r}from"../../lit-element-8d7b5fe2.js";import{x as t}from"../../lit-html-34d0b6a8.js";import{FormWrapper as i}from"../misc/form-wrapper.js";import{n as s}from"../../when-741bb8d9.js";import{o as a}from"../../if-defined-d257cee1.js";import{l as o}from"../../live-77c73e47.js";import{dispatchCustomEvent as h}from"../misc/utils.js";import{ErrorStateController as l}from"../misc/error-state-controller.js";import{FormStateManager as c}from"../misc/form-state-manager.js";import"../misc/slot.js";import"../../class-map-b15037ef.js";import"../../directive-16e189ed.js";import"../../unsafe-html-4e49b66a.js";import"../misc/error-tracking.js";const d=[e`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  .switch-inner {
    align-items: center;
    gap: 0.5rem;
    display: flex;
  }

  [role="switch"] {
    background-color: var(--switch-background-color) !important;
    border: 1px solid var(--switch-border-color) !important;
    border-radius: 32px;
    border-width: 2px;
    block-size: 1.85rem;
    cursor: pointer;
    inline-size: 3.4375rem;
    padding: 0;
    position: relative;
  }

  [aria-checked="true"] {
    --switch-background: var(--switch-background-color--active);
  }

  [role="switch"]::before {
    background-color: var(--switch-background-knob-color) !important;
    border-radius: 16px;
    block-size: 1.25rem;
    content: "";
    top: 3px;
    left: 3px;
    inline-size: 1.25rem;
    position: absolute;
    transition: .2s;
  }

  [aria-checked="true"]::before {
    transform: translateX(1.525rem);
  }

  .switch:has([aria-invalid="true"]) {
    color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));
  }

  .switch:has([aria-invalid="true"]) ~ .wm-forms-message {
    font-size: var(--wm-font-size-xs);
    color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));
  }
`];class n extends(c(i(r))){static properties={label:{type:String,reflect:!0},checked:{type:Boolean},disabled:{type:Boolean,reflect:!0},errormessage:{type:String,attribute:"errormessage"},summaryErrormessage:{type:String,attribute:"summary-errormessage"},hasError:{type:Boolean,reflect:!0},error:{type:String},validate:{type:Boolean,reflect:!0},showErrors:{type:Boolean,reflect:!0},_initialValue:{state:!0},_hasInteracted:{state:!0}};static styles=[d];constructor(){super(),this.label="Aktivieren",this.checked=!1,this.disabled=!1,this.hasError=!1,this.error="",this.errormessage="",this.summaryErrormessage="",this.validate=!1,this.showErrors=!1,this.type="switch",this.value="0",this._initialValue="0",this._hasInteracted=!1,this._errorController=new l(this)}connectedCallback(){super.connectedCallback(),this.checked&&(this.value="1"),this._initialValue=this.value}_toggle(e){this.disabled||(this._hasInteracted=!0,this.checked=!this.checked,this.value=this.checked?"1":"0",h(this,"change",{value:this.value,checked:this.checked,target:e.composedPath()[0]}),(this.validate||this.showErrors)&&this.checkValidity())}checkValidity(){let e="";const r=this.shadowRoot?.querySelector('button[role="switch"]');if(!this.required||this.checked&&"1"===this.value||(e=this.errormessage||"Diese Auswahl ist erforderlich"),r)try{e?r.setAttribute("aria-invalid","true"):r.removeAttribute("aria-invalid")}catch(e){console.warn("Error updating aria-invalid state:",e)}return e?this._errorController.setError(e):this._errorController.clearError(),e}showError(e){this._errorController.setError(e)}clearError(){this._errorController.clearError()}_performValidation(){if(!0===this.disabled)return"";if(!this._hasInteracted&&!this.showErrors)return"";const e=!this.required||this.checked&&"1"===this.value?"":this.errormessage||"Diese Auswahl ist erforderlich";return e?this._errorController.setError(e):this._errorController.clearError(),e}_getFormControlElement(){return this.shadowRoot?.querySelector('button[role="switch"]')}reset(){this.value=this._initialValue,this.checked="1"===this._initialValue,this._hasInteracted=!1,this._errorController.clearError(),this._internals?.setFormValue(this.value),h(this,"change",{value:this.value,checked:this.checked,isReset:!0})}formResetCallback(){super.formResetCallback?.(),this.reset()}_handleFocus(e){this.disabled||h(this,"focus",{value:this.value,checked:this.checked,target:e.target})}_handleBlur(e){this.disabled||(this._hasInteracted=!0,(this.validate||this.showErrors)&&this.checkValidity(),h(this,"blur",{value:this.value,checked:this.checked,target:e.target}))}_handleChange(e){this.disabled||(this._hasInteracted=!0,(this.validate||this.showErrors)&&this.checkValidity(),h(this,"change",{value:this.value,checked:this.checked,target:e.target}))}setDisabled(e){this.disabled=Boolean(e),e&&this._errorController.clearError();const r=this.shadowRoot?.querySelector('button[role="switch"]');r&&(e?r.setAttribute("disabled",""):r.removeAttribute("disabled")),h(this,"disabled-changed",{disabled:this.disabled})}updated(e){super.updated?.(e),(e.has("value")||e.has("checked"))&&(e.has("checked")&&!e.has("value")?this.value=this.checked?"1":"0":e.has("value")&&!e.has("checked")&&(this.checked="1"===this.value),this._internals?.setFormValue(this.value),!this._initialValue&&this.value&&(this._initialValue=this.value),this.required&&(this._hasInteracted||this.showErrors)&&this.checkValidity())}render(){return this._renderWrapper(t`
			<div class="switch">
				${s(this._hasHint,(()=>t`
						<div id="hint">
							<div><slot name="hint">${this.hint}</slot></div>
						</div>
					`))}

				<div class="switch-inner">
					${this._renderLabel(this.label,`${this._formId}`)}

					<button
						id="${this._formId}"
						role="switch"
						aria-checked="${this.checked}"
						aria-labelledby="toggle"
						@click="${this.disabled?void 0:this._toggle}"
						@blur="${this.disabled?void 0:this._handleBlur}"
						@focus="${this.disabled?void 0:this._handleFocus}"
						@change="${this.disabled?void 0:this._handleChange}"
						aria-invalid="${a(!!this.hasError||void 0)}"
						?required=${this.required}
						.value=${o(this.value)}
						?disabled=${this.disabled}
					></button>
				</div>
			</div>
		`)}}customElements.define("wm-switch",n);const u="wm-switch";export{n as Switch,u as tagName};
