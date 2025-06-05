/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { e } from '../../class-map-68392fb3.js';
import { WmImageZoom, preventPinchZoom } from '../misc/image-zoom.js';
import { isDoubleTap } from '../misc/utils.js';
import { n } from '../../when-55b3d1d8.js';
import '../../directive-4c65af6a.js';
import '../../unsafe-html-2bcd6aa9.js';

const styles = [i`
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

`];

/**
 * Bilder oder Card-Carousel.
 * @summary Button/Button, Icon/Icon
 *
 * * Mit einem Karussell kann man mehrere Cards in einer Reihe anbieten
 * * Pfeile zeigen an, in welche Richtung man weiterdrehen kann
 * * Sliden ist auch on touch / swipe möglich
 *
 * @slot default - Cards oder Bilder
 *
 */

/**
 * @cssprop --carousel-ratio - Seitenverhältnis der einzelnen Slides
 * @cssprop --carousel-item-inner-padding - Innenabstand in einzelnen Slides
 * @cssprop --carousel-shadow-offset - Platz um das Karussell für Schatten
 * @cssprop --carousel-gap - Abstand zwischen Elementen
 * @cssprop --carousel-control-background-color - Hintergrundfarbe der Controls
 * @cssprop --carousel-control-background-image-start - Hintergrundbild des ersten Buttons
 * @cssprop --carousel-control-background-image-end - Hintergrundbild des zweiten Buttons
 * @cssprop --carousel-dots-color - Hintergrundfarbe der Indikatoren
 * @cssprop --carousel-dots-border-color - Rahmenfarbe der Indikatoren
 * @cssprop --carousel-dots-color--active - Hintergrundfarbe des aktiven Indikatoren
 * @cssprop --carousel-dots-gap - Abstand der Indikatoren zueinander
 * @cssprop --carousel-dots-gap-s - Kleiner Abstand der Indikatoren zueinander
 * @cssprop --carousel-strip-spacing - Abstand nach dem Strip
 * @cssprop --carousel-navigation-spacing - Abstand in der Navigation
 */

class Carousel extends s {
	/** @private */
	get _items() {
		return (
			this.renderRoot
				?.querySelector(".inner")
				?.querySelector("slot")
				.assignedElements() ?? null
		);
	}

	/** @private */
	get _wrapper() {
		return this.renderRoot?.querySelector(".strip") ?? null;
	}

	/** @private */
	get _current() {
		return this.querySelector(".current") ?? null;
	}

	/** @private */
	get _lastSlide() {
		return this.querySelector(".last") ?? null;
	}

	/** @private */
	get _output() {
		return this.renderRoot?.querySelector('[role="status"]') ?? null;
	}

	static properties = {
		autoplay: { type: Boolean },
		autoplayInterval: { type: Number },
		dots: { type: Boolean },
		label: { type: String },
		nextLabel: { type: String },
		prevLabel: { type: String },
		single: { type: Number, reflect: true },
		position: { type: String },
		_autoplaying: { type: Boolean, attribute: false },
		_initialized: { type: Boolean, attribute: false },
		_currentSlide: { type: Number, attribute: false },
		_offset: { type: String, attribute: false },
		_first: { type: String, attribute: false },
		_last: { type: String, attribute: false },
		_focusMode: { type: Boolean, attribute: false },
		_canMove: { type: Boolean, attribute: false },
		_imageZoom: { type: Object, attribute: false },
		_touchstartX: { type: Number },
		_touchstartY: { type: Number },
		_touches: { type: Number },
		_swipeTreshold: { type: Number },
		_isList: { type: Boolean, attribute: false },
	};

	static styles = styles;

