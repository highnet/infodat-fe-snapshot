/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { n } from '../../when-55b3d1d8.js';
import { o } from '../../if-defined-4084517f.js';
import { SlotController } from '../misc/slot.js';
import { e } from '../../class-map-68392fb3.js';
import '../../directive-4c65af6a.js';

const styles = [
  i`
    * {
      box-sizing: border-box;
    }

    :host {
      --_spacing: var(--card-spacing--mobil);
      --_grid-columns: var(--_spacing) 1fr var(--_spacing);
      --_grid-rows: repeat(4, min-content) 1fr;
    }

    :host([flipped]) .card-inner {
      transform: rotateY(180deg);
    }

    .card-inner {
      align-content: start;
      background-color: var(--card-background-color);
      border: var(--card-border);
      box-shadow: var(--card-shadow);
      display: grid;
      block-size: 100%;
      grid-template-columns: var(--_grid-columns);
      grid-template-rows: var(--_grid-rows);
      outline: 1px solid transparent;
      padding-top: var(--_spacing);
      padding-bottom: var(--_spacing);
      position: relative;
      transition: transform 0.8s, box-shadow ease-in-out 0.3s;
      transform-style: preserve-3d;
    }

    @media print {
      .card-inner {
        padding: var(--_spacing);
        display: block;
      }
    }

    /* hover syles for card */
    :host([blocklink]) .card-inner:is(:hover, :focus-within) {
      box-shadow: var(--card-shadow--hover);
      transition: box-shadow 0.3s ease-in-out;
    }

    :host([blocklink]) .video {
      background-color: var(--wm-color-ui-interactive);
      color: var(--wm-color-weiss);
    }

    /* hover styles for card with video */
    :host([blocklink]) .card-inner:is(:hover, :focus-within) .video wm-icon {
      transform: scale(1.05);
      transition: transform 0.3s ease-in-out;
    }

    ::slotted(:is(img, picture)) {
      display: block;
      height: 100% !important;
      object-fit: cover;
      width: 100%;
    }

    ::slotted(*) {
      grid-column: 2;
      min-width: 0;
    }

    ::slotted(:is(img, picture)),
    ::slotted(div[slot]) {
      margin: 0 !important;
    }

    ::slotted(:is(h1, h2, h3, h4)) {
      -webkit-hyphens: auto;
      hyphens: auto;
    }

    .header {
      background-color: inherit;
      align-items: normal;
      display: flex;
      grid-column: 2;
      grid-row: 3;
      justify-content: var(--card-header-justify);
      z-index: 1;
      padding: var(--card-header-padding);
    }

    .media {
      aspect-ratio: 16 / 9;
      grid-column: 1 / -1;
      grid-row: 1;
      margin-bottom: var(--_spacing);
      margin-top: calc(var(--_spacing) * -1);
      position: relative;
    }

    .content ::slotted(*:not(:last-of-type)) {
      margin-bottom: var(--_spacing) !important;
    }

    .content {
      background-color: inherit;
      grid-column: 2;
      grid-row: 4;
    }

    .content-with-link {
      z-index: 2;
    }

    .precontent {
      grid-column: 2;
      grid-row: 2;
      margin-bottom: 0.5em;
      z-index: 1;
    }

    .postcontent {
      grid-column: 2;
      grid-row: -1;
      z-index: 1;
    }

    .flip {
      background-color: inherit;
      block-size: 100%;
      inline-size: 100%;
      grid-column: 2 / -2;
      grid-row: 1 / -1;
      z-index: 1;
      transition: transform 0.8s ease-in-out;
    }
    
    @media not print {
      .flip {
        transform: translateZ(-1px) rotateY(180deg);
      }
    }

    .flip:focus-visible {
      outline: var(--wm-theme-site-focus-outline);
    }

    .flip-header {
      display: flex;
      justify-content: flex-end;
      padding-block: 0.7rem;
    }

    @media print {
      .flip-header {
        display: none;
      }
    }

    .eyecatcher {
      background: var(--card-media-background-color);
      color: var(--card-media-font-color);
      font-size: var(--card-eyecatcher-font-size);
      font-weight: normal;
      padding: 0 var(--card-eyecatcher-padding);
      position: absolute;
    }

    :host(:not([position])) .eyecatcher {
      bottom: var(--card-eyecatcher-spacing);
      right: 0;
    }

    :host([position*="block-end"]) .eyecatcher {
      bottom: var(--card-eyecatcher-spacing);
    }

    :host([position*="block-start"]) .eyecatcher {
      top: var(--card-eyecatcher-spacing);
    }

    :host([position*="inline-start"]) .eyecatcher {
      left: 0;
    }

    :host([position*="inline-end"]) .eyecatcher {
      right: 0;
    }

    :host([position*="inline-start"][eyecatcher="round"]) .eyecatcher {
      left: var(--card-eyecatcher-spacing);
    }

    :host([position*="inline-end"][eyecatcher="round"]) .eyecatcher {
      right: var(--card-eyecatcher-spacing);
    }

    .video {
      background: var(--card-media-background-color);
      color: var(--card-media-font-color);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      width: 3.5em;
      height: 3.5em;
      border-radius: 50%;
      padding: 0;
    }

    :host([eyecatcher="round"]) .eyecatcher {
      align-items: center;
      border-radius: 50%;
      display: flex;
      height: 3.5em;
      justify-content: center;
      padding: 0;
      transform: rotate(-20deg);
      width: 3.5em;
    }

    :host([canvas]) .media ::slotted(:is(h2, h3)) {
      margin: 0 !important;
    }

    :host([canvas]) .media {
      --_align-items: center;
      --_justify-content: center;
      --_text-align: center;

      align-items: var(--_align-items);
      background-color: var(--card-media-background-color);
      color: var(--card-media-font-color);
      display: flex;
      justify-content: var(--_justify-content);
      padding: var(--_spacing);
      text-align: var(--_text-align);
    }

    :host([canvas][position]) .media {
      --_text-align: start;
    }

    :host([canvas][position*="block-end"]) .media {
      --_align-items: end;
    }
    :host([canvas][position*="block-start"]) .media {
      --_align-items: start;
    }
    :host([canvas][position*="inline-end"]) .media {
      --_justify-content: end;
    }
    :host([canvas][position*="inline-start"]) .media {
      --_justify-content: start;
    }

    @media (min-width: 64em) {
      :host(:not([size="s"])) {
        --_spacing: var(--card-spacing--desktop);
      }

      :host([size="full-responsive"]) {
        --_grid-columns: 1fr 1fr;
        --_spacing: var(--card-spacing--desktop);
        --_min-height: 18rem;
      }

      :host([size="full-responsive"]) .card-inner {
        --_media-col: 1 / 2;
        --_media-pos: 0;
        --_content-col: 2;
        column-gap: var(--_spacing);
        padding: var(--_spacing);
        min-height: var(--_min-height);
      }

      :host([size="full-responsive"]) .media {
        grid-column: var(--_media-col);
        grid-row: 1;
        position: absolute;
        right: var(--_media-pos);
        top: calc(var(--_spacing) * -1);
        height: calc(100% + var(--_spacing));
        width: calc(100% + var(--_spacing));
        margin: 0;
        min-height: var(--_min-height);
      }

      :host([size="full-responsive"]) .precontent {
        grid-column: var(--_content-col);
        grid-row: 1;
      }

      :host([size="full-responsive"]) .header {
        grid-column: var(--_content-col);
        grid-row: auto;
      }

      :host([size="full-responsive"][size="inline-end"]) .header {
        grid-column: var(--_content-col);
      }

      :host([size="full-responsive"]) .content {
        grid-column: var(--_content-col);
        grid-row: auto;
      }

      :host([size="full-responsive"]) .postcontent {
        grid-column: var(--_content-col);
      }

      @container style(--card-style: reverse) {
        :host([size="full-responsive"]) .card-inner {
          --_content-col: 1;
          --_media-col: -1 / 2;
          --_media-pos: calc(var(--_spacing) * -1);
        }
      }
    }

    @media print {
      .card-inner {
        box-shadow: none;
        padding: 0;
      }

      .media {
        margin-top: 0 !important;
      }

      :host([canvas]) .media {
        aspect-ratio: auto;
        background-color: transparent;
        padding: 0;
    }
  `,
];

