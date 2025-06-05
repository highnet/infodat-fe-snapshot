/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as o}from"../../lit-html-34d0b6a8.js";import{o as i}from"../../unsafe-html-4e49b66a.js";import"../../directive-16e189ed.js";const r=[t`
  :host {
    display: block;
    overflow: hidden;
  }

  :host([type=large]) ::slotted(img) {
    width: 10rem;
  }

  figure {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
  }

  blockquote {
    font-size: 1.2rem;
    margin-block: 1.5rem;
    margin-inline: 0;
    max-width: var(--wm-theme-content-text-max-width);
    padding-left: 1.5em;
    position: relative;
  }

  blockquote::before {
    content: open-quote no-close-quote;
    color: rgba(0, 0, 0, 0.1);
    font-size: 8.5rem;
    inset-inline-start: 5px;
    line-height: 1;
    position: absolute;
    transform: translateY(-85%);
  }

  blockquote::after {
    content: none;
  }

  figcaption {
    background-color: transparent;
    text-align: center;
  }

  ::slotted(img) {
    aspect-ratio: 1;
    border: 2px solid var(--wm-color-nebelgrau-light);
    border-radius:50%;
    object-fit: cover;
    width: 6rem;
  }

`];class n extends e{static properties={caption:{type:String},source:{type:String},type:{type:String,reflect:!0}};static styles=[r];constructor(){super(),this.type="small",this.source=void 0,this.caption=void 0}render(){return o` <figure>
			<blockquote part="quote">
				<slot></slot>
			</blockquote>

			<slot name="image"></slot>

			<figcaption>
				<strong>${this.source?o`${i(this.source)}`:""}</strong>
				${this.caption?o`<br /><small>${i(this.caption)}</small>`:""}
			</figcaption>
		</figure>`}}customElements.define("wm-quote",n);const s="wm-quote";export{n as Quote,s as tagName};
