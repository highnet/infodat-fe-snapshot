/* @copyright Stadt Wien - Wiener Melange 200 */
import { i } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { randomHash } from '../misc/utils.js';
import { n } from '../../when-55b3d1d8.js';
import { Section } from '../Section/Section.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  @media (min-width: 64em) {
    :host([nav]) {
      align-items: start;
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      gap: var(--navpage-gap);
      justify-content: space-between;
    }
  }

  :host > div {
    min-width: 0;
  }

  nav {
    --_nav-pos: fixed;
    --_nav-width: 100vw;
    --_shadow-color: var(--wm-color-nebelgrau);
    --_shadow-size: 100px;

    --_nav-inset: var(--navpage-inset);
    --_nav-height: calc(100vh - var(--wm-theme-header-height-total));
    --_nav-background: var(--navpage-background-color--mobil);
    --_nav-link: var(--navpage-active-link-background-color--mobil);
    --_nav-font-color: var(--navpage-link-color--mobil);
    --_nav-font-color--active: var(--navpage-active-link-color--mobil);
    --_nav-font-size: var(--navpage-link-size--mobil);
    --_nav-transform: var(--navpage-transform--default);
    --_nav-link-padding: var(--navpage-link-padding--mobil);

    background: var(--_nav-background);
    box-shadow: var(--navpage-shadow);
    height: var(--_nav-height);
    inset: var(--_nav-inset);
    max-width: var(--_nav-width);
    position: var(--_nav-pos);
    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
    transform: translateY(var(--_nav-transform));
    width: 100%;
    z-index: 1220;
  }

  :host([nav="toggle"]) nav {
    --_nav-transform: var(--navpage-transform--scroll);
  }

  :host([nav="toggle"]) .nav-hidden {
    opacity: 0;
    visibility: hidden;
  }

  :host([nav="scroll"]) {
    container-type: normal;
    --wm-theme-header-nav-sec-height: 3.4rem;
  }

  :host([nav="scroll"]) nav {
    --_nav-height: var(--wm-theme-header-nav-sec-height);
  }

  :host([nav="scroll"]) ul {
    display: flex;
    margin: 0;
    max-height: 70vh;
    overflow: auto;
    background:
      linear-gradient(to right, var(--_nav-background) 100%, var(--_nav-background) 100%, transparent 100%),
      linear-gradient(to left, var(--_nav-background) 0%, var(--_nav-background) 100%, transparent 100%) 100% 0,
      linear-gradient(to right, var(--_shadow-color), transparent 20%) 0 0,
      linear-gradient(to left, var(--_shadow-color), transparent 20%) 100% 0;
    background-repeat: no-repeat;
    background-size: var(--_shadow-size) 100%;
    background-attachment: local, local, scroll, scroll;
  }

  :host([nav="scroll"]) li {
    flex-shrink: 0;
  }

  @media(min-width: 64em) {
    nav,
    :host([nav]) nav {
      --_shadow-size: 80px;
      --wm-theme-header-nav-sec-height: auto;
      --_nav-pos: sticky;
      --_nav-height: auto;
      --_nav-width: 20.5rem;
      --_nav-inset: var(--navpage-inset--desktop);
      --_nav-background: var(--navpage-background-color--desktop);
      --_nav-link: var(--navpage-active-link-background-color--desktop);
      --_nav-font-color: var(--navpage-link-color--desktop);
      --_nav-font-color--active: var(--navpage-active-link-color--desktop);
      --_nav-font-size: var(--navpage-link-size--desktop);
      --_nav-link-padding: var(--navpage-link-padding--desktop);
      transform: none;
    }

    :host([nav="toggle"]) .nav-hidden {
      opacity: 1;
      visibility: visible;
    }

    :host([nav="scroll"]) ul {
      display: block;
      padding: 1rem 0;
      background:
        linear-gradient(var(--_nav-background) 0%, var(--_nav-background) 20%, transparent 100%),
        linear-gradient(transparent 0%, var(--_nav-background) 20%, var(--_nav-background) 100%) 0 100%,
        linear-gradient(var(--_shadow-color), transparent 30%) 0 0,
        linear-gradient(transparent 70%, var(--_shadow-color)) 0 100%;
      background-repeat: no-repeat;
      background-size: 100% var(--_shadow-size);
      background-attachment: local, local, scroll, scroll;
    }
  }

  nav ul {
    list-style: none;
    margin: 1.4rem 0;
    padding: 0;
  }

  nav a {
    color: var(--_nav-font-color);
    font-size: var(--_nav-font-size);
    display: block;
    padding: var(--_nav-link-padding);
    text-decoration: none;
    transition: background-color 100ms;
  }

  nav a[aria-current],
  nav a:hover {
    background-color: var(--_nav-link);
    color:  var(--_nav-font-color--active);
  }

  nav a:focus-visible {
    outline-offset: calc(var(--wm-theme-site-focus-outline-width) * -1);
    outline: var(--wm-theme-site-focus-outline);
  }
