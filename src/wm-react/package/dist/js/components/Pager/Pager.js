/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`

:host > nav > ol {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end !important;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width:768px) {
  :host > nav > ol {
    flex-direction: row;
  }
}

:host > nav > ol > li {
  margin-top: 0 !important;
  flex: 1 1 0%;
  min-width: 0;
}

:host > nav > ol > li:first-child > span {
  padding-left: var(--_pager-textpadding);
}

:host > nav > ol > li:nth-child(2) {
   text-align: right;
}

:host > nav > ol > li:nth-child(2) > span {
  padding-right: var(--_pager-textpadding);
}

`];

/**
 * Komponente zum Blättern von Kapiteln
 * 
 * @slot prevLink - Verlinkung zur vorigen Seite
 * @slot nextLink - Verlinkung zur nächsten Seite
 */

/**
 * @cssprop --pager-textpadding - Einrückung der Überschrift
 */

class Pager extends s {
  static properties = {
    prevText: { type: String },
    nextText: { type: String },
    hidePrev: { type: Boolean },
    hideNext: { type: Boolean },
  }

  static styles = [styles]

  constructor() {
    super();

    /**
     * @type {String} - Alternative Überschrift für Zurück-Link
     */
    this.prevText = "Voriges Kapitel:";

    /**
     * @type {String} - Alternative Überschrift für Weiter-Link
     */
    this.nextText = "Nächstes Kapitel:";
  }

  render() {
    return x`
    <nav aria-label="Seiten blättern">
      <ol>
        <li ?hidden="${this.hidePrev}">
          <span>${this.prevText}</span><br>
            <slot name="prevLink"></slot>
        </li>
      
        <li ?hidden="${this.hideNext}">
          <span>${this.nextText}</span><br>
            <slot name="nextLink"></slot>
        </li>
      </ol>
    </nav>
    `
  }
}


customElements.define("wm-pager", Pager);

const tagName = "wm-pager";

export { Pager, tagName };
