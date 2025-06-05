/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as s}from"../../lit-html-34d0b6a8.js";const a=[t`
* {
  box-sizing: border-box;
}

:host {
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--status-gap);
}

span {
  align-items: center;
  display: inline-flex;
  gap: 0.6rem;
}

:host([reverse]) span {
  flex-direction: row-reverse;
}

.status {
  background-color: var(--status-color);
  block-size: var(--status-size);
  border-radius: 50%;
  display: inline-block;
  inline-size:  var(--status-size);
}


strong {
  font-weight: var(--wm-theme-content-font-weight);
  font-variation-settings: var(--wm-theme-content-font-variation-settings);
}
`];class r extends e{static properties={label:{type:String,reflect:!0},loadingLabel:{type:String,reflect:!0},reverse:{type:Boolean,reflect:!0},status:{type:Number,reflect:!0},statusText:{type:String,reflect:!0}};static styles=[a];constructor(){super(),this.label="Auslastung:",this.loadingLabel="Lade Auslastung…",this.reverse=!1,this.status=6,this.statusText=""}render(){return s`
			<strong>${this.label}</strong>
			<span>
				<span class="status"></span>
				${this.statusText?s`${this.statusText}`:s`${this.loadingLabel}`}
			</span>
			<slot></slot>
		`}}customElements.define("wm-status",r);export{r as Status};
