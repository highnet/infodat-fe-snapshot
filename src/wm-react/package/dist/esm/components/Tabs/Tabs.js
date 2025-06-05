/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as e,s as t}from"../../lit-element-8d7b5fe2.js";import{x as s}from"../../lit-html-34d0b6a8.js";import{getNodeIndex as a}from"../misc/utils.js";import"../../unsafe-html-4e49b66a.js";import"../../directive-16e189ed.js";const i=[e`
:host {
  border: var(--tabs-border);
  display: block;
  padding: var(--tabs-padding);
  width: 100%;
}

[role="tablist"] {
  display: flex;
  gap: var(--tabs-gap);
  justify-content: var(--tabs-alignment);
  margin-bottom: var(--tabs-spacing);
  overflow: auto;
}

/* Always show tabpanel content when printing the page */
@media not print {
  ::slotted([aria-hidden="true"]) {
    display: none;
  }
}

::slotted([aria-hidden="false"]) {
  display: block;
}

@media print {
  [role="tablist"] {
    display: none;
  }
}

`];class r extends t{get _tabcontainers(){return document.querySelectorAll("wm-tabs")??null}get _tabs(){return this.querySelectorAll(":scope > wm-tab")??null}get _tabpanels(){return this.querySelectorAll(":scope > wm-tabpanel")??null}static properties={selectedIndex:{type:Number,attribute:!1},_lastIndex:{type:Number,attribute:!1},_id:{type:String,attribute:!1},remember:{type:Boolean},theme:{type:String}};static styles=[i];constructor(){super(),this._id="",this._lastIndex=0,this.selectedIndex=0,this.remember=!1,this.theme="default"}connectedCallback(){super.connectedCallback(),this._setParams()}_setParams(){const e=document.location.pathname.split("/");this.searchParams=new URLSearchParams(window.location.search),this._id=`t_${a(this._tabcontainers,this)}_${e[e.length-2]}`;const t=new URL(document.location).searchParams.get("view")??this.searchParams.get(this._id)??sessionStorage.getItem(`active_tab_${this._id}`);this._lastIndex=t??0,this.selectedIndex=t??0;const s=Array.from(this._tabs).filter((e=>e.hasAttribute("selected"))),i=s.length?s[0]:this._tabs[this._lastIndex];this._selectTab(i),this._selectPanel()}_selectPanel(){this.querySelector(":scope > wm-tabpanel[selected]")&&this.querySelector(":scope > wm-tabpanel[selected]").removeAttribute("selected"),this._tabpanels[this.selectedIndex].setAttribute("selected",!0)}_selectTab(e){if(this.querySelector(":scope > wm-tab[selected]")&&this.querySelector(":scope > wm-tab[selected]").removeAttribute("selected"),Number.isInteger(e)&&(e=this._tabs[e]?this._tabs[e]:this._tabs[this._tabs.length-1]),e.setAttribute("selected",!0),e.focus(),this.selectedIndex=a(this._tabs,e),this.dispatchEvent(new CustomEvent("wm-tab-changed",{detail:this.selectedIndex,bubbles:!0})),this.remember){this.searchParams=new URLSearchParams(window.location.search),this.selectedIndex>0?this.searchParams.set(this._id,this.selectedIndex):this.searchParams.delete(this._id);let e=`${window.location.pathname}${window.location.hash}`;(this.searchParams.get(this._id)||this.searchParams.size>0)&&(e=`${window.location.pathname}?${this.searchParams}${window.location.hash}`),window.history.replaceState({},"",e)}}_switchTab(e){const t=e&&e.type?e.target:e;t.closest("wm-tab")&&(this._selectTab(t),this._selectPanel())}_getNextElement(e){return e<0&&(e=this._tabs.length-1),e>=this._tabs.length&&(e=0),this._tabs[e]}_handleKeydown(e){let t;"ArrowLeft"!==e.code&&"ArrowRight"!==e.code||("ArrowLeft"===e.code&&(t=this.selectedIndex-1),"ArrowRight"===e.code&&(t=this.selectedIndex+1),this._switchTab(this._getNextElement(t)))}_handleClick(e){const t=e&&e.type?e.target:e;t.closest("wm-tab")&&(this._selectTab(t),this._selectPanel(),this.reRenderChildren(),this.remember&&sessionStorage.setItem(`active_tab_${this._id}`,this.selectedIndex))}async reRenderChildren(){await this._tabpanels[this.selectedIndex].updateComplete,this.querySelector("[update]")&&this.querySelector("[update]").reRender()}render(){return s`
			<div>
				<div
					role="tablist"
					@click="${this._handleClick}"
					@keydown="${this._handleKeydown}"
				>
					<slot name="tab"></slot>
				</div>
				<slot></slot>
			</div>
		`}}customElements.define("wm-tabs",r);const l="wm-tabs";export{r as Tabs,l as tagName};
