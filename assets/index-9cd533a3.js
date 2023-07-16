var Se=Object.defineProperty;var Ce=(h,f,i)=>f in h?Se(h,f,{enumerable:!0,configurable:!0,writable:!0,value:i}):h[f]=i;var Be=(h,f)=>()=>(f||h((f={exports:{}}).exports,f),f.exports);var B=(h,f,i)=>(Ce(h,typeof f!="symbol"?f+"":f,i),i);var ze=Be(($e,$)=>{(async()=>{(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const h="/game-of-life/assets/game_of_life_bg-0c5f0a1a.wasm",f=async(e={},n)=>{let r;if(n.startsWith("data:")){const t=n.replace(/^data:.*?base64,/,"");let o;if(typeof Buffer=="function"&&typeof Buffer.from=="function")o=Buffer.from(t,"base64");else if(typeof atob=="function"){const a=atob(t);o=new Uint8Array(a.length);for(let l=0;l<a.length;l++)o[l]=a.charCodeAt(l)}else throw new Error("Cannot decode base64-encoded data URL");r=await WebAssembly.instantiate(o,e)}else{const t=await fetch(n),o=t.headers.get("Content-Type")||"";if("instantiateStreaming"in WebAssembly&&o.startsWith("application/wasm"))r=await WebAssembly.instantiateStreaming(t,e);else{const a=await t.arrayBuffer();r=await WebAssembly.instantiate(a,e)}}return r.instance.exports};let i;function N(e){i=e}const g=new Array(128).fill(void 0);g.push(void 0,null,!0,!1);function F(e){return g[e]}let p=g.length;function H(e){e<132||(g[e]=p,p=e)}function K(e){const n=F(e);return H(e),n}const X=typeof TextDecoder>"u"?(0,$.require)("util").TextDecoder:TextDecoder;let O=new X("utf-8",{ignoreBOM:!0,fatal:!0});O.decode();let T=null;function A(){return(T===null||T.byteLength===0)&&(T=new Uint8Array(i.memory.buffer)),T}function z(e,n){return e=e>>>0,O.decode(A().subarray(e,e+n))}let x=null;function L(){return(x===null||x.byteLength===0)&&(x=new Int32Array(i.memory.buffer)),x}function Y(e){return()=>{throw new Error(`${e} is not defined`)}}function G(e){p===g.length&&g.push(g.length+1);const n=p;return p=g[n],g[n]=e,n}let I=0;const J=typeof TextEncoder>"u"?(0,$.require)("util").TextEncoder:TextEncoder;let M=new J("utf-8");const Q=typeof M.encodeInto=="function"?function(e,n){return M.encodeInto(e,n)}:function(e,n){const r=M.encode(e);return n.set(r),{read:e.length,written:r.length}};function V(e,n,r){if(r===void 0){const c=M.encode(e),k=n(c.length,1)>>>0;return A().subarray(k,k+c.length).set(c),I=c.length,k}let t=e.length,o=n(t,1)>>>0;const a=A();let l=0;for(;l<t;l++){const c=e.charCodeAt(l);if(c>127)break;a[o+l]=c}if(l!==t){l!==0&&(e=e.slice(l)),o=r(o,t,t=l+e.length*3,1)>>>0;const c=A().subarray(o+l,o+t),k=Q(e,c);l+=k.written}return I=l,o}const P=Object.freeze({Dead:0,0:"Dead",Alive:1,1:"Alive"});class S{static __wrap(n){n=n>>>0;const r=Object.create(S.prototype);return r.__wbg_ptr=n,r}__destroy_into_raw(){const n=this.__wbg_ptr;return this.__wbg_ptr=0,n}free(){const n=this.__destroy_into_raw();i.__wbg_universe_free(n)}static new(n,r){const t=i.universe_new(n,r);return S.__wrap(t)}width(){return i.universe_width(this.__wbg_ptr)>>>0}height(){return i.universe_height(this.__wbg_ptr)>>>0}cells(){return i.universe_cells(this.__wbg_ptr)}render(){let n,r;try{const a=i.__wbindgen_add_to_stack_pointer(-16);i.universe_render(a,this.__wbg_ptr);var t=L()[a/4+0],o=L()[a/4+1];return n=t,r=o,z(t,o)}finally{i.__wbindgen_add_to_stack_pointer(16),i.__wbindgen_free(n,r,1)}}randomize(){i.universe_randomize(this.__wbg_ptr)}clear(){i.universe_clear(this.__wbg_ptr)}toggle_cell(n,r){i.universe_toggle_cell(this.__wbg_ptr,n,r)}tick(){i.universe_tick(this.__wbg_ptr)}}function Z(e){K(e)}const ee=typeof Math.random=="function"?Math.random:Y("Math.random");function te(){const e=new Error;return G(e)}function ne(e,n){const r=F(n).stack,t=V(r,i.__wbindgen_malloc,i.__wbindgen_realloc),o=I;L()[e/4+1]=o,L()[e/4+0]=t}function re(e,n){let r,t;try{r=e,t=n,console.error(z(e,n))}finally{i.__wbindgen_free(r,t,1)}}function oe(e,n){throw new Error(z(e,n))}URL=globalThis.URL;const _=await f({"./game_of_life_bg.js":{__wbindgen_object_drop_ref:Z,__wbg_random_5f61cd0d6777a993:ee,__wbg_new_abda76e883ba8a5f:te,__wbg_stack_658279fe44541cf6:ne,__wbg_error_f851667af71bcfc6:re,__wbindgen_throw:oe}},h),j=_.memory,ie=_.__wbg_universe_free,se=_.universe_new,ae=_.universe_width,le=_.universe_height,ce=_.universe_cells,_e=_.universe_render,fe=_.universe_randomize,de=_.universe_clear,ue=_.universe_toggle_cell,he=_.universe_tick,ge=_.__wbindgen_add_to_stack_pointer,we=_.__wbindgen_free,me=_.__wbindgen_malloc,be=_.__wbindgen_realloc,pe=Object.freeze(Object.defineProperty({__proto__:null,__wbg_universe_free:ie,__wbindgen_add_to_stack_pointer:ge,__wbindgen_free:we,__wbindgen_malloc:me,__wbindgen_realloc:be,memory:j,universe_cells:ce,universe_clear:de,universe_height:le,universe_new:se,universe_randomize:fe,universe_render:_e,universe_tick:he,universe_toggle_cell:ue,universe_width:ae},Symbol.toStringTag,{value:"Module"}));N(pe);const s=10,ye=window.innerWidth/s,ve=window.innerHeight/s,Ee="#393a3c",ke="#151618",Te="#94a8ff",m=document.getElementById("game-of-life-canvas");if(!m)throw new Error("Canvas not found");const C=document.getElementById("play-toggle");if(!C)throw new Error("PlayToggle not found");const R=document.getElementById("randomizer");if(!R)throw new Error("Randomizer not found");const W=document.getElementById("clear");if(!W)throw new Error("Clear not found");let y=null;const Ae=()=>y===null,xe=()=>{C.textContent="\u23F8",U()},Le=()=>{C.textContent="\u25B6",y&&cancelAnimationFrame(y),y=null};C.addEventListener("click",()=>Ae()?xe():Le()),R.addEventListener("click",()=>{b.randomize(),v(),E()}),W.addEventListener("click",()=>{b.clear(),v(),E()});const b=S.new(ye,ve);b.randomize();const u=b.width(),w=b.height();m.height=(s+1)*w+1,m.width=(s+1)*u+1;const D="2d",d=m.getContext(D);if(!d)throw new Error(`Context ${D} not found`);const U=()=>{Me.render(),b.tick(),v(),E(),y=requestAnimationFrame(U)},v=()=>{d.beginPath(),d.strokeStyle=Ee;for(let e=0;e<=u;e++)d.moveTo(e*(s+1)+1,0),d.lineTo(e*(s+1)+1,(s+1)*w+1);for(let e=0;e<=w;e++)d.moveTo(0,e*(s+1)+1),d.lineTo((s+1)*u+1,e*(s+1)+1);d.stroke()},E=()=>{const e=b.cells(),n=new Uint8Array(j.buffer,e,u*w);d.beginPath(),d.fillStyle=Te;for(let r=0;r<w;r++)for(let t=0;t<u;t++){const o=q(r,t);n[o]===P.Alive&&d.fillRect(t*(s+1)+1,r*(s+1)+1,s,s)}d.fillStyle=ke;for(let r=0;r<w;r++)for(let t=0;t<u;t++){const o=q(r,t);n[o]===P.Dead&&d.fillRect(t*(s+1)+1,r*(s+1)+1,s,s)}d.stroke()},q=(e,n)=>e*u+n;v(),E(),m.addEventListener("click",e=>{const n=m.getBoundingClientRect(),r=m.width/n.width,t=m.height/n.height,o=(e.clientX-n.left)*r,a=(e.clientY-n.top)*t,l=Math.min(Math.floor(a/(s+1)),w-1),c=Math.min(Math.floor(o/(s+1)),u-1);b.toggle_cell(l,c),v(),E()});const Me=new class{constructor(){B(this,"fps");B(this,"frames");B(this,"lastFrameTimeStamp");const e=document.getElementById("fps");if(!e)throw new Error("FPS not found");this.fps=e,this.frames=[],this.lastFrameTimeStamp=performance.now()}render(){const e=performance.now(),n=e-this.lastFrameTimeStamp;this.lastFrameTimeStamp=e;const r=1/n*1e3;this.frames.push(r),this.frames.length>100&&this.frames.shift();let t=1/0,o=-1/0,a=0;for(let c=0;c<this.frames.length;c++)a+=this.frames[c],t=Math.min(this.frames[c],t),o=Math.max(this.frames[c],o);let l=a/this.frames.length;this.fps.textContent=["Frames per Second:",`${u}*${w}=${u*w} cells`,`latest = ${Math.round(r)}`,`avg of last 100 = ${Math.round(l)}`,`min of last 100 = ${Math.round(t)}`,`max of last 100 = ${Math.round(o)}`].join(`
`)}}})()});export default ze();