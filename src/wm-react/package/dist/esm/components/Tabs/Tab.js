/* @copyright Stadt Wien - Wiener Melange 200 */
import{s as t,i as o}from"../../lit-element-8d7b5fe2.js";import{x as r}from"../../lit-html-34d0b6a8.js";class e extends t{static properties={selected:{type:Boolean,reflect:!0}};static styles=[o`
			* {
				box-sizing: border-box;
			}

			:host {
				--_border-color: var(--tab-border-color);
				--_background-color: var(--tab-background-color);
				--_font-color: var(--tab-font-color);

				background-color: var(--_background-color);
				color: var(--_font-color);
				display: block;
				cursor: pointer;
				line-height: 1.4;
				border-style: solid;
				border-width: var(--tab-border-width);
				border-color: var(--_border-color);
				font-variation-settings: var(--tab-font-variation-settings);
				font-weight: var(--tab-font-weight);
				padding: var(--tab-padding);
				min-width: fit-content;
			}

			:host([selected]) {
				--_border-color: var(--tab-border-color--active);
				--_background-color: var(--tab-background-color--active);
				--_font-color: var(--tab-font-color--active);
			}

			:host(:hover) {
				--_background-color: var(--tab-background-color--active);
				--_font-color: var(--tab-font-color--active);
			}

			:host(:focus-visible) {
				outline-offset: calc(var(--wm-theme-site-focus-outline-width) * -1) !important;
			}
		`];constructor(){super(),this.selected=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}updated(){this.setAttribute("aria-selected",this.hasAttribute("selected")),this.setAttribute("tabindex",this.hasAttribute("selected")?0:-1)}render(){return r` <slot></slot> `}}customElements.define("wm-tab",e);export{e as Tab};
