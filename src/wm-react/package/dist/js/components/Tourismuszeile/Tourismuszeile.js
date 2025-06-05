/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 99999;
    width: 100%;
    background-color: var(--tourismuszeile-background-color);
    transition: 0.3s;
    z-index: 1230;
    overflow: hidden;
  }

  :host([hidden]) {
    display: none;
  }

  [role="banner"] {
    padding-left: 1rem;
    padding-right: 1rem;
    margin: 0 auto;
    max-width: var(--wm-theme-site-wrapper-width);
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  a {
    display: block;
    text-decoration: none;
    color: var(--tourismuszeile-font-color);
  }

  h3, p {
    margin: 0;
    transition: .3s;
  }

  h3 + p {
    display: block;
  }

  h3 {
    font-size: var(--wm-font-size);
  }

  p {
    font-size: var(--wm-font-size-xs);
  }

  wm-button {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    color: var(--tourismuszeile-font-color);
  }

  @media (min-width: 48em) {
    [role="banner"] {
      padding-left: 3.1rem;
      padding-right: 3.1rem;
    }

    a {
      display: flex;
      align-items: center;
      gap: 1rem;
      height: 100%;
    }

    a:hover u {
      text-decoration: none;
    }

    h3 + p {
      margin-top: 0;
    }

    h3 {
      padding-top: 0;
    }

    wm-button {
      right: 3.1rem;
    }
  }

  @media (min-width: 64em) {
    h3 {
      font-size: 1.4rem;
    }

    p {
      font-size: 1.1rem;
    }
  } 
`];

/**
 * Komponente zur Darstellung eines fixierten Banners am Seitenanfang
 * 
 * @slot heading - Catchphrase - maximal 20 Zeichen
 * @slot content - Kurzbeschreibung - maximal 40 Zeichen
 */

/**
 * @cssprop --tourismuszeile-bannerheight - Höhe des Banners
 * @cssprop --tourismuszeile-background-color - Hintergrundfarbe
 * @cssprop --tourismuszeile-font-color - Schriftfarbe
 */

class Tourismuszeile extends s {
  static properties = {
    hidden: { type: Boolean, reflect: true },
    url: { type: String }
  }

  static styles = [styles]

  constructor() {
    super();

    /**
     * @type {Boolean} - Sichtbarkeit des Banners
     */
    this.hidden = undefined;

    /**
     * @type {String} - Bannerverlinkung
     */
    this.url = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    this.hidden = localStorage.getItem("wm-tourismuszeile-hidden");
    this._setClass();
  }

  /**
   * @private
   */
  _setClass() {
    let list = document.documentElement.classList;
    if (!list.contains("wm-tourismuszeile-visible") && this.hidden == undefined)
      list.add("wm-tourismuszeile-visible");
  }

  /**
   * @private
   */
  _close() {
    this.hidden = true;
    localStorage.setItem("wm-tourismuszeile-hidden", true);
    document.documentElement.classList.remove("wm-tourismuszeile-visible");
  }

  render() {
    return x`
      <div role="banner">
        <a href="${this.url}">
          <h3><slot name="heading"></slot></h3>
          <p><slot name="content"></slot></p>
        </a> 

        <wm-button kind="clean" @click="${this._close}" ?hidden="${this.hidden}">
          <button>
            <wm-icon iconid="close">Schließen</wm-icon>
          </button>
        </wm-button>
      </div>
    `
  }
}

customElements.define("wm-tourismuszeile", Tourismuszeile);

const tagName = "wm-tourismuszeile";

export { Tourismuszeile, tagName };
