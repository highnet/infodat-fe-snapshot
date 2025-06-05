/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";import{e as o}from"../../class-map-b15037ef.js";import{n as a}from"../../when-741bb8d9.js";import{o as s}from"../../unsafe-html-4e49b66a.js";import"../../directive-16e189ed.js";const l=[t`
* {
  box-sizing: border-box;
}

[hidden] {
  display: none !important;
}

.media-links {
  height: 100%;
}

.media-links-multi {
  --_media-links-columns: 1fr 1fr;

  display: grid;
  gap: 0.2rem;
  grid-template-columns: var(--_media-links-columns);
  grid-template-rows: 1fr 1fr;
}

[data-modal]:first-child {
  grid-row: 1 / -1;
}

[data-modal] {
  display: block;
  height: 100%;
  position: relative;
}

[data-modal]:focus-visible {
  outline: var(--wm-theme-site-focus-outline-width) solid var(--wm-color-ui-interactive);
  outline-offset: -3px;
}

/* Show “more images” on all thumbs */
[data-modal*="image"]:has(img)::after {
  --_offset: 2px;
  align-items: center;
  background: var(--_modal-button-background-color) var(--modal-button-background-image) no-repeat center right 0.3rem;
  background-size: 24px 70%;
  border: 1px solid var(--_modal-border-color);
  bottom: var(--_offset);
  color: var(--wm-theme-site-color);
  content: "Weitere";
  display: inline-flex;
  height: 2.125rem;
  min-width: 2.125rem;
  padding-left: 0.8rem;
  padding-right: 2.125rem;
  position: absolute;
  right: var(--_offset);
}

/* If there are more than one, hide it on all but the second */
[data-modal*="image"]:has(img):not(:nth-child(2)):not(:only-child)::after {
  display: none;
}

/* If there's only one thumb, show it in the top right corner */
[data-modal*="image"]:has(img):only-child::after {
  bottom: auto;
  top: var(--_offset);
}

/* Needed for gallery styling */
img,
::slotted(video),
::slotted(picture),
::slotted(img) {
  height: 100% !important;
  object-fit: cover !important;
  width: 100% !important;
}

.video-controls {
  --_controls-pos-top: 0;
  --_controls-pos-bottom: auto;
  --_controls-opacity: 1;

  background-color: rgb(0 0 0 / 0.6);
  bottom: var(--_controls-pos-bottom);
  display: flex;
  gap: 0.3rem;
  opacity: var(--_controls-opacity);
  padding: 0.5rem;
  position: absolute;
  top: var(--_controls-pos-top);
  right: 0;
  transition: opacity 0.3s;
  z-index: 1;
}

@media(min-width: 48em) {
  .video-controls {
    --_controls-pos-top: auto;
    --_controls-pos-bottom: 0;
    --_controls-opacity: 0;
  }

  .media-links-multi {
    --_media-links-columns: 5fr 1fr;
  }

  :host([justify="end"]) .media-links-multi {
    --_media-links-columns: 1fr 5fr;
  }

  :host([justify="end"]) [data-modal*="image"]:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }

  :host([justify="end"]) [data-modal*="image"]:nth-child(2) {
    grid-column: 1;
    grid-row: 2;
  }

  :host([justify="end"]) [data-modal*="image"]:nth-child(3) {
    grid-column: 2;
    grid-row: 1 / -1;
  }

  /* reset display on larger screens */
  [data-modal*="image"]:has(img):nth-child(n):not(:only-child)::after {
    display: inline-flex;
  }

  /* If there are more than one, hide it on all but the last */
  [data-modal*="image"]:has(img):not(:nth-child(3)):not(:only-child)::after {
    display: none;
  }

  /* If there's only one thumb, show it at the bottm left or right corner */
  [data-modal*="image"]:has(img):only-child::after {
    bottom: var(--_offset);
    top: auto;
  }

  /* If the content is right aligned and there's only one thumb, show it in the top right corner */
  :host([justify="end"]) [data-modal*="image"]:has(img):only-child::after  {
    left: var(--_offset);
    right: auto;
  }

  /* If the content is right aligned and there are multiple thumbs, show it in the second item */
  :host([justify="end"]) [data-modal*="image"]:has(img):nth-child(n):not(:only-child)::after {
    display: none;
  }

  :host([justify="end"])  [data-modal*="image"]:has(img):nth-child(2):not(:only-child)::after {
    display: inline-flex;
    left: var(--_offset);
    right: auto;
  }
}

