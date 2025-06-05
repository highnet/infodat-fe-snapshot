/* @copyright Stadt Wien - Wiener Melange 200 */
import{s as t}from"../../lit-element-8d7b5fe2.js";import{x as e}from"../../lit-html-34d0b6a8.js";class r extends t{get _list(){return this.querySelectorAll("ol, ul")[0]??null}get _steps(){return this.querySelectorAll("li")??null}get _currentStep(){return this.querySelector('[aria-current="step"]')??null}static properties={current:{type:Number,reflect:!0},label:{type:String}};constructor(){super(),this.current=1,this.label="Fortschrittsanzeige"}updated(t){t.has("current")&&this._setCurrentStep()}_setCurrentStep(){const t=100/(this._steps.length-1)*(this.current-1);this.style.setProperty("--_progress",`${t}%`),this._currentStep&&this._currentStep.removeAttribute("aria-current"),this._steps[this.current-1].setAttribute("aria-current","step")}_addEvents(){this._list.addEventListener("click",(t=>{"LI"===t.target.nodeName&&t.target.querySelectorAll("button, a")[0].click()}))}connectedCallback(){super.connectedCallback(),this._addEvents()}render(){return e`
			<nav aria-label="${this.label}">
				<slot></slot>
			</nav>
		`}}customElements.define("wm-formprogress",r);const s="wm-formprogress";export{r as FormProgress,s as tagName};
