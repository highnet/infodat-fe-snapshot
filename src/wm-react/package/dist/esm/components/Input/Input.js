/* @copyright Stadt Wien - Wiener Melange 200 */
import{s as t}from"../../lit-element-8d7b5fe2.js";import{x as e}from"../../lit-html-34d0b6a8.js";import{FormText as r}from"../misc/form-text.js";import{o as i}from"../../if-defined-d257cee1.js";import{n as s}from"../../when-741bb8d9.js";import{dispatchCustomEvent as o}from"../misc/utils.js";import{FormStateManager as a}from"../misc/form-state-manager.js";import{ErrorStateController as l}from"../misc/error-state-controller.js";import"../../form-item.styles-b671e7a9.js";import"../../form.styles-3cb5bbeb.js";import"../misc/form-item.js";import"../../class-map-b15037ef.js";import"../../directive-16e189ed.js";import"../../unsafe-html-4e49b66a.js";import"../misc/form-wrapper.js";import"../misc/slot.js";import"../misc/error-tracking.js";import"../misc/formValidation.js";import"../../wiener-melange.bundle.min-ae18d627.js";import"../misc/shared-info.js";class n extends(a(r(t))){static properties={type:{type:String,reflect:!0},dataset:{type:String},toggleButton:{type:Boolean},setvalue:{type:String},_originalType:{type:String},_passwordVisible:{type:Boolean},_value:{type:String},disabled:{type:Boolean,reflect:!0},pattern:{type:String},hasError:{type:Boolean,reflect:!0},showErrors:{type:Boolean,reflect:!0},validate:{type:Boolean,reflect:!0},value:{type:String},suppressError:{type:Boolean},errormessage:{type:String,attribute:"errormessage"},summaryErrormessage:{type:String,attribute:"summary-errormessage"},validator:{type:Function},_initialValue:{state:!0},_hasInteracted:{state:!0}};constructor(){super(),this.type="text",this._originalType="text",this._passwordVisible=!1,this.dataset="",this.toggleButton=!1,this.setvalue="",this._value=void 0,this.disabled=!1,this.pattern=void 0,this.hasError=!1,this.showErrors=!1,this.validate=!1,this.value="",this.defaultValue="",this.suppressError=!1,this.errormessage="",this.summaryErrormessage="",this._initialValue="",this._hasInteracted=!1,this._errorController=new l(this)}_showPassword(){if(!this.disabled)try{this._passwordVisible=!this._passwordVisible,this.type=this._passwordVisible?"text":"password"}catch(t){console.error("Error toggling password visibility:",t)}}connectedCallback(){super.connectedCallback?.(),this._originalType=this.type;const t=this.hasAttribute("value")?this.getAttribute("value"):"";this._initialValue=t,this.defaultValue=t,"combobox"===this._originalType&&(this.type="text",this.autocomplete="off"),this._updateFormValue(),this._setupValidationObservers()}_setupValidationObservers(){new MutationObserver((t=>{for(const e of t)"attributes"===e.type&&("validate"!==e.attributeName&&"showerrors"!==e.attributeName||(this.validate||this.showErrors)&&queueMicrotask((()=>this._errorController.validate())))})).observe(this,{attributes:!0})}_updateFormValue(){try{this.internals&&"function"==typeof this.internals.setFormValue&&(this.internals.setFormValue(this.value||""),console.log("Form value updated:",this.value))}catch(t){console.error("Error updating form value:",t)}}firstUpdated(){if(""===this._initialValue){const t=this.shadowRoot?.querySelector("input");t&&t.value&&(this._initialValue=t.value,this.defaultValue=t.value)}this._inputElement=this.shadowRoot?.querySelector("input")}async getOptions(t,e){try{if("combobox"===this._originalType){if(!(t&&t.length>2&&e))return this.hideOptions?.(),null;try{const t=await fetch(e);if(!t.ok)return console.warn(`Error fetching options: ${t.status} ${t.statusText}`),null;const r=await t.json();return r&&this.dataset?r[this.dataset]:null}catch(t){return console.error("Error fetching combobox options:",t),null}}return null}catch(t){return console.error("Error in getOptions:",t),null}}setOptions(t){try{if(!t)return void console.warn("Cannot set options: No data provided");this._optionItems=t,this._originalOptionItems=t,this._showOptions=!0}catch(t){console.error("Error setting options:",t)}}_handleClick(){if(this.toggleButton&&!this.disabled)try{this._toggleOptions?.()}catch(t){console.error("Error handling click:",t)}}_handleInput(t){if(!this.disabled)try{if(!t||!t.target)return;this._hasInteracted=!0,this._setValue(t.target.value),(this.validate||this.showErrors)&&this._hasInteracted&&(this._errorController&&this._errorController instanceof l?this._errorController.validate():this.checkValidity()),this._updateFormValue(),o(this,"input",{value:this.value,target:t.target})}catch(t){console.error("Error handling input:",t)}}_handleChange(t){if(!this.disabled)try{if(!t||!t.target)return;console.log("Change event triggered:",t.target.value),this._setValue(t.target.value||""),this._updateFormValue(),o(this,"change",{value:this.value,target:t.target})}catch(t){console.error("Error handling change:",t)}}_handleBlur(t){if(!this.disabled)try{this._hasInteracted=!0,this.validate&&this._hasInteracted&&(this._errorController&&this._errorController instanceof l?this._errorController.validate():this.checkValidity()),o(this,"blur",{value:this.value,target:t?.target})}catch(t){console.error("Error handling blur:",t)}}_handleFocus(t){if(!this.disabled)try{o(this,"focus",{value:this.value,target:t?.target})}catch(t){console.error("Error handling focus:",t)}}_handleKeyDown(t){if(!this.disabled)try{if(!t)return;o(this,"keydown",{value:this.value,key:t.key,target:t.target})}catch(t){console.error("Error handling keydown:",t)}}_handleKeyUp(t){if(!this.disabled)try{if(!t)return;o(this,"keyup",{value:this.value,key:t.key,target:t.target})}catch(t){console.error("Error handling keyup:",t)}}reset(){try{const t=this.value;this._setValue(""),void 0!==this._initialValue&&this._setValue(this._initialValue);const e=this.shadowRoot?.querySelector("input");e&&(e.value=this.value||"",setTimeout((()=>{e&&(e.value=this.value||"")}),0)),this._errorController.clearError(),this._updateFormValue(),o(this,"change",{value:this.value,isReset:!0,previousValue:t})}catch(t){console.error("Error in wm-input reset method:",t)}}formResetCallback(){try{super.formResetCallback?.(),this.reset(),setTimeout((()=>{const t=this.shadowRoot?.querySelector("input");t&&t.value!==(this.value||"")&&(t.value=this.value||"",t.dispatchEvent(new Event("input",{bubbles:!0})))}),10)}catch(t){console.error("Error in wm-input formResetCallback:",t)}}setValue(t,e={}){const r=!1!==e.validate,i=!0===e.silent,s=this.value;return this._setValue(void 0!==t?t:""),r&&!this.disabled&&this._errorController.validate(),i||o(this,"change",{value:this.value,previousValue:s,isProgrammatic:!0}),this.value}setDisabled(t){this.disabled=Boolean(t),this.requestUpdate()}validateField(){return this.checkValidity()}updateUI(){this.requestUpdate()}_setValue(t){this.value=t||"";const e=this._inputElement||this.shadowRoot?.querySelector("input");e&&e.value!==this.value&&(e.value=this.value),void 0===this.defaultValue&&(this.defaultValue=this.value),this._updateFormValue()}checkValidity(){try{const t=this._validateWithoutController();return this.hasError=!!t,this.error=t||"",this._errorController&&!this._errorController._isValidating&&(t?this._errorController.setError(t):this._errorController.clearError()),t||""}catch(t){return console.error("Error checking validity:",t),this.errormessage||"Validierungsfehler"}}setCustomValidity(t){try{const e=this.shadowRoot?.querySelector("input");e&&"function"==typeof e.setCustomValidity&&(e.setCustomValidity(t||""),t?this._errorController.setError(t):this._errorController.clearError())}catch(t){console.error("Error setting custom validity:",t)}}reportValidity(){try{const t=this.shadowRoot?.querySelector("input");return!t||"function"!=typeof t.reportValidity||t.reportValidity()}catch(t){return console.error("Error reporting validity:",t),!1}}_toggleOptions(){try{"combobox"===this._originalType&&(this._showOptions=!this._showOptions)}catch(t){console.error("Error toggling options:",t)}}_cancelSearch(){setTimeout((()=>{this._searchButton&&(this.value="",this._searchButton.focus(),this._searchVisible=!1)}),0)}hideOptions(t=!0){try{this._showOptions=!1,t&&this._inputElement&&this._inputElement.focus()}catch(t){console.error("Error hiding options:",t)}}updated(t){try{if(super.updated?.(t),t.has("disabled")&&!this.disabled){this._errorController.clearError();const t=this._inputElement||this.shadowRoot?.querySelector("input");t&&(t.removeAttribute("aria-invalid"),t.setCustomValidity(""),t.value!==this.value&&(t.value=this.value||""))}t.has("value")&&this._updateFormValue()}catch(t){console.error("Error in updated lifecycle method:",t)}}render(){try{let t="";return this._hasHint&&(t+="hint"),this.hasError&&(t+=" error-message"),this._renderElement(e`
				<input
					type="${this.type||"text"}"
					autocomplete=${i(this.autocomplete)}
					pattern="${i(this.pattern)}"
					aria-describedby="${i(""!==t?t:void 0)}"
					aria-disabled="${i(!!this.disabled||void 0)}"
					aria-invalid="${i(!!this.hasError||void 0)}"
					placeholder="${i(this.placeholder)}"
					?required=${this.required}
					?multiple=${this.multiple}
					maxlength="${i(this.maxlength)}"
					id="${this._formId||""}"
					.value=${this.value||""}
					@input="${this.disabled?void 0:this._handleInput}"
					@blur="${this.disabled?void 0:this._handleBlur}"
					@focus="${this.disabled?void 0:this._handleFocus}"
					@change="${this.disabled?void 0:this._handleChange}"
					@keydown="${this.disabled?void 0:this._handleKeyDown}"
					@keyup="${this.disabled?void 0:this._handleKeyUp}"
					?disabled=${this.disabled}
					@click="${this.disabled?void 0:this._handleClick}"
					role="${i("combobox"===this._originalType?"combobox":void 0)}"
					aria-expanded="${i("combobox"===this._originalType?this._showOptions:void 0)}"
					aria-activedescendant="${i(this._highlightedOptionID?this._highlightedOptionID:void 0)}"
					aria-owns="${i("combobox"===this._originalType?"options":void 0)}"
					aria-controls="${i("combobox"===this._originalType?"options":void 0)}"
					part="input"
				/>
				${s("password"===this._originalType,(()=>e`
						<wm-button
							kind="clean"
							class="password-button"
							@click="${this.disabled?void 0:this._showPassword}"
							?disabled=${this.disabled}
						>
							<button
								aria-pressed="${this._passwordVisible?"true":"false"}"
								type="button"
								?disabled=${this.disabled}
							>
								<wm-icon iconid="${this._passwordVisible?"hide":"show"}">
									Info anzeigen
								</wm-icon>
							</button>
						</wm-button>
					`))}
				${s(this.toggleButton,(()=>e`
						<wm-button
							kind="clean"
							class="input-button"
							@click="${this.disabled?void 0:this._toggleOptions}"
							?disabled=${this.disabled}
						>
							<button
								aria-pressed="${this._showOptions?"true":"false"}"
								type="button"
								?disabled=${this.disabled}
							>
								<wm-icon
									iconid="${this._showOptions?"chevron-up":"chevron-down"}"
								>
									Vorschläge zeigen
								</wm-icon>
							</button>
						</wm-button>
					`))}
			`)}catch(t){return console.error("Error rendering input component:",t),e`<div>Error rendering component</div>`}}showError(t){this._errorController&&this._errorController instanceof l&&this._errorController.setError(t)}clearError(){this._errorController&&this._errorController instanceof l&&this._errorController.clearError()}_performValidation(){if(!0===this.disabled)return"";const t=this._validateWithoutController();return t?this._errorController.setError(t):this._errorController.clearError(),t}_validateWithoutController(){try{if(this.disabled)return"";const t=this.shadowRoot?.querySelector("input");if(!t)return"";t.setCustomValidity("");let e="";if(this._hasInteracted||this.showErrors){if(!this.required||this.value&&""!==this.value.trim()){if(this.pattern&&this.value&&!new RegExp(this.pattern).test(this.value))e=this.errormessage||"Bitte geben Sie einen Wert im erforderlichen Format ein";else if("function"==typeof this.validator&&this.value){const t=this.validator(this.value);t&&"string"==typeof t&&(e=t)}}else e=this.errormessage||"Dieses Feld ist erforderlich";e&&t&&"function"==typeof t.setCustomValidity&&t.setCustomValidity(e)}return e}catch(t){return console.error("Error validating input:",t),this.errormessage||"Validierungsfehler"}}}customElements.define("wm-input",n);const h="wm-input";export{n as Input,h as tagName};
