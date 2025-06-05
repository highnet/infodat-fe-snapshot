/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as e,s as t}from"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";const o=[e`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 99999;
    width: 100%;
    background-color: var(--tourismuszeile-background-color);
    transition: 0.3s;
    z-index: 1230;
    overflow: hidden;
  }

  :host([hidden]) {
    display: none;
  }

  [role="banner"] {
    padding-left: 1rem;
    padding-right: 1rem;
    margin: 0 auto;
    max-width: var(--wm-theme-site-wrapper-width);
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  a {
    display: block;
    text-decoration: none;
    color: var(--tourismuszeile-font-color);
  }

  h3, p {
    margin: 0;
    transition: .3s;
  }

  h3 + p {
    display: block;
  }

  h3 {
    font-size: var(--wm-font-size);
  }

  p {
    font-size: var(--wm-font-size-xs);
  }

  wm-button {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    color: var(--tourismuszeile-font-color);
  }

  @media (min-width: 48em) {
    [role="banner"] {
      padding-left: 3.1rem;
      padding-right: 3.1rem;
    }

    a {
      display: flex;
      align-items: center;
      gap: 1rem;
      height: 100%;
    }

    a:hover u {
      text-decoration: none;
    }

    h3 + p {
      margin-top: 0;
    }

    h3 {
      padding-top: 0;
    }

    wm-button {
      right: 3.1rem;
    }
  }

  @media (min-width: 64em) {
    h3 {
      font-size: 1.4rem;
    }

    p {
      font-size: 1.1rem;
    }
  } 
`];class n extends t{static properties={hidden:{type:Boolean,reflect:!0},url:{type:String}};static styles=[o];constructor(){super(),this.hidden=void 0,this.url=void 0}connectedCallback(){super.connectedCallback(),this.hidden=localStorage.getItem("wm-tourismuszeile-hidden"),this._setClass()}_setClass(){let e=document.documentElement.classList;e.contains("wm-tourismuszeile-visible")||null!=this.hidden||e.add("wm-tourismuszeile-visible")}_close(){this.hidden=!0,localStorage.setItem("wm-tourismuszeile-hidden",!0),document.documentElement.classList.remove("wm-tourismuszeile-visible")}render(){return i`
      <div role="banner">
        <a href="${this.url}">
          <h3><slot name="heading"></slot></h3>
          <p><slot name="content"></slot></p>
        </a> 

        <wm-button kind="clean" @click="${this._close}" ?hidden="${this.hidden}">
          <button>
            <wm-icon iconid="close">Schließen</wm-icon>
          </button>
        </wm-button>
      </div>
    `}}customElements.define("wm-tourismuszeile",n);const s="wm-tourismuszeile";export{n as Tourismuszeile,s as tagName};
