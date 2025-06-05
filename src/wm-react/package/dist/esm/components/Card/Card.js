/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as i}from"../../lit-element-8d7b5fe2.js";import{x as e}from"../../lit-html-34d0b6a8.js";import{n as o}from"../../when-741bb8d9.js";import{o as n}from"../../if-defined-d257cee1.js";import{SlotController as a}from"../misc/slot.js";import{e as r}from"../../class-map-b15037ef.js";import"../../directive-16e189ed.js";const s=[t`
    * {
      box-sizing: border-box;
    }

    :host {
      --_spacing: var(--card-spacing--mobil);
      --_grid-columns: var(--_spacing) 1fr var(--_spacing);
      --_grid-rows: repeat(4, min-content) 1fr;
    }

    :host([flipped]) .card-inner {
      transform: rotateY(180deg);
    }

    .card-inner {
      align-content: start;
      background-color: var(--card-background-color);
      border: var(--card-border);
      box-shadow: var(--card-shadow);
      display: grid;
      block-size: 100%;
      grid-template-columns: var(--_grid-columns);
      grid-template-rows: var(--_grid-rows);
      outline: 1px solid transparent;
      padding-top: var(--_spacing);
      padding-bottom: var(--_spacing);
      position: relative;
      transition: transform 0.8s, box-shadow ease-in-out 0.3s;
      transform-style: preserve-3d;
    }

    @media print {
      .card-inner {
        padding: var(--_spacing);
        display: block;
      }
    }

    /* hover syles for card */
    :host([blocklink]) .card-inner:is(:hover, :focus-within) {
      box-shadow: var(--card-shadow--hover);
      transition: box-shadow 0.3s ease-in-out;
    }

    :host([blocklink]) .video {
      background-color: var(--wm-color-ui-interactive);
      color: var(--wm-color-weiss);
    }

    /* hover styles for card with video */
    :host([blocklink]) .card-inner:is(:hover, :focus-within) .video wm-icon {
      transform: scale(1.05);
      transition: transform 0.3s ease-in-out;
    }

    ::slotted(:is(img, picture)) {
      display: block;
      height: 100% !important;
      object-fit: cover;
      width: 100%;
    }

    ::slotted(*) {
      grid-column: 2;
      min-width: 0;
    }

    ::slotted(:is(img, picture)),
    ::slotted(div[slot]) {
      margin: 0 !important;
    }

    ::slotted(:is(h1, h2, h3, h4)) {
      -webkit-hyphens: auto;
      hyphens: auto;
    }

    .header {
      background-color: inherit;
      align-items: normal;
      display: flex;
      grid-column: 2;
      grid-row: 3;
      justify-content: var(--card-header-justify);
      z-index: 1;
      padding: var(--card-header-padding);
    }

    .media {
      aspect-ratio: 16 / 9;
      grid-column: 1 / -1;
      grid-row: 1;
      margin-bottom: var(--_spacing);
      margin-top: calc(var(--_spacing) * -1);
      position: relative;
    }

    .content ::slotted(*:not(:last-of-type)) {
      margin-bottom: var(--_spacing) !important;
    }

    .content {
      background-color: inherit;
      grid-column: 2;
      grid-row: 4;
    }

    .content-with-link {
      z-index: 2;
    }

    .precontent {
      grid-column: 2;
      grid-row: 2;
      margin-bottom: 0.5em;
      z-index: 1;
    }

    .postcontent {
      grid-column: 2;
      grid-row: -1;
      z-index: 1;
    }

    .flip {
      background-color: inherit;
      block-size: 100%;
      inline-size: 100%;
      grid-column: 2 / -2;
      grid-row: 1 / -1;
      z-index: 1;
      transition: transform 0.8s ease-in-out;
    }
    
    @media not print {
      .flip {
        transform: translateZ(-1px) rotateY(180deg);
      }
    }

    .flip:focus-visible {
      outline: var(--wm-theme-site-focus-outline);
    }

    .flip-header {
      display: flex;
      justify-content: flex-end;
      padding-block: 0.7rem;
    }

    @media print {
      .flip-header {
        display: none;
      }
    }

    .eyecatcher {
      background: var(--card-media-background-color);
      color: var(--card-media-font-color);
      font-size: var(--card-eyecatcher-font-size);
      font-weight: normal;
      padding: 0 var(--card-eyecatcher-padding);
      position: absolute;
    }

    :host(:not([position])) .eyecatcher {
      bottom: var(--card-eyecatcher-spacing);
      right: 0;
    }

    :host([position*="block-end"]) .eyecatcher {
      bottom: var(--card-eyecatcher-spacing);
    }

    :host([position*="block-start"]) .eyecatcher {
      top: var(--card-eyecatcher-spacing);
    }

    :host([position*="inline-start"]) .eyecatcher {
      left: 0;
    }

    :host([position*="inline-end"]) .eyecatcher {
      right: 0;
    }

    :host([position*="inline-start"][eyecatcher="round"]) .eyecatcher {
      left: var(--card-eyecatcher-spacing);
    }

    :host([position*="inline-end"][eyecatcher="round"]) .eyecatcher {
      right: var(--card-eyecatcher-spacing);
    }

    .video {
      background: var(--card-media-background-color);
      color: var(--card-media-font-color);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      width: 3.5em;
      height: 3.5em;
      border-radius: 50%;
      padding: 0;
    }

    :host([eyecatcher="round"]) .eyecatcher {
      align-items: center;
      border-radius: 50%;
      display: flex;
      height: 3.5em;
      justify-content: center;
      padding: 0;
      transform: rotate(-20deg);
      width: 3.5em;
    }

    :host([canvas]) .media ::slotted(:is(h2, h3)) {
      margin: 0 !important;
    }

    :host([canvas]) .media {
      --_align-items: center;
      --_justify-content: center;
      --_text-align: center;

      align-items: var(--_align-items);
      background-color: var(--card-media-background-color);
      color: var(--card-media-font-color);
      display: flex;
      justify-content: var(--_justify-content);
      padding: var(--_spacing);
      text-align: var(--_text-align);
    }

    :host([canvas][position]) .media {
      --_text-align: start;
    }

    :host([canvas][position*="block-end"]) .media {
      --_align-items: end;
    }
    :host([canvas][position*="block-start"]) .media {
      --_align-items: start;
    }
    :host([canvas][position*="inline-end"]) .media {
      --_justify-content: end;
    }
    :host([canvas][position*="inline-start"]) .media {
      --_justify-content: start;
    }

    @media (min-width: 64em) {
      :host(:not([size="s"])) {
        --_spacing: var(--card-spacing--desktop);
      }

      :host([size="full-responsive"]) {
        --_grid-columns: 1fr 1fr;
        --_spacing: var(--card-spacing--desktop);
        --_min-height: 18rem;
      }

      :host([size="full-responsive"]) .card-inner {
        --_media-col: 1 / 2;
        --_media-pos: 0;
        --_content-col: 2;
        column-gap: var(--_spacing);
        padding: var(--_spacing);
        min-height: var(--_min-height);
      }

      :host([size="full-responsive"]) .media {
        grid-column: var(--_media-col);
        grid-row: 1;
        position: absolute;
        right: var(--_media-pos);
        top: calc(var(--_spacing) * -1);
        height: calc(100% + var(--_spacing));
        width: calc(100% + var(--_spacing));
        margin: 0;
        min-height: var(--_min-height);
      }

      :host([size="full-responsive"]) .precontent {
        grid-column: var(--_content-col);
        grid-row: 1;
      }

      :host([size="full-responsive"]) .header {
        grid-column: var(--_content-col);
        grid-row: auto;
      }

      :host([size="full-responsive"][size="inline-end"]) .header {
        grid-column: var(--_content-col);
      }

      :host([size="full-responsive"]) .content {
        grid-column: var(--_content-col);
        grid-row: auto;
      }

      :host([size="full-responsive"]) .postcontent {
        grid-column: var(--_content-col);
      }

      @container style(--card-style: reverse) {
        :host([size="full-responsive"]) .card-inner {
          --_content-col: 1;
          --_media-col: -1 / 2;
          --_media-pos: calc(var(--_spacing) * -1);
        }
      }
    }

    @media print {
      .card-inner {
        box-shadow: none;
        padding: 0;
      }

      .media {
        margin-top: 0 !important;
      }

      :host([canvas]) .media {
        aspect-ratio: auto;
        background-color: transparent;
        padding: 0;
    }
  `];class c extends i{get _flipShow(){return this.shadowRoot?.querySelector("#flip-show")}get _flipSide(){return this.shadowRoot?.querySelector(".flip")}static properties={size:{type:String,reflect:!0},_hasMedia:{type:String,attribute:!1},_flipcard:{type:Boolean},flipcardlabel:{type:String},flipcardicon:{type:String},flipped:{type:Boolean,reflect:!0},blocklink:{type:Boolean,reflect:!0},canvas:{type:Boolean,reflect:!0},video:{type:Boolean,reflect:!0},color:{type:String,reflect:!0},position:{type:String,reflect:!0},eyecatcher:{type:String}};static styles=s;constructor(){super(),this.size=void 0,this.eyecatcher=void 0,this.position=void 0,this.color=void 0,this.blocklink=!1,this.canvas=!1,this._hasMedia=null,this._flipcard=!1,this.flipcardlabel="Teilen",this.flipcardicon="embed",this.flipped=!1,this.video=!1,this._slotController=new a(this),this._contentHasLinks=!1}firstUpdated(){this.shadowRoot.querySelector('slot[name="media"]').addEventListener("slotchange",(()=>{this._hasMedia=this.shadowRoot.querySelector('slot[name="media"]').assignedNodes().length}))}updated(t){if(t.has("canvas")&&this.canvas&&(this._hasMedia=!0),t.has("video")&&this.video&&(this.blocklink=!0),t.has("blocklink")){const t=this.querySelectorAll('[slot="heading"] a'),i=this.querySelectorAll('[slot="media"] a'),e=this.querySelectorAll('[slot="content"] a'),o=this.querySelectorAll('[slot="postcontent"] a'),n=this.querySelectorAll('[slot="precontent"] a');[...t,...i,...e,...o,...n].length>1&&(this.blocklink=!1,this.removeAttribute("blocklink")),o.length>1&&o.forEach((t=>{t.classList.add("block-link-unlink")}))}}_onFlip(){this._flipcard=!0}_flipTheCard(){this.flipped=!this.flipped,setTimeout((()=>{this.flipped?this._flipSide.focus():this._flipShow.focus()}),0),this.dispatchEvent(new CustomEvent("wm-card-flipped",{detail:{flipped:this.flipped},bubbles:!0}))}render(){return e`
      <div class="card-inner">
        <div
          class="header"
          inert="${n(this.flipped?"inert":void 0)}"
        >
          <slot name="heading"></slot>

          ${o(this._flipcard,(()=>e`
              <wm-button kind="clean">
                <button
                  @click="${this._flipTheCard}"
                  aria-expanded="${this.flipped}"
                  id="flip-show"
                >
                  <wm-icon iconid="${this.flipcardicon}"></wm-icon>
                  ${this.flipcardlabel}
                </button>
              </wm-button>
            `))}
        </div>

        <div class="media" ?hidden=${!this._hasMedia}>
          <slot name="media"></slot>

          <div class="eyecatcher">
            <slot name="eyecatcher"></slot>
          </div>

          ${o(this.video,(()=>e`
              <div class="video">
                <wm-icon iconid="play-button" width="50"></wm-icon>
              </div>
            `))}
        </div>

        ${o(this._slotController.hasNamedSlot("precontent"),(()=>e`
            <div
              class="precontent"
              inert="${n(this.flipped?"inert":void 0)}"
            >
              <slot name="precontent"></slot>
            </div>
          `))}
        ${o(this._slotController.hasNamedSlot("content"),(()=>e`
            <div
              class="content ${r({"content-with-link":this._contentHasLinks})}"
              inert="${n(this.flipped?"inert":void 0)}"
            >
              <slot name="content"></slot>
            </div>
          `))}
        <div
          class="postcontent"
          inert="${n(this.flipped?"inert":void 0)}"
        >
          <slot name="postcontent"></slot>
        </div>

        ${o(this._slotController.hasNamedSlot("flip"),(()=>e`
            <div
              class="flip"
              inert="${n(this.flipped?void 0:"inert")}"
              aria-label="Teilen"
              role="region"
              tabindex="0"
            >
              <div class="flip-header">
                <wm-button kind="clean">
                  <button
                    @click="${this._flipTheCard}"
                    aria-expanded="${this.flipped}"
                    class="flip-hide"
                  >
                    <wm-icon iconid="close">Schließen</wm-icon>
                  </button>
                </wm-button>
              </div>

              <slot name="flip" @slotchange="${this._onFlip}"></slot>
            </div>
          `))}
      </div>
    `}}customElements.define("wm-card",c);const l="wm-card";export{c as Card,l as tagName};