	constructor() {
		super();

		/**
		 * @type {Boolean} - Indikatoren unter dem Karussell anzeigen.
		 */
		this.dots = false;

		/**
		 * @type {Boolean} - Indikatoren und Play/Pause Button unter dem Karussell anzeigen (nur in Kombination).
		 */
		this.autoplay = false;

		/**
		 * @type {Boolean} - Automatische Wiedergabe aktiviert.
		 * @private
		 */
		this._autoplaying = false;

		/**
		 * @type {Number} - Intervall für die automatische Wiedergabe in Millisekunden.
		 */
		this.autoplayInterval = 5000;

		/**
		 * @type {Number|null} - Wert returned von der setInterval() method.
		 * @private
		 */
		this._autoplayInterval = null;

		/**
		 * @type {String} - Semantische Bezeichnung des Karussells (Pflichtfeld).
		 */
		this.label = undefined;

		/**
		 * @type {Number} - Wenn nur ein Element angezeigt werden soll, Breite in Pixel übergeben.
		 */
		this.single = undefined;

		/**
		 * @type {String} - Label für den Button rechts
		 */
		this.nextLabel = "Nächstes Element";

		/**
		 * @type {String} - Label für den Button links
		 */
		this.prevLabel = "Vorheriges Element";

		/**
		 * Welcher Slide soll initial angezeigt werden
		 * @type {String|last} - Index beginnend bei 1 oder Keyword
		 *
		 */
		this.position = 1;

		/**
		 * @type {String} - Erstes Element aktiv?
		 * @private
		 */
		this._first = true;

		/**
		 * @type {String} - Letztes Element aktiv?
		 * @private
		 */
		this._last = false;

		/**
		 * @type {Number} - Aktueller Slide
		 * @private
		 */
		this._currentSlide = 1;

		/**
		 * @type {Number} - Versatz
		 * @private
		 */
		this._offset = 0;

		/**
		 * @type {Boolean} - Determine
		 * @private
		 */
		this._focusMode = false;

		/**
		 * @type {Boolean} - Is it okay to move to the next slide?
		 * @private
		 */
		this._canMove = true;

		/**
		 * @type {Boolean} - Is carousel ready
		 * @private
		 */
		this._initialized = false;

		/** Container for image zoom settings
		 * @private
		 */
		this._imageZoom = {};

		/** Determines when a swipe is a swipe and not a tap
		 * @private
		 */
		this._swipeTreshold = 80;

		/** Touch x pos for image zoom
		 * @private
		 */
		this._touchstartX = 0;

		/** Touch y pos for image zoom
		 * @private
		 */
		this._touchstartY = 0;

		/** How many fingers are on the screen
		 * @private
		 */
		this._touches = 0;

		/** Determines if the carousel should be rendered as a list in HTML
		 * @private
		 */
		this._isList = false;
	}

	/**
	 * Move carousel
	 * @private
	 * @param {string} elemdirectionent - 'next' or 'prev'
	 */
	_move(direction) {
		if (this._canMove) {
			this._canMove = false;
			let item = this._current.nextElementSibling;

			if (direction === "prev") {
				item = this._current.previousElementSibling;
			}

			if (Number.isInteger(direction)) {
				item = this._items[direction];
			}

			// Swap current items
			this._current.classList.remove("current");
			item.classList.add("current", "active");
			item.removeAttribute("inert");

			this._positionSlide(item);

			if (direction === "prev") {
				this._currentSlide--;
			} else if (direction === "next") {
				this._currentSlide++;
			} else {
				this._currentSlide = direction + 1;
			}

			// console.log(`move ${direction}`)
			// console.log(`Current slide: ${this._currentSlide}`)

			let output = `Zeige Element ${this._currentSlide} von ${this._items.length}`;

			// If the item is an image, use the alt for the output
			if (this._items[this._currentSlide - 1].getAttribute("alt")) {
				output = this._items[this._currentSlide - 1].getAttribute("alt");
			}

			// if the items contains a heading, use the heading as the output
			if (
				this._items[this._currentSlide - 1].querySelectorAll("h2, h3, .wm-e-h1")
					.length
			) {
				output = `${
					this._items[this._currentSlide - 1].querySelectorAll(
						"h2, h3, .wm-e-h1"
					)[0].textContent
				} ${this._currentSlide} von ${this._items.length}`;
			}

			if (!this._autoplaying) {
				this._output.innerHTML = output;
			}

			this._wrapper.addEventListener("transitionend", () => {
				this._canMove = true;
			});
		}
		// Restart autoplay if it's enabled
		if (this.dots && this._autoplaying) {
			this._startAutoplay();
		}
	}