/**
 * Komponente zur Darstellung von Inhalten als Card.
 * @summary Button/Button, Icon/Icon
 *
 * @slot heading - Überschrift
 * @slot media - Bild oder Video
 * @slot eyecatcher - Störer
 * @slot content - Inhalt der Card
 * @slot precontent - Zusätzlicher Inhalt am Anfang der Card, zum Beispiel Chip
 * @slot postcontent - Zusätzlicher Inhalt am Ende der Card, zum Beispiel Tags
 * @slot flip - Inhalt für die Rückseite der Flip-Card
 *
 */

/**
 * @cssprop --card-background-color - Hintergrundfarbe der Card
 * @cssprop --card-border - Rahmen der Card
 * @cssprop --card-eyecatcher-spacing - Abstand des Störers zum Rand
 * @cssprop --card-eyecatcher-padding - Innenabstand im Störer
 * @cssprop --card-eyecatcher-font-size - Schriftgröße im Störer
 * @cssprop --card-header-justify - Ausrichtung im Card-Header
 * @cssprop --card-header-padding - Innenabstand im Card-Header
 * @cssprop --card-media-background-color - Hintergrundfarbe Media-Element
 * @cssprop --card-media-font-color - Textfarbe Media-Element
 * @cssprop --card-spacing--mobil - Innenabstand in der Card (Mobilansicht unter 64em)
 * @cssprop --card-spacing--desktop - Innenabstand in der Card (Desktopansicht ab 64em)
 * @cssprop --card-shadow - Schatten um die Card
 * @cssprop --card-shadow--hover - Schatten um die Card bei Fokus und Hover
 */

