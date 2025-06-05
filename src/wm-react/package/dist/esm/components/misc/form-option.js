/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as e}from"../../lit-element-8d7b5fe2.js";import{x as t}from"../../lit-html-34d0b6a8.js";import{n as s}from"../../when-741bb8d9.js";import{FormWrapper as i}from"./form-wrapper.js";import{f as a}from"../../form-item.styles-b671e7a9.js";import{f as l}from"../../form.styles-3cb5bbeb.js";import{o as h}from"../../if-defined-d257cee1.js";import{l as r}from"../../live-77c73e47.js";import{dispatchCustomEvent as n}from"./utils.js";import{g as d}from"../../wiener-melange.bundle.min-ae18d627.js";import"./slot.js";import"../../class-map-b15037ef.js";import"../../directive-16e189ed.js";import"./error-state-controller.js";import"./error-tracking.js";import"../../unsafe-html-4e49b66a.js";const o=new CSSStyleSheet;o.replaceSync(d);const c=d=>{class c extends(i(d)){get _items(){return this.shadowRoot?.querySelectorAll("input")??null}static properties={legend:{type:String},labels:{type:String,reflect:!0},values:{type:String,reflect:!0},disabled:{type:String,reflect:!0,attribute:"disabled"},indeterminate:{type:Boolean,reflect:!0},_options:{type:Array},checked:{type:String,reflect:!0}};static styles=[o,l,a,e`
				#hint {
					margin-block: var(--wm-spacing-xxs);
				}
			`];constructor(){super(),this.legend="",this._options=[],this.labels="",this.disabled="",this.values="",this.checked=""}connectedCallback(){super.connectedCallback(),this._setOptionViaAttributes(),this._validateOptions(),n(this,"defined",{})}_handleEvent(e){this.disabled&&e.stopImmediatePropagation()}_validateOptions(){setTimeout((()=>{this._items&&this._items.forEach((e=>{e.addEventListener("change",(()=>{if("checkbox"===this.type){const e=!this.required||this.value.length>0;this._internals.setValidity({valueMissing:!e},e?"":"Bitte wählen Sie mindestens eine Option aus")}else this._internals.setValidity(e.validity,e.validationMessage,e);this.validate&&this.checkValidity()}))}))}),0)}_handleBlur(e){n(this,"blur",{value:this.value,target:e.target})}_handleFocus(e){n(this,"focus",{value:this.value,target:e.target})}_handleInput(e){n(this,"input",{value:this.value,target:e.target})}_handleClick(e){e&&e.target&&(e.target.disabled||n(this,"click",{value:e.target.value,target:e.target,checked:e.target.checked}))}updated(e){super.updated(e),(e.has("disabled")||e.has("labels")||e.has("values")||e.has("checked"))&&this._setOptionViaAttributes()}_handleChange(e){const t=Array.from(this._items).filter((e=>e.checked)).map((e=>e.value));this.value=t,this.required&&(t.length>0?this._items.forEach((e=>e.removeAttribute("required"))):this._items.forEach((e=>e.setAttribute("required","required")))),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),n(this,"change",{value:this.value}),this._internals.setFormValue(this.value.join(","))}setOptions(e){this._options=[...e],this.requestUpdate()}getOptions(){return this._options}_validateInputArrays(){if(!this._labels||!this._values)return console.error(`${this.tagName}: labels and values are required`),!1;if("radio"===this.type&&this._checkedValues&&this._checkedValues.length>0&&(this._checkedValues.length>1&&(console.warn(`${this.tagName}: Radio buttons can only have one checked value. Using first value: ${this._checkedValues[0]}`),this._checkedValues=[this._checkedValues[0]]),this._values.includes(this._checkedValues[0])||(console.warn(`${this.tagName}: Invalid radio value: ${this._checkedValues[0]}. Valid values are: [${this._values.join(",")}]`),this._checkedValues=[])),this._labels.length!==this._values.length){console.warn(`${this.tagName}: labels (${this._labels.length}) and values (${this._values.length}) have different lengths. Using shorter length.`);const e=Math.min(this._labels.length,this._values.length);this._labels=this._labels.slice(0,e),this._values=this._values.slice(0,e)}if(this._disabled&&this._disabled.length>0&&this._disabled.length<this._values.length)for(console.info(`${this.tagName}: disabled array length (${this._disabled.length}) is shorter than values length (${this._values.length}). Filling with false.`);this._disabled.length<this._values.length;)this._disabled.push(!1);if(this._checkedValues&&this._checkedValues.length>0){const e=new Set(this._values),t=this._checkedValues.filter((t=>!e.has(t)));t.length>0&&(console.warn(`${this.tagName}: Invalid checked values found: [${t.join(",")}]. These will be filtered out.`),this._checkedValues=this._checkedValues.filter((t=>e.has(t))))}return!0}_setOptionViaAttributes(){if(""!==this.labels)try{this._labels=this.labels.split(";"),this._values=this.values.split(";"),this._disabled=[],"boolean"==typeof this.disabled?this._disabled=Array(this._values.length).fill(this.disabled):"string"==typeof this.disabled&&this.disabled&&(this._disabled=this.disabled.split(";").map((e=>"true"===e.trim().toLowerCase()))),this._checkedValues=this.checked?this.checked.split(";"):[],this._validateInputArrays();const e=Math.min(this._labels.length,this._values.length),t=[];for(let s=0;s<e;s++){const e=this._labels[s]||"",i=this._values[s]||"",a=s<this._disabled.length&&this._disabled[s];t.push({text:e,value:i,disabled:a,checked:"radio"===this.type?i===this.checked:this._checkedValues.includes(i)})}this.setOptions(t)}catch(e){console.error(`Error in ${this.tagName} _setOptionViaAttributes:`,e),this.setOptions([])}}_renderOptionContainer(e=!1){let s="";return e&&(s+="hint"),this.hasError&&(s+="error-message"),t`
				${this._options.map(((e,i)=>t`
						<div class="option-container">
							<input
								autocomplete=${h(this.autocomplete)}
								type="${this.type}"
								id="${this._formId}-${i}"
								.value=${e.value}
								@click="${this._handleClick}"
								@change="${this._handleChange}"
								@blur="${this._handleBlur}"
								@focus="${this._handleFocus}"
								.name=${r(this.name)}
								?checked=${e.checked}
								?disabled=${e.disabled}
								aria-disabled="${h(!!e.disabled||void 0)}"
								aria-invalid="${h(!!this.hasError||void 0)}"
								aria-describedby="${h(""!==s?s:void 0)}"
								?required=${this.required&&0===i}
							/>
							${this._renderLabel(e.text.trim(),`${this._formId}-${i}`)}
						</div>
					`))}
			`}_renderItem(e){return this._renderWrapper(t`
				${s(this.legend,(()=>t`
						<fieldset
							aria-describedby="${h(this._hasHint?"hint":"")} ${h(this.hasError?"error-message":"")}"
							aria-invalid="${h(this.hasError?"true":void 0)}"
						>
							<legend>${this.legend} ${this._showRequired()}</legend>

							${s(this._hasHint,(()=>t`
									<div id="hint">
										<div><slot name="hint">${this.hint}</slot></div>
									</div>
								`))}
							${this._renderOptionContainer()}
						</fieldset>
					`),(()=>t`
						${this._renderOptionContainer(!0)}
						${s(this._hasHint,(()=>t`
								<div id="hint">
									<div><slot name="hint">${this.hint}</slot></div>
								</div>
							`))}
					`))}
			`)}}return c};export{c as FormOption};