	/**
	 * Moves the next, prev, or current item into view
	 * @param {Node} slide
	 * @private
	 */
	_positionSlide() {
		// TODO: Delete if actually really not needed.
		// const defaultShadowOffset = parseInt(
		// 	getComputedStyle(document.documentElement).getPropertyValue(
		// 		"--carousel-shadow-offset"
		// 	)
		// );
		// const customShadowOffset = parseInt(
		// 	getComputedStyle(this).getPropertyValue("--carousel-shadow-offset")
		// );
		// Get offset for shadows
		// const shadowOffset = customShadowOffset || defaultShadowOffset;

		// Get position of active item
		this._offset =
			this._current.getBoundingClientRect().left -
			this._wrapper.getBoundingClientRect().left;
		// this._offset = this._offset - (shadowOffset * 2)

		// Scroll
		this._wrapper.style.transform = `translateX(${this._offset * -1}px)`;
	}

	/**
	 * Is the current currentSlide the first or the last slide
	 * @private
	 */
	_firstOrLast() {
		this._last = this._lastSlide.classList.contains("active");
		this._first = !(this._currentSlide > 1);
	}

	/**
	 * Only called when a click on the prev buttons happens
	 * @private
	 */
	_prevSlide() {
		this.prev();
		this._autoplaying = false;
	}

	/**
	 * Only called when a click on the next buttons happens
	 * @private
	 */
	_nextSlide() {
		this.next();
		this._autoplaying = false;
	}

	/**
	 * Zum nächsten Slide springen
	 */
	prev() {
		if (this._currentSlide === 1) {
			return;
		}

		this._move("prev");
		this._changeSlide();
	}

	/**
	 * Zum vorherigen Slide springen
	 */
	next() {
		if (this._lastSlide.classList.contains("active")) {
			return;
		}

		this._move("next");
		this._changeSlide();
	}

	/**
	 * Zu einem bestimmten Slide springen
	 * @param {Number} n 0-basierter Index
	 * @param {Boolean} transition Slidewechsel animieren
	 */
	slide(n, transition = true) {
		const pos = parseInt(n);
		if (this._items[pos] && pos !== this._currentSlide - 1) {
			// If transitions are turned off
			if (!transition) {
				// set correspondig class
				this.classList.add("notransition");
				// wait until transitions are over
				setTimeout(() => {
					// remove class again and enable carousel
					this.classList.remove("notransition");
					this._canMove = true;
				}, 300);
			}

			this._move(pos);
			this._changeSlide(pos + 1);
		}
	}

	/**
	 * Change the current slide
	 * @private
	 */
	_changeSlide(slide) {
		/** @type {CustomEvent} Slide wurde gewechselt */
		this.dispatchEvent(
			new CustomEvent("wm-slide-changed", {
				detail: this._currentSlide,
				bubbles: true,
			})
		);

		this._lazyLoadContent(slide || this._currentSlide + 1);
	}

	/**
	 * If there's an img or iframe with data-src, load it
	 * Load lazy content
	 * @private
	 */
	_lazyLoadContent(index) {
		const element = this._items[index - 1];
		if (element) {
			this._switchSourceAttributes(element);
		}
	}

	/**
	 * @private
	 */
	_switchSourceAttributes(element) {
		if (
			element.hasAttribute("data-src") ||
			element.querySelector("[data-src]")
		) {
			const lazyElement = element.querySelector("[data-src]") ?? element;
			if (lazyElement.closest("picture")) {
				const sources = lazyElement
					.closest("picture")
					.querySelectorAll("source");
				for (let i = 0; i < sources.length; i++) {
					const source = sources[i];
					if (source.hasAttribute("data-srcset")) {
						source.setAttribute("srcset", source.getAttribute("data-srcset"));
						source.removeAttribute("data-srcset");
					}
				}
			}

			lazyElement.onload = () => {
				lazyElement.classList.add("loaded");
			};
			lazyElement.setAttribute("src", lazyElement.getAttribute("data-src"));
			lazyElement.removeAttribute("data-src");
		}
	}

	updated(changedProperties) {
		if (!changedProperties.has("autoplay")) {
			return;
		}

		if (this._autoplaying && this.autoplay) {
			this._startAutoplay();
		} else {
			this._stopAutoplay();
		}
	}