class Card extends s {
  /**
   * @private
   */
  get _flipShow() {
    return this.shadowRoot?.querySelector("#flip-show");
  }

  /**
   * @private
   */
  get _flipSide() {
    return this.shadowRoot?.querySelector(".flip");
  }

  static properties = {
    size: { type: String, reflect: true },
    _hasMedia: { type: String, attribute: false },
    _flipcard: { type: Boolean },
    flipcardlabel: { type: String },
    flipcardicon: { type: String },
    flipped: { type: Boolean, reflect: true },
    blocklink: { type: Boolean, reflect: true },
    canvas: { type: Boolean, reflect: true },
    video: { type: Boolean, reflect: true },
    color: { type: String, reflect: true },
    position: { type: String, reflect: true },
    eyecatcher: { type: String },
  };

  static styles = styles;

  constructor() {
    super();

    /**
     * @type {'s'|'m'|'l'|'full'|'full-responsive'} - Gibt die Maximalbreite der Card an.
     * */
    this.size = undefined;

    /**
     * @type {'default'|'round'} - Gibt die Art des Störers in der Card an.
     * */
    this.eyecatcher = undefined;

    /**
     * @type {'block-start'|'block-end'|'inline-start'|'inline-end'} - Gibt die Position des Textes in der Canvas-Card oder des Störers an.
     * */
    this.position = undefined;

		/**
		 * @type {'abendstimmung'|'abendstimmung-light'|'flieder'|'flieder-light'|'frischgruen'|'frischgruen-light'|'goldgelb'|'goldgelb-light'|'morgenrot'|'morgenrot-light'|'nebelgrau'|'nebelgrau-light'|'wasserblau'|'wasserblau-light'} - Gibt die Farbe der Canvas-Card oder des Störers an
		 * */
		this.color = undefined;

    /**
     * @type {Boolean} -  Gesamte Card verlinken.
     * */
    this.blocklink = false;

    /**
     * @type {Boolean} - Cards mit Hintergrundfarbe
     * */
    this.canvas = false;

    /**
     * @private
     */
    this._hasMedia = null;

    /**
     * @private
     */
    this._flipcard = false;

		/**
		 * @type {String} - Label des Flipcard Buttons
		 */
		this.flipcardlabel = "Teilen";

		/**
		 * @type {String} - Icon im Flipcard Button
		 */
		this.flipcardicon = "embed";

    /**
     * @type {Boolean} - Es soll eine Flip-Card umgedreht gezeigt werden.
     * */
    this.flipped = false;

    /**
     * @type {Boolean} - Es soll ein Video Icon gezeigt werden.
     * */
    this.video = false;

    /**
     * @type { class } - Slotcontroller
     * @private
     */
    this._slotController = new SlotController(this);

    /**
     * @private
     */
    this._contentHasLinks = false;
  }

  /**
   * If there's an image, link the entire Card.
   */
  firstUpdated() {
    this.shadowRoot
      .querySelector('slot[name="media"]')
      .addEventListener("slotchange", () => {
        this._hasMedia = this.shadowRoot
          .querySelector('slot[name="media"]')
          .assignedNodes().length;
      });
  }

