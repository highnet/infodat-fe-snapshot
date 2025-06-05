/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as r,s as e}from"../../lit-element-8d7b5fe2.js";import{x as t}from"../../lit-html-34d0b6a8.js";import{dispatchCustomEvent as o}from"../misc/utils.js";import{errorTracker as s}from"../misc/error-tracking.js";import{g as i}from"../../wiener-melange.bundle.min-ae18d627.js";import"../../unsafe-html-4e49b66a.js";import"../../directive-16e189ed.js";const n=[r`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  ::slotted(li) {
    font-variation-settings: var(--wm-font-weight-bold);
    margin: 0 !important;
  }
`],a=new CSSStyleSheet;a.replaceSync(i);class l extends e{static properties={heading:{type:String},noFocus:{type:Boolean},errors:{type:Number},_errorItems:{state:!0,type:Array}};get _errors(){return this.querySelectorAll("li")??null}static styles=[a,n];constructor(){super(),this.heading="Es gibt [ERRORS] Fehler auf der Seite:",this.noFocus=!1,this.errors=0,this._errorItems=[]}connectedCallback(){super.connectedCallback()}_focusFirstError(){setTimeout((()=>{this._errors.length&&!this.noFocus&&this._errors[0].querySelector("a").focus()}),0)}_handleSlotChange(){this.errors=this._errors?this._errors.length:0,this._focusFirstError()}_jumpToError(r){if(r.preventDefault(),"A"===r.target.nodeName){const e=r.target.getAttribute("href").replace("#",""),t=document.querySelector(`#${e}`);t&&t.focus(),o(this,"jump-to-error",{id:e})}}setSummaryMessage(r,e){if(!r||!e)return;const t=this.querySelector(`li a[href="#${r}"]`);t&&(t.textContent=e)}clearErrorTracking(){s.reset()}continueToNextError(){for(s.continueIteration();this.querySelector("li");)this.removeChild(this.querySelector("li"));return this._errorItems=[],this.errors=0,s.hasErrors(!0)}hasMoreErrors(){return s.hasErrors(!0)}_isErrorDuplicate(r){return!!r&&s.isErrorProcessed(r)}_trackError(r){r&&s.trackError(r)}updateWithErrors(r,e){if(r&&e)try{for(;this.querySelector("li");)this.removeChild(this.querySelector("li"));const t=s.getAllErrors(),o=this._mergeErrorLists(r,t);this._errorItems=[];const i=new Map;o.forEach((r=>{r.isGroupError&&r.originId&&i.set(r.originId,r)})),o.forEach((r=>{if(!r.id)return;if(this._errorItems.some((e=>e.id===r.id)))return;if(!r.isGroupError){const e=document.getElementById(r.id)?.closest("wm-form-group");if(e&&e.id&&i.has(e.id))return void s.trackError(r.id)}s.isErrorProcessed(r.id)||s.trackError(r.id,{isGroupError:!!r.isGroupError,originId:r.originId||r.id,summaryMsg:r.summaryMsg||r.msg}),this._errorItems.push(r);const t=e.content.cloneNode(!0),o=t.querySelector("li").querySelector("a");o&&(o.href=`#${r.id}`,o.textContent=r.summaryMsg||r.msg,r.isGroupError&&r.originId&&r.originId!==r.id&&o.setAttribute("data-group-id",r.originId)),this.appendChild(t)})),this.errors=this._errors?.length||0,this._focusFirstError()}catch(r){console.error("Error updating error summary:",r)}else console.warn("Missing required parameters for updateWithErrors")}_mergeErrorLists(r,e){const t=new Map;return r.forEach((r=>{r.id&&t.set(r.id,r)})),e.forEach((r=>{!r.id||t.has(r.id)||s.isErrorSuppressed(r.id)||t.set(r.id,r)})),Array.from(t.values())}addError(r,e){if(!r||!r.id||!e)return;if(s.isErrorSuppressed(r.id)||this._errorItems.some((e=>e.id===r.id)))return;s.trackError(r.id,{isGroupError:!!r.isGroupError,originId:r.originId||r.id,summaryMsg:r.summaryMsg||r.msg}),this._errorItems.push(r);const t=e.content.cloneNode(!0),o=t.querySelector("li").querySelector("a");o&&(o.href=`#${r.id}`,o.textContent=r.summaryMsg||r.msg,r.isGroupError&&r.originId&&r.originId!==r.id&&o.setAttribute("data-group-id",r.originId)),this.appendChild(t),this.errors=this._errors?.length||0}render(){return t`
			<wm-formblock role="region" aria-labelledby="heading">
				<h2 id="heading" class="wm-e-h3">
					${this.heading.replace("[ERRORS]",this.errors)}
				</h2>

				<wm-notification type="error" iconSize="32">
					<wm-list gap="xs">
						<ol @click="${this._jumpToError}">
							<slot @slotchange="${this._handleSlotChange}"></slot>
						</ol>
					</wm-list>
				</wm-notification>
			</wm-formblock>
		`}}customElements.define("wm-formerrorsummary",l);const m="wm-formerrorsummary";export{l as FormErrorsummary,m as tagName};
