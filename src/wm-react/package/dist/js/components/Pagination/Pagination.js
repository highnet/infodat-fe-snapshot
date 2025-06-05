/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  :host([justify="center"]) ul {
    justify-content: center;
  }
  
  :host([justify="space-between"]) ul {
    justify-content: space-between;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ::slotted(button),
  button {
    align-items: center;
    background-color: var(--pagination-background-color) !important;
    color: var(--pagination-font-color) !important;
    border-color: var(--pagination-border-color) !important;
    border-radius: 50%;
    display: inline-flex;
    font-family: inherit;
    font-size: inherit;
    font-variation-settings: normal !important;
    height: 2.5rem;
    justify-content: center;
    width: 2.5rem;
  }

  button[aria-current="page"] {
    background-color: var(--pagination-background-color--active) !important;
    color: var(--pagination-font-color--active) !important;
    border-color: var(--pagination-border-color--active) !important;
  }

  button:is(:hover, :focus-visible, :focus) {
    background-color: var(--pagination-background-color--hover) !important;
    color: var(--pagination-font-color--hover) !important;
    border-color: var(--pagination-border-color--hover) !important;
  }

  [aria-disabled="true"] {
    opacity: 0.2;
    pointer-events: none;
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
`];

/**
 * Paginierung
 * @summary Icon/Icon
 *
 * @slot default - Text
 */

/**
 * @cssprop --pagination-background-color - Hintergrundfarbe der Buttons
 * @cssprop --pagination-background-color--active - Hintergrundfarbe des aktiven Buttons
 * @cssprop --pagination-background-color--hover - Hintergrundfarbe Hover & Focus
 * @cssprop --pagination-border-color - Rahmenfarbe der Buttons
 * @cssprop --pagination-border-color--active - Rahmenfarbe des aktiven Buttons
 * @cssprop --pagination-border-color--hover - Rahmenfarbe Hover & Focus
 * @cssprop --pagination-font-color - Schriftfarbe der Buttons
 * @cssprop --pagination-font-color--active - Schriftfarbe des aktiven Buttons
 * @cssprop --pagination-font-color--hover - Schriftfarbe Hover & Focus
 */

class Pagination extends s {
  /** @private */
	get _output() {
		return this.shadowRoot?.querySelector('[role="status"]') ?? null;
	}

  static properties = {
    hideAllControls: { type: Boolean, reflect: true },
    currentPage: { type: Number, reflect: true },
    firstAndLast: { type: Boolean, reflect: true },
    justify: { type: String, reflect: true },
		label: { type: String, reflect: true },
    maxPages: { type: Number, reflect: true },
    perPage: { type: Number, reflect: true },
    total: { type: Number, reflect: true },
    _firstPage: { type: Number },
    _items: { type: Array },
    _pages: { type: Number },
  };

  static styles = [styles];

  constructor() {
    super();

    /**
     * @type {Number} - Die Aktive Seite
     */
    this.currentPage = 1;

    /**
     * @type {Boolean} - Buttons für erste und letzte Seite anzeigen
     */
    this.firstAndLast = undefined;

    /**
		 * @type {String} - Label für die navigation-Landmark
		 **/
		this.label = "Weitere Seiten";

    /**
     * @type {Number} - Maximale Anzahl an Seiten
     */
    this.maxPages = 10;

    /**
     * @type {Number} - Anzahl an darzustellenden Elementen pro Seite
     */
    this.perPage = 8;

    /**
     * @type {Number} - Anzahl an darzustellenden Elementen ingesamt
     */
    this.total = 0;

    /** @type {'center'|'space-between'} Ausrichtung auf der Hauptachse */
    this.justify = undefined;

    /**
     * The first page
     * @private
     */
    this._firstPage = 1;

    /**
     * Items to be rendered
     * @private
     */
    this._items = [];

    /**
     * @type {Boolean} - Versteckt alle Controls
     */
    this.hideAllControls = false;

    /**
     * Number of pages
     * @private
     */
    this._pages = 0;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _prevPage() {
    this._changePage(this.currentPage - 1);
  }

  _nextPage() {
    this._changePage(this.currentPage + 1);
  }

  _click(e) {
    this._changePage(parseInt(e.target.dataset.index));
  }

  _changePage(newPage) {
    const details = {
      currentPage: newPage,
      previousPage: this.currentPage,
    };

    this.currentPage = newPage;
    this._updateFirstPage();

    this._output.textContent = `Zeige Seite ${this.currentPage} von ${this._pages}`;

    /**
     * @type {CustomEvent} Seitenwechsel
     * @summary Aktuelle und vorherige Seite (object)
     */
    this.dispatchEvent(
      new CustomEvent("wm-page-changed", {
        detail: details,
        bubbles: true,
        composed: true,
      })
    );
  }

  _updateFirstPage() {
    const active = Math.floor(this.maxPages / 2) + 1;
    this._firstPage = this.currentPage - active + 2;

    if (this._firstPage > this._pages - this.maxPages + 1) {
      this._firstPage = this._pages - this.maxPages + 1;
    }

    if (this._firstPage < 1) {
      this._firstPage = 1;
    }
  }

  _renderItems() {
    this._pages = Math.ceil(this.total / this.perPage);
    this._items = [];

    const pagesVisible = Math.min(this._pages, this.maxPages);

    for (let i = this._firstPage; i < pagesVisible + this._firstPage; i++) {
      const isActive = i === this.currentPage ? "page" : false;

      this._items.push(x`
        <li>
          <button
            aria-current="${isActive}"
            data-index="${i}"
            @click="${this._click}"
          >
            ${i}
          </button>
        </li>
      `);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has("currentPage")) {
      this._renderItems();
    }
  }

  reset() {
    this.currentPage = 1;
    this._firstPage = 1;
  }

  render() {
    this._renderItems();

    return x`
      <nav aria-label="${this.label}">
        <ul>
          ${this._renderControlButton(1, "chevron-double-left", this.currentPage === 1, this.hideAllControls || !this.firstAndLast, "Erste Seite")}
          ${this._renderControlButton(this.currentPage - 1, "chevron-left", this.currentPage === 1, this.hideAllControls, "Vorherige Seite")}

          ${this._items}
          <slot></slot>

          ${this._renderControlButton(this.currentPage + 1, "chevron-right", this.currentPage === this._pages, this.hideAllControls, "Nächste Seite")}
          ${this._renderControlButton(this._pages, "chevron-double-right", this.currentPage === this._pages, this.hideAllControls || !this.firstAndLast, "Letzte Seite")}
        </ul>
        <div role="status"></div>
      </nav>
    `;
  }

  _renderControlButton(page, iconId, isDisabled, isHidden, label) {
    return x`
      <li ?hidden="${isHidden}">
        <button
          @click="${() => this._changePage(page)}"
          aria-disabled="${isDisabled ? "true" : "false"}"
          aria-label="${label}"
        >
          <wm-icon width="22" iconid="${iconId}"></wm-icon>
        </button>
      </li>
    `;
  }
}

customElements.define("wm-pagination", Pagination);

const tagName = "wm-pagination";

export { Pagination, tagName };
