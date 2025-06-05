/* @copyright Stadt Wien - Wiener Melange 200 */
import{s as e}from"../../lit-element-8d7b5fe2.js";import{x as t}from"../../lit-html-34d0b6a8.js";import{n as i}from"../../when-741bb8d9.js";import{o as s}from"../../if-defined-d257cee1.js";import{e as l}from"../../class-map-b15037ef.js";import"../../directive-16e189ed.js";class o extends e{get _fieldsets(){return this.querySelectorAll("fieldset")??null}get _lists(){return this.querySelectorAll(".list")??null}get _inputs(){return this.querySelectorAll("input:not(.check-all)")??null}get _dropdownButton(){return this.querySelector(".filter-dropdown-button")??null}get _output(){return document.querySelector('[role="status"]')??null}static properties={label:{type:String,reflect:!0},searchLabel:{type:String,reflect:!0},dismissLabel:{type:String,reflect:!0},selectedLabel:{type:String,reflect:!0},selectLabel:{type:String,reflect:!0},type:{type:String,reflect:!0},open:{type:Boolean,reflect:!0},controls:{type:Boolean,reflect:!0},totals:{type:Object,attribute:!1},_selection:{type:Array,attribute:!1},_newSelection:{type:Array,attribute:!1,reflect:!0}};constructor(){super(),this.label="Erweiterte Filter",this.searchLabel="Anwenden",this.dismissLabel="Abbrechen",this.selectLabel="Auswählen",this.selectedLabel="ausgewählt",this.type=void 0,this.open=!1,this.controls=!1,this.totals={all:{total:this._inputs.length,checked:0,active:0}},this._selection=[],this._newSelection=[]}connectedCallback(){super.connectedCallback(),this._registerCheckboxes(),this._updateTotalChecked()}updated(e){e.has("_newSelection")&&(this._updateCheckboxes(),this._updateTotalChecked())}firstUpdated(){this._addEvents()}_updateTotalChecked(){this.totals.all.checked=0,Array.from(this._fieldsets).forEach(((e,t)=>{this._newSelection[t].checked=Array.from(e.querySelectorAll("input")).filter((e=>e.checked)).length,this.totals.all.checked+=this._newSelection[t].checked})),this.requestUpdate()}_addEvents(){this.addEventListener("change",this._check),this.addEventListener("wm-filter-selection-removed",this._uncheck),document.addEventListener("click",this._clickOutSide.bind(this)),this.addEventListener("keyup",(e=>{"Escape"===e.code&&this.open&&(e.preventDefault(),"dropdown"===this.type&&this._toggleDropdown(),this._dropdownButton.focus())}))}_clickOutSide(e){!e.target.closest("wm-filter")&&this.open&&this._toggleDropdown()}_uncheck(e){Array.from(this._newSelection).forEach(((t,i)=>{t.items.forEach((t=>{if(0===e.detail){t.checked=!1,this.querySelector(`#${t.id}`).checked=!1;const e=new URL(document.location).searchParams;e.delete(t.name),window.history.replaceState(null,"",`${window.location.origin}${window.location.pathname}?${e}`)}else t.id===e.detail&&(t.checked=!1,this.querySelector(`#${t.id}`).checked=!1,window.history.replaceState(null,"",`${window.location.origin}${window.location.pathname}${window.location.search.replace(`${encodeURI(t.name)}=${t.value}`,"")}`))})),this._updateParentCheckbox(i)})),this._selection=JSON.parse(JSON.stringify(this._newSelection)),this._updateTotalChecked()}_check(e){if(e.target.classList.contains("check-all"))return;const t=e.target.dataset.index;this._newSelection[t].items.map((t=>(t.value===e.target.value&&(t.checked=!t.checked),t))),this._updateParentCheckbox(t),this._updateTotalChecked()}_updateParentCheckbox(e){const t=this._newSelection[e].items.filter((e=>e.checked)).length,i=this._lists[e].querySelector(".check-all");i&&(i.indeterminate=!1,i.checked=!0,0===t?i.checked=!1:this._newSelection[e].items.length!==t&&(i.indeterminate=!0))}_registerCheckboxes(){for(let e=0;e<this._fieldsets.length;e++){const t=this._fieldsets[e],i=t.querySelector("legend"),s=t.querySelectorAll('input[type="checkbox"], input[type="radio"]'),l=new URL(document.location).searchParams;this._selection.push({total:s.length,checked:0,items:[]});let o=0;for(let n=0;n<s.length;n++){const c=s[n];c.dataset.index=e;const r=l.getAll(s[n].name);this._selection[e].items.push({id:c.id,parentid:this.id,parentlabel:i.textContent,value:c.value,name:c.name,label:t.querySelector(`[for="${c.id}"]`).textContent,checked:-1!==r.indexOf(c.value)}),-1!==r.indexOf(c.value)&&o++}this._selection[e].checked=o,this.totals.all.active+=o}this._newSelection=JSON.parse(JSON.stringify(this._selection)),this._showSelection(this._newSelection)}_checkAll(e,t){this._newSelection[e].items=this._newSelection[e].items.filter((e=>(e.checked=t.target.checked,e)));const i=this._newSelection;this._newSelection=[],this._newSelection=i}_updateCheckboxes(){Array.from(this._newSelection).forEach(((e,t)=>{e.items.forEach(((e,i)=>{this._fieldsets[t].querySelectorAll("input")[i].checked=e.checked})),this._updateParentCheckbox(t)}))}_abort(){this._newSelection=JSON.parse(JSON.stringify(this._selection)),"dropdown"===this.type&&this._toggleDropdown(),this._dropdownButton.focus()}submit(){this._selection=JSON.parse(JSON.stringify(this._newSelection)),this.totals.all.active=0,Array.from(this._fieldsets).forEach(((e,t)=>{this._selection[t].checked=Array.from(e.querySelectorAll("input")).filter((e=>e.checked)).length,this.totals.all.active+=this._selection[t].checked})),this.totals.all.active=this.totals.all.checked,"dropdown"===this.type&&this.open&&this._toggleDropdown(),this._dropdownButton.focus(),this._output.textContent=`${this.totals.all.checked} von ${this.totals.all.total} Filteroptionen ausgewählt`,this.dispatchEvent(new CustomEvent("wm-filter-selection-submitted",{detail:{},bubbles:!0,composed:!0}))}updateSelection(){this._selection=[],this._registerCheckboxes()}_showSelection(e){setTimeout((()=>{this.dispatchEvent(new CustomEvent("wm-filter-selected",{detail:e,bubbles:!0,composed:!0}))}),0)}_toggleDropdown(){this.open=!this.open,this.open&&document.querySelector("wm-filter[open]")&&document.querySelector("wm-filter[open]")._toggleDropdown()}_renderCheckboxes(){const e={"list--single":1===this._fieldsets.length};return t`
			<div class="content">
				${Array.from(this._fieldsets).map(((o,n)=>{const c=o.querySelector("legend");return c.classList.add("wm-h-vh"),t`
						<div class="list ${l(e)}">
							${i(1===this._fieldsets.length,(()=>t`${o}`),(()=>t`
									<input
										type="checkbox"
										class="check-all"
										id="check_${n}"
										@change="${this._checkAll.bind(this,n)}"
										indeterminate="true"
									/>
									<label for="check_${n}" class="wm-h-vh"
										>${c.textContent}</label
									>
									<wm-details
										full
										open="${s(1===this._fieldsets.length||void 0)}"
									>
										<span slot="label">
											<strong>${c.textContent}</strong>
											${i(this._newSelection[n].checked,(()=>t`(${this._newSelection[n].checked} von
														${this._newSelection[n].items.length})
														<span class="wm-h-vh">${this.selectedLabel}</span>`))}
										</span>
										<div slot="content">${o}</div>
									</wm-details>
								`))}
						</div>
					`}))}
			</div>
		`}_renderTotalSelected(){return t`
			${i(this.totals.all.checked>0,(()=>t`
					${this.totals.all.checked} von ${this.totals.all.total}
					${this.selectedLabel}
				`),(()=>t`${this.selectLabel}`))}
		`}_renderFilterControls(){return t`${i(this.controls,(()=>t`
				<wm-stack gap="xs">
					<wm-button full kind="primary" size="s">
						<button @click="${this.submit}" type="button">
							${this.searchLabel}
						</button>
					</wm-button>
					<wm-button full kind="secondary" size="s">
						<button @click="${this._abort}" type="button">
							${this.dismissLabel}
						</button>
					</wm-button>
				</wm-stack>
			`))}`}_renderFilters(){const e={"filter-dropdown-content--controls":this.controls};return t`
			${i("dropdown"===this.type,(()=>t`
					<strong id="label_${this.getAttribute("id")}">${this.label}</strong>

					<div class="filter-dropdown-wrapper">
						<button
							class="filter-dropdown-button"
							aria-expanded="${this.open}"
							@click="${this._toggleDropdown}"
							type="button"
							aria-labelledby="label_${this.getAttribute("id")}"
						>
							${this._renderTotalSelected()}
						</button>

						<div
							class="filter-dropdown-content ${l(e)}"
							hidden
						>
							${this._renderCheckboxes()}
							${i(this.controls,(()=>t`
									<div class="controls">
										${i(this.totals.all.checked>0||this.totals.all.checked!==this.totals.all.active,(()=>t` ${this._renderFilterControls()} `),(()=>t`

              <wm-button full kind="primary" color="nebelgrau" size="s">
                <button @click="${this._toggleDropdown}"  type="button">
                  Schliessen
                </button>
              </wm-button>
            </div>
            `))}
									</div>
								`))}
						</div>
					</div>
				`),(()=>t`
					<wm-stack vertical gap="xs">
						<h3>${this.label} ${this._renderTotalSelected()}</h3>

						${this._renderCheckboxes()} ${this._renderFilterControls()}
					</wm-stack>
				`))}
		`}createRenderRoot(){return this}render(){return t`
			${this._renderFilters()}
			<slot></slot>
		`}}customElements.define("wm-filter",o);export{o as Filter};
