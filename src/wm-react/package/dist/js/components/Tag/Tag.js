/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { n } from '../../when-55b3d1d8.js';

const styles = [i`
* {
  box-sizing: border-box;
}

:host {
  --_tag-dropdown-width: auto; /* Default width */
}



wm-button {
  --_padding: var(--tag-padding-block--mobil) var(--tag-padding-inline--mobil);
  --_min-height: var(--tag-min-height--mobil);
  align-items: center;
  background-color: var(--tag-background-color) !important;
  border: 1px solid var(--tag-border-color);
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  font-size: var(--tag-font-size) !important;
  gap: var(--tag-gap);
  min-height: var(--_min-height);
  padding: var(--_padding) !important;
  text-decoration: none;
}

wm-button {
  white-space: nowrap;
}

/* Show list when button expanded */
:host wm-icon {
  transition: transform 0.3s ease;
  transform: rotate(0deg);
}

:host([open="true"]) wm-icon {
  transform: rotate(180deg);
}

/* TODO: solution for tag dropdown in taglist overflow container */
/* :host([open="true"]) {
  position: absolute !important;
  z-index: 1230;
} */

:host([open="true"]) wm-button {
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

:host([open="true"]) wm-icon {
  transform: rotate(180deg);
}

:host([dropdown]) > ::slotted(a) {
  display: none !important;
}

.dropdown-open {
  width: var(--_tag-dropdown-width);
}

a:is(:link, :visited) {
  color: var(--wm-theme-link-color);
  background-position: right 0 top 0.4em;
}

:is(a, wm-button):where(:hover, :focus) {
  background-color: var(--tag-background-color--hover);
  color: var(--tag-link-color--hover);
}

:is(a):focus-visible,
:is(wm-button):focus-within {
  outline: var(--wm-theme-site-focus-outline-width) solid var(--wm-color-ui-interactive);
  outline-offset: 1px;
}

::slotted(:is(ul, ol)) {
  background-color: var(--tag-background-color);
  border: solid var(--tag-border-color);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-width: 0 1px 1px;
  display: none;
  left: 0;
  list-style-type: "";
  margin: 0 !important;
  max-height: 12rem;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 0 !important;
  position: absolute;
  scrollbar-gutter: stable;
  top: 100%;
  width: var(--_tag-dropdown-width);
}

:host([open="true"]) ::slotted(:is(ul, ol)) {
  display: block;
  z-index: 1230;
}

button {
  --_button-focus-outline: none !important;
}
`];

/**
 * Link oder Button mit Link(s) zu verwandten Seiten
 * @summary Button/Button, Icon/Icon
 *
 * @slot default - Link oder Liste mit Links
 */

/**
 * @cssprop --tag-background-color - Hintergrundfarbe
 * @cssprop --tag-background-color--hover - Hintergrundfarbe Hover & Focus
 * @cssprop --tag-border-color - Rahmenfarbe
 * @cssprop --tag-padding-inline--mobil - Padding vertikal (Mobilansicht unter 64em)
 * @cssprop --tag-padding-block--mobil - Padding horizontal (Mobilansicht unter 64em)
 * @cssprop --tag-padding-inline--desktop - Padding vertikal (Desktopansicht ab 64em)
 * @cssprop --tag-padding-block--desktop - Padding horizontal (Desktopansicht ab 64em)
 * @cssprop --tag-gap - Gap im Button oder Link
 * @cssprop --tag-min-height--mobil - Mindesthöhe (Mobilansicht unter 64em)
 * @cssprop --tag-min-height--desktop - Mindesthöhe (Desktopansicht ab 64em)
 * @cssprop --tag-link-color - Linkfarbe
 * @cssprop --tag-link-color--hover - Linkfarbe Hover & Focus
 * @cssprop --tag-font-size - Schriftgröße
 */

class Tag extends s {
  // Cache for DOM elements
  #cachedLink = null;
  #cachedButton = null;
  #cachedList = null;

  /**
   * The slotted link
   * @private
   */
  get _link() {
    if (!this.#cachedLink) {
      this.#cachedLink = this.querySelectorAll("a")[0] ?? null;
    }
    return this.#cachedLink;
  }

  /**
   * Button for dropdown tags
   * @private
   */
  get _button() {
    if (!this.#cachedButton) {
      this.#cachedButton = this.shadowRoot?.querySelector("wm-button") ?? null;
    }
    return this.#cachedButton;
  }

  /**
   * The slotted list of links
   * @private
   */
  get _list() {
    if (!this.#cachedList) {
      this.#cachedList = this.querySelectorAll("ul, ol") ?? null;
    }
    return this.#cachedList;
  }

  static properties = {
    color: { type: String, reflect: true },
    open: { type: String, reflect: true },
    dropdown: { type: Boolean, reflect: true },
  };

  static styles = styles;

