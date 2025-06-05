/* @copyright Stadt Wien - Wiener Melange 200 */
import{s as t,i as e}from"../../lit-element-8d7b5fe2.js";import{x as r}from"../../lit-html-34d0b6a8.js";class o extends t{static properties={selected:{type:Boolean,reflect:!0}};static styles=[e`
			* {
				box-sizing: border-box;
			}

			:host {
				background-color: var(--tab-background-color--active);
				border-style: solid;
				border-color: var(--tabpanel-border-color);
				border-width: var(--tabpanel-border-width);
				display: block;
				padding: var(--tabpanel-padding);
			}

			::slotted(*:not(:first-child, section, wm-section)) {
				margin-block-start: 1.5em !important;
			}
		`];constructor(){super(),this.selected=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tabpanel"),this.setAttribute("aria-hidden","true"),this.setAttribute("aria-label",this.previousElementSibling.textContent)}updated(){this.setAttribute("aria-hidden",this.hasAttribute("selected")?"false":"true")}render(){return r`
			<slot></slot>
		`}}customElements.define("wm-tabpanel",o);export{o as TabPanel};
