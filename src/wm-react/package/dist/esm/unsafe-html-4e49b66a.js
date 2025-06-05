/* @copyright Stadt Wien - Wiener Melange 200 */
import{T as t,w as r}from"./lit-html-34d0b6a8.js";import{i,t as e,e as s}from"./directive-16e189ed.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class n extends i{constructor(r){if(super(r),this.it=t,r.type!==e.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(i){if(i===t||null==i)return this._t=void 0,this.it=i;if(i===r)return i;if("string"!=typeof i)throw Error(this.constructor.directiveName+"() called with a non-string value");if(i===this.it)return this._t;this.it=i;const e=[i];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}n.directiveName="unsafeHTML",n.resultType=1;const o=s(n);export{n as e,o};
