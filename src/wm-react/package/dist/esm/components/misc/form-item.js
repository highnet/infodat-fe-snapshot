/* @copyright Stadt Wien - Wiener Melange 200 */
import"../../lit-element-8d7b5fe2.js";import{x as t}from"../../lit-html-34d0b6a8.js";import{n as e}from"../../when-741bb8d9.js";import{e as i}from"../../class-map-b15037ef.js";import{o as s}from"../../unsafe-html-4e49b66a.js";import{FormWrapper as o}from"./form-wrapper.js";import{dispatchCustomEvent as r}from"./utils.js";import"../../directive-16e189ed.js";import"./slot.js";import"./error-state-controller.js";import"./error-tracking.js";const a=a=>{class n extends(o(a)){get _options(){return this.shadowRoot?.querySelector('slot[name="options"]').assignedNodes()[0]??null}get _renderdOptions(){return this.shadowRoot?.querySelectorAll(".option")??null}get _input(){return this.shadowRoot?.querySelector("input")??null}get _item(){return this.shadowRoot?.querySelectorAll("input, select, textarea, [role='switch']")[0]??null}get _searchButton(){return this.shadowRoot?.querySelector(".search-button")??null}static properties={autocomplete:{type:String},disabled:{type:Boolean},hideLabel:{type:Boolean},info:{type:String},_hasInfo:{type:Boolean},_infoOpen:{type:Boolean},_optionItems:{type:Array},_originalOptionItems:{type:Array},_searchVisible:{type:Boolean,reflect:!0},_selectedOption:{type:Number},_showOptions:{type:Boolean},_optionSelected:{type:Boolean}};constructor(){super(),this.value="",this.autocomplete=void 0,this.disabled=!1,this.hideLabel=!1,this.info=void 0,this._hasInfo=!1,this._infoOpen=!1,this._msgID=!1,this._selectedOption=-1,this._searchVisible=!1,this._optionItems=[],this._originalOptionItems=[],this._showOptions=!1,this._optionSelected=!1}connectedCallback(){super.connectedCallback()}_updateOptions(){if(this._optionItems=[],this._options){const t=this._getList(this._options.querySelectorAll(":scope >  li"));this._optionItems=t,this._originalOptionItems=t}}_getList(t){const e=[];let i=[],s="";for(const o of t){i=[],s=o.childNodes[0].innerHTML||o.childNodes[0].textContent,o.querySelectorAll("ul > li").length&&(i=this._getList(o.querySelectorAll("ul > li")),s=o.childNodes[0].textContent),o.querySelector("a")&&(s=o.querySelector("a").textContent);const t={text:s,id:o.id,children:i,value:o.getAttribute("data-value")||o.getAttribute("value")};o.querySelector("a")&&(t.href=o.querySelector("a").getAttribute("href")),e.push(t)}return e}updated(t){super.updated(t),t.has("value")&&(this._internals.setFormValue(this.value),this.value&&this._item.dispatchEvent(new Event("input",{bubbles:!0}))),this._hasInfo=this.info||this._slotController.hasNamedSlot("info")}showError(t){this._errorController.setError(t)}clearError(){this._errorController.clearError()}_renderOption(i){return t`
				${e(i.href,(()=>t` ${e(i.children.length,(()=>t`
						<div class="option-heading">${i.text}</div>
						${i.children.map((t=>this._renderOption(t)))}
					`),(()=>t`
						<a class="option" href="${i.href}" id="${i.id}">
							${e(i.file,(()=>t`
									<!-- Conditionally render image-container if item.file exists -->
									<div class="image-container">
										<img src="${i.file}" alt="">
									</div>
								`))}
							<div class="text-container">
								${e(i.text,(()=>t`
										<!-- Conditionally render main-content if item.text exists -->
										<span class="main-content">${s(i.text)}</span>
									`))}
								${e(i.subText,(()=>t`
										<!-- Conditionally render additional-content if item.subText exists -->
										<span class="additional-content">${s(i.subText)}</span>
									`))}
							</div>
						</a>
					`))}`),(()=>t` ${e(i.children.length,(()=>t`<div class="option-heading">${i.text}</div>
								${i.children.map((t=>this._renderOption(t)))} `),(()=>t`<div
									class="option"
									role="option"
									aria-selected="false"
									tabindex="-1"
									value="${i.value}"
									id="${i.id}"
									data-row2="${i.row2}"
									data-row3="${i.row3}"
								>
									${s(this._highlightText(i.text))}
									${e(i.row2,(()=>t`<br />${s(`<span class="row">${i.row2}</span>`)}`))}
									${e(i.row3,(()=>t`<br />${s(`<span class="row">${i.row3}</span>`)}`))}
								</div>`))}`))}
			`}_highlightText(t){if(!this.value||!t||""===this.value.trim())return`<span class="text">${t}</span>`;try{const e=this.value.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/[-\s]/g,"[-\\s]*"),i=new RegExp(`(${e})`,"gi");let s=t;return t.toLowerCase().replace(/[-\s]/g,"").includes(this.value.toLowerCase().replace(/[-\s]/g,""))&&(s=t.replace(i,'<mark style="padding: 0;">$1</mark>')),`<span class="text">${s}</span>`}catch(e){return`<span class="text">${t.replace(this.value,`<mark style="padding: 0;">${this.value}</mark>`)}</span>`}}_toggleSearch(){this._searchVisible=!this._searchVisible,setTimeout((()=>{this._searchVisible?this._input.focus():(this.hideOptions(),this._cancelSearch())}),0)}_cancelSearch(){setTimeout((()=>{this._searchButton&&(this.value="",this._searchButton.focus(),this._searchVisible=!1)}),0)}_handleChange(t){this.value=t.target.value,r(this,"change",{value:this.value,target:t.target}),this._internals.setFormValue(this.value),this.validate&&this._errorController.validate()}_handleInput(t){this.value=t.target.value,r(this,"input",{value:this.value,target:t.target}),this.validate&&this._errorController.validate()}_handleBlur(t){this.validate&&this._errorController.validate(),r(this,"blur",{value:t.target.value,target:t.composedPath()[0]})}_handleFocus(t){r(this,"focus",{value:t.target.value,target:t.composedPath()[0]})}_handleInvalid(t){this._errorController.setError(t)}formAssociatedCallback(t){this._form=t}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.value=this.defaultValue,this._errorController.clearError()}_renderItem(s){const o={"input-visible":this._searchVisible};return this._renderWrapper(t`
				${e("checkbox"===this.type||"radio"===this.type||"switch"===this.type,(()=>t`
						<wm-stack horizontal gap="xs">
							<div class="horizontal-form-control">
								${s} ${this._renderLabel()}
							</div>
						</wm-stack>
					`),(()=>t`
						${this._renderLabel()}
						${e(this._hasHint,(()=>t`
								<div id="hint">
									<div><slot name="hint">${this.hint}</slot></div>
								</div>
							`))}
						<wm-stack grow gap="xs" horizontal wrap>
							<div class="vertical-form-control" style="position:relative;">
								<div
									class="input ${i(o)}"
									style="${"select"!==this.type&&this.size?`max-width: ${this.size}ch`:""}"
								>
									${e(this.search,(()=>t` <wm-button
											kind="clean"
											class="btn-close-search"
										>
											<button
												@click="${this._toggleSearch}"
												aria-expanded="${this._searchVisible}"
											>
												<wm-icon iconid="chevron-left">Suche schließen</wm-icon>
											</button>
										</wm-button>`))}
									${s}
								</div>

								${e(this.search,(()=>t`
										<wm-button kind="clean" class="btn-search">
											<button
												@click="${this._toggleSearch}"
												aria-expanded="${this._searchVisible}"
												class="search-button"
											>
												${e("hidden"===this.search,(()=>t`<span aria-hidden="true">Suche</span>`))}
												<wm-icon iconid="search">Suche</wm-icon>
											</button>
										</wm-button>
									`))}
							</div>
						</wm-stack>
					`))}

				<div class="auto-suggest" ?hidden="${!this._optionItems.length}" part="auto-suggest">
					<slot
						name="options"
						@slotchange="${this._updateOptions}"
						hidden
					></slot>

					${e(this._optionItems.length&&this._optionItems[0].type,(()=>t`
							<div ?hidden="${!this._showOptions}" id="options">
								${this._optionItems.map((t=>this._renderOption(t)))}
							</div>
						`),(()=>t`
							<div role="listbox" aria-label="Vorschläge" ?hidden="${!this._showOptions}" id="options">
								${this._optionItems.map((t=>this._renderOption(t)))}
							</div>
						`))}
				</div>
			`)}}return n};export{a as FormItem};