	firstUpdated() {
		this.shadowRoot.querySelector("slot").addEventListener("slotchange", () => {
			this._setWidth();
			this._observeItems();
			this._setItemClasses();
			this._lazyLoadContent(2);
			this._addEvents();
			this._listenToOnLoadOnImages();

			/* This carousel contains list items */
			if (this._items[0].nodeName === "LI") {
				this._isList = true;
			}
		});

		// If the first slide in the set should not be the first visible slide
		// move to the correct slide
		setTimeout(() => {
			// Only of the value of the attribute is different than the initial value
			if (this.position !== 1) {
				// Jump to last item if keyword 'last' provided
				if (this.position === "last") {
					this.position = this._items.length;
				}
				// Move to corresponding slide
				this.slide(this.position - 1, false);
			}
		}, 0);

		if (!this.dots || !this.autoplay) {
			return;
		}

		const shouldAutoplay = window.matchMedia(
			"(prefers-reduced-motion: no-preference)"
		).matches;

		if (shouldAutoplay) {
			this._startAutoplay();
		} else {
			this._stopAutoplay();
		}
	}

	/**
	 * Reposition the active slide on resize
	 * @private
	 */
	_onResize() {
		this._positionSlide(this._current);

		// Restart autoplay if it was previously active
		if (this._autoplaying) {
			this._startAutoplay();
		}

		const childNodes = this.shadowRoot
			.querySelector("slot")
			.assignedElements({ flatten: true });

		for (const node of childNodes) {
			if (node.querySelector(".caption")) {
				this._positionCaption(node);
			}
		}
	}

