/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { o } from '../../unsafe-html-2bcd6aa9.js';
import { n } from '../../when-55b3d1d8.js';
import { preventPinchZoom, WmImageZoom } from '../misc/image-zoom.js';
import '../../directive-4c65af6a.js';

/**
 * Ein Modal mit einer größeren Ansicht öffnet sich bei Klick auf Bilder, Videos oder einen Linktext. Bei Klick auf die Hintergrundfläche, das x-Feld oder die Escape-Taste schließt sich das Feld. Bilder innerhalb des Modals sollten im Format 16:9 sein und eine Maximalgröße von 1070×602px haben.
 * @summary Button/Button, Icon/Icon, Details/Details
 */

/**
 * @cssprop --modal-max-width - Maximalbreite
 * @cssprop --modal-button-background-color - Hintergrundfarbe des Buttons
 * @cssprop --modal-button-border-color - Rahmenfarbe des Buttons
 * @cssprop --modal-button-background-image - Hintergrundbild des Buttons
 * @cssprop --modal-caption-padding - Caption Innenabstand
 * @cssprop --modal-close-button-background-color - Hintergrundfarbe des Schließen-Buttons
 * @cssprop --modal-thumb-outline-color - Farbe der Outline um Thumbs
 * @cssprop --modal-padding-block-end - Innenabstand unten
 * @cssprop --modal-padding-block-start - Innenabstand oben
 * @cssprop --modal-slide-background-color - Hintergrundfarbe eines Slides
 */

class Modal extends s {
	/** @private */
	get _dialog() {
		return this.querySelector("dialog") ?? null;
	}

	/** @private */
	get _carousel() {
		return this.querySelector("wm-carousel") ?? null;
	}

	/** @private */
	get _content() {
		return this.querySelector(".content-inner") ?? null;
	}

	/**
	 * All links with a data-modal attribute
	 * @private
	 **/
	get _triggers() {
		return document.querySelectorAll("[data-modal]") ?? null;
	}

	static properties = {
		isopen: { type: Boolean, reflect: true },
		_label: { type: String },
		size: { type: String, reflect: true },
		_type: { type: String },
		_caption: { type: String },
		_captionSelectable: { type: Boolean },
		_trigger: { type: Node },
		_thumbs: { type: Array, attribute: false },
		_currentThumb: { type: Number },
		captionLabel: { type: String }
	};

	constructor() {
		super();

		/** @type {Boolean} - Ist Modal geöffnet oder nicht. */
		this.isopen = false;

		/**
		 * @type {'fit-content'|'max-content'} - Art der Größe
		 */
		this.size = "fit-content";

		/**
		 * @type {Boolean} - Type of content to attach
		 * @private
		 */
		this._type = "image";

		/**
		 * @type {Boolean} - Captions for images
		 * @private
		 */
		this._caption = "";

		/**
		 * @type {Boolean} - Should text in the caption be selectable
		 * @private
		 */
		this._captionSelectable = false;

		/**
		 * @type {Array} - Array of thumb element
		 * @private
		 */
		this._thumbs = [];

		/**
		 * @type {Boolean} - The selected thumb
		 * @private
		 */
		this._currentThumb = 0;

		/**
		 * @type {Node} - The element that triggered the modal
		 * @private
		 */
		this._trigger = undefined;

		/**
		 * @type {Boolean} - Bezeichnung des Dialogs
		 * @private
		 */
		this._label = undefined;

		/**
		 * @type {String} - Label für "bildbeschreibung"
		 **/
		this.captionLabel = "Bildbeschreibung";
	}

	/**
	 * Add events
	 * @private
	 */
	_addEvents() {
		this._dialog.addEventListener("close", this._closeEvent.bind(this));
	}

	/**
	 * Add gloval events
	 * @private
	 */
	_addGlovalEvents() {
		document.body.addEventListener("click", (e) => {
			this._trigger = e.target.closest("[data-modal]");

			e.composedPath().filter((element) => {
				if (typeof element.dataset === "object" && "modal" in element.dataset) {
					this._trigger = element;
				}
			});

			if (this._trigger && this._trigger.dataset.modal) {
				/* Only if the browser support the <dialog> element */
				if (window.HTMLDialogElement) {
					e.preventDefault();
					this._prepareContent(e.target, this._trigger.dataset.modalPos);
				}
			}
		});
	}

