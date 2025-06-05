/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  :host {
      display: grid;
      width: auto;
      max-width: 100%;
      overflow: hidden;
      opacity: 0;
    }
`];

/**
* Die Figure-Komponente ermöglicht es, Bilder, Videos und andere Medieninhalte in einem Container anzuzeigen.
 * Die Größe des Containers wird automatisch an den Inhalt angepasst (zum Beispiel schmales Bild, viel Beschreibungstext).
 *
 * @slot default - HTML figure content
 */
class Figure extends s {
  /** @private */
  static styles = [styles];

  constructor() {
    super();
    // Initialize a MutationObserver to observe changes in child elements
    this.observer = new MutationObserver(() => this._debouncedAdjustSize());
    // Debounce the _adjustSize method to avoid excessive calls
    this._debouncedAdjustSize = this._debounce(this._adjustSize.bind(this), 50);
  }

  /**
   * Called when the element is added to the document's DOM.
   * Starts observing the element for changes and adjusts the size initially.
   */
  connectedCallback() {
    super.connectedCallback();
    this.observer.observe(this, { childList: true, subtree: true });
    this._adjustSize();
  }

  /**
   * Called when the element is removed from the document's DOM.
   * Stops observing the element and removes event listeners from media elements.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
    const media = this.querySelector('img, video, audio, iframe, picture, svg, canvas');
    if (media) {
      media.removeEventListener('load', this._setFigureWidth);
      media.removeEventListener('error', this._onMediaError);
    }
  }

  /**
   * Creates a debounced version of the provided function.
   *
   * @param {Function} func - The function to debounce.
   * @param {number} wait - The number of milliseconds to delay.
   * @returns {Function} - The debounced function.
   */
  _debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /**
   * Adjusts the size of the figure element based on its media content.
   *
   * @param {number} [retries=10] - The number of retries to attempt if the width is not immediately available (iframe).
   */
  _adjustSize(retries = 15) {
    const figure = this.querySelector('figure');
    if (figure) {
      const picture = figure.querySelector('picture');
      let media;

      if (!picture) {
        media = figure.querySelector('img, video, audio, iframe, svg, canvas');
      } else {
        media = picture.querySelector('img');
      }

      if (media) {
        const setFigureWidth = () => {
          let width = parseInt(media.getAttribute('width'), 10) || media.offsetWidth || media.clientWidth;
          if (width > 0) {
            this.style.cssText = `max-width:${width}px; opacity:1; visibility:visible;`;
          } else if (retries > 0) {
            setTimeout(() => this._adjustSize(retries - 1), 100);
          } else {
            this.style.cssText = `width:100%; opacity:1; visibility:visible;`;
          }
        };

        const onMediaError = () => {
          console.error('Media failed to load:', media.src || media);
          this.style.cssText = `opacity:1; visibility:visible;`;
        };

        this._setFigureWidth = setFigureWidth;
        this._onMediaError = onMediaError;

        // Add event listeners and handle different types of media
        if (['img', 'video', 'iframe', 'svg'].includes(media.tagName.toLowerCase())) {
          if (media.complete || media.readyState === 'complete') {
            setFigureWidth();
          } else {
            media.addEventListener('load', setFigureWidth);
          }
          media.addEventListener('error', onMediaError);
        } else if (media.tagName.toLowerCase() === 'audio') {
          // Special handling for audio elements, which do not have width
          this.style.cssText = `width:100%; opacity:1; visibility:visible;`;
        } else {
          setFigureWidth();
        }
      } else {
        this.style.cssText = `opacity:1; visibility:visible;`;
      }
    }
  }

  /**
   * Renders the slot content.
   *
   * @returns {TemplateResult} - The rendered template.
   */
  render() {
    return x`
      <slot></slot>
    `;
  }
}

customElements.define("wm-figure", Figure);

const tagName = "wm-figure";

export { Figure, tagName };
