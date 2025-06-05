/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { e } from '../../class-map-68392fb3.js';
import { n } from '../../when-55b3d1d8.js';
import { o } from '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

/* This file contains the styling for stages with video or stages with more than one image */

const styles = [i`
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
`];

/**
 * Titel der Seite, alternativ inklusive Links, Bild, Video und/oder Galerie.
 * @summary Button/Button, Carousel/Carousel
 *
 * @slot content - Textinhalt
 * @slot media - Bild oder Video
 */

/**
 * @cssprop --stage-media-background-color - Hintergrundfarbe
 * @cssprop --stage-text-background-color - Hintergrundfarbe Textcontainer
 * @cssprop --stage-font-color - Schriftfarbe
 * @cssprop --stage-content-padding - Padding für den Inhalt
 * @cssprop --stage-font-size--mobil - Schriftgröße (Mobilansicht unter 64em)
 * @cssprop --stage-margin--mobil - Außenabstand nach unten (Mobilansicht unter 64em)
 * @cssprop --stage-margin--desktop - Außenabstand nach unten (Desktopansicht ab 64em)
 */

class Stage extends s {
	/** @private */
	get _galleryTrigger() {
		return this.shadowRoot?.querySelector("[data-modal]") ?? null;
	}

	/** @private */
	get _video() {
		return this?.querySelector("video") ?? null;
	}

	/** @private */
	get _gallery() {
		return this.shadowRoot?.querySelector("#images") ?? null;
	}

	/** @private */
	get _media() {
		return this.shadowRoot?.querySelector('slot[name="media"]');
	}

	static properties = {
		color: { type: String, reflect: true },
		justify: { type: String, reflect: true },
		media: { type: String, reflect: true },
		_hasMedia: { type: Boolean, attribute: false, reflect: true },
		_hasColor: { type: Boolean, attribute: false },
		_playing: { type: Boolean, attribute: false, reflect: true },
		playButtonLabel: { type: String },
	};

	static styles = [styles];

	constructor() {
		super();

		/**
		 * @type {'abendstimmung'|'flieder'|'frischgruen'|'goldgelb'|'morgenrot'|'nebelgrau'|'wasserblau'} - Hintergrund Farbe der Stage
		 * */
		this.color = undefined;

		/**
		 * @type {'start'|'end'} - Position der Überschrift
		 */
		this.justify = undefined;

		/**
		 * @type {String} - Breakpoint, ab dem erst Medieninhalte angezeigt werden sollen (zum Beispiel 48em)
		 */
		this.media = undefined;

		/**
		 * @type {Boolean} - Does the stage have a background color
		 * @private
		 */
		this._hasColor = false;

		/**
		 * @type {Boolean} - Does the stage contain media like images or video
		 * @private
		 */
		this._hasMedia = false;

		/**
		 * @type {Boolean} - Does the stage contain media video
		 * @private
		 */

		this._hasVideo = false;

		/**
		 * @type {Boolean} - Is the video playing
		 * @private
		 */
		this._playing = false;

		/**
		 * @type {Boolean} - Label des Play-Buttons, wenn es ein Video gibt
		 * @private
		 */
		this.playButtonLabel = "Video abspielen";
	}

	firstUpdated() {
		/**
		 * Check whether the stage has media slotted or not
		 */
		this._hasMedia = this._media.assignedNodes().length;
		this._hasColor = this.color;

		this._media.addEventListener("slotchange", () => {
			if (this._hasMedia) {
				if (this._video) {
					if (this._video.autoplay) {
						const shouldAutoplay = window.matchMedia(
							"(prefers-reduced-motion: no-preference)"
						).matches;
						this._video.autoplay = shouldAutoplay;
						this._playing = shouldAutoplay;
					}
				}
			}

			this._toggleDocumentClass();
		});

		if (this._hasMedia > 1) {
			/* Render more than just one image */
			this._constructCarousel();
		}

		if (this.media) {
			this._hasMedia = false;
			const mediaQueryList = window.matchMedia(`(min-width: ${this.media})`);
			this._toggleMedia(mediaQueryList);
			mediaQueryList.addListener(this._toggleMedia.bind(this));
		}
		if (this.color) {
			this._hasColor = this.color;
			this._toggleDocumentClass();
		}
	}

	/**
	 * Shoe and hide media based on breakpoint
	 * @private
	 */
	_toggleMedia(e) {
		if (e.matches) {
			this._hasMedia = this._media.assignedNodes().length;
			this._hasColor = this.color;
		} else {
			this._hasMedia = false;
			this._hasColor = false;
		}

		this._toggleDocumentClass();
	}

	/**
	 * Toggle class on the document
	 * @private
	 */
	_toggleDocumentClass() {
		if (this._hasMedia || this._hasColor) {
			document.documentElement.classList.add("wm-has-stage");
		} else {
			document.documentElement.classList.remove("wm-has-stage");
		}
	}

	/**
	 * Displays multiple images in a stage
	 * @private
	 */
	_constructCarousel() {
		/* All images */
		const images = this._media.assignedNodes();

		for (let i = 0; i < images.length; i++) {
			const source = images[i].getAttribute("src")
				? images[i].getAttribute("src")
				: images[i].querySelectorAll("source")[0].getAttribute("srcset");
			const imageContainer = document.createElement("div");
			imageContainer.classList.add("image");

			const image = new Image();
			image.src = source;
			imageContainer.append(image);

			this._gallery.content.querySelector("wm-carousel").append(imageContainer);
		}
	}

	/**
	 * Shows one or three thumbsnails if 3 or more images are passed
	 * @private
	 */
	_renderMultipleImages() {
		if (this._hasMedia) {
			let items = 1;
			let classes = "media-links";

			if (this._hasMedia > 2) {
				items = 3;
				classes = "media-links media-links-multi";
			}

			let modalHTMLString = `<div class="${classes}">`;
			const images = this._media.assignedNodes();

			for (let i = 0; i < items; i++) {
				modalHTMLString += `<a href="#" data-modal="images" data-modal-pos="${i}">${images[i].outerHTML}</a>`;
			}

			modalHTMLString += "</div>";

			return modalHTMLString;
		}

		return;
	}

	/**
	 * Handle click event
	 * @private
	 */
	_playVideo() {
		this._playing = !this._playing;

		if (!this._playing) {
			this._video.pause();
		} else {
			this._video.play();
		}
	}

	render() {
		const showMedia = this._hasMedia || this._hasColor;
		const mediaClasses = { "media--color": this._hasColor };

		return x`
			<div part="content ${showMedia ? `contentmedia` : ``}">
				<slot name="content"></slot>
			</div>

			<div
				part="media"
				class="media ${e(mediaClasses)}"
				?hidden=${!showMedia}
			>
				${n(
					this._video,
					() => x`
						<div class="video-controls">
							<wm-button @click="${this._playVideo}">
								<button
									aria-pressed="${this._playing}"
									aria-label="${this.playButtonLabel}"
								>
									<wm-icon
										iconid="${this._playing ? "pause" : "play"}"
									></wm-icon>
								</button>
							</wm-button>
						</div>
					`
				)}
				${this._hasMedia > 1 ? o(this._renderMultipleImages()) : ``}

				<template id="images">
					<wm-carousel
						single="1070"
						style="--carousel-shadow-offset: 0px"
						hideDots
						label="Fotos"
					></wm-carousel>
				</template>

				<slot name="media" ?hidden=${this._hasMedia > 1}></slot>
			</div>
		`;
	}
}

customElements.define("wm-stage", Stage);

const tagName = "wm-stage";

export { Stage, tagName };
