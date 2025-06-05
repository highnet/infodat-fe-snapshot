/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  :host {
    --_padding: 1.4rem;

    display: block;
    left: 0;
    width: 100%;
    z-index: 1220;
    font-size: var(--breakingnews-font-size);
  }

  :host([sticky]) {
    position: sticky;
  }

  [role="region"] {
    background-color: var(--breakingnews-background-color);
    border-image: conic-gradient( var(--breakingnews-background-color) 0 0) fill 1//0 100vw;
    padding: var(--_padding);
    position: relative;
    text-align: center;
    color: var(--breakingnews-font-color);
  }

  h2 {
    margin: 0;
    font-size: inherit;
  }

  wm-button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  @media (min-width: 48em) {
    :host {
      --_padding: 2.1rem;
      --breakingnews-font-size: var(--wm-font-size-m)
    }

    h2 {
      display: inline-block;
    }
  }
`];

/**
 * Der Breaking News-Banner ist auf ganz wien.gv.at sichtbar und außergewöhnlichen Ereignissen vorbehalten.
 * @summary Button/Button
 *
 * @slot default - Text
 */

/**
 * @cssprop --breakingnews-background-color - Hintergrundfarbe
 * @cssprop --breakingnews-font-color - Schriftfarbe
 * @cssprop --breakingnews-font-size - Schriftgröße
 */

class BreakingNews extends s {
  static properties = {
    id: { type: String, reflect: true },
    type: { type: String, reflect: true },
    title: { type: String, reflect: true },
    sticky: { type: Boolean, reflect: true },
    closeText: { type: String, reflect: true }
  }

  static styles = [styles]

  constructor () {
    super();

    /**
     * @type {'warning'|'error'|'success'} - Art der Meldung
     */
    this.type = 'warning';

    /**
     * @type {String} - Bezeichnung der Meldung
     */
    this.title = '';

    /**
     * @type {String} - Einzigartige ID
     */
    this.id = '';

    /**
     * @type {Boolean} - Erkennt automatisch, ob sich der Banner sticky verhält.
     */
    this.sticky = true;

    /**
     * @type {String} - Text für den Schließen Button, default ist "Schließen".
     */
    this.closeText = 'Schließen';
  }

  connectedCallback() {
    super.connectedCallback();

    // Safe access to localStorage with fallback in case it's unavailable
    try {
      const storedState = localStorage.getItem(`wm-breakingnews-${this.id}`);
      this.sticky = storedState !== 'true'; // Show banner if not previously dismissed
    } catch (error) {
      console.warn('localStorage is not available, defaulting to sticky behavior:', error);
      this.sticky = true; // Default to showing the banner
    }

    // Add 'wm-has-breakingnews' class to the <html> tag
    document.documentElement.classList.add('wm-has-breakingnews');
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove 'wm-has-breakingnews' class from the <html> tag when the component is removed
    document.documentElement.classList.remove('wm-has-breakingnews');
  }

  /**
   * @private
   */
  _close() {
    this.sticky = false;

    // Try-catch for localStorage usage to avoid issues in private browsing or disabled storage
    try {
      localStorage.setItem(`wm-breakingnews-${this.id}`, 'true');
    } catch (error) {
      console.warn('Could not store state in localStorage:', error);
    }

    // Update component without removing it
    this.requestUpdate(); // Ensures UI reflects the changes
  }

  render () {
    return x`
      <div
        class="breaking-news ${this.type}"
        role="region"
        aria-labelledby="title"
        aria-live="assertive"
      >
        <h2 id="title">${this.title}</h2>
        <slot></slot>

        ${this.sticky
          ? x`
              <wm-button kind="clean" @click="${this._close}">
                <button aria-label="${this.closeText}">
                  <wm-icon iconid="close">${this.closeText}</wm-icon>
                </button>
              </wm-button>
            `
          : ''
        }
      </div>
    `
  }
}

customElements.define('wm-breakingnews', BreakingNews);

const tagName = 'wm-breakingnews';

export { BreakingNews, tagName };