`];

/**
 * Lokale Navigation innerhalb einer Seite
 * @summary Button/Button
 *
 * @slot default - HTML oder Text-Content
 *
 */

/**
 * @cssprop --navpage-shadow - Schatten der Navigation
 * @cssprop --navpage-link-padding--mobil - Innenabstand in Links (Mobilansicht unter 64em)
 * @cssprop --navpage-link-size--mobil - Schriftgröße (Mobilansicht unter 64em)
 * @cssprop --navpage-link-color--mobil - Schriftfarbe (Mobilansicht unter 64em)
 * @cssprop --navpage-active-link-color--mobil - Schriftfarbe des aktiven Links (Mobilansicht unter 64em)
 * @cssprop --navpage-active-link-background-color--mobil - Link Hintergrundfarbe des aktiven Links in der Navigation (Mobilansicht unter 64em)
 * @cssprop --navpage-background-color--mobil - Hintergrundfarbe der Navigation (Mobilansicht unter 64em)
 * @cssprop --navpage-link-padding--desktop - Innenabstand in Links (Desktopansicht ab 64em)
 * @cssprop --navpage-link-size--desktop - Schriftgröße (Desktopansicht ab 64em)
 * @cssprop --navpage-link-color--desktop - Schriftfarbe (Desktopansicht ab 64em)
 * @cssprop --navpage-active-link-color--desktop - Schriftfarbe des aktiven Links (Desktopansicht ab 64em)
 * @cssprop --navpage-active-link-background-color--desktop - Link Hintergrundfarbe des aktiven Links in der Navigation (Desktopansicht ab 64em)
 * @cssprop --navpage-background-color--desktop - Hintergrundfarbe der Navigation (Desktopansicht ab 64em)
 * @cssprop --navpage-gap - Abstand zwischen Content und Nav
 * @cssprop --navpage-inset - Abstand auf der y-Achse
 * @cssprop --navpage-inset--desktop - Abstand auf der y-Achse (Desktopansicht ab 64em)
 * @cssprop --navpage-transform--default - Verschiebung auf der y-Achse (Default)
 * @cssprop --navpage-transform--scroll - Verschiebung auf der y-Achse (Toggle)
 * @cssprop --navpage-transform--scrolled - Verschiebung auf der y-Achse bei gescrollter Seite
 * @cssprop --navpage-transform-wien--scrolled - Verschiebung auf der y-Achse bei gescrollter Seite (wien.gv.at)
 */

class NavPage extends Section {
	static properties = {
		_links: { type: Array, attribute: false },
		nav: { type: String, reflect: true },
		togglebuttonlabel: { type: String, reflect: true },
		_activeAnchor: { type: String, state: true }, // Add this property
		_observer: { state: true },
		_activeId: { state: true }
	};

	static styles = [styles];

	/**
	 * @type {Object} Slotted headings
	 * @private
	 */
	get _headings() {
		return (
			this.querySelectorAll(
				':is(h2[id], h3[id], [data-heading], wm-anchor[id]):not([data-heading="false"])'
			) ?? null
		);
	}

	/**
	 * @type {Node} In page navigation
	 * @private
	 */
	get _nav() {
		return this.shadowRoot.querySelector("nav") ?? null;
	}

	/**
	 * @type {Node} Toggle button for in page navigation
	 * @private
	 */
	get _toggleButton() {
		return document.querySelector(".wm-section-toggle button") ?? null;
	}

	constructor() {
		super();

		/**
		 * @type {'scroll'|'toggle'} Art der Navigation
		 */
		this.nav = "scroll";

		/**
		 * @type {String} Label des Togglebuttons
		 */
		this.togglebuttonlabel = "Thema wählen";

		/**
		 * @type {Object} Array of links for the in page nav
		 * @private
		 */
		this._links = [];

		/**
		 * @type {Object} Settings for the navigation
		 * @private
		 */
		this._options = {
			offset: 0,
		};

		this._activeAnchor = '';
		this._observer = null;
		this._updateTimer = null;
	}

	updated(changedProperties) {
		if (changedProperties.has("nav")) {
			this._addControls();
		}

		if (changedProperties.has("nav")) {
			document.documentElement.classList.add(`wm-has-nav-${this.nav}`);
		}
	}

	connectedCallback() {
		super.connectedCallback();

		// Fetch headings
		this._getItems();
		this._setupIntersectionObserver();
		// Watch scroll and resize event
		this._addGlobalEvents();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		if (this._observer) {
			this._observer.disconnect();
		}
	}

	/**
	 * Reads CSS custom properties that contain the header's height
	 * add some extra spacing and converts the value to pixels
	 * @private
	 */
	_getOffsetFromTopEdge() {
		setTimeout(() => {
			this._options.offset =
				(parseFloat(
					getComputedStyle(document.documentElement).getPropertyValue(
						"--wm-theme-header-height"
					)
				) +
					parseFloat(
						getComputedStyle(document.documentElement).getPropertyValue(
							"--wm-theme-header-nav-height"
						)
					) +
					parseFloat(
						getComputedStyle(this).getPropertyValue("--wm-theme-header-nav-sec-height")
					) +
					2) *
				16;
		}, 0);
	}

	/**
	 * Add a toggle button to the wm-header's actions
	 * @private
	 */
	_addControls() {
		if (this.nav === "toggle") {
			const header = document.querySelector("wm-header");
			// Get toggle button template and clone the button
			const wmButton = this.shadowRoot
				.querySelector("#toggle-button")
				.content.cloneNode(true).children[0];
			const button = wmButton.querySelector("button");
			button.innerHTML = `${this.togglebuttonlabel} <wm-icon iconid="chevron-down"></wm-icon>`;

			// Add click event to button
			wmButton.addEventListener("click", () => {
				this._nav.classList.toggle("nav-hidden");
				document.documentElement.classList.toggle("wm-is-locked");

				const isOpen = button.getAttribute("aria-expanded") === "true";

				button.setAttribute("aria-expanded", !isOpen);

				if (!isOpen) {
					setTimeout(() => {
						this.shadowRoot.querySelectorAll("a")[0].focus();
					}, 100);
				}
			});

			// Add it to the actions bar in the header (will be created if it doesn't exist)
			header.addAction(wmButton);
		}
	}

	/**
	 * Watch global events
	 * @private
	 */
	_addGlobalEvents() {
		this._getOffsetFromTopEdge();

		// Only handle resize and escape events
		const mediaQueryList = window.matchMedia("(min-width: 64em)");
		mediaQueryList.addListener((e) => {
			if (e.matches) {
				this._removeLock();
				if (this._nav) {
					this._nav.classList.remove("nav-hidden");
				}
			}
		});

		this.addEventListener("keyup", (e) => {
			if (e.code === "Escape") {
				this._closeNav();
				this._toggleButton.focus();
			}
		});
	}

	_setupIntersectionObserver() {
		const options = {
			root: null,
			rootMargin: `${this._options.offset}px 0px -50% 0px`,
			threshold: [0, 0.5, 1]
		};

		this._observer = new IntersectionObserver((entries) => {
				// Clear any pending updates
				clearTimeout(this._updateTimer);

				this._updateTimer = setTimeout(() => {
					// Get all currently visible headings
					const visibleEntries = entries
						.filter(entry => entry.isIntersecting)
						.sort((a, b) => {
							const posA = a.target.getBoundingClientRect().top;
							const posB = b.target.getBoundingClientRect().top;
							return posA - posB;
						});

					if (visibleEntries.length > 0) {
						const topMostEntry = visibleEntries[0];
						const id = topMostEntry.target.getAttribute('id');
						// Only update the navigation state, don't scroll
						this._setActiveAnchor(id, false);
					}
				}, 50); // debounce timeout to reduce lag when scrolling
			}, options);

		this._headings.forEach(heading => this._observer.observe(heading));
	}

	/**
	 * Turn nodes into and array of object containing the label and id
	 * @private
	 */
	_getItems() {
		this._headings.forEach((heading) => {
			let id = heading.getAttribute("id");
			let label = heading.textContent;

			if (!id) {
				id = randomHash();
				heading.setAttribute("id", id);
			}

			if (heading.dataset.heading) {
				label = heading.dataset.heading;
			}

			this._links.push({
				label,
				id,
			});
		});
	}

	/**
	 * Unlock scrolling
	 * @private
	 */
	_removeLock() {
		document.documentElement.classList.remove("wm-is-locked");
	}

	/**
	 * Close nav and unlock scrolling
	 * @private
	 */
	_closeNav() {
		this._removeLock();

		if (this._nav) {
			this._nav.classList.add("nav-hidden");
		}

		if (this.nav === "toggle") {
			this._toggleButton.setAttribute("aria-expanded", false);
		}
	}

	/**
	 * @private
	 */
	_contentChanged() {
		if (!this._headings.length) {
			this.nav = undefined;
			throw new Error("Keine <h2> oder <h3> mit id-Attribut gefunden.");
		}
	}

	/**
	 * Handle anchor clicks
	 * @private
	 */
	_handleAnchorClick(e) {
		const anchor = e.currentTarget;
		const id = anchor.getAttribute('href').substring(1);
		this._activeAnchor = id; // Set active anchor
		this._setActiveAnchor(id);
		this._closeNav();

		// Reset active anchor after scrolling completes
		setTimeout(() => {
			this._activeAnchor = '';
		}, 1500); // Increase timeout from 1000 to 1500ms
	}

	/**
	 * Set active anchor and update aria-current
	 * @private
	 */
	_setActiveAnchor(id, shouldScroll = true) {
		const currentActive = this.shadowRoot.querySelector('[aria-current="true"]');

		// If we're on the active link already, stop here.
		if (currentActive && currentActive.getAttribute('href') === `#${id}`) {
			return;
		}

		// Remove [aria-current] from all active links
		// It's possible that there are multiple active at the same time
		// when we or the users scrolls quickly. Hence the forEach loop.
		this.shadowRoot
			.querySelectorAll("[aria-current]")
			.forEach((active) => active.removeAttribute("aria-current"));

		// If a link to the id exists…	
		const anchor = this.shadowRoot.querySelector(`[href="#${id}"]`);
		if (anchor) {
			// Add [aria-current] to the link and set a new activeId
			// TODO: PL, what do we need this._activeId for?
			anchor.setAttribute("aria-current", "true");
			this._activeId = id;

			// Scroll nav into view if needed
			if (shouldScroll && this.nav === "scroll") {
				requestAnimationFrame(() => {
					const navContainer = this.shadowRoot.querySelector('[part="nav"]');
					const anchorRect = anchor.getBoundingClientRect();
					const containerRect = navContainer.getBoundingClientRect();

					if (anchorRect.top < containerRect.top || anchorRect.bottom > containerRect.bottom) {
						if (currentActive) {
							this._nav.querySelector("ul").scrollTo({
								top: 0,
								left: anchor.offsetLeft,
								behavior: "smooth",
							});
						}	
					}
				});
			}
		}
	}

	render() {
		return x`
			${n(
				this.nav !== undefined,
				() => x`<nav class="nav-hidden" part="nav">
					<ul>
						${this._links.map((item) => {
							return x`
								<li>
									<a href="#${item.id}" @click="${this._handleAnchorClick}">
										${item.label}
									</a>
								</li>
							`;
						})}
					</ul>
				</nav>

				<div>
					<slot @slotchange="${this._contentChanged}"></slot>
				</div>`,
				() => x``
			)}

			<template id="toggle-button">
				<wm-button kind="clean" class="wm-section-toggle">
					<button aria-expanded="false"></button>
				</wm-button>
			</template>
		`;
	}
}

customElements.define("wm-nav-page", NavPage);

const tagName = "wm-nav-page";

export { NavPage, tagName };
