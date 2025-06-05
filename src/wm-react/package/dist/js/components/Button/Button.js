/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { randomHash } from '../misc/utils.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

const styles = [i`

:host {
  --wm-theme-content-font-weight: unset;
  --wm-theme-content-font-variation-settings: var(--wm-font-weight-bold);
  --button-font-size: var(--wm-font-size-s, 1rem);
  --button-padding-block: var(--wm-button-padding-block, 0.5em);
  --button-padding-inline: var(--wm-button-padding-inline, 1em);
  --button-min-height: var(--wm-button-min-height, 2.5em);
  --button-min-width: var(--wm-button-min-width, auto);

  display: inline-block;
  line-height: 1;
}

:host ::slotted(:is(button, a)) {
  display: flex;
  justify-content: center;
  gap: var(--button-gap) !important;
  cursor: pointer;
  /* test if this is still needed?*/
  /* padding: var(--button-padding-block) var(--button-padding-inline) !important;
  min-height: var(--button-min-height) !important;
  min-width: var(--button-min-width) !important; */
}

/* Active state for buttons */
:host ::slotted(:is(button:active, a:active)) {
  transform: var(--button-active-transform);
  filter: var(--button-active-filter);
}

/* Disabled buttons */

::slotted(button:is([aria-disabled="true"], [disabled])) {
  opacity: 0.5;
  pointer-events: none;
}


:host([kind="tertiary"]) ::slotted(button:is(:hover, :focus-visible)) {
  text-decoration: none !important;
}

/* Clean Buttons */

:host([kind="clean"]) ::slotted(:is(button, a)) {
  all: unset !important;
  align-items: center !important;
  cursor: pointer !important;
  display: inline-flex !important;
  gap: var(--button-gap) !important;
  line-height: 1.45 !important;
  outline: revert !important;
  box-sizing: border-box !important;
  font-size: var(--button-font-size, 1rem) !important;
}

/* Clean Buttons active state */
:host([kind="clean"]) ::slotted(:is(button:active, a:active)) {
  transform: var(--button-active-transform);
  opacity: 0.8;
}

:host([kind="clean"]) ::slotted(button:focus-visible) {
  outline-offset: var(--wm-theme-site-focus-outline-offset) !important;
  outline: var(--_button-focus-outline, var(--wm-theme-site-focus-outline)) !important;
}

:host([round]) {
  position: relative;
}

:host([round])::before {
  content: '';
  position: absolute;
  top: -8px;
  bottom: -8px;
  left: -8px;
  cursor: pointer;
}

:host([round]) ::slotted(:is(button, a)) {
  border-radius: 50%;
  padding: 0.1rem !important;
}

/* Tag buttons active state */
:host([kind="tag"]) ::slotted(:is(button:active, a:active)) {
  transform: var(--button-active-transform);
  filter: var(--button-active-filter);
}

:host([kind="tag"]) ::slotted(:is(button, a)) {
  border-radius: 30px;
  --button-text-transform: none;
}

:host([justify="center"]) ::slotted(:is(button, a)) {
  justify-content: center !important;
}

:host([justify="space-between"]) ::slotted(:is(button, a)) {
  justify-content: space-between !important;
}

:host([size="xs"]) {
  --button-font-size: 0.85rem;
  --button-padding-block: 0.2em;
  --button-padding-inline: 0.4em;
  --button-min-height: 1.8em;
  --wm-theme-content-font-weight: normal;
}

:host([size="xs"]) ::slotted(:is(button, a)) {
  font-variation-settings: var(--wm-theme-content-font-weight) !important;
  text-transform: none !important;
}

:host([size="s"]) {
  --button-font-size: 0.95rem;
  --button-padding-block: 0.4em;
  --button-padding-inline: 0.8em;
  --button-min-height: 2em;
}

:host([size="l"]) {
  --button-font-size: 1.1rem;
  --button-padding-block: 1.15em;
  --button-padding-inline: 2.7em;
  --button-min-width: 25rem;
}

:host([size="l"]) ::slotted(:is(button, a)) {
  max-width: 25rem !important; /* Maintain backwards compatibility */
  text-transform: none !important;
  width: 100% !important;
}


/* Full width Buttons */

:host([full]) {
  display: block;
}
:host([full="s"]),
:host([full="m"]) {
  display: inline-block;
}

:host([full]) ::slotted(:is(button, a)) {
  max-width:100% !important;
  width:100% !important;
}

@media (max-width: 32.5rem) {
  :host([full="s"]) {
    display: block;
  }

  :host([full="s"]) ::slotted(:is(button, a)) {
    width:100% !important;
  }
}

@media (max-width: 48rem) {
  :host([full="m"]) {
    display: block;
  }

  :host([full="m"]) ::slotted(:is(button, a)) {
    width:100% !important;
  }
}

:host([round]) ::slotted(:is(button, a)) {
  border-radius: 50%;
  min-width: 2rem;
  padding: 0 !important;
  aspect-ratio: 1;
  position: relative;
  z-index: 1;
}

:host([menu]) {
  display: inline-block;
  position: relative;
}

::slotted(ul) {
  background-color: var(--button-menu-background-color);
  box-shadow: var(--button-menu-shadow);
  display: none;
  left:  var(--button-menu-inline-offset, 0);
  list-style: none;
  margin: 0;
  padding: 0 !important;
  position: absolute;
}

:host([menu][open]) ::slotted(ul)  {
  display: block;
  white-space: nowrap;
}

:host([menu]) ::slotted(ul),
:host([menu*="block-start"]) ::slotted(ul) {
  bottom: calc(100% + var(--button-menu-block-offset));
}

:host([menu*="block-end"]) ::slotted(ul) {
  top: calc(100% + var(--button-menu-block-offset));
  bottom: auto;
}
:host([menu*="inline-end"]) ::slotted(ul) {
  right: var(--button-menu-inline-offset, 0);
  left: auto;
}
`];

