/* @copyright Stadt Wien - Wiener Melange 200 */
import{s as t}from"../../lit-element-8d7b5fe2.js";import{x as e}from"../../lit-html-34d0b6a8.js";import{o as i}from"../../unsafe-html-4e49b66a.js";import{n as s}from"../../when-741bb8d9.js";import{preventPinchZoom as o,WmImageZoom as a}from"../misc/image-zoom.js";import"../../directive-16e189ed.js";class r extends t{get _dialog(){return this.querySelector("dialog")??null}get _carousel(){return this.querySelector("wm-carousel")??null}get _content(){return this.querySelector(".content-inner")??null}get _triggers(){return document.querySelectorAll("[data-modal]")??null}static properties={isopen:{type:Boolean,reflect:!0},_label:{type:String},size:{type:String,reflect:!0},_type:{type:String},_caption:{type:String},_captionSelectable:{type:Boolean},_trigger:{type:Node},_thumbs:{type:Array,attribute:!1},_currentThumb:{type:Number},captionLabel:{type:String}};constructor(){super(),this.isopen=!1,this.size="fit-content",this._type="image",this._caption="",this._captionSelectable=!1,this._thumbs=[],this._currentThumb=0,this._trigger=void 0,this._label=void 0,this.captionLabel="Bildbeschreibung"}_addEvents(){this._dialog.addEventListener("close",this._closeEvent.bind(this))}_addGlovalEvents(){document.body.addEventListener("click",(t=>{this._trigger=t.target.closest("[data-modal]"),t.composedPath().filter((t=>{"object"==typeof t.dataset&&"modal"in t.dataset&&(this._trigger=t)})),this._trigger&&this._trigger.dataset.modal&&window.HTMLDialogElement&&(t.preventDefault(),this._prepareContent(t.target,this._trigger.dataset.modalPos))}))}_prepareContent(t=null,e){this._type=this._trigger.dataset.modal,"image"===this._type?this._getImage():(this._getHTML(t),this._getThumbs()),this.open(e)}toModal(t,e=null){t.addEventListener("click",(i=>{i.preventDefault(),this._trigger=t,this._prepareContent(e)}))}_closeEvent(){this.dispatchEvent(new CustomEvent("wm-modal-closed",{bubbles:!0})),this.close()}_checkCaptionSelectable(t){t.querySelectorAll("a, abbr, button").length&&(this._captionSelectable=!0)}_getImage(){const t=new Image;if(t.src=this._trigger.getAttribute("href"),this.alt="",this._trigger.querySelector("[alt]")?this.alt=this._trigger.querySelector("[alt]").getAttribute("alt"):this.alt=this._trigger.textContent,t.alt=this.alt,this._trigger.closest("figure")){const t=this._trigger.closest("figure").querySelector("figcaption");this._checkCaptionSelectable(t),this._caption=t.innerHTML}this._dialog.addEventListener("touchstart",o),t.onload=()=>{this._imageZoom=new a({img:t,container:this._content,zoomedClass:"wm-image--zoomed"});let e=500;0!==t.naturalHeight&&(e=t.naturalHeight),this._content.style.maxHeight=`${e}px`,t.classList.add("wm-image--zoom")},this._content.appendChild(t),this._label||(this._label="Bild")}_switchSlide(t){this._carousel.slide(t)}_getThumbs(){if(this._trigger.dataset.thumbs){const t=document.querySelector(`#${this._trigger.dataset.thumbs}`).content.cloneNode(!0).querySelectorAll("img");this._thumbs=Array.from(t),this.querySelector("wm-carousel").addEventListener("wm-slide-changed",(t=>{this._currentThumb=t.detail-1}))}}_getHTML(t){this._type||(this._type=t);let e=document.querySelector(`#${this._type}`);t.shadowRoot&&(e=t.shadowRoot.querySelector(`#${this._type}`)),this._content.innerHTML=e.innerHTML,this._trigger.dataset.size&&(this.size=this._trigger.dataset.size),this._trigger.dataset.label&&(this._label=this._trigger.dataset.label),this._carousel&&(this._updateCaption(),this._carousel.addEventListener("wm-slide-changed",this._updateCaption.bind(this)),this._label||(this._label=this._carousel.label,this._label||console.error("Bitte `label`-Attribut mit Bezeichnung für den Dialog oder label-Attribut auf wm-carousel angeben.")))}_updateCaption(){setTimeout((()=>{this._caption="",this._carousel.querySelector(".current figcaption")&&(this._caption=this._carousel.querySelector(".current figcaption").innerHTML,this._checkCaptionSelectable(this._carousel.querySelector(".current figcaption")))}),0)}_clickOutSide(t){"DIALOG"===t.target.nodeName&&this.close()}open(t){this.isopen=!0,setTimeout((()=>{this._dialog.showModal(),this._dialog.focus(),t&&this._switchSlide(t)}),0),this.dispatchEvent(new CustomEvent("wm-modal-opened",{bubbles:!0}))}close(){this.isopen&&(this._imageZoom?this._imageZoom.ready&&(this._dialog.removeEventListener("touchstart",o),this._content.removeAttribute("style"),this._imageZoom.resetZoom(),this._imageZoom.destroyEvents(),this._cleanUpAfterClose()):this._cleanUpAfterClose())}_cleanUpAfterClose(){this.isopen=!1,this._dialog.close(),this._content.innerHTML="",this._caption="",this._thumbs=[],this.size="fit-content",this._label=void 0}_controlCarousel(t){this._carousel&&("ArrowLeft"===t.code&&this._carousel.prev(),"ArrowRight"===t.code&&this._carousel.next())}_prepareTriggers(){this._triggers.forEach((t=>{t.setAttribute("aria-haspopup","dialog")}))}firstUpdated(){this._addEvents()}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._prepareTriggers(),this._addGlovalEvents()}render(){return e`
			<slot></slot>
			<dialog
				tabindex="-1"
				aria-label="${this._label}"
				class="modal-${-1!==this._type.indexOf("image")?"image":"html"}"
				@click=${this._clickOutSide}
				@keyup="${this._controlCarousel}"
			>
				<div class="modal-controls">
					${s(this._thumbs.length,(()=>e`
							<nav aria-label="Bildauswahl" class="thumbs">
								${this._thumbs.map(((t,i)=>e`
										<wm-button
											class="thumb"
											kind="clean"
											@click="${this._switchSlide.bind(this,i)}"
											aria-pressed="${i===this._currentThumb}"
										>
											<button>${t}</button>
										</wm-button>
									`))}
							</nav>
						`))}
					<wm-button kind="clean" class="close" @click="${this.close}">
						<button type="button">
							<wm-icon iconid="close" size="32">Schließen</wm-icon>
						</button>
					</wm-button>
				</div>
				<div class="content">
					<div class="content-wrapper">
						<div class="content-inner"></div>
						${this._caption?e`
						<div class="caption">
								<wm-details full>
									<strong slot="label">${this.captionLabel}</strong>
									<div slot="content">${i(this._caption)}</div>
								</wm-details>
							</div>
							`:""}
					</div>
				</div>
			</dialog>
		`}}customElements.define("wm-modal",r);const l="wm-modal";export{r as Modal,l as tagName};
