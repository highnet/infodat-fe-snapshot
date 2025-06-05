/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

/**
 * Komponente zur Darstellung von Kategorien und Eigenschaften
 *
 * @slot default - Text, Link oder Button
 */

/**
 * @cssprop --chip-background-color - Hintergrundfarbe
 * @cssprop --chip-background-color--hover - Hintergrundfarbe bei Hover & Focus
 * @cssprop --chip-border-color - Rahmenfarbe
 * @cssprop --chip-border-color--hover - Rahmenfarbe bei Hover & Focus
 * @cssprop --chip-border-radius - Rahmenabrundung
 * @cssprop --chip-font-color - Schriftfarbe
 * @cssprop --chip-font-color--hover - Schriftfarbe bei Hover & Focus
 * @cssprop --chip-font-size - Schriftgröße
 * @cssprop --chip-padding - Abstand innen
 * @cssprop --chip-gap - Abstand zwischen Icon und Text
 */

class Chip extends s {
  static properties = {
    color: { type: String, reflect: true },
    size: { type: String, reflect: true }
  };

  constructor() {
    super();

    /**
     * @type {'abendstimmung'|'flieder'|'frischgruen'|'goldgelb'|'morgenrot'|'nebelgrau'|'wasserblau'} - Farbe
     */
    this.color = "nebelgrau";

    /**
     * @type {'s'|'m'|'l'} - Größe
     */
    this.size = "m";
  }

  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    return x`<slot></slot>`
  }
}

customElements.define("wm-chip", Chip);

const tagName = "wm-chip";

export { Chip, tagName };
