/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as s}from"../../lit-html-34d0b6a8.js";import{e as i}from"../../class-map-b15037ef.js";import{WmImageZoom as o,preventPinchZoom as r}from"../misc/image-zoom.js";import{isDoubleTap as a}from"../misc/utils.js";import{n}from"../../when-741bb8d9.js";import"../../directive-16e189ed.js";import"../../unsafe-html-4e49b66a.js";const l=[t`
* {
  box-sizing: border-box;
}

:host(:not(.focusmode)) {
  max-width: calc(100% + (var(--carousel-shadow-offset) * 2));
  margin-left: calc(var(--carousel-shadow-offset) * -1);
  margin-right: calc(var(--carousel-shadow-offset) * -1);
  margin-top: calc(var(--carousel-shadow-offset) * -1) !important; // needed to counteract base.css * {margin-top: 0;}
  max-height: inherit;
  position: relative;
}

:host {
  display: block;
  margin-bottom: 0 !important;
  pointer-events: all; /* Needed for carousels within modals */
  max-width: 100%;
}

:host(:not(.focusmode)) .inner {
  max-height: inherit;
  min-height: 100px;
  padding: var(--carousel-shadow-offset) var(--carousel-shadow-offset) var(--carousel-shadow-offset); // needed padding on top to show box-shadow
  position: relative;
  overflow: hidden;
}

/* Carousel causes overflow on ios 14.
It's not related to ::backdrop/dialog but we can
target those older browsers that way */
@supports not selector(::backdrop) {
  :host(:not(.focusmode)) .inner {
    overflow: hidden;
  }
}

.strip {
  margin: 0;
  padding: 0;
  list-style-type: '';
}

:host(:not(.focusmode)) .strip {
  display: flex;
  gap: var(--carousel-gap);
  max-height: inherit;
  min-width: 100%;
  margin-bottom: var(--carousel-strip-spacing);
}

:host(:not(.notransition)) .strip {
  --transformSpeed: 0.01s;
  transition: transform var(--transformSpeed) ease-in-out;
}

@media(prefers-reduced-motion: no-preference) {
  :host(:not(.notransition)) .strip {
    --transformSpeed: 0.3s;
  }
}

:host(.focusmode) .strip {
  transform: none !important;
}

:host([single]) .strip {
  align-items: center;
}

.strip > ::slotted(*) {
  flex-shrink: 0;
}

.control {
  --_size: 2.75rem;
  --_display: inline-flex;
  --_opacity: 0;

  position: absolute;
  background: var(--carousel-control-background-color) no-repeat center;
  border: 0;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0,0,0,.16);
  display: var(--_display);
  height: var(--_size);
  top: 50%;
  opacity: var(--_opacity);
  padding: 0;
  transform-origin: center center;
  transition: scale 0.3s, opacity 0.3s;
  width: var(--_size);
  z-index: 1210;
  pointer-events: all;
}

@media (min-width: 48em) {
  .control {
    --_size: 3.75rem;
    --_opacity: 1;
  }
}

.control:focus-within {
  --_opacity: 1;
}

.control--prev {
  background-image: var(--carousel-control-background-image-start);
  left: 0;
  translate: -50% -50%;
}

.control--next {
  background-image: var(--carousel-control-background-image-end);
  right: 0;
  translate: 50% -50%;
}

:host(.focusmode) .control,
.control--inactive {
  opacity: 0;
}

:host(.focusmode) .control:focus-visible,
.control--inactive:focus-visible {
  opacity: 0.5;
}

.control:is(:hover, :focus) {
  scale: 1.1;
}

.control:focus-visible {
  outline: var(--wm-theme-site-focus-outline-width) solid var(--wm-color-ui-interactive);
}

img {
  max-height: inherit;
}

wm-modal img[src],
.loaded {
  min-height: 0;
  max-height: 100%;
}

:host([single]) ::slotted(img) {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.dots {
  display: flex;
  gap: var(--carousel-dots-gap-s);
  justify-content: center;
  /* margin-top: 0.3rem; */
  padding-left: var(--carousel-shadow-offset);
  padding-right: var(--carousel-shadow-offset);
}

@media (min-width: 48em) {
  .dots {
    gap: var(--carousel-dots-gap);
  }
}

.dots wm-button {
  flex-shrink: 0;
}

.dots button {
  --_background: var(--carousel-dots-color);
  --_bordercolor: var(--carousel-dots-border-color);

  border-radius: 50%;
  border: 1px solid var(--_bordercolor);
  background: var(--_background);
  display: block;
  outline: 1px solid transparent;
  padding: 0;
  height: 0.8rem;
  width: 0.8rem;
}

.dots button:is(:hover, :focus-visible),
.dots .active {
  --_background: var(--carousel-dots-color--active);
}

.autoplay-controls {
  display: flex;
}

.autoplay-controls button {
  --_background: var(--carousel-dots-color);
  --_size: 25px;
  color: var(--wm-color-fastschwarz);
  --_hover-color: var(--wm-color-weiss);
  display: flex;
  background: var(--_background);
  border-radius: 50%;
  border: none;
  display: block;
  height: var(--_size);
  width: var(--_size);
  padding: 0;
}

.autoplay-controls button:is(:hover, :focus-visible) {
  --_background: var(--carousel-dots-color--active);
  color: var(--_hover-color);
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-left: var(--carousel-shadow-offset);
  padding-right: var(--carousel-shadow-offset);
  padding-bottom: var(--carousel-navigation-spacing);
}

[role="status"] {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  margin: -1px;
}

@media print {
  :host() .inner {
    overflow: visible !important;
  }
  
  .strip {
    flex-wrap: wrap;
  }

  .navigation {
    display: none;
  }
}

`];class h extends e{get _items(){return this.renderRoot?.querySelector(".inner")?.querySelector("slot").assignedElements()??null}get _wrapper(){return this.renderRoot?.querySelector(".strip")??null}get _current(){return this.querySelector(".current")??null}get _lastSlide(){return this.querySelector(".last")??null}get _output(){return this.renderRoot?.querySelector('[role="status"]')??null}static properties={autoplay:{type:Boolean},autoplayInterval:{type:Number},dots:{type:Boolean},label:{type:String},nextLabel:{type:String},prevLabel:{type:String},single:{type:Number,reflect:!0},position:{type:String},_autoplaying:{type:Boolean,attribute:!1},_initialized:{type:Boolean,attribute:!1},_currentSlide:{type:Number,attribute:!1},_offset:{type:String,attribute:!1},_first:{type:String,attribute:!1},_last:{type:String,attribute:!1},_focusMode:{type:Boolean,attribute:!1},_canMove:{type:Boolean,attribute:!1},_imageZoom:{type:Object,attribute:!1},_touchstartX:{type:Number},_touchstartY:{type:Number},_touches:{type:Number},_swipeTreshold:{type:Number},_isList:{type:Boolean,attribute:!1}};static styles=l;constructor(){super(),this.dots=!1,this.autoplay=!1,this._autoplaying=!1,this.autoplayInterval=5e3,this._autoplayInterval=null,this.label=void 0,this.single=void 0,this.nextLabel="Nächstes Element",this.prevLabel="Vorheriges Element",this.position=1,this._first=!0,this._last=!1,this._currentSlide=1,this._offset=0,this._focusMode=!1,this._canMove=!0,this._initialized=!1,this._imageZoom={},this._swipeTreshold=80,this._touchstartX=0,this._touchstartY=0,this._touches=0,this._isList=!1}_move(t){if(this._canMove){this._canMove=!1;let e=this._current.nextElementSibling;"prev"===t&&(e=this._current.previousElementSibling),Number.isInteger(t)&&(e=this._items[t]),this._current.classList.remove("current"),e.classList.add("current","active"),e.removeAttribute("inert"),this._positionSlide(e),"prev"===t?this._currentSlide--:"next"===t?this._currentSlide++:this._currentSlide=t+1;let s=`Zeige Element ${this._currentSlide} von ${this._items.length}`;this._items[this._currentSlide-1].getAttribute("alt")&&(s=this._items[this._currentSlide-1].getAttribute("alt")),this._items[this._currentSlide-1].querySelectorAll("h2, h3, .wm-e-h1").length&&(s=`${this._items[this._currentSlide-1].querySelectorAll("h2, h3, .wm-e-h1")[0].textContent} ${this._currentSlide} von ${this._items.length}`),this._autoplaying||(this._output.innerHTML=s),this._wrapper.addEventListener("transitionend",(()=>{this._canMove=!0}))}this.dots&&this._autoplaying&&this._startAutoplay()}_positionSlide(){this._offset=this._current.getBoundingClientRect().left-this._wrapper.getBoundingClientRect().left,this._wrapper.style.transform=`translateX(${-1*this._offset}px)`}_firstOrLast(){this._last=this._lastSlide.classList.contains("active"),this._first=!(this._currentSlide>1)}_prevSlide(){this.prev(),this._autoplaying=!1}_nextSlide(){this.next(),this._autoplaying=!1}prev(){1!==this._currentSlide&&(this._move("prev"),this._changeSlide())}next(){this._lastSlide.classList.contains("active")||(this._move("next"),this._changeSlide())}slide(t,e=!0){const s=parseInt(t);this._items[s]&&s!==this._currentSlide-1&&(e||(this.classList.add("notransition"),setTimeout((()=>{this.classList.remove("notransition"),this._canMove=!0}),300)),this._move(s),this._changeSlide(s+1))}_changeSlide(t){this.dispatchEvent(new CustomEvent("wm-slide-changed",{detail:this._currentSlide,bubbles:!0})),this._lazyLoadContent(t||this._currentSlide+1)}_lazyLoadContent(t){const e=this._items[t-1];e&&this._switchSourceAttributes(e)}_switchSourceAttributes(t){if(t.hasAttribute("data-src")||t.querySelector("[data-src]")){const e=t.querySelector("[data-src]")??t;if(e.closest("picture")){const t=e.closest("picture").querySelectorAll("source");for(let e=0;e<t.length;e++){const s=t[e];s.hasAttribute("data-srcset")&&(s.setAttribute("srcset",s.getAttribute("data-srcset")),s.removeAttribute("data-srcset"))}}e.onload=()=>{e.classList.add("loaded")},e.setAttribute("src",e.getAttribute("data-src")),e.removeAttribute("data-src")}}updated(t){t.has("autoplay")&&(this._autoplaying&&this.autoplay?this._startAutoplay():this._stopAutoplay())}firstUpdated(){if(this.shadowRoot.querySelector("slot").addEventListener("slotchange",(()=>{this._setWidth(),this._observeItems(),this._setItemClasses(),this._lazyLoadContent(2),this._addEvents(),this._listenToOnLoadOnImages(),"LI"===this._items[0].nodeName&&(this._isList=!0)})),setTimeout((()=>{1!==this.position&&("last"===this.position&&(this.position=this._items.length),this.slide(this.position-1,!1))}),0),!this.dots||!this.autoplay)return;window.matchMedia("(prefers-reduced-motion: no-preference)").matches?this._startAutoplay():this._stopAutoplay()}_onResize(){this._positionSlide(this._current),this._autoplaying&&this._startAutoplay();const t=this.shadowRoot.querySelector("slot").assignedElements({flatten:!0});for(const e of t)e.querySelector(".caption")&&this._positionCaption(e)}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this._onResize.bind(this)),this.label||console.error(this,"label-Attribut auf wm-carousel muss angegeben werden!"),(this.dots||this.autoplay)&&(!this.autoplay||this.dots?this.dots&&this.autoplay&&this._startAutoplay():console.info(this,"Autoplay ist aktiviert, aber dots sind deaktiviert. Bitte aktiviere dots, um die Autoplay-Funktion richtig zu verwenden."))}disconnectedCallback(){super.disconnectedCallback(),this._removeEvents(),Object.keys(this._imageZoom).length&&this._imageZoom.resetZoom(),window.removeEventListener("resize",this._onResize),this._stopAutoplay()}_keyEvents(t){"ArrowRight"===t.code&&this.next(),"ArrowLeft"===t.code&&this.prev()}_removeEvents(){this.removeEventListener("keyup",this._keyEvents)}_handleTouch(t){(2===t.touches.length||a())&&(t.preventDefault(),this._focusMode||(console.info("👉 Start touch in Carousel."),this._initFocusMode(t))),this._touchstartX=t.changedTouches[0].clientX,this._touchstartY=t.changedTouches[0].clientY,this._touches=t.touches.length}_handleTouchEnd(t){setTimeout((()=>{this._imageZoom.ready&&this._imageZoom.endHandler()}),150),this._touchendX=t.changedTouches[0].clientX,this._touchendY=t.changedTouches[0].clientY,this._touches<2&&this._handleSwipe()}_handleSwipe(){this._focusMode||(this._touchendX+this._swipeTreshold<this._touchstartX&&this.next(),this._touchendX-this._swipeTreshold>this._touchstartX&&this.prev())}_leaveFocusMode(t){if(this._focusMode){this._focusMode=!1,this.classList.remove("focusmode"),this._items.forEach((t=>{t.removeAttribute("hidden"),t.classList.remove("wm-image--zoom"),t.querySelector("img")&&t.querySelector("img").classList.remove("wm-image--zoom")}));const e=t.target;e.style.removeProperty("width"),e.style.removeProperty("aspect-ratio"),this._imageZoom.destroyEvents(),setTimeout((()=>{this.classList.remove("notransition")}),300)}}_initFocusMode(t){const e=t.target;if(!this._focusMode&&"IMG"===e.nodeName){this._focusMode=!0,this.classList.add("focusmode"),this.classList.add("notransition");const s=e;this._items.forEach((t=>{t!==this._current&&(t.hidden=!0)}));const i=s.closest(".content-inner");i.addEventListener("reset",this._leaveFocusMode.bind(this)),this._imageZoom=new o({img:s,container:i,zoomedClass:"wm-image--zoomed"}),s.classList.add("wm-image--zoom"),setTimeout((()=>{this._imageZoom.startHandler(t,!0)}),150)}}_addEvents(){if(this.addEventListener("keyup",this._keyEvents),document.querySelector("dialog")&&document.querySelector("dialog").addEventListener("touchstart",r,{passive:!0}),this.addEventListener("touchstart",this._handleTouch,{passive:!0}),this.addEventListener("touchend",this._handleTouchEnd),this.autoplay){const t=this._startAutoplay.bind(this),e=this._stopAutoplay.bind(this);this._wrapper.addEventListener("focusin",e),this._wrapper.addEventListener("focusout",t)}}_setItemClasses(){this._items[0].classList.add("current","first"),this._items[this._items.length-1].classList.add("last")}_observeItems(){const t=new IntersectionObserver(this._handleIntersection.bind(this),{root:this,threshold:.9}),e=new IntersectionObserver(this._handleImageIntersection.bind(this),{root:this,threshold:0});for(let s=0;s<this._items.length;s++){const i=this._items[s];t.observe(i),(i.querySelector("img")||"IMG"===i.nodeName)&&e.observe(i.querySelector("img")||i)}}_setWidth(){this.single&&(this.style.maxWidth=`${this.single}px`)}_handleIntersection(t){t.map((t=>{const e=t.target;return e.classList.contains("wm-image--zoom")||(t.isIntersecting?(e.classList.add("active"),e.removeAttribute("inert")):(e.setAttribute("inert",""),e.classList.remove("active"))),this._firstOrLast(),t})),this._initialized=!0}_handleImageIntersection(t){t.map((t=>{const e=t.target;t.isIntersecting&&this._switchSourceAttributes(e)}))}_listenToOnLoadOnImages(){const t=this.shadowRoot.querySelector("slot").assignedElements({flatten:!0});for(const e of t)if(e.querySelector("img")){const t=e.querySelector("img");t.closest(".image")&&t.addEventListener("load",(()=>{t.closest(".image").style.maxHeight=`${t.naturalHeight}px`,this._positionCaption(e)}))}}_positionCaption(t){if(t.querySelector(".caption")){const e=t.querySelector(".caption"),s=t.querySelector("img"),i=t.getBoundingClientRect().height,o=s.getBoundingClientRect().height,r=s.getBoundingClientRect().width;e.style.bottom=(i-o)/2+"px",e.style.width=r+"px",t.classList.add("image-loaded")}}toggleAutoplay(){this._autoplaying=!this._autoplaying,this._autoplaying?this._startAutoplay():this._stopAutoplay()}_startAutoplay(){this._stopAutoplay(),this._autoplaying=!0,this._autoplayInterval=setInterval((()=>{this._lastSlide.classList.contains("active")?this.slide(0):this.next()}),this.autoplayInterval)}_stopAutoplay(){this._autoplaying=!1,clearInterval(this._autoplayInterval)}_renderAutoplayControls(){return s`
			<div class="autoplay-controls">
				<wm-button @click="${this.toggleAutoplay}">
					<button
						aria-pressed="${this._autoplaying}"
						aria-label="${this._autoplaying?"Pause Autoplay":"Start Autoplay"}"
					>
						<wm-icon iconid="${this._autoplaying?"pause":"play"}"></wm-icon>
					</button>
				</wm-button>
			</div>
		`}_renderDots(){return s`
			<div class="navigation">
				<div class="dots">
					${this._items.map(((t,e)=>{const i=e+1;return s`
							<wm-button>
								<button
									class="${this._currentSlide===i?"active":""}"
									@click="${()=>this.slide(i-1)}"
									aria-label="Element ${i} von ${this._items.length}"
								></button>
							</wm-button>
						`}))}
				</div>

				${this.autoplay?this._renderAutoplayControls():""}
			</div>
		`}render(){const t={"control--inactive":this._last},e={"control--inactive":this._first};return s`
			<div role="region" aria-label="${this.label}">
				<div>
					<button
						class="control control--prev ${i(e)}"
						aria-disabled="${this._first?"true":"false"}"
						aria-label="${this.prevLabel}"
						@click="${this._prevSlide}"
					></button>
					<button
						class="control control--next ${i(t)}"
						aria-disabled="${this._last?"true":"false"}"
						aria-label="${this.nextLabel}"
						@click="${this._nextSlide}"
					></button>
				</div>
				<div class="inner">
					${n(this._isList,(()=>s`<ul class="strip">
							<slot></slot>
						</ul>`),(()=>s`<div class="strip"><slot></slot></div>`))}
				</div>

				${this._items&&this.dots?this._renderDots():""}
			</div>
			<div role="status"></div>
		`}}customElements.define("wm-carousel",h);const c="wm-carousel";export{h as Carousel,c as tagName};
