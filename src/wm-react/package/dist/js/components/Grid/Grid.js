/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
* {
  box-sizing: border-box;
}

/* TODO: define grid columns as CSS properties globally  */
:host {
  --grid-template-columns-s: 4;
  --grid-template-columns-m: 3;
  --grid-template-columns-l: 2;
  --grid-template-columns-full: 1;
}

:host {
  --cols: none;

  display: grid;
  flex-grow: unset !important;
  grid-gap: var(--grid-spacing);
  grid-template-columns: var(--cols);
}

:host([size="s"]) {
  --cols: repeat(auto-fill,minmax(15rem, 1fr));
}

:host([size="full"]) {
  --cols: repeat(var(--grid-template-columns-full), 1fr);
}

@media (min-width: 48em) {
  :host([size="m"]) {
    --cols: repeat(auto-fill,minmax(19rem, 1fr));
  }

  :host([size="l"]) {
    --cols: repeat(auto-fill,minmax(25rem, 1fr));
  }
}

@media (min-width: 64em) {
  :host([size="s"]) {
    --cols: repeat(var(--grid-template-columns-s), 1fr);
  }
  :host([size="m"]) {
    --cols: repeat(var(--grid-template-columns-m), 1fr);
  }
  :host([size="l"]) {
    --cols: repeat(var(--grid-template-columns-l), 1fr);
  }
}

:host([gap="xs"]) {
  --grid-spacing: var(--wm-spacing-xs);
}

:host([gap="s"]) {
  --grid-spacing: var(--wm-spacing-s);
}

:host([gap="m"]) {
  --grid-spacing: var(--wm-spacing-m);
}

:host([gap="l"]) {
  --grid-spacing: var(--wm-spacing-l);
}

::slotted(*) {
  max-width: 100% !important;
}
`];

/**
 * Komponente zur Darstellung eines Grid Layouts
 *
 * @slot Cards
 */

/**
 * @cssprop --grid-spacing - Abstand
 */

class Grid extends s {
	static properties = {
		gap: { type: String, reflect: true },
		size: { type: String, reflect: true },
	};

	constructor() {
		super();

		/** @type {'xs'|'s'|'m'|'l'} Abstand zwischen Elementen */
		this.gap = "xs";

		/** @type {'s'|'m'|'l'|'full'} Größe der Elemente - Cards */
		this.size = "m";
	}

	static styles = [styles];

	render() {
		return x` <slot></slot> `;
	}
}

customElements.define("wm-grid", Grid);

const tagName = "wm-grid";

export { Grid, tagName };
