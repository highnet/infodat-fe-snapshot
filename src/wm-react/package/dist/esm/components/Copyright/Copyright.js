/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as s}from"../../lit-html-34d0b6a8.js";const i=[t`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    align-self: start;
    text-align: left;
  }

  [hidden] {
    display: none !important;
  }
`];class l extends e{get _images(){return document.querySelectorAll('img[title^="copyright:"]')??null}static properties={label:{type:String},_credits:{type:Array}};static styles=[i];constructor(){super(),this.label="Foto-Credits",this._credits=[]}connectedCallback(){super.connectedCallback();for(const t of this._images){const e=t.getAttribute("title");this._credits.push(e.split("copyright: ")[1])}}render(){return s`
			<wm-details ?hidden="${!this._credits.length}">
				<strong slot="label">${this.label}</strong>
				<div slot="content">
					<wm-list clean gap="xxs">
						<ul>
							${this._credits.map((t=>s`<li>${t}</li>`))}
						</ul>
					</wm-list>
				</div>
			</wm-details>
		`}}customElements.define("wm-copyright",l);const r="wm-copyright";export{l as Copyright,r as tagName};
