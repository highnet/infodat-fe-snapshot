/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t}from"./lit-element-8d7b5fe2.js";import"./lit-html-34d0b6a8.js";const o=[t`
* {
  box-sizing: border-box;
}

:host {
  aspect-ratio: var(--map-ratio);
  display: block;
  height: var(--map-height);
  position: relative;
}

.map {
  height: 100%;
  width: 100%;
}

.marker-cluster div {
  font-family: var(--wm-font-stack);
  font-variation-settings: var(--wm-font-weight-extra-bold);
  font-size: 0.7rem;
  letter-spacing: 1px;
}

.marker-cluster-large {
  background-color: var(--wm-color-abendstimmung-light) !important;
}

.marker-cluster-large div {
  background-color: var(--wm-color-abendstimmung) !important;
  color: var(--wm-color-weiss);
}

.marker-cluster-medium {
  background-color: var(--wm-color-goldgelb-light) !important;
}

.marker-cluster-medium div {
  background-color: var(--wm-color-goldgelb) !important;
}

.marker-cluster-small {
  background-color: var(--wm-color-frischgruen-light) !important;
}

.marker-cluster-small div {
  background-color: var(--wm-color-frischgruen) !important;
}

.leaflet-popup-content-wrapper {
  border-radius: 6px;
  box-shadow: rgb(0 0 0 / 40%) 0px 3px 14px;
  font-family: var(--wm-font-stack);
}

.leaflet-container a.leaflet-popup-close-button {
  align-items: center;
  background-color: var(--wm-color-weiss);
  border-radius: 50%;
  color: var(--wm-color-fastschwarz);
  display: flex;
  font-size: 1.2rem;
  height: 1.6rem;
  justify-content: center;
  line-height: 0.7;
  padding: 0;
  right: 0;
  top: 0;
  width: 1.6rem;
}

.leaflet-popup-content {
  line-height: 1.6;
  font-size: var(--wm-font-size-s);
  min-width: 210px;
}

.leaflet-popup-content > *:last-child {
  margin-bottom: 0;
}

.leaflet-popup-content h3 {
  line-height: 1.5;
  margin: 0;
}

.leaflet-popup-content h3 a {
  color: var(--wm-theme-site-color);
}

.leaflet-popup-tip {
  margin: -10px auto 0 !important;
}

.maplibregl-map {
  height: 100%;
}


.maplibregl-popup-content {
  border-radius: 6px;
  box-shadow: rgb(0 0 0 / 40%) 0px 3px 14px;
  padding: 1rem 1.6rem 1rem 1rem;
  font-family: var(--wm-font-stack);
  font-size: 1rem;
}

.maplibregl-popup-close-button {
  align-items: center;
  background-color: var(--wm-color-weiss);
  border-radius: 50%;
  color: var(--wm-color-fastschwarz);
  display: flex;
  font-size: 1.2rem;
  height: 1.6rem;
  justify-content: center;
  line-height: 0.7;
  padding: 0;
  right: 0.2rem;
  top: 0.3rem;
  width: 1.6rem;
}

.maplibregl-popup-content h3 {
  margin-top: 0;
}

.maplibregl-popup-content p {
  line-height: 1.6;
}

.maplibregl-popup-content p:last-child {
  margin-bottom: 0;
}

.maplibregl-popup-content ul {
  margin: 0;
  padding: 0;
  list-style-type: '';
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
}

.maplibregl-popup-content dt {
  font-family: var(--wm-font-stack);
  font-variation-settings: var(--wm-font-weight-extra-bold);
}

.maplibregl-popup-content dd {
  margin: 0;
}

.maplibregl-popup-content dd:not(:last-child) {
  margin-bottom: 0.5rem;
}

/* Search */

:host([controls]) {
  overflow: hidden;
}

.search {
  position: absolute;
  inset: 0 0 auto auto;
  background-color: #fff;
  transition: transform 0.3s, visibility 0.3s;
  z-index: 1;
  top: 3.5rem;
  padding: 1rem;
  width: 100%;
  max-width: 28rem;
}

.search-hidden {
  visibility: hidden;
  transform: translateX(100%);

}

.controls {
  position: absolute;
  inset: 0.5rem 0.5rem auto auto;
  z-index: 1;
  display: flex;
  gap: 0.5rem;
}

.controls button {
  border-radius: 50%;
  padding: 0;
  border: 0;
  background: #fff;
  border: 1px solid #767272;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #767272;
}

.options {
  background: #fff;
  position: absolute;
  inset-block-end: 0.2rem;
  inset-inline: 0;
  width: calc(100% - 0.4rem);
  z-index: 111;
  margin: 0 auto;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  min-height: 45px;
  display: none;
}

.options--visible {
  display: block;
}

.marker-controls {
  display: flex;
  gap: 0.5rem;
}

`];export{o as s};