	/**
	 * Get HTML content, imags, thumbs, etc. and open the modal
	 * @private
	 */
	_prepareContent(target = null, pos) {
		this._type = this._trigger.dataset.modal;

		if (this._type === "image") {
			this._getImage();
		} else {
			this._getHTML(target);
			this._getThumbs();
		}
		this.open(pos);
	}

	/**
	 * Alternative zum data-modal Attribut. Hilfreich bei dynamisch erzeugten Buttons.
	 * @param {node} trigger Link oder Button
	 * @param {node} content Element, dessen HTML-Inhalt man im Modal anzeigen möchte
	 */
	toModal(trigger, content = null) {
		trigger.addEventListener("click", (e) => {
			e.preventDefault();

			this._trigger = trigger;
			this._prepareContent(content);
		});
	}

	/**
	 * Fired when the modal gets closed
	 * @private
	 */
	_closeEvent() {
		/** @type {CustomEvent} Wenn das Modal geschlossen wurde. */
		this.dispatchEvent(
			new CustomEvent("wm-modal-closed", {
				bubbles: true,
			})
		);

		this.close();
	}

	/**
	 * @private
	 * @param {*} figcaption
	 * @returns
	 */
	_checkCaptionSelectable(figcaption) {
		if (!figcaption.querySelectorAll("a, abbr, button").length) return

		this._captionSelectable = true;
  }

	/**
	 * @private
	 */
	_getImage() {
		const image = new Image();
		image.src = this._trigger.getAttribute("href");

		this.alt = "";

		// Is there an image with alt text? Use the alt text
		if (this._trigger.querySelector("[alt]")) {
			this.alt = this._trigger.querySelector("[alt]").getAttribute("alt");
			// Use the link text instead
		} else {
			this.alt = this._trigger.textContent;
		}

		image.alt = this.alt;

		if (this._trigger.closest("figure")) {
			const figure = this._trigger.closest("figure");
			const figcaption = figure.querySelector("figcaption");

			this._checkCaptionSelectable(figcaption);

			this._caption = figcaption.innerHTML;
		}

		this._dialog.addEventListener("touchstart", preventPinchZoom);
		image.onload = () => {
			this._imageZoom = new WmImageZoom({
				img: image,
				container: this._content,
				zoomedClass: "wm-image--zoomed",
			});

			// A random max height in case the intrinsic height of images is 0
			// which can happen with SVGs
			let maxHeight = 500;

			if (image.naturalHeight !== 0) {
				maxHeight = image.naturalHeight;
			}

			this._content.style.maxHeight = `${maxHeight}px`;
			image.classList.add("wm-image--zoom");
		};

		this._content.appendChild(image);

		if (!this._label) {
			this._label = "Bild";
		}
	}

	/**
	 * Move slide if it's a modal carousel
	 * @private
	 */
	_switchSlide(n) {
		this._carousel.slide(n);
	}

	/**
	 * Collect thumbs if present
	 * @private
	 */
	_getThumbs() {
		if (this._trigger.dataset.thumbs) {
			const images = document
				.querySelector(`#${this._trigger.dataset.thumbs}`)
				.content.cloneNode(true)
				.querySelectorAll("img");
			this._thumbs = Array.from(images);

			this.querySelector("wm-carousel").addEventListener(
				"wm-slide-changed",
				(e) => {
					this._currentThumb = e.detail - 1;
				}
			);
		}
	}

	/**
	 * Append html from template
	 * @private
	 */
	_getHTML(target) {
		if (!this._type) {
			this._type = target;
		}
		let template = document.querySelector(`#${this._type}`);

		if (target.shadowRoot) {
			template = target.shadowRoot.querySelector(`#${this._type}`);
		}

		this._content.innerHTML = template.innerHTML;

		if (this._trigger.dataset.size) {
			this.size = this._trigger.dataset.size;
		}

		if (this._trigger.dataset.label) {
			this._label = this._trigger.dataset.label;
		}

		if (this._carousel) {
			this._updateCaption();

			this._carousel.addEventListener(
				"wm-slide-changed",
				this._updateCaption.bind(this)
			);

			if (!this._label) {
				this._label = this._carousel.label;
				if (!this._label) {
					console.error(
						"Bitte `label`-Attribut mit Bezeichnung für den Dialog oder label-Attribut auf wm-carousel angeben."
					);
				}
			}
		}
	}

