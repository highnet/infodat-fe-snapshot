/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import '../../lit-html-0378a13e.js';

/**
 * Stadtplan - Beta Kartenmarker
 *
 * @slot default - HTML-Inhalt
 *
 */

class MapMarker extends s {
  static properties = {
    color: { type: String },
    label: { type: String },
    lat: { type: String },
    lng: { type: String },
    pin: { type: String },
  }

  constructor () {
    super();

    /** @type {string} - Farbe des Markers */
    this.color = '#ff5a64';
    
    /** @type {string} - Bezeichnung des Markers */
    this.label = '';
    
    /** @type {string} - Latitude */
    this.lat = '';
    
    /** @type {string} - Longitude */
    this.lng = '';

    /** @type {string} - Datei muss in /icons/pins/pin-{string}.svg Pfad liegen */
    this.pin = '';
  }
}

customElements.define('wm-mapmarker', MapMarker);

export { MapMarker };
