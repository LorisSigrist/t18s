import{w as h}from"./index.1098ae64.js";import{H as b}from"./index.71f9df1a.js";const k="modulepreload",R=function(e,t){return new URL(e,t).href},w={},p=function(t,n,o){if(!n||n.length===0)return t();const a=document.getElementsByTagName("link");return Promise.all(n.map(s=>{if(s=R(s,o),s in w)return;w[s]=!0;const r=s.endsWith(".css"),i=r?'[rel="stylesheet"]':"";if(!!o)for(let u=a.length-1;u>=0;u--){const f=a[u];if(f.href===s&&(!r||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${i}`))return;const c=document.createElement("link");if(c.rel=r?"stylesheet":k,r||(c.as="script",c.crossOrigin=""),c.href=s,document.head.appendChild(c),r)return new Promise((u,f)=>{c.addEventListener("load",u),c.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>t()).catch(s=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=s,window.dispatchEvent(r),!r.defaultPrevented)throw s})},S=["en","de"],E="en",v="messages",C=200,T={en:{messages:async()=>(await p(()=>import("./_t18s-dictionary_en_messages.fa3ec860.js"),[],import.meta.url)).default},de:{messages:async()=>(await p(()=>import("./_t18s-dictionary_de_messages.7277f217.js"),[],import.meta.url)).default}};function L(e){return(t,n)=>{const o=e[t];if(o)return o[n]}}function B(e){return(t,n,o)=>{const a=e[t];a?a[n]=o:e[t]={[n]:o}}}function I(e){return new Promise(t=>setTimeout(t,e))}const y=h(null),F=y.set,G=e=>S.includes(e),_=h(!1);let K=T;const P=L(K),g={},O=L(g),D=B(g),$=async(e,t)=>{const n=P(e,t);if(!n)return;const o=await n();D(e,t,o),m.set(d)},j=new Set([v]);async function A(e){const t=[...j],n=[e];n.push(E);const o=[];for(const s of n)for(const r of t){const i=P(s,r);i&&o.push(new Promise((l,c)=>{i().then(u=>l({locale:s,domain:r,dictionary:u})).catch(c)}))}const a=await Promise.allSettled(o);for(const s of a){if(s.status==="rejected")continue;const{locale:r,domain:i,dictionary:l}=s.value;D(r,i,l)}}async function N(e){let t=!1;try{I(C).then(()=>{t||_.set(!0)}),await A(e)}catch{}finally{_.set(!1),t=!0}}function U(e){const[t,n]=e.split(":");if(!t)throw new Error("[t18s] Invalid key: "+e);return n?{domain:t,key:n}:{domain:v,key:t}}const d=(e,t=void 0)=>{const n=b(y);if(n===null)throw new Error("[t18s] No locale set. Did you forget to set one in `+layout.js`?");const{domain:o,key:a}=U(e),s=[n];s.push(E);let r;for(const i of s){const l=O(i,o);if(l){if(r=V(l,a,t),r)break}else $(i,o)}return r||e},m=h(d);y.subscribe(e=>{e!==null&&(e in g?m.set(d):N(e).then(()=>m.set(d)))});function V(e,t,n){const o=e[t];if(o)return typeof o=="string"?o:o(n)}export{p as _,G as i,S as l,A as p,F as s};