	connectedCallback() {
		super.connectedCallback();

		window.addEventListener("resize", this._onResize.bind(this));

		if (!this.label) {
			console.error(
				this,
				"label-Attribut auf wm-carousel muss angegeben werden!"
			);
		}
		// If dots, autoplay, or autoplaying are not enabled, return early
		if (!this.dots && !this.autoplay) {
			// console.info(
			// 	this,
			// 	"Autoplay und dots sind deaktiviert."
			// );
			return;
		}

		// if autoplay but no dots write console error
		if (this.autoplay && !this.dots) {
			console.info(
				this,
				"Autoplay ist aktiviert, aber dots sind deaktiviert. Bitte aktiviere dots, um die Autoplay-Funktion richtig zu verwenden."
			);
			return;
		}

		// Start autoplay
		if (this.dots && this.autoplay) {
			this._startAutoplay();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._removeEvents();

		if (Object.keys(this._imageZoom).length) {
			this._imageZoom.resetZoom();
		}

		window.removeEventListener("resize", this._onResize);
		this._stopAutoplay();
	}

	/**
	 * add key events
	 * @private
	 */
	_keyEvents(e) {
		if (e.code === "ArrowRight") {
			this.next();
		}
		if (e.code === "ArrowLeft") {
			this.prev();
		}
	}

	/**
	 * Remove events
	 * @private
	 */
	_removeEvents() {
		this.removeEventListener("keyup", this._keyEvents);
	}

	/**
	 * Check if double tab or pinch zoom
	 * @private
	 */
	_handleTouch(e) {
		if (e.touches.length === 2 || isDoubleTap()) {
			e.preventDefault();
			if (!this._focusMode) {
				console.info("👉 Start touch in Carousel.");
				this._initFocusMode(e);
			}
		}

		this._touchstartX = e.changedTouches[0].clientX;
		this._touchstartY = e.changedTouches[0].clientY;
		this._touches = e.touches.length;
	}

	/**
	 * Check if touch stopped
	 * @private
	 */
	_handleTouchEnd(e) {
		setTimeout(() => {
			if (this._imageZoom.ready) {
				this._imageZoom.endHandler();
			}
		}, 150);

		this._touchendX = e.changedTouches[0].clientX;
		this._touchendY = e.changedTouches[0].clientY;

		if (this._touches < 2) {
			this._handleSwipe();
		}
	}

	/**
	 * swipe left or right
	 * @private
	 */
	_handleSwipe() {
		if (!this._focusMode) {
			if (this._touchendX + this._swipeTreshold < this._touchstartX) {
				this.next();
			}
			if (this._touchendX - this._swipeTreshold > this._touchstartX) {
				this.prev();
			}
		}
	}

	/**
	 *
	 * @private
	 */
	_leaveFocusMode(e) {
		if (this._focusMode) {
			// console.log("👉 Stop focusmode");

			this._focusMode = false;
			this.classList.remove("focusmode");

			this._items.forEach((item) => {
				item.removeAttribute("hidden");
				item.classList.remove("wm-image--zoom");

				if (item.querySelector("img")) {
					item.querySelector("img").classList.remove("wm-image--zoom");
				}
			});

			const container = e.target;
			container.style.removeProperty("width");
			container.style.removeProperty("aspect-ratio");

			this._imageZoom.destroyEvents();

			setTimeout(() => {
				this.classList.remove("notransition");
			}, 300);
		}
	}

	/**
	 * Switch in to a special mode for images that have been zoomed
	 * @private
	 */
	_initFocusMode(e) {
		const target = e.target;
		if (!this._focusMode) {
			// console.log("👉 Start focusmode");

			if (target.nodeName === "IMG") {
				this._focusMode = true;
				this.classList.add("focusmode");
				this.classList.add("notransition");

				const image = target;
				this._items.forEach((item) => {
					if (item !== this._current) {
						item.hidden = true;
					}
				});

				const imageWrapper = image.closest(".content-inner");
				imageWrapper.addEventListener("reset", this._leaveFocusMode.bind(this));

				this._imageZoom = new WmImageZoom({
					img: image,
					container: imageWrapper,
					zoomedClass: "wm-image--zoomed",
				});

				image.classList.add("wm-image--zoom");

				setTimeout(() => {
					this._imageZoom.startHandler(e, true);
				}, 150);
			}
		}
	}

	/**
	 * add events
	 * @private
	 */
	_addEvents() {
		this.addEventListener("keyup", this._keyEvents);

		if (document.querySelector("dialog")) {
			document
				.querySelector("dialog")
				.addEventListener("touchstart", preventPinchZoom, { passive: true });
		}

		this.addEventListener("touchstart", this._handleTouch, { passive: true });
		this.addEventListener("touchend", this._handleTouchEnd);

		if (this.autoplay) {
			const startAutoplay = this._startAutoplay.bind(this);
			const stopAutoplay = this._stopAutoplay.bind(this);
			this._wrapper.addEventListener("focusin", stopAutoplay);
			this._wrapper.addEventListener("focusout", startAutoplay);
		}
	}

	/**
	 * set current, last, and first classes
	 * @private
	 */
	_setItemClasses() {
		this._items[0].classList.add("current", "first");
		this._items[this._items.length - 1].classList.add("last");
	}

	/**
	 * observe item visibility with 90% visibility within root
	 * @private
	 */
	_observeItems() {
		const observer = new IntersectionObserver(
			this._handleIntersection.bind(this),
			{
				root: this,
				threshold: 0.9,
			}
		);

		const imageObserver = new IntersectionObserver(
			this._handleImageIntersection.bind(this),
			{
				root: this,
				threshold: 0,
			}
		);

		for (let i = 0; i < this._items.length; i++) {
			const item = this._items[i];

			observer.observe(item);

			if (item.querySelector("img") || item.nodeName === "IMG") {
				imageObserver.observe(item.querySelector("img") || item);
			}
		}
	}

	/**
	 * set the width of each item for single carousels
	 * @private
	 */
	_setWidth() {
		if (this.single) {
			this.style.maxWidth = `${this.single}px`;
		}
	}

	/**
	 * Make slides active/inactive
	 * @private
	 */
	// TODO intersection letzte card, nicht vollstandig in carouselcontainer - nicht clickbar!
	_handleIntersection(entries) {
		// The callback will return an array of entries, even if you are only observing a single item
		entries.map((entry) => {
			const target = entry.target;

			if (!target.classList.contains("wm-image--zoom")) {
				// _observeItems () threshold set to 90% intersection
				if (entry.isIntersecting) {
					// console.log(entry.intersectionRatio)
					target.classList.add("active");
					target.removeAttribute("inert");
				} else {
					target.setAttribute("inert", "");
					target.classList.remove("active");
				}
			}

			this._firstOrLast();
			return entry;
		});

		this._initialized = true;
	}

	/**
	 * @private
	 */
	_handleImageIntersection(entries) {
		entries.map((entry) => {
			const target = entry.target;

			if (entry.isIntersecting) {
				this._switchSourceAttributes(target);
			}
		});
	}

	/**
	 * @private
	 */
	_listenToOnLoadOnImages() {
		const childNodes = this.shadowRoot
			.querySelector("slot")
			.assignedElements({ flatten: true });

		for (const node of childNodes) {
			if (node.querySelector("img")) {
				const img = node.querySelector("img");
				if (img.closest(".image")) {
					img.addEventListener("load", () => {
						img.closest(".image").style.maxHeight = `${img.naturalHeight}px`;
						this._positionCaption(node);
					});
				}
			}
		}
	}

	/**
	 * @private
	 */
	_positionCaption(parent) {
		if (parent.querySelector(".caption")) {
			const caption = parent.querySelector(".caption");
			const img = parent.querySelector("img");
			const nodeHeight = parent.getBoundingClientRect().height;
			const imgHeight = img.getBoundingClientRect().height;
			const imgWidth = img.getBoundingClientRect().width;

			caption.style.bottom = (nodeHeight - imgHeight) / 2 + "px";
			caption.style.width = imgWidth + "px";
			parent.classList.add("image-loaded");
		}
	}

	/**
	 * Toggles the autoplay state
	 */
	toggleAutoplay() {
		this._autoplaying = !this._autoplaying;
		if (this._autoplaying) {
			this._startAutoplay();
		} else {
			this._stopAutoplay();
		}
	}

	/**
	 * Starts the autoplay
	 * @private
	 */
	_startAutoplay() {
		// Clear the existing autoplay interval
		this._stopAutoplay();
		this._autoplaying = true;

		// Start a new autoplay interval
		this._autoplayInterval = setInterval(() => {
			if (this._lastSlide.classList.contains("active")) {
				this.slide(0); // Go to the first slide
			} else {
				this.next(); // Move to the next slide
			}
		}, this.autoplayInterval);
	}

	/**
	 * Stops the autoplay
	 * @private
	 */
	_stopAutoplay() {
		this._autoplaying = false;
		clearInterval(this._autoplayInterval);
	}

	/**
	 * @private
	 * @returns html
	 */
	_renderAutoplayControls() {
		return x`
			<div class="autoplay-controls">
				<wm-button @click="${this.toggleAutoplay}">
					<button
						aria-pressed="${this._autoplaying}"
						aria-label="${this._autoplaying
							? "Pause Autoplay"
							: "Start Autoplay"}"
					>
						<wm-icon iconid="${this._autoplaying ? "pause" : "play"}"></wm-icon>
					</button>
				</wm-button>
			</div>
		`;
	}

	/**
	 * @private
	 */
	_renderDots() {
		return x`
			<div class="navigation">
				<div class="dots">
					${this._items.map((item, i) => {
						// Adjusting the index to start from 1 instead of 0
						const dotIndex = i + 1;
						return x`
							<wm-button>
								<button
									class="${this._currentSlide === dotIndex ? "active" : ""}"
									@click="${() => this.slide(dotIndex - 1)}"
									aria-label="Element ${dotIndex} von ${this._items.length}"
								></button>
							</wm-button>
						`;
					})}
				</div>

				${this.autoplay ? this._renderAutoplayControls() : ``}
			</div>
		`;
	}

	render() {
		const nextButtonClass = { "control--inactive": this._last };
		const prevButtonClass = { "control--inactive": this._first };

		return x`
			<div role="region" aria-label="${this.label}">
				<div>
					<button
						class="control control--prev ${e(prevButtonClass)}"
						aria-disabled="${this._first ? "true" : "false"}"
						aria-label="${this.prevLabel}"
						@click="${this._prevSlide}"
					></button>
					<button
						class="control control--next ${e(nextButtonClass)}"
						aria-disabled="${this._last ? "true" : "false"}"
						aria-label="${this.nextLabel}"
						@click="${this._nextSlide}"
					></button>
				</div>
				<div class="inner">
					${n(
						this._isList,
						() => x`<ul class="strip">
							<slot></slot>
						</ul>`,
						() => x`<div class="strip"><slot></slot></div>`
					)}
				</div>

				${this._items && this.dots ? this._renderDots() : ``}
			</div>
			<div role="status"></div>
		`;
	}
}

customElements.define("wm-carousel", Carousel);

const tagName = "wm-carousel";

export { Carousel, tagName };
