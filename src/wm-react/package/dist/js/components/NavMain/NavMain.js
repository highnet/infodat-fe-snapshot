/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { n } from '../../when-55b3d1d8.js';
import { e } from '../../class-map-68392fb3.js';
import { o } from '../../if-defined-4084517f.js';
import '../../directive-4c65af6a.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  /* Default styles for smaller screens (mobile-first approach) */
  :host {
    /* Define smaller font size for smaller screens */
    font-size: 15px; /* Adjust as needed */

    /* Default icon size for smaller screens */
    --icon-size: 16px; /* Adjust as needed */
  }

  /* Adjust styles for larger screens */
  @media (min-width: 64rem) {
    /* Increase font size for larger screens */
    :host {
      font-size: 16px; /* Adjust as needed */
    }

    /* Increase icon size for larger screens */
    .icon {
      font-size: 24px; /* Adjust as needed */
    }
  }

  :host {
    /* see header section in /styles/whitelabel/page.css for details */
    --_dialog-offset: 0;

    display: block;
    /* Nav should fill the header */
    height: 100%;
  }

  :host([microsite]) {
    --_dialog-offset: var(--dialog-offset, var(--wm-theme-header-height-dynamic));
    /* --_dialog-offset: 10rem; */
  }

  nav {
    /* inherit height from header */
    height: inherit;
  }

  dialog {
    background-color: transparent;
    border: 0;
    height: 100dvh;
    max-height: 100dvh;
    width: 100vw;
    max-width: 100vw;
    margin-block: 0;
    margin: 0 0 0 auto;
    overflow: hidden;
    padding: 0;
    scrollbar-gutter: stable;
  }

  @supports not selector(::backdrop) {
    dialog {
      display: none !important;
    }
  }

  /* TODO: not scrolled needs top, scrolled needs top!  */
  ::backdrop {
    background: rgb(0 0 0 / 0.5);
  }

  /* Backdrop doesn't inherit anything, that's why we have to apply this ugly hack
  3.5 equals the header height
    The star before is::backdrop is mandatory because of a potential bug Firefox
  */
  :host([microsite]) *::backdrop {
    --_top: 3.5rem;
  }

  @media (min-width: 64rem) {
    :host([microsite]) *::backdrop {
      --_top: 6.25rem;
    }
  }

  /* Content within the dialog is wrapped */
  .wrapper {
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: var(--navmain-wrapperwidth);
    /* overflow: hidden; */
  }

  .wrapper--hidden {
    transform: translateX(100vw);
  }

  /* The transition is applied conditionally to avoid quirky behavior */
  .transition {
    transition: transform 0.25s ease-out;
  }

  /* Content within the dialog */
  .content {
    --_spacing-inline-end: 0;
    --_content-background: var(--wm-color-weiss); /* TODO: verschieben */

    background-color: var(--_content-background);
    flex-direction: column;
    height: 100%;
    margin-left: auto;
    margin-right: var(--_spacing-inline-end);
    max-width: 26rem;
    width: 100%;
    overflow: auto;
  }

  /* The header is fixed and .lists is scrollable. The media query ensure that it's only at certain viewport
  min height to avoid the header from taking up to much space in zoomed in UIs */
  @media(min-height: 35em) {
    .content {
      display: flex;
      overflow: visible;
    }
  }

  :host([microsite]) .content {
    --_content-background: var(--header-nav-level1-background-color);
  }

  /* Header within the dialog (contains close button and optionally user name) */
  .header {
    --_padding-inline: var(--wm-theme-site-wrapper-padding);
    --_header-height: var(--wm-theme-header-height-dynamic);
    min-height: var(--_header-height);
    position: relative;
    z-index: 1;
  }

  :host([microsite]) .header {
    --_header-height: var(--wm-theme-header-nav-height);
  }

  @media (min-width: 64rem) {
    .header {
      --_padding-inline: calc(var(--wm-theme-site-wrapper-padding) / 2);
    }
  }

  /* Wrapper for links */
  .lists {
    height: inherit;
  }

  /* The header is fixed and .lists is scrollable. The media query ensure that it's only at certain viewport
  min height to avoid the header from taking up to much space in zoomed in UIs */
  @media(min-height: 35em) {
    .lists {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  }

  .lists > * + *,
  ::slotted(*) {
    border-top: 1px solid var(--wm-color-fastschwarz);
    margin-top: var(--wm-spacing-m) !important;
    padding-top: var(--wm-spacing-s);
  }

  ::slotted(*) {
    padding-top: var(--wm-spacing-l);
  }

  ::slotted(:last-child) {
    /* margin: auto 0 !important;  */
    padding-bottom: var(--wm-spacing-m) !important;
  }

  ul {
    font-variation-settings: "wght" 700;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    position: relative;
    height: inherit;
  }

  ul ul {
    --_sublist-indent: 0.7rem;
    margin-left: var(--_sublist-indent);
  }

  ul ul ul {
    font-variation-settings: "wght" 400;
  }

  @media (min-width: 64rem) {
    :host([microsite]) ul ul {
      --_sublist-indent: 0;
    }
  }

  /* Toggle buttons */
  .lists button {
    all: initial;
    font: inherit;
  }

  /* General styling for links and buttons */
  .lists :is(a, button) {
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    font-weight: var(--navmain-font-weight);
    padding: 0;
    display: flex;
    justify-content: space-between;
    height: inherit;
    width: 100%;
  }

  .lists :is(a, button):is(:link, :visited) {
    color: inherit;
    text-decoration: none;
  }

  .lists :is(a, button):focus-visible {
    outline: 3px solid currentColor;
  }

  /* Show list when button expanded */
  [aria-expanded="true"] + ul {
    display: block;
  }

  /* Show list when button expanded */
  wm-icon {
    transition: transform 0.3s ease;
  }

  wm-icon.collapsed {
    transform: rotate(0deg);
  }

  wm-icon.expanded {
    transform: rotate(180deg);
  }

  /**
 * Variation when links are not hidden “behind a burger”
 */

  /* Nav takes up the whole space */
  :host([_listsVisible]) {
    flex-grow: 1;
  }

  /* inherit height from header */
  :host([_listsVisible]) ul {
    height: inherit;
  }

  :host([_listsVisible]) ul ul,
  li li {
    height: auto;
    text-indent: 0;
  }

  :host([listsVisible]) [aria-expanded="true"] + ul {
    position: absolute;
    background: var(--header-nav-level2-background-color);
    top: 100%;
    left: 0;
    width: max-content;
  }

  :host([_listsVisible]) [aria-expanded="true"] + ul {
    position: absolute;
    background: var(--header-nav-level3-background-color);
    top: 100%;
    left: 0;
    width: max-content;
  }

  :host([_listsVisible]) [aria-expanded="true"] + ul ul {
    position: static;
    display: block !important;
    max-height: 100%;
    margin-left: 1rem;
  }

  :host([_listsVisible]) .lists li li :is(a, button) {
    padding-block: 0.3125rem 0.3875rem;
    color: var(--header-nav-flyout-link-color--desktop);
  }

  :host([_listsVisible]) .lists li li :is(a, button):is(:hover, :focus-visible, .active, [aria-current="page"]) span {
    color: var(--header-nav-flyout-link-color--desktop);
    box-shadow: 0 3px 0 0 var(--header-nav-flyout-link-color--desktop);
  }

  :host([_listsVisible]) .lists li li li :is(a, button) {
    padding-block: 0.15rem 0.3875rem;
  }

  :host([listsVisible]) .lists li ul {
    padding-block: 0.5rem;
    max-height: calc(100vh - 100%);
    border-image: conic-gradient(var(--header-nav-flyout-background-color--desktop) 0 0)
      fill 1 //0 100vw;;
  }

  /* Menu desktop ebene unterhalb header */
  :host([_listsVisible]) .lists li ul {
    padding-block: 0.5rem;
    max-height: calc(100vh - 100%);
    border-image: conic-gradient( var(--header-nav-flyout-background-color--desktop) 0 0) fill 1//0 100vw;
    min-width: 100%;
  }

  :host .level-1 {
    border-image: conic-gradient(var(--header-nav-level2-background-color) 0 0)
    fill 1 //0 100vw;;
  }

  :host .level-2 {
    border-image: conic-gradient(var(--header-nav-level3-background-color) 0 0)
    fill 1 //0 100vw;;
  }

  :host([_listsVisible]) wm-icon {
    display: none;
  }

  :host([_listsVisible]) ul:not([hidden]) {
    display: flex;
    gap: clamp(1rem, 5%, var(--navmain-gap));
  }

  @supports not selector(::backdrop) {
    :host([_listsVisible]) ul:not([hidden]) {
      overflow: auto;
    }

    :host([_listsVisible]) ul:not([hidden]) > li {
      flex-shrink: 0;
    }
  }

  /**
   * Variation when links are hidden "behind a burger"
  */

  .burger {
    height: 100%;
    display: flex;
    align-items: center;
  }

  :host(:not([_listsVisible])) [aria-expanded="true"] {
    font-variation-settings: "wght" 700;
    border-image: conic-gradient( var(--header-nav-level2-background-color) 0 0) fill 1//0 50vw !important;
  }

  :host(:not([_listsVisible])) ul ul [aria-expanded="true"] {
    border-image: conic-gradient( var(--header-nav-level3-background-color) 0 0) fill 1//0 50vw !important;
    color: var(--wm-theme-site-color);
  }

  /* Underline links */
  :is(a, button):is(:hover, :focus-visible, .active, [aria-current="page"]) span,
  :host([_listsVisible]) [aria-expanded="true"] span,
  :host(:not([_listsVisible])) ul ul [aria-expanded="true"] span {
    /*box-shadow: 0 4px 0 0 var(--header-nav-flyout-background-color--desktop);*/
    color: var(--header-nav-link-color);
    box-shadow: 0 3px 0 0 var(--header-nav-link-color);
  }

  /* Adapt link and button styling */
  :host(:not([_listsVisible])) .lists :is(a, button):not([level-2]) {
    text-transform: uppercase;
  }

  :host(:not([_listsVisible])) .lists :is(a, button) {
    --_button-padding-block-start: 0.8125rem;
    --_button-padding-block-end: 0.6875rem;
    --_button-padding-inline: 0;
    padding: var(--_button-padding-block-start) var(--_button-padding-inline) var(--_button-padding-block-end);
  }

  :host([microsite]:not([_listsVisible])) .lists :is(a, button) {
    --_button-padding-inline: 1.5625rem;
  }

  :host(:not([_listsVisible])) .lists :is(a, button):focus-visible {
    outline-offset: -3px;
  }

  :host(:not([_listsVisible])) .lists {
    overflow: auto;
  }

  :host(:not([microsite])) .lists {
    padding: var(--wm-spacing-s) var(--wm-spacing-l);
  }

  ::slotted(ul),
  ::slotted(ol) {
    display: none !important;
  }

  .link-inner {
    align-items: center;
    display: flex;
    gap: var(--wm-spacing-xs);
  }

  ::slotted(.fallback) {
    display: none !important;
  }

  /* Close button */
  /* styling anpassen mit paddings in einer flucht mit anderen buttons/menüaufklappen */
  dialog[open] wm-button {
    --_button-padding-inline: 1.5625rem;
    --_button-padding-block-start: 0.8125rem;
    position: absolute;
    top: 0;
    right: 0;
    padding: var(--_button-padding-block-start) var(--_button-padding-inline);
    padding: var(--_button-padding-block-start) 1.5625rem var(--_button-padding-block-start) var(--_button-padding-block-start);
  }

  ::slotted([slot="precontent"]) {
    --_header-height: var(--wm-theme-header-height-dynamic);
    min-height: var(--_header-height);
    width: 100%;
    border-top: none;
    text-align: left;
    padding: var(--wm-spacing-xl) var(--wm-spacing-l) var(--wm-spacing-s) !important;
    margin: 0 !important;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
  }

  ::slotted([slot="postcontent"]) {
    padding: 1rem calc(1.5625rem + 2rem) 1rem 1.5625rem !important;
  }

  .wm-h-vh,
  .wm-h-vh-m {
    position: absolute;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    margin: -1px;
  }
  
  @media(min-width: 64em) {
    .wm-h-vh-m {
      position: static;
      width: auto;
      height: auto;
      overflow: auto;
      clip-path: none;
      margin: auto;
    }
  }
`];

/**
 * Hauptmenü für wien.gv.at und Microsites
 * @summary Button/Button
 *
 * @slot default - Liste
 * @slot precontent - Header der Navigation
 * @slot postcontent - Inhalt nach den Listen
 *
 */

/**
 * @cssprop --navmain-wrapperwidth - Breite des Wrappers im Menü
 * @cssprop --navmain-font-weight - Schriftstärke der Menüpunkte
 * @cssprop --navmain-gap - Abstand zwischen Menüpunkten auf der 1. Ebene
 */

class NavMain extends s {
	/** @private */
	get _dialog() {
		return this.renderRoot?.querySelector("dialog") ?? null;
	}

	/** @private */
	get _content() {
		return this.renderRoot?.querySelector(".wrapper") ?? null;
	}

	static properties = {
		label: { type: String },
		labelOpen: { type: String },
		labelOpenIcon: {type: String},
		labelClose: { type: String },
		isopen: { type: Boolean, reflect: true },
		microsite: { type: Boolean, reflect: true },
		type: { type: String, reflect: true },
		_listsVisible: { type: Boolean, reflect: true },
		hideLabel: { type: Boolean },
		_items: { type: Array },
		_openItem: { type: Number, attribute: false },
		_lastFocusedElement: { type: Node, attribute: false },
		_level: { type: Number, attribute: false },
	};

	static styles = [styles];

	constructor() {
		super();

		/** @type {String} - Accessible Name der Navigations-Landmark */
		this.label = "Haupt";

		/** @type {String} - Label Menü geschlossen */
		this.labelOpen = "Menü";
		
		/** @type {String} - Icon Menü geschlossen */
		this.labelOpenIcon = "burger";

		/** @type {String} - Label Menü offen */
		this.labelClose = "Schließen";

		/** @type {Boolean} - Soll das Label angezeigt werden */
		this.hideLabel = false;

		/**
		 * Contains items to display in the navigation
		 * @private
		 */
		this._items = [];

		/** @type {Boolean} - Menü offen oder zu */
		this.isopen = false;

		/** @type {Boolean} - Microsite oder Hauptseite */
		this.microsite = false;

		/**
		 * @type {'hidden'|'visible'|'hiddenmobile'} - Art des Menüs (immer versteckt, immer sichtbar oder nur auf kleinen Viewsports versteckt)
		 */
		this.type = "visible";

		/**
		 * @type {Boolean} - Is the navigation hidden behind a burger or not
		 * @private
		 */
		this._listsVisible = false;

		/**
		 * @type {String} - Which item with children is currently expanded
		 * @private
		 */
		this._openItem = undefined;

		/**
		 * @type {String} - the last button that opended a submenu
		 * @private
		 */
		this._lastFocusedElement = undefined;

		/**
		 * @type {Number} - the last button that opended a submenu
		 * @private
		 */
		this._level = false;

		/**
		 * Event references
		 * @private
		 */
		this._nativeCloseEvent = this._nativeClose.bind(this);
		/**
		 * Event references
		 * @private
		 */
		this._closeOnTransitionEndEvent = this._closeOnTransitionEnd.bind(this);

		/* Close the navigation when the mouse leaves the navigation */
		this.addEventListener("mouseleave", () => {
			if (this._listsVisible) {
				this._closeSub(0, this._openItem);
			}
		});
	}

	connectedCallback() {
		super.connectedCallback();

		this._getLayout();
		this._addGlovalEvents();
	}

	updated(changedProperties) {
		/* Listen to changes to this.isopen and open/close the nav accordingly */
		if (changedProperties.has("isopen")) {
			if (this.isopen) {
				this.open();
			} else {
				this.close();
			}
		}

		/* If the browser doesn't support the <dialog> element,
    default to visible nav with first level links only */
		if (changedProperties.has("type")) {
			if (!window.HTMLDialogElement) {
				this.type = "visible";
				this._listsVisible = true;
			}
		}
	}

	/**
	 * Add global events to the document
	 * @private
	 */
	_addGlovalEvents() {
		this.addEventListener("keydown", (e) => {
			if (e.code === "Escape") {
				e.preventDefault();

				if (this._openItem !== undefined) {
					this._closeSub(0, this._openItem);
				}

				this.isopen = false;
				this._moveFocus();
			}
		});
	}

	/**
	 * Move focus to last clicked button
	 * @private
	 */
	_moveFocus() {
		if (this._lastFocusedElement) {
			this._lastFocusedElement.focus();
			this._lastFocusedElement = undefined;
		}
	}

	/**
	 * Close on click outside of .content
	 * @private
	 */
	_handleClickOutside(e) {
		if (e.target.classList.contains("wrapper")) {
			this.isopen = false;
		}
	}

	/**
	 * Add events
	 * @private
	 */
	_addEvents() {
		setTimeout(() => {
			if (this._dialog) {
				this._dialog.addEventListener("close", this._nativeCloseEvent);
				this._content.addEventListener(
					"transitionend",
					this._closeOnTransitionEndEvent
				);
			}
		}, 0);
	}

	/**
	 * Fire the native close event when the nav is out of view
	 * @private
	 */
	_closeOnTransitionEnd(e) {
		if (e.target.classList.contains("wrapper--hidden")) {
			this._dialog.close();
			this._content.classList.remove("wrapper--hidden");
		}
	}

	/**
	 * Remove transition class when the native close event fires
	 * @private
	 */
	_nativeClose(e) {
		if (!e.target.classList.contains("wrapper--hidden")) {
			this._content.classList.remove("transition");
		}
	}

	/**
	 * Determine the layout of the nav based on setting and viewport viel (mobile, desktop, or mobile and desktop)
	 * @private
	 */
	_getLayout() {
		/* When type visible, always show the nav */
		if (this.type === "visible") {
			this._listsVisible = true;
		}

		/* Fires at viewport width of 1024px */
		const mql = window.matchMedia("(min-width: 64em)");

		const checkViewportWidth = (e) => {
			/* show nav when > 1024px, hide it when lower */
			if (this.type === "hiddenmobile") {
				this._listsVisible = e.matches;
			}

			if (!this._listsVisible) {
				/* Add close events when nav hidden */
				this._addEvents();
			} else {
				/* Make sure the nav is hidden, when resizing the window in hiddenmobile mode */
				if (this.type === "hiddenmobile" && this.isopen) {
					this.isopen = false;
				}
			}
		};

		mql.addEventListener("change", checkViewportWidth);
		checkViewportWidth(mql);
	}

	/**
	 * Menü öffnen
	 */
	open() {
		if (this._content) {
			/* Remove class first to avoid glitches in animation */
			this._content.classList.remove("wrapper--hidden");
			/* show modal, but hide nav */
			this._dialog.showModal();
			this._content.classList.add("wrapper--hidden");

			/* Wait for updated DOM and slide nav in */
			setTimeout(() => {
				this._content.classList.add("transition");
				this._content.classList.remove("wrapper--hidden");
			}, 0);
		}
	}

	/**
	 * Menü schließen
	 */
	close() {
		if (this._content) {
			this._content.classList.add("wrapper--hidden");
		}
	}

	/**
	 * Take the slotted content and wrap it in the new markup
	 * @private
	 */
	_getContents(e) {
		const itemCollections = [];
		const lists = e.target.assignedElements();

		function getParents(elem) {
			var parents = [];
			while (
				elem.parentNode &&
				elem.parentNode.nodeName.toLowerCase() != "wm-nav-main"
			) {
				elem = elem.parentNode;
				if (elem.nodeName === "UL" || elem.nodeName === "OL") {
					parents.push(elem);
				}
			}
			return parents.length - 1;
		}

		const _getData = (arr, list) => {
			const items = list.querySelectorAll(":scope > li");

			for (let j = 0; j < items.length; j++) {
				const item = items[j];
				const link = item.querySelector("a");
				const icon = item.querySelector("wm-icon");

				const data = {
					list: true,
					text: link.textContent,
					href: link.getAttribute("href"),
					target: link.getAttribute("target"),
					active: link.hasAttribute("aria-current"),
					children: [],
					level: getParents(item),
					collapsed: true,
				};

				if (icon) {
					data.icon = icon.getAttribute("iconid");
				}

				const sublist = item.querySelectorAll("ul, ol")[0];
				if (sublist) {
					const subdata = [];
					_getData(subdata, sublist);
					data.children = subdata;
				}
				arr.push(data);
			}
		};

		for (let i = 0; i < lists.length; i++) {
			let itemCollection = [];
			const list = lists[i];

			if (list.nodeName === "UL" || list.nodeName === "OL") {
				_getData(itemCollection, list);
				itemCollections.push(itemCollection);
			}
		}

		this._items = itemCollections;
	}

	/**
	 * Toggle sub menus
	 * @private
	 */
	_openCloseSub(j, i, list, e) {
		this._lastFocusedElement = e.target;

		/* Is there a submenu already open? close it! */
		if (this._openItem !== undefined && this._openItem !== i) {
			this._closeSub(list, this._openItem);
		}

		if (j !== null) {
			this._items[list][i].children[j].collapsed =
				!this._items[list][i].children[j].collapsed;
			this.requestUpdate();
		} else {
			/* Does the element actually exists */
			if (this._items[list][i]) {
				/* Make it the current item */
				this._openItem = i;

				/* Update array that contains all item */
				this._items[list][i].collapsed = !this._items[list][i].collapsed;
				this.requestUpdate();

				if (this.type === "visible") {
					this.isopen = !this._items[list][i].collapsed;
				}
			}
		}
	}

	/**
	 * Open sub menus
	 * @private
	 */
	_openSub(j, i, list) {
		if (this._openItem !== undefined) {
			this._closeSub(list, this._openItem);
		}

		this._openItem = i;
		this._items[list][i].collapsed = false;

		if (j !== null) {
			this._items[list][i].children[j].collapsed = false;
		}
		this.requestUpdate();
	}

	/**
	 * Close sub menus
	 * @private
	 */
	_closeSub(list, i) {
		if (this._openItem !== undefined) {
			this._items[list][i].collapsed = true;
			this.requestUpdate();
			this._openItem = undefined;
		}
	}

	/**
	 * Close sub menus
	 * @private
	 */
	_openCloseNav() {
		this.isopen = !this.isopen;
	}

	/**
	 * Close submenus automatically when leaving sub menu list using the keyboard
	 * @private
	 */
	_handleKeyDown(list, e) {
		if (e.key === "Tab") {
			const parentItem = e.target.parentNode;
			const parentList = parentItem.parentNode;

			if (
				(!e.shiftKey &&
					e.target === parentList.lastElementChild.querySelector("a")) ||
				(e.shiftKey &&
					e.target === parentList.firstElementChild.querySelector("a"))
			) {
				if (parentList.classList.contains("level-1")) {
					this._closeSub(list, this._openItem);
				}
			}
		}
	}

	/**
	 * Show submenu on mouseover
	 * @private
	 */
	_handleButtonMouseOver(i, j, list, e) {
		if (this._listsVisible) {
			this._openSub(j, i, list, e);
		}
	}

	/**
	 * Close open submenüs when hovering a link on the same level
	 * @private
	 */
	_handleLinkMouseOver(list) {
		if (this._listsVisible) {
			this._closeSub(list, this._openItem);
		}
	}

	/**
	 * Markup for the burger/close icon
	 * @private
	 */
	_burgerTemplate() {
		return x`
			<wm-button kind="clean" @click="${this._openCloseNav}" class="burger">
				<button aria-expanded="${this.isopen}">
					${this.hideLabel
						? x`<span class="wm-h-vh">${this.labelOpen}</span>`
						: x`<p class="wm-h-vh-m">${this.labelOpen}</p>`}
					<wm-icon iconid="${this.labelOpenIcon}"></wm-icon>
				</button>
			</wm-button>
		`;
	}


	/**
	 *
	 * @param {Object} item Data for menu item
	 * @param {Number} i Index of current item
	 * @param {Number} list Index of parent list (if there are multiple)
	 * @param {Number} parent Index of parent element
	 * @private
	 * @returns
	 */
	_renderLinkOrButton(item, i, list, parent) {
		return x`
			${n(
				!item.children.length || !window.HTMLDialogElement,
				() => x`
					${n(
						item.level === 0,
						() => x`
							<a
								href="${item.href}"
								target="${item.target}"
								@mouseover="${this._handleLinkMouseOver.bind(this, list)}"
								aria-current="${o(
									item.href === window.location.pathname || item.active ? "page" : undefined)
								}"
							>
								<span class="link-inner">
									${n(
										item.icon,
										() => x`<wm-icon width="24" height="24" iconid="${item.icon}"></wm-icon>`
									)}
									${item.text}
								</span>
							</a>
						`,
						() => x`
							<a
								href="${item.href}"
								target="${item.target}"
								@keydown="${this._handleKeyDown.bind(this, list)}"
								aria-current="${o(
									item.href === window.location.pathname  || item.active ? "page" : undefined
								)}"
							>
								<span> ${item.text} </span>
							</a>
						`
					)}
				`,
				() => x`
					${n(
						item.level === 0,
						() => x`
							<button
								class="${e({
									active: window.location.pathname.indexOf(item.href) !== -1 || item.active,
								})}"
								aria-expanded="${!item.collapsed}"
								@click="${this._openCloseSub.bind(this, null, i, list)}"
								@mouseover="${this._handleButtonMouseOver.bind(
									this,
									i,
									null,
									list
								)}"
							>
								<span class="link-inner">
									${n(
										item.icon,
										() => x`<wm-icon width="24" height="24" iconid="${item.icon}"></wm-icon>`
									)}
									${item.text}
								</span>

								<wm-icon
									class="${item.collapsed ? "collapsed" : "expanded"}"
									iconid="chevron-down"
								></wm-icon>
							</button>
						`,
						() => x`
							<button
								aria-expanded="${!item.collapsed}"
								@click="${this._openCloseSub.bind(this, i, parent, list)}"
							>
								<span>${item.text}</span>
								<wm-icon
									class="${item.collapsed ? "collapsed" : "expanded"}"
									iconid="chevron-down"
								></wm-icon>
							</button>
						`
					)}
				`
			)}
		`;
	}

	/**
	 *
	 * @param {Array} items List of Elements to render
	 * @param {Number} level Current level of nesting
	 * @param {Boolean} hidden Show or hide the list
	 * @param {Number} hidden List index
	 * @private
	 * @returns
	 */
	_renderList(items, level, hidden = false, list, parent) {
		this._level++;

		return x`
			<ul class="level-${level}" part="level${level}" ?hidden="${hidden}">
				${items.map((item, i) => {
					return x`
						<li>
							${this._renderLinkOrButton(item, i, list, parent)}
							${n(
								item.children.length,
								() => x`
									${this._renderList(
										item.children,
										item.level + 1,
										true,
										list,
										i
									)}
								`
							)}
						</li>
					`;
				})}
			</ul>
		`;
	}

	/**
	 * Render Lists and other content
	 * @private
	 */
	_listsTemplate() {
		return x`
			<div class="lists">
				${this._items.map((items, j) => {
					return x`${this._renderList(items, 0, false, j, 0)}`;
				})}

				<slot @slotchange="${this._getContents}"></slot>
			</div>
		`;
	}

	render() {
		return x`
			<nav aria-label="${this.label}">
				${!this._listsVisible ? this._burgerTemplate() : ""}
				${!this._listsVisible
					? x`
							<dialog @click="${this._handleClickOutside}">
								<div class="wrapper">
									<div class="content">
										<div class="header">
											<wm-button kind="clean" @click="${this._openCloseNav}">
												<button>
													<span class="wm-h-vh">${this.labelClose}</span>
													<wm-icon iconid="close"></wm-icon>
												</button>
											</wm-button>
											<!-- Custom content slot for additional header content -->
											<slot name="precontent"></slot>
										</div>
										${this._listsTemplate()}
										<!-- Custom content slot for additional footer content -->
										<slot name="postcontent"></slot>
									</div>
								</div>
							</dialog>
					  `
					: x` ${this._listsTemplate()} `}
			</nav>
		`;
	}
}

customElements.define("wm-nav-main", NavMain);

export { NavMain };
