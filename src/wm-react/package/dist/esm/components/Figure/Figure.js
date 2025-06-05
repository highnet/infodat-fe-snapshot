/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as e,s as t}from"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";const s=[e`
  * {
    box-sizing: border-box;
  }

  :host {
      display: grid;
      width: auto;
      max-width: 100%;
      overflow: hidden;
      opacity: 0;
    }
`];class o extends t{static styles=[s];constructor(){super(),this.observer=new MutationObserver((()=>this._debouncedAdjustSize())),this._debouncedAdjustSize=this._debounce(this._adjustSize.bind(this),50)}connectedCallback(){super.connectedCallback(),this.observer.observe(this,{childList:!0,subtree:!0}),this._adjustSize()}disconnectedCallback(){super.disconnectedCallback(),this.observer.disconnect();const e=this.querySelector("img, video, audio, iframe, picture, svg, canvas");e&&(e.removeEventListener("load",this._setFigureWidth),e.removeEventListener("error",this._onMediaError))}_debounce(e,t){let i;return(...s)=>{clearTimeout(i),i=setTimeout((()=>e.apply(this,s)),t)}}_adjustSize(e=15){const t=this.querySelector("figure");if(t){const i=t.querySelector("picture");let s;if(s=i?i.querySelector("img"):t.querySelector("img, video, audio, iframe, svg, canvas"),s){const t=()=>{let t=parseInt(s.getAttribute("width"),10)||s.offsetWidth||s.clientWidth;t>0?this.style.cssText=`max-width:${t}px; opacity:1; visibility:visible;`:e>0?setTimeout((()=>this._adjustSize(e-1)),100):this.style.cssText="width:100%; opacity:1; visibility:visible;"},i=()=>{console.error("Media failed to load:",s.src||s),this.style.cssText="opacity:1; visibility:visible;"};this._setFigureWidth=t,this._onMediaError=i,["img","video","iframe","svg"].includes(s.tagName.toLowerCase())?(s.complete||"complete"===s.readyState?t():s.addEventListener("load",t),s.addEventListener("error",i)):"audio"===s.tagName.toLowerCase()?this.style.cssText="width:100%; opacity:1; visibility:visible;":t()}else this.style.cssText="opacity:1; visibility:visible;"}}render(){return i`
      <slot></slot>
    `}}customElements.define("wm-figure",o);const r="wm-figure";export{o as Figure,r as tagName};