/**
 * Link oder Button im Wiener Melange Style.
 * @summary Icon/Icon
 *
 * @slot default - Link oder Button
 */

/**
 * @cssprop --button-background-color - Hintergrundfarbe
 * @cssprop --button-background-color--hover - Hintergrundfarbe Hover & Focus
 * @cssprop --button-border-color - Rahmenfarbe
 * @cssprop --button-border-color--hover - Rahmenfarbe Hover & Focus
 * @cssprop --button-font-color - Schriftfarbe
 * @cssprop --button-font-color--hover - Schriftfarbe Hover & Focus
 * @cssprop --button-gap - Gap innerhalb
 * @cssprop --button-text-transform - Groß-/Kleinschreibung
 * @cssprop --button-option-background-color - Hintergrundfarbe von Optionen in Auto-Suggest
 * @cssprop --button-menu-background-color - Hintergrundfarbe von Optionen
 * @cssprop --button-menu-inline-offset - Abstand horizontal zwischen Button und Menü
 * @cssprop --button-menu-block-offset - Abstand vertikal zwischen Button und Menü
 * @cssprop --button-menu-shadow - Schatten von Optionen
 * @cssprop --button-padding-block - Vertikaler Innenabstand
 * @cssprop --button-padding-inline - Horizontaler Innenabstand
 * @cssprop --button-min-height - Minimale Höhe
 * @cssprop --button-min-width - Minimale Breite
 * @cssprop --button-active - undefined
 */

class Button extends s {
	/** @private */
	get _button() {
		return this?.querySelector("button") ?? null;
	}

	/** @private */
	get _menu() {
		return this?.querySelector("ul") ?? null;
	}

	/** @private */
	get _elements() {
		return this._menu.querySelectorAll("button, a") ?? null;
	}

	static properties = {
		_keyShortcuts: { type: Object },
		_selected: { type: Number },
		copy: { type: String, reflect: true },
		open: { type: Boolean, reflect: true },
		menu: { type: String, reflect: true },
		justify: { type: String, reflect: true },
		color: { type: String, reflect: true },
		kind: { type: String, reflect: true },
		full: { type: String, reflect: true },
		round: { type: Boolean, reflect: true },
		size: { type: String, reflect: true },
		width: { type: String, reflect: true },
	};

	static styles = styles;

	constructor() {
		super();

		/**
		 * @type {'clean'|'primary'|'secondary'|'tag'|'tertiary'} - Art des Buttons
		 */
		this.kind = undefined;

		/** @type {'s'|'m'|'always'} - Button über die volle Breite darstellen. Immer oder bis 512px (s) oder 768px (m) */
		this.full = undefined;

		/**
		 * @type {'center'|'space-between'} - Inhalt im Button ausrichten
		 */
		this.justify = undefined;

		/** @type {'abendstimmung'|'flieder'|'frischgruen'|'goldgelb'|'morgenrot'|'nebelgrau'|'wasserblau'} - Hintergrundfarbe des Buttons */
		this.color = undefined;

		/**
		 * @type {'xs'|'s'|'m'|'l'} - Größe (üblicherweise Schriftgröße und Innenabstand) des Buttons
		 */
		this.size = undefined;

		/**
		 * @type {'block-start'|'block-end'|'inline-start'|'inline-end'} - Positionierung des Menüs. block-* und inline-* können kombiniert werden.<br>Wenn das Attribut ohne Wert definiert oder nur eine Liste vorhanden ist, wird defaultmäßig block-start und inline-start genommen.
		 */
		this.menu = undefined;

		/**
		 * @type {Number} - Currently selected option in dropdown menus
		 * @private
		 **/
		this._selected = 0;

		/**
		 * @type {Boolean} - Dropdown, wenn vorhanden, geöffnet oder nicht
		 */
		this.open = false;

		/** @type {Boolean} - Button rund darstellen */
		this.round = false;

		/**
		 * @type {'s'} - Mindestbreite des Buttons
		 */
		this.width = undefined;

		/**
		 * @type {Object} - List of single alphabethic key shortcuts
		 * @private
		 **/
		this._keyShortcuts = {};

		/**
		 * Selektor für das Element, dessen Inhalt kopiert werden soll
		 */
		this.copy = undefined;
	}

