/* @copyright Stadt Wien - Wiener Melange 200 */
import{s as t}from"../../lit-element-8d7b5fe2.js";import{x as e}from"../../lit-html-34d0b6a8.js";class l extends t{static properties={scrollable:{type:Boolean},label:{type:String}};constructor(){super(),this.scrollable=!1,this.label="Verwandte Seiten"}render(){return e`
			<nav aria-label="${this.label}">
				<slot></slot>
			</nav>
		`}}customElements.define("wm-tag-list",l);const s="wm-tag-list";export{l as TagList,s as tagName};