  constructor() {
    super();

    /** @type {'frischgruen'|'amtswege'} Tag mit spezieller Funktion */
    this.color = undefined;

    /** @type {string} Dropdown offen? */
    this.open = "false";

    /** @type {Boolean} Ist es ein Dropdown Tag? */
    this.dropdown = false;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this._list?.length) {
      this.dropdown = true;
      this._attachDropDownEvents();

      // Handle initial open state
      if (this.getAttribute('open') === 'true') {
        // Wait for first render
        await this.updateComplete;
        // Wait one more frame to ensure all styles are applied
        await new Promise(resolve => requestAnimationFrame(resolve));

        const buttonWidth = this._button.offsetWidth;
        const largestItemWidth = this._dropdownTagGetLargestItem();
        const dropdownWidth = Math.max(buttonWidth, largestItemWidth);

        this.style.setProperty('--_tag-dropdown-width', `${dropdownWidth}px`);
        this._button.classList.add("dropdown-open");
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Only remove events if it's a dropdown
    if (this.dropdown) {
      this.removeEventListener("keyup", this._closeOnEscape);
      document.removeEventListener("click", this._clickOutSide); // Bound method
      this.removeEventListener("focusout", this._closeOnFocusOut);
    }

    // Clean up references
    this.#cachedLink = null;
    this.#cachedButton = null;
    this.#cachedList = null;
  }

  /**
   * Attach events for drop down tags
   * @private
   */
  _attachDropDownEvents() {
    this.addEventListener("keyup", this._closeOnEscape);
    document.addEventListener("click", this._clickOutSide);
    this.addEventListener("focusout", this._closeOnFocusOut);
  }

  /**
   * Remove events for drop down tags
   * @private
   */
  _removeDropDownEvents() {
    this.removeEventListener("keyup", this._closeOnEscape);
    document.removeEventListener("click", this._clickOutSide);
    this.removeEventListener("focusout", this._closeOnFocusOut);
  }

  /**
   * Close on escape
   * @private
   * @param {Event} e - Event
   */
  _closeOnEscape(e) {
    if (e.code === "Escape") {
      this.closeDropdown();
      this._button.querySelector("button").focus();
    }
  }

  /**
   * Listens for clicks outside of wm-tag
   * Close on click outside
   * @private
   * @param {Event} e - Event
   */
  _clickOutSide = (e) => {
    if (!e.composedPath().find((element) => element.tagName === "WM-TAG")) {
      this.closeDropdown();
    }
  };

  /**
   * Close on focus out
   * @private
   * @param {Event} e - Event
   */
  _closeOnFocusOut = (e) => {
    if (!this.contains(e.relatedTarget)) {
      this.closeDropdown();
    }
  };

  /**
   * The list is potentially larger than the selected tag. To style it properly we need to get the largest item in the list.
   * Get largest item in list
   * @private
   */
  _dropdownTagGetLargestItem() {
    // Reset any existing width settings
    this.style.removeProperty('--_tag-dropdown-width');
    this._list[0].style.removeProperty('width');

    // Create temporary container with proper styles
    const temp = document.createElement('div');
    temp.style.cssText = `
      position: absolute;
      visibility: hidden;
      white-space: nowrap;
      padding: 0.3rem var(--tag-padding-inline--mobil);
      width: auto;
      left: -9999px;
    `;
    document.body.appendChild(temp);

    let maxWidth = 0;

    // Measure each link text
    this._list[0].querySelectorAll('a').forEach(link => {
      temp.textContent = link.textContent;
      maxWidth = Math.max(maxWidth, temp.offsetWidth);
    });

    // Clean up
    document.body.removeChild(temp);

    // Add padding for scrollbar and borders
    return maxWidth + 20; // 20px buffer for scrollbar and padding
  }

  /**
   * Liste öffnen oder schließen
   * @param {Event} e - Event
   */
  toggle(e) {
    if (e) e.preventDefault();
    this.open = this.getAttribute("open") !== "true";

    if (this.open) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  /**
   * Dispatch custom event
   * @private
   * @param {string} eventName - Name of the event
   */
  _dispatchTagEvent(eventName) {
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: {
        tag: this
      }
    }));
  }

  /**
   * Dropdown-Tag öffnen
   */
  async openDropdown() {
    if (!this._list || !this._button) {
      console.error("List or button element is not found.");
      return;
    }

    // Batch DOM reads
    const measurements = await new Promise(resolve => {
      requestAnimationFrame(() => {
        const buttonWidth = this._button.offsetWidth;
        const largestItemWidth = this._dropdownTagGetLargestItem();
        resolve({ buttonWidth, largestItemWidth });
      });
    });

    // Batch DOM writes
    requestAnimationFrame(() => {
      const dropdownWidth = Math.max(measurements.buttonWidth, measurements.largestItemWidth);
      this.style.setProperty('--_tag-dropdown-width', `${dropdownWidth}px`);
      this._button.classList.add("dropdown-open");
      this.setAttribute("open", "true");
      this._dispatchTagEvent('wm-tag-open');
    });
  }

  /**
   * Dropdown-Tag schließen
   */
  closeDropdown() {
    this.setAttribute("open", "false");
    if (this._button) {
      this.style.removeProperty('--_tag-dropdown-width');
      this._button.classList.remove("dropdown-open");
      this._dispatchTagEvent('wm-tag-close');
    }
  }

  render() {
    return x`
      ${n(
        this.dropdown,
        () => x`
          <wm-button
            kind="clean"
            full="true"
            justify="space-between"
            @click="${this.toggle.bind(this)}"
          >
            <button aria-expanded="${this.open}">
              <span class="link-text">${this._link?.textContent}</span>
              <wm-icon iconid="chevron-down"></wm-icon>
            </button>
          </wm-button>
        `
      )}
      <slot></slot>
    `;
  }
}

customElements.define("wm-tag", Tag);

const tagName = "wm-tag";

export { Tag, tagName };