	/**
	 * @private
	 */
	_updateCaption() {
		setTimeout(() => {
			this._caption = "";

			if (this._carousel.querySelector(".current figcaption")) {
				this._caption = this._carousel.querySelector(
					".current figcaption"
				).innerHTML;

				this._checkCaptionSelectable(this._carousel.querySelector(".current figcaption"));
			}
		}, 0);
	}

	/**
	 * Close when clicking somewhere outside the dialog
	 * @private
	 */
	_clickOutSide(e) {
		if (e.target.nodeName === "DIALOG") {
			this.close();
		}
	}

	/**
	 * Modal öffnen
	 */
	open(pos) {
		this.isopen = true;

    setTimeout(() => {
      this._dialog.showModal();
      this._dialog.focus();

      if (pos) {
        this._switchSlide(pos);
      }
    }, 0);

		/** @type {CustomEvent} Wenn das Modal geöffnet wurde. */
		this.dispatchEvent(
			new CustomEvent("wm-modal-opened", {
				bubbles: true,
			})
		);
	}

	/**
	 * Modal schließen
	 */
	close() {
		if (this.isopen) {
			if (this._imageZoom) {
				if (this._imageZoom.ready) {
					this._dialog.removeEventListener("touchstart", preventPinchZoom);
					this._content.removeAttribute("style");

					this._imageZoom.resetZoom();
					this._imageZoom.destroyEvents();
					this._cleanUpAfterClose();
				}
			} else {
				this._cleanUpAfterClose();
			}
		}
	}

	/**
	 * Dispatch event helper
	 * @private
	 */
	_cleanUpAfterClose() {
		this.isopen = false;
		this._dialog.close();
		this._content.innerHTML = "";
		this._caption = "";
		this._thumbs = [];
		this.size = "fit-content";
		this._label = undefined;
	}

	/**
	 * Control carousel if focus is on the modal itself
	 * @private
	 */
	_controlCarousel(e) {
		if (this._carousel) {
			if (e.code === "ArrowLeft") {
				this._carousel.prev();
			}

			if (e.code === "ArrowRight") {
				this._carousel.next();
			}
		}
	}

	/**
	 * @private
	 * Add aria-haspopup to all [data-modal] Links
	 */
	_prepareTriggers() {
		this._triggers.forEach((trigger) => {
			trigger.setAttribute('aria-haspopup', 'dialog');
		});
	}

	firstUpdated() {
		this._addEvents();
	}

	/**
	 * @private
	 */
	createRenderRoot() {
		return this;
	}

	connectedCallback() {
		super.connectedCallback();

		this._prepareTriggers();
		this._addGlovalEvents();
	}

	render() {
		return x`
			<slot></slot>
			<dialog
				tabindex="-1"
				aria-label="${this._label}"
				class="modal-${this._type.indexOf("image") !== -1 ? "image" : "html"}"
				@click=${this._clickOutSide}
				@keyup="${this._controlCarousel}"
			>
				<div class="modal-controls">
					${n(
						this._thumbs.length,
						() => x`
							<nav aria-label="Bildauswahl" class="thumbs">
								${this._thumbs.map((thumb, i) => {
									return x`
										<wm-button
											class="thumb"
											kind="clean"
											@click="${this._switchSlide.bind(this, i)}"
											aria-pressed="${i === this._currentThumb}"
										>
											<button>${thumb}</button>
										</wm-button>
									`;
								})}
							</nav>
						`
					)}
					<wm-button kind="clean" class="close" @click="${this.close}">
						<button type="button">
							<wm-icon iconid="close" size="32">Schließen</wm-icon>
						</button>
					</wm-button>
				</div>
				<div class="content">
					<div class="content-wrapper">
						<div class="content-inner"></div>
						${this._caption ? x`
						<div class="caption">
								<wm-details full>
									<strong slot="label">${this.captionLabel}</strong>
									<div slot="content">${o(this._caption)}</div>
								</wm-details>
							</div>
							` : ''}
					</div>
				</div>
			</dialog>
		`;
	}
}

customElements.define("wm-modal", Modal);

const tagName = "wm-modal";

export { Modal, tagName };