:host(:is(:hover, :focus-within)) .video-controls {
  opacity: 1;
}

.video-controls button {
  align-items: center;
  block-size: 2rem;
  inline-size: 2rem;
  background-color: rgb(255 255 255 / 0.7);
  border: none;
  cursor: pointer;
}

.video-controls button:is(:hover, :focus-visible) {
  outline-color: #fff;
}
`];class r extends e{get _galleryTrigger(){return this.shadowRoot?.querySelector("[data-modal]")??null}get _video(){return this?.querySelector("video")??null}get _gallery(){return this.shadowRoot?.querySelector("#images")??null}get _media(){return this.shadowRoot?.querySelector('slot[name="media"]')}static properties={color:{type:String,reflect:!0},justify:{type:String,reflect:!0},media:{type:String,reflect:!0},_hasMedia:{type:Boolean,attribute:!1,reflect:!0},_hasColor:{type:Boolean,attribute:!1},_playing:{type:Boolean,attribute:!1,reflect:!0},playButtonLabel:{type:String}};static styles=[l];constructor(){super(),this.color=void 0,this.justify=void 0,this.media=void 0,this._hasColor=!1,this._hasMedia=!1,this._hasVideo=!1,this._playing=!1,this.playButtonLabel="Video abspielen"}firstUpdated(){if(this._hasMedia=this._media.assignedNodes().length,this._hasColor=this.color,this._media.addEventListener("slotchange",(()=>{if(this._hasMedia&&this._video&&this._video.autoplay){const t=window.matchMedia("(prefers-reduced-motion: no-preference)").matches;this._video.autoplay=t,this._playing=t}this._toggleDocumentClass()})),this._hasMedia>1&&this._constructCarousel(),this.media){this._hasMedia=!1;const t=window.matchMedia(`(min-width: ${this.media})`);this._toggleMedia(t),t.addListener(this._toggleMedia.bind(this))}this.color&&(this._hasColor=this.color,this._toggleDocumentClass())}_toggleMedia(t){t.matches?(this._hasMedia=this._media.assignedNodes().length,this._hasColor=this.color):(this._hasMedia=!1,this._hasColor=!1),this._toggleDocumentClass()}_toggleDocumentClass(){this._hasMedia||this._hasColor?document.documentElement.classList.add("wm-has-stage"):document.documentElement.classList.remove("wm-has-stage")}_constructCarousel(){const t=this._media.assignedNodes();for(let e=0;e<t.length;e++){const i=t[e].getAttribute("src")?t[e].getAttribute("src"):t[e].querySelectorAll("source")[0].getAttribute("srcset"),o=document.createElement("div");o.classList.add("image");const a=new Image;a.src=i,o.append(a),this._gallery.content.querySelector("wm-carousel").append(o)}}_renderMultipleImages(){if(this._hasMedia){let t=1,e="media-links";this._hasMedia>2&&(t=3,e="media-links media-links-multi");let i=`<div class="${e}">`;const o=this._media.assignedNodes();for(let e=0;e<t;e++)i+=`<a href="#" data-modal="images" data-modal-pos="${e}">${o[e].outerHTML}</a>`;return i+="</div>",i}}_playVideo(){this._playing=!this._playing,this._playing?this._video.play():this._video.pause()}render(){const t=this._hasMedia||this._hasColor,e={"media--color":this._hasColor};return i`
			<div part="content ${t?"contentmedia":""}">
				<slot name="content"></slot>
			</div>

			<div
				part="media"
				class="media ${o(e)}"
				?hidden=${!t}
			>
				${a(this._video,(()=>i`
						<div class="video-controls">
							<wm-button @click="${this._playVideo}">
								<button
									aria-pressed="${this._playing}"
									aria-label="${this.playButtonLabel}"
								>
									<wm-icon
										iconid="${this._playing?"pause":"play"}"
									></wm-icon>
								</button>
							</wm-button>
						</div>
					`))}
				${this._hasMedia>1?s(this._renderMultipleImages()):""}

				<template id="images">
					<wm-carousel
						single="1070"
						style="--carousel-shadow-offset: 0px"
						hideDots
						label="Fotos"
					></wm-carousel>
				</template>

				<slot name="media" ?hidden=${this._hasMedia>1}></slot>
			</div>
		`}}customElements.define("wm-stage",r);const n="wm-stage";export{r as Stage,n as tagName};
