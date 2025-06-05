/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";const n=[t`
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
`];class s extends e{static properties={id:{type:String,reflect:!0},type:{type:String,reflect:!0},title:{type:String,reflect:!0},sticky:{type:Boolean,reflect:!0},closeText:{type:String,reflect:!0}};static styles=[n];constructor(){super(),this.type="warning",this.title="",this.id="",this.sticky=!0,this.closeText="Schließen"}connectedCallback(){super.connectedCallback();try{const t=localStorage.getItem(`wm-breakingnews-${this.id}`);this.sticky="true"!==t}catch(t){console.warn("localStorage is not available, defaulting to sticky behavior:",t),this.sticky=!0}document.documentElement.classList.add("wm-has-breakingnews")}disconnectedCallback(){super.disconnectedCallback(),document.documentElement.classList.remove("wm-has-breakingnews")}_close(){this.sticky=!1;try{localStorage.setItem(`wm-breakingnews-${this.id}`,"true")}catch(t){console.warn("Could not store state in localStorage:",t)}this.requestUpdate()}render(){return i`
      <div
        class="breaking-news ${this.type}"
        role="region"
        aria-labelledby="title"
        aria-live="assertive"
      >
        <h2 id="title">${this.title}</h2>
        <slot></slot>

        ${this.sticky?i`
              <wm-button kind="clean" @click="${this._close}">
                <button aria-label="${this.closeText}">
                  <wm-icon iconid="close">${this.closeText}</wm-icon>
                </button>
              </wm-button>
            `:""}
      </div>
    `}}customElements.define("wm-breakingnews",s);const o="wm-breakingnews";export{s as BreakingNews,o as tagName};