	connectedCallback() {
    super.connectedCallback();

    if (this._menu) {
        if (!this.menu) {
            this.menu = "block-start";
        }
        this._setUpMenu();
        this._addEvents();
    }

    if (this._button) {
        this._button.addEventListener("click", this._handleClick.bind(this));
    }
}

	/**
	 * Add attributes and events to dropdown menus
	 * @private
	 * */
	_setUpMenu() {
		const id = `menu_${randomHash()}`;

		this._setUpMenuButton(id);
		this._setUpMenuList(id);

		this._elements.forEach((item, index) => {
			const letter = item.textContent[0].toLowerCase();

			if (!this._keyShortcuts[letter]) {
				this._keyShortcuts[letter] = [];
			}
			this._keyShortcuts[letter].push(index);
		});
	}

	/**
	 * Turn list into aria menu and adapt items
	 * @private
	 *  */
	_setUpMenuList(id) {
		this._menu.setAttribute("role", "menu");
		this._menu.setAttribute("id", id);

		for (let i = 0; i < this._elements.length; i++) {
			const item = this._elements[i];

			item.setAttribute("tabindex", -1);
			item.setAttribute("role", "menuitem");
			item.parentNode.setAttribute("role", "none");
		}
	}

	/**
	 * Open or close dropdown menu
	 * @private
	 **/
	_toggleMenu() {
		this.open = !this.open;
		this._button.setAttribute("aria-expanded", this.open);

		if (this.open) {
			setTimeout(() => {
				this._elements[0].focus();
			}, 0);
		} else {
			this._selected = 0;
			this._button.focus();
		}
	}

	/**
	 * Add ARIA roles and event to dropdown menu button
	 * @private
	 **/
	_setUpMenuButton(id) {
		this._button.setAttribute("aria-haspopup", true);
		this._button.setAttribute("aria-expanded", this.open);
		this._button.setAttribute("aria-controls", id);
		this._button.setAttribute("type", "button");

		this._button.addEventListener("click", this._toggleMenu.bind(this));
	}

	/**
	 * Add ARIA roles and event to dropdown menu button
	 * @private
	 **/
	_addEvents() {
		if (this.menu) {
			this.addEventListener("keydown", (e) => {
				if (this.open) {
					if (Object.keys(this._keyShortcuts).includes(e.key)) {
						let letter = 0;
						let index = this._keyShortcuts[e.key][letter];

						if (index === this._selected) {
							letter++;
							if (this._keyShortcuts[e.key][letter]) {
								index = this._keyShortcuts[e.key][letter];
							}
						}

						this._selected = index;
						this._elements[this._selected].focus();
						letter = 0;
					}
				}

				if (e.code === "ArrowUp") {
					e.preventDefault();
					this._selected--;
				}

				if (e.code === "ArrowDown") {
					e.preventDefault();
					this._selected++;
				}

				if (this._selected === this._elements.length) {
					this._selected = 0;
				}
				if (this._selected < 0) {
					this._selected = this._elements.length - 1;
				}

				if (e.code === "ArrowUp" || e.code === "ArrowDown") {
					this._elements[this._selected].focus();
				}

				if (this._button === document.activeElement && e.code === "Tab") {
					if (this.open) {
						this._toggleMenu();
					}
				}
			});

			document.addEventListener("keydown", (e) => {
				if (this.open && e.code === "Escape") {
					this._toggleMenu();
				}
			});

			document.addEventListener("click", this._clickOutSide.bind(this));
		}
	}

	/**
	 * @private
	 */
	_handleClick() {
		this._copyContent();
	}

	/**
	 * Copy either the value of an element or the textcontent
	 * @private
	 */
	async _copyContent() {
		if (this.copy) {
			const target = document.querySelector(`${this.copy}`);
			console.log(target);
			let value = target.textContent;

			if (target.value) {
				value = target.value;
			}

			await navigator.clipboard.writeText(value);

			const currentColor = this.color;

			this.color = "frischgruen";

			setInterval(() => {
				this.color = currentColor;
			}, 2000);
		}
	}

	/** @private */
	_clickOutSide(e) {
		if (e.target.closest("wm-button") !== this) {
			if (this.open) {
				this._toggleMenu();
			}
		}
	}

	/** @private */
	_getMenuPosition() {
		if (this._menu) {
			if (this._menu.getBoundingClientRect().top < 0) {
				this.menu = "block-end";
			}
		}
	}

	firstUpdated() {
		this._getMenuPosition();
	}

	render() {
		return x` <slot></slot> `;
	}
}

customElements.define("wm-button", Button);

const tagName = "wm-button";

// TODO button drowpdown icon height width max 24px

export { Button, tagName };
