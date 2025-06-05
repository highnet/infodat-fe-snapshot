/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

/**
 * Darstellung von Linklisten als CTA in 1-3 Spalten
 * @summary CTA/CTA
 *
 * @slot default - Liste
 */

/**
 * @cssprop --quicklinks-gap - Abstand zwischen Spalten
 */

class Quicklinks extends s {
  static properties = {
    cols: { type: Number, reflect: true }
  }

  constructor () {
    super();

    /**
     * @type {1|2|3} - Anzahl der Spalten
     */
    this.cols = 1;
  }

  render () {
    return x`
      <slot></slot>
    `
  }
}

customElements.define('wm-quicklinks', Quicklinks);

const tagName = 'wm-quicklinks';

export { Quicklinks, tagName };
