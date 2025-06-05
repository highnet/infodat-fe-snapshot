/* @copyright Stadt Wien - Wiener Melange 200 */
import{s as e,i as t}from"../../lit-element-8d7b5fe2.js";import"../../lit-html-34d0b6a8.js";import{n}from"../../static-714d3441.js";class s extends e{get _headings(){return this.querySelectorAll("wm-accordion-heading")??null}get _openHeadings(){return this.querySelectorAll("wm-accordion-heading[expanded]")??null}static properties={open:{type:Number,reflect:!0},expanded:{type:Boolean,reflect:!0},single:{type:Boolean,reflect:!0}};static styles=[t`
			* {
				box-sizing: border-box;
			}

			:host {
				display: block;
			}
		`];constructor(){super(),this.open=void 0,this.single=!1,this.expanded=!1}firstUpdated(){setTimeout((()=>{this.dispatchEvent(new CustomEvent("wm-defined",{detail:{},bubbles:!0,composed:!0}))}),0)}updated(e){e.has("expanded")&&this._openOrCloseAll(this.expanded),e.has("open")&&this._openOrClose()}connectedCallback(){super.connectedCallback(),this._updateChildren(),this._addEvents()}_updateChildren(){for(let e=0;e<this._headings.length;e++){this._headings[e].id=`heading-${e}`}}_addEvents(){this.addEventListener("wm-expanded",(e=>{setTimeout((()=>{this.single&&this._openOrCloseAll(!1,e.detail.index)}),0)}))}_openOrClose(e=null,t="open"){const n=e||this.open;if(this.single&&this._openOrCloseAll(!1),!isNaN(parseInt(n))){const e=parseInt(n)-1;this._headings[e]?"close"===t?(this._headings[e].removeAttribute("expanded"),this._collapseContent(this._headings[e])):(this._headings[e].setAttribute("expanded",""),this._expandContent(this._headings[e])):console.error("Dieses Element existiert leider nicht.")}}_openOrCloseAll(e,t=null){for(let n=0;n<this._headings.length;n++)if(t!==n){const t=this._headings[n];e?(t.setAttribute("expanded",""),this._expandContent(t)):(t.removeAttribute("expanded"),this._collapseContent(t))}}_expandContent(e){const t={bubbles:!0,composed:!0,detail:{id:e.id,index:parseInt(e.id.split("heading-")[1])}};e.nextElementSibling.dispatchEvent(new CustomEvent("wm-expanded",t))}_collapseContent(e){const t={bubbles:!0,composed:!0,detail:{id:e.id,index:parseInt(e.id.split("heading-")[1])}};e.nextElementSibling.dispatchEvent(new CustomEvent("wm-collapsed",t))}expand(e){this._openOrClose(e)}collapse(e){this._openOrClose(e,"close")}render(){return n`
			<div>
				<slot @slotchange="${this._rerender}"></slot>
			</div>
		`}}customElements.define("wm-accordion",s);const i="wm-accordion";export{s as Accordion,i as tagName};
