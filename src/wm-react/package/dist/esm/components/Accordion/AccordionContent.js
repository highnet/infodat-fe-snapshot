/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as n,s as e}from"../../lit-element-8d7b5fe2.js";import"../../lit-html-34d0b6a8.js";import{n as i}from"../../static-714d3441.js";const a=[n`
* {
  box-sizing: border-box;
}

:host {
  display: block;
}

.panel {
  --_panel-height: 0fr;
  --_panel-visibility: hidden;
  --_panel-gap: 0;

  background-color: var(--accordion-panel-background-color);
  color: var(--accordion-panel-font-color);
  display: grid;
  grid-template-rows: var(--_panel-height);
  margin-bottom: var(--_panel-gap);
  visibility: var(--_panel-visibility);
}

@media(prefers-reduced-motion: no-preference) {
  .panel {
    transition: margin 0.3s, visibility 0.3s, grid-template-rows 0.3s;
  }
}

.panel-inner {
  overflow: hidden;
}

.panel-inner-open {
  overflow: visible;
}

.panel-content {
  border: var(--accordion-border) !important;
  padding-left: var(--accordion-padding-inline);
  padding-right: var(--accordion-padding-inline);
  padding-top: var(--accordion-padding-block-start);
  padding-bottom: var(--accordion-padding-block-end);
}

.panel-content p {
  margin-top: 0;
}

.panel > *:first-child {
  margin-top: 0;
}

figcaption {
  --wm-theme-media-figcaption-background: var(--accordion-contrast);
}
`];class t extends e{get _panel(){return this.shadowRoot.querySelector(".panel")}get _panelInner(){return this.shadowRoot.querySelector(".panel-inner")}static styles=[a];constructor(){super()}connectedCallback(){super.connectedCallback(),this._addEvents()}_addEvents(){setTimeout((()=>{this._panel.addEventListener("transitionend",(()=>{this.previousElementSibling.hasAttribute("expanded")&&this._panelInner.classList.add("panel-inner-open")}))}),0),this.addEventListener("wm-collapsed",(()=>{this._panelInner.classList.remove("panel-inner-open")}))}render(){return i`
			<div class="panel" part="panel">
				<div class="panel-inner" part="panel-inner">
					<div class="panel-content wm-h-spacing">
						<slot></slot>
					</div>
				</div>
			</div>
		`}}customElements.define("wm-accordion-content",t);const o="wm-accordion-content";export{t as AccordionContent,o as tagName};
