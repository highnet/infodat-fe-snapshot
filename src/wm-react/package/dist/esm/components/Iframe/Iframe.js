/* @copyright Stadt Wien - Wiener Melange 200 */
import{s as e,i as t}from"../../lit-element-8d7b5fe2.js";import{x as s}from"../../lit-html-34d0b6a8.js";class r extends e{static properties={_iframe:{type:Node},_src:{type:String},_observer:{type:IntersectionObserver}};static styles=[t`
			:host {
				display: block;
			}
		`];constructor(){super(),this._iframe=void 0,this._src="",this._observer=void 0}connectedCallback(){super.connectedCallback(),this._observer=new IntersectionObserver(this._handleIntersection.bind(this),{threshold:.2}),this._observer.observe(this)}_handleIntersection(e){e.map((e=>(e.isIntersecting&&this._iframe&&this._src&&(this._iframe.setAttribute("src",this._src),this._observer.unobserve(this)),e)))}_removeSource(e){this._iframe=e.target.assignedElements({flatten:!0})[0],this._iframe&&(this._src=this._iframe.getAttribute("src"),this._iframe.removeAttribute("src"))}render(){return s` <slot @slotchange="${this._removeSource}"></slot> `}}customElements.define("wm-iframe",r);const i="wm-iframe";export{r as Iframe,i as tagName};
