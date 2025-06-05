/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";import{n as o}from"../../when-741bb8d9.js";import{f as s}from"../../form.styles-3cb5bbeb.js";import{getFocusableChildren as l}from"../misc/utils.js";import"../../unsafe-html-4e49b66a.js";import"../../directive-16e189ed.js";const n=[t`
  * {
    box-sizing: border-box;
  }



  .wrapper {
    max-width: var(--formblock-max-inline-size);
  }

  ::slotted(div:not(:first-child)) {
    margin-top: var(--formblock-gap) !important;
  }

  ::slotted(h2) {
    margin-top: 0 !important;
  }



  .controls {
    margin-top: 1em;
  }

  button:focus-visible {
    outline-offset: var(--wm-theme-site-focus-outline-offset) !important;
    outline: var(--_button-focus-outline, var(--wm-theme-site-focus-outline)) !important;
  }

  [hidden] {
    display: none;
  }
`];class r extends e{static properties={duplicate:{type:String,reflect:!0},deleteLabel:{type:String},duplicateLabel:{type:String},cloneHeadingLabel:{type:String},highlight:{type:String,reflect:!0},min:{type:Number},max:{type:Number},type:{type:String,reflect:!0},_clone:{type:Node},_cloned:{type:String,reflect:!0},_last:{type:Boolean}};get _deleteButton(){return this.renderRoot.querySelector("#delete-button")??null}get _clones(){return this.querySelectorAll("[data-clone]")??null}get _formChildComponents(){return this.querySelectorAll("wm-input, wm-textarea, wm-select, wm-radio, wm-checkbox, wm-upload")??null}static styles=[s,n];constructor(){super(),this.cloneHeadingLabel=void 0,this.highlight=void 0,this.type=void 0,this.duplicateLabel="Weitere hinzufügen",this.deleteLabel="Löschen",this.duplicate=void 0,this.min=1,this.max=void 0,this._clone=void 0,this._cloned=void 0,this._last=!0}connectedCallback(){super.connectedCallback()}_deleteBlock(t){const e=t.target.closest("[data-clone]").id;t.target.closest("[data-clone]").remove(),this.requestUpdate();const i=this._clones.length?this._clones[this._clones.length-1]:this;this._focusFormBlockItem(i),this._rewriteHeadings(),this._clones.forEach(((t,e)=>{this._rewriteUniqueAttributeValues(t,e+1)})),this.dispatchEvent(new Event("delete",{bubbles:!0,composed:!0}));const o={bubbles:!0,composed:!0,detail:{totalBlocks:this._clones.length+1,totalClones:this._clones.length,deletedBlock:e}};this.dispatchEvent(new CustomEvent("wm-block-deleted",o))}_focusFormBlockItem(t){setTimeout((()=>{l(t)[0].focus()}),0)}_rewriteUniqueAttributeValues(t,e,i=!1){const o=t.querySelectorAll(":is(wm-input, input, wm-textarea, textarea, wm-select, select, wm-upload, wm-switch, wm-radio, wm-checkbox, label):is([id],[name],[for])");t.setAttribute("id",`${this.duplicate}-${e}`),t.dataset.clone="true";for(let t=0;t<o.length;t++){const s=o[t];this._rewriteUniqueAttributeValue(s,"for",e),this._rewriteUniqueAttributeValue(s,"name",e),this._rewriteUniqueAttributeValue(s,"id",e),i&&(s.value="",s.removeAttribute("setvalue"))}}_rewriteUniqueAttributeValue(t,e,i){const o=this.querySelector(`#${this.duplicate}`);t.hasAttribute(e)&&(t.hasAttribute(`data-${e}`)?t.setAttribute(e,`${t.getAttribute(`data-${e}`).replace("$",i)}`):t.hasAttribute(`data-${e}-ref`)?t.setAttribute(e,`${t.getAttribute(`data-${e}-ref`)}-${i}`):(t.setAttribute(`data-${e}-ref`,o.querySelector(`[${e}="${t.getAttribute(e)}"]`).getAttribute(e)),t.setAttribute(e,`${t.getAttribute(e)}-${i}`)))}_addDeleteButton(t){const e=this._deleteButton.cloneNode(!0);e.querySelector("button").addEventListener("click",this._deleteBlock.bind(this)),e.removeAttribute("id"),e.removeAttribute("hidden"),t.append(e)}_rewriteHeadings(){if(this.cloneHeadingLabel&&this.cloneHeadingLabel.endsWith("$"))for(let t=0;t<this._clones.length;t++){this._clones[t].querySelectorAll("h2, h3, h4")[0].textContent=this.cloneHeadingLabel.replace("$",t+1)}}_duplicateBlock(){if(this.duplicate){this._clone=this.querySelector(`#${this.duplicate}`).cloneNode(!0),this._setupClone(this._clone,this._clones.length,!0),this.append(this._clone),this._focusFormBlockItem(this._clone);const t={bubbles:!0,composed:!0,detail:"id"};this._clone.dataset.cloneReady="true",this.dispatchEvent(new CustomEvent("wm-block-duplicated",t))}}_setupClone(t,e,i=!1){this._rewriteUniqueAttributeValues(t,e,i),this._addDeleteButton(t),this.cloneHeadingLabel&&(t.querySelectorAll("h2, h3, h4")[0].textContent=this.cloneHeadingLabel.replace("$",e+1)),t.dataset.cloneReady="true"}async getUpdateComplete(){if(await super.getUpdateComplete(),this._formChildComponents.length){const t=[];for(let e=0;e<this._formChildComponents.length;e++)t.push(this._formChildComponents[e].updateComplete);await Promise.all(t)}}_checkForClones(){setTimeout((async()=>{await this.updateComplete;for(let t=0;t<this._clones.length;t++){const e=this._clones[t];e.dataset.cloneReady||this._setupClone(e,t)}}),0)}render(){return i`
			<div class="wrapper" part="wrapper">
				<slot
					@slotchange=${{handleEvent:()=>this._checkForClones(),once:!1}}
				></slot>
			</div>

			<wm-button
				size="xs"
				part="delete"
				id="delete-button"
				hidden
				kind="secondary"
			>
				<button>
					<wm-icon iconid="trash"></wm-icon>
					${this.deleteLabel}
				</button>
			</wm-button>
			${o(this.duplicate&&!this.max||this.max&&this._clones.length<this.max,(()=>i`
					<wm-button part="duplicate" size="s" ?hidden="${!this._last}">
						<button @click="${this._duplicateBlock}" class="add">
							<span aria-hidden="true">+</span> ${this.duplicateLabel}
						</button>
					</wm-button>
				`))}
		`}}customElements.define("wm-formblock",r);const a="wm-formblock";export{r as FormBlock,a as tagName};
