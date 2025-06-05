/* @copyright Stadt Wien - Wiener Melange 200 */
function e(e,t){return e.filter((e=>{let n=!1;return e.children.length?(e.children=e.children.filter((e=>e.text.toLowerCase().includes(t))),n=e.children.length>0):n=e.text.toLowerCase().includes(t),n}))}function t(e,t){const n=e[t];return n.scrollIntoView(t>5),n}export{e as filterOptions,t as markOption};