  updated(changedProperties) {
    if (changedProperties.has("canvas")) {
      if (this.canvas) {
        this._hasMedia = true;
      }
    }

    if (changedProperties.has("video")) {
      if (this.video) {
        this.blocklink = true; // Automatically set blocklink to true when video is set to true
      }
    }

    if (changedProperties.has("blocklink")) {
     // Query all relevant links
      const headingLinks = this.querySelectorAll('[slot="heading"] a');
      const mediaLinks = this.querySelectorAll('[slot="media"] a');
      const contentLinks = this.querySelectorAll('[slot="content"] a');
      const postcontentLinks = this.querySelectorAll('[slot="postcontent"] a');
      const precontentLinks = this.querySelectorAll('[slot="precontent"] a');

      const allLinks = [...headingLinks, ...mediaLinks, ...contentLinks, ...postcontentLinks, ...precontentLinks];

      // If there are more than one link, disable blocklink
      if (allLinks.length > 1) {
        this.blocklink = false;
        this.removeAttribute("blocklink");
      }

      // Add a class to the postcontent link if any exist
      if (postcontentLinks.length > 1) {
        postcontentLinks.forEach(link => {
          link.classList.add("block-link-unlink");
        });
      }
    }
  }


  /**
   * @private
   * Called when the flip slot is present
   */
  _onFlip() {
    this._flipcard = true;
  }

  /**
   * @private
   * flip the card
   */
  _flipTheCard() {
    this.flipped = !this.flipped;

    setTimeout(() => {
      if (this.flipped) {
        this._flipSide.focus();
      } else {
        this._flipShow.focus();
      }
    }, 0);

    /** @type {CustomEvent} Karte wurde geflipped */
		this.dispatchEvent(
			new CustomEvent("wm-card-flipped", {
				detail: {
          flipped: this.flipped
        },
				bubbles: true,
			})
		);
  }

  render() {
    return x`
      <div class="card-inner">
        <div
          class="header"
          inert="${o(this.flipped ? "inert" : undefined)}"
        >
          <slot name="heading"></slot>

          ${n(
            this._flipcard,
            () => x`
              <wm-button kind="clean">
                <button
                  @click="${this._flipTheCard}"
                  aria-expanded="${this.flipped}"
                  id="flip-show"
                >
                  <wm-icon iconid="${this.flipcardicon}"></wm-icon>
                  ${this.flipcardlabel}
                </button>
              </wm-button>
            `
          )}
        </div>

        <div class="media" ?hidden=${!this._hasMedia}>
          <slot name="media"></slot>

          <div class="eyecatcher">
            <slot name="eyecatcher"></slot>
          </div>

          ${n(
            this.video,
            () => x`
              <div class="video">
                <wm-icon iconid="play-button" width="50"></wm-icon>
              </div>
            `
          )}
        </div>

        ${n(
          this._slotController.hasNamedSlot("precontent"),
          () => x`
            <div
              class="precontent"
              inert="${o(this.flipped ? "inert" : undefined)}"
            >
              <slot name="precontent"></slot>
            </div>
          `
        )}
        ${n(
          this._slotController.hasNamedSlot("content"),
          () => x`
            <div
              class="content ${e({'content-with-link': this._contentHasLinks})}"
              inert="${o(this.flipped ? "inert" : undefined)}"
            >
              <slot name="content"></slot>
            </div>
          `
        )}
        <div
          class="postcontent"
          inert="${o(this.flipped ? "inert" : undefined)}"
        >
          <slot name="postcontent"></slot>
        </div>

        ${n(
          this._slotController.hasNamedSlot("flip"),
          () => x`
            <div
              class="flip"
              inert="${o(!this.flipped ? "inert" : undefined)}"
              aria-label="Teilen"
              role="region"
              tabindex="0"
            >
              <div class="flip-header">
                <wm-button kind="clean">
                  <button
                    @click="${this._flipTheCard}"
                    aria-expanded="${this.flipped}"
                    class="flip-hide"
                  >
                    <wm-icon iconid="close">Schließen</wm-icon>
                  </button>
                </wm-button>
              </div>

              <slot name="flip" @slotchange="${this._onFlip}"></slot>
            </div>
          `
        )}
      </div>
    `;
  }
}
customElements.define("wm-card", Card);

const tagName = "wm-card";

export { Card, tagName };
