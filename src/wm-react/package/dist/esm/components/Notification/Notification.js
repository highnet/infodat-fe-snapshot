/* @copyright Stadt Wien - Wiener Melange 200 */
import{i,s as t}from"../../lit-element-8d7b5fe2.js";import{x as s}from"../../lit-html-34d0b6a8.js";import{n as e}from"../../when-741bb8d9.js";import{g as o}from"../../wiener-melange.bundle.min-ae18d627.js";const n=[i`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    position: relative;

    /* Add border in highlight and adjust padding */
    --highlight-border-width: 1px;
    --highlight-padding: 1rem 1.5rem 1rem 1rem;
  }

  .close {
    position: absolute;
    inset-block-start: 0.5rem;
    inset-inline-end: 0.5rem;
  }
`],r=new CSSStyleSheet;r.replaceSync(o);class c extends t{static properties={dismissible:{type:Boolean},dismissLabel:{type:String},type:{type:String,reflect:!0},_types:{type:Object},_color:{type:String},_icon:{type:String},iconSize:{type:String}};static styles=[r,n];constructor(){super(),this.type="info",this.dismissible=!1,this.dismissLabel="Entfernen",this._types={error:{color:"morgenrot-light",icon:"error"},info:{color:"wasserblau-light",icon:"info"},warning:{color:"goldgelb-light",icon:"warning"},success:{color:"frischgruen-light",icon:"success"}},this._color=this._types.info.color,this._icon=this._types.info.icon,this.iconSize="28"}connectedCallback(){super.connectedCallback()}updated(i){i.has("type")&&(this._color=this._types[this.type].color,this._icon=this._types[this.type].icon)}_dismiss(){this.remove()}render(){return s`
			<wm-highlight color="${this._color}">
				${e(this.dismissible,(()=>s`
						<wm-button kind="clean" class="close">
							<button
								@click="${this._dismiss}"
								aria-expanded="${this.flipped}"
								type="button"
							>
								<wm-icon iconid="close" width="20">
									${this.dismissLabel}
								</wm-icon>
							</button>
						</wm-button>
					`))}
				<wm-stack gap="xxs">
					<wm-icon iconid="${this._icon}" width="${this.iconSize}"></wm-icon>
					<div>
						<slot></slot>
					</div>
				</wm-stack>
			</wm-highlight>
		`}}customElements.define("wm-notification",c);const l="wm-notification";export{c as notification,l as tagName};
