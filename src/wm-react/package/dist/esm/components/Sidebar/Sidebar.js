/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as e,s as t}from"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";const s=[e`
* {
  box-sizing: border-box;
}

:host {
  display: block;
  inset-block-start: 0;
  inset-inline: 0;
  height: 100dvh;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  transform: translateX(-100%);
  transition: transform 0.3s, margin 0.3s, opacity 0.3s, visibility 0.3s;
  visibility: hidden;
}

:host([open]) {
  opacity: 1;
  transform: none;
  visibility: visible;
  z-index: 1231;
}

:host::before {
  content: "";
  background: rgb(0 0 0 / 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: -1;
  transition: all 0.3s 0.3s;
}

:host(:not([open]))::before {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0s;
}

@media (min-width: 99.75em) {
  :host {
    max-width: var(--wm-theme-site-wrapper-width);
    width: 100%;
    padding-inline: var(--wm-theme-site-wrapper-padding);
    transform: none;
    transition: margin 0.3s, opacity 0.3s;
  }

  :host([open])::before {
    content: normal;
  }
}

@media (min-width: 123.5em) {
  :host {
    margin-inline: auto;
    transform: translateX(calc((var(--sidebar-inline-size) + var(--_sidebar-offset)) * -1)) !important;
  }
}

.sidebar-inner {
  --_padding-block-start: var(--wm-theme-header-height-dynamic);
  
  background-color: var(--sidebar-background-color);
  padding: var(--_padding-block-start) 0 1rem;
  box-shadow: var(--card-shadow);
  height: 100%;
  display: flex;
  flex-direction: column;
  width: min(100%, var(--sidebar-inline-size));
  transition: padding 0.3s;
}

:host([open]) .sidebar-inner {
  pointer-events: all;
}

.sidebar-header {
  background-color: var(--sidebar-header-background-color);
  color: var(--sidebar-header-font-color);
  display: flex;
  margin-block-end: var(--sidebar-header-margin);
  height: var(--wm-theme-header-nav-height);
  justify-content: space-between;
  align-items: center;
  padding-inline: var(--sidebar-padding);
  transition: transform 0.3s;
}

.sidebar-content {
  padding-inline: var(--sidebar-padding);
  flex-grow: 1;
  overflow: auto;
  transition: transform 0.3s;
  overscroll-behavior: none;
  scrollbar-gutter: stable;
}

h2 {
  font-size: var(--wm-theme-headings-font-size);
}
`];class a extends t{get _closeButton(){return this.shadowRoot.querySelector(".close-filter")??null}get _toggles(){return document.querySelectorAll(`[data-sidebar="${this.id}"]`)??null}static properties={_sidebarID:{type:String},id:{type:String,reflect:!0},label:{type:String,reflect:!0},open:{type:Boolean,reflect:!0},shortcut:{type:String,reflect:!0}};static styles=[s];constructor(){super(),this.open=!0,this.id=void 0,this.label="",this.shortcut="s",this._sidebarID="",this._breakPoint=window.matchMedia("(max-width: 99.75em)")}connectedCallback(){if(super.connectedCallback(),!this.id)throw this.open=!1,new Error("Es muss eine `id` angegeben werden.");this._sidebarID=`sidebar_${this.id}`,this._saveAndApplySettings(),this._attachEvents()}_saveAndApplySettings(){const e=e=>{e.matches&&(this.open=!1),e.matches||("true"===localStorage.getItem(this._sidebarID)&&(this.open=!1),localStorage.getItem(this._sidebarID)&&"false"!==localStorage.getItem(this._sidebarID)||(this.open=!0))};this._breakPoint.addEventListener("change",e),e(this._breakPoint)}_attachEvents(){this._activeToggleButtons(),this._closeOnEsacape(),this._addKeyboardShortcut(),this._handleClickOutside()}_closeOnEsacape(){this.addEventListener("keyup",(e=>{"Escape"===e.code&&this.closeSidebar(e)}))}_activeToggleButtons(){for(let e=0;e<this._toggles.length;e++){const t=this.toggleSidebar.bind(this),i=this._toggles[e];i.setAttribute("aria-expanded",this.open),i.addEventListener("click",(e=>{e.preventDefault(),t(e),i.setAttribute("aria-expanded",this.open)}))}}_addKeyboardShortcut(){const e=[],t=["INPUT","SELECT","TEXTAREA"];document.addEventListener("keyup",(i=>{if(t.findIndex((e=>e===i.target.nodeName))<0){e.push(i.key);e.slice(-2).join("")===`g${this.shortcut}`&&this.toggleSidebar()}}))}_handleClickOutside(){document.addEventListener("click",(e=>{this.open&&this._breakPoint.matches&&(e.target.closest("wm-sidebar")||e.target.closest("[data-sidebar]")||(this.open=!1))}))}toggleSidebar(e){this.open=!this.open,this.open?(setTimeout((()=>{this._closeButton.focus()}),300),e&&localStorage.setItem(this._sidebarID,!1)):e&&localStorage.setItem(this._sidebarID,!0)}closeSidebar(e){e.preventDefault(),localStorage.setItem(this._sidebarID,!0),this.open=!1,this._toggles.length&&this._toggles[0].focus()}render(){return i`
			<div class="sidebar-inner" part="sidebar-inner">
				<div class="sidebar-header" part="sidebar-header">
					<h2 class="wm-e-h3">${this.label}</h2>

					<wm-button kind="clean">
						<button
							type="button"
							class="close-filter"
							@click="${this.closeSidebar}"
							aria-expanded="true"
						>
							<wm-icon iconid="close">Close</wm-icon>
						</button>
					</wm-button>
				</div>
				<div class="sidebar-content" part="sidebar-content">
					<slot></slot>
				</div>
			</div>
		`}}customElements.define("wm-sidebar",a);const n="wm-sidebar";export{a as Sidebar,n as tagName};
