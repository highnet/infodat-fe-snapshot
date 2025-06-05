/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as s,s as t}from"../../lit-element-8d7b5fe2.js";import{x as e}from"../../lit-html-34d0b6a8.js";const r=[s`
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
`];class i extends t{static properties={gap:{type:String,reflect:!0},size:{type:String,reflect:!0}};constructor(){super(),this.gap="xs",this.size="m"}static styles=[r];render(){return e` <slot></slot> `}}customElements.define("wm-grid",i);const l="wm-grid";export{i as Grid,l as tagName};
