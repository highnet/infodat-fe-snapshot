/* @copyright Stadt Wien - Wiener Melange 200 */
import{s as e}from"../../lit-element-8d7b5fe2.js";import{x as t}from"../../lit-html-34d0b6a8.js";import{n as s}from"../../when-741bb8d9.js";import{getFocusableChildren as i}from"../misc/utils.js";import"../../unsafe-html-4e49b66a.js";import"../../directive-16e189ed.js";class l extends e{static properties={filterid:{type:String,reflect:!0},resetlabel:{type:String,reflect:!0},categorize:{type:Boolean,reflect:!0},_selectedElements:{type:Array}};constructor(){super(),this.filterid=void 0,this.resetLabel="Alle entfernen",this._selectedElements=[],this.categorize=!1}connectedCallback(){super.connectedCallback(),this.filterid||console.error("Bitte filterid angeben."),this._addEvents()}_addEvents(){this.filterid.replaceAll(" ","").split(",").forEach((e=>{const t=document.querySelector(`#${e}`);t?t.addEventListener("wm-filter-selected",this._getSelections.bind(this)):console.warn(`Element with id "${e}" not found`)}))}_getSelections(e){e.detail.forEach((e=>{const t=e.items.filter((e=>e.checked));this._selectedElements=[...this._selectedElements,...t]})),this._selectedElements=[...new Map(this._selectedElements.map((e=>[e.id,e]))).values()]}_remove(e){const t=e.target.closest("button");let s=t.dataset.id;s?this._selectedElements=this._selectedElements.filter((e=>e.id!==s)):(this._selectedElements=[],s=0,this.closest("form")&&i(this.closest("form"))[0].focus());const l=t.dataset.parentid.replaceAll(" ","").split(","),n=new CustomEvent("wm-filter-selection-removed",{detail:s,bubbles:!0,composed:!0});l.forEach((e=>{document.querySelector(`#${e}`).dispatchEvent(n)})),this.dispatchEvent(new CustomEvent("wm-filter-updated",{detail:{trigger:s},bubbles:!0,composed:!0}))}createRenderRoot(){return this}render(){const e=new Set;return this.categorize?t`
				<ul>
					${this._selectedElements.map(((s,i)=>e.has(s.parentlabel)?"":(e.add(s.parentlabel),t`
								<li>
									<span id="parentlabel-${i}" class="label"
										>${s.parentlabel}:</span
									>
									<div>
										${this._selectedElements.filter((e=>e.parentlabel===s.parentlabel)).map((e=>t`
													<wm-button kind="secondary" size="xs">
														<button
															@click="${this._remove}"
															data-id="${e.id}"
															data-parentid="${e.parentid}"
															type="button"
															aria-describedby="parentlabel-${i}"
														>
															${e.label}
															<span class="wm-h-vh">entfernen</span>
															<wm-icon
																iconid="close"
																width="16"
																height="16"
															></wm-icon>
														</button>
													</wm-button>
												`))}
									</div>
								</li>
							`)))}
				</ul>
				${s(this._selectedElements.length,(()=>t`
						<wm-button kind="tertiary">
							<button
								@click="${this._remove}"
								data-parentid="${this.filterid}"
								type="button"
							>
								${this.resetLabel}
							</button>
						</wm-button>
					`))}
			`:t`
				<wm-stack gap="xxs" wrap="true" horizontal>
					${this._selectedElements.map((e=>t`
							<wm-button kind="secondary" size="xs">
								<button
									@click="${this._remove}"
									data-id="${e.id}"
									data-parentid="${e.parentid}"
									type="button"
								>
									${e.parentlabel}: ${e.label}
									<span class="wm-h-vh">entfernen</span>
									<wm-icon iconid="close" width="16" height="16"></wm-icon>
								</button>
							</wm-button>
						`))}
					${s(this._selectedElements.length,(()=>t`
							<wm-button kind="tertiary">
								<button
									@click="${this._remove}"
									data-parentid="${this.filterid}"
									type="button"
								>
									${this.resetLabel}
								</button>
							</wm-button>
						`))}
				</wm-stack>
				<slot></slot>
			`}}customElements.define("wm-filter-selection",l);export{l as FilterSelection};
