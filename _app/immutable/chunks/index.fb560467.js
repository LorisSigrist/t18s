function $(){}const K=t=>t;function dt(t,e){for(const n in e)t[n]=e[n];return t}function Q(t){return t()}function G(){return Object.create(null)}function E(t){t.forEach(Q)}function S(t){return typeof t=="function"}function zt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let j;function Bt(t,e){return j||(j=document.createElement("a")),j.href=e,t===j.href}function ht(t){return Object.keys(t).length===0}function U(t,...e){if(t==null)return $;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Ht(t){let e;return U(t,n=>e=n)(),e}function Lt(t,e,n){t.$$.on_destroy.push(U(e,n))}function Ft(t,e,n,i){if(t){const r=V(t,e,n,i);return t[0](r)}}function V(t,e,n,i){return t[1]&&i?dt(n.ctx.slice(),t[1](i(e))):n.ctx}function Wt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const c=[],s=Math.max(e.dirty.length,r.length);for(let u=0;u<s;u+=1)c[u]=e.dirty[u]|r[u];return c}return e.dirty|r}return e.dirty}function Gt(t,e,n,i,r,c){if(r){const s=V(e,n,i,c);t.p(s,r)}}function It(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Jt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Kt(t){return t&&S(t.destroy)?t.destroy:$}const X=typeof window<"u";let Y=X?()=>window.performance.now():()=>Date.now(),L=X?t=>requestAnimationFrame(t):$;const w=new Set;function Z(t){w.forEach(e=>{e.c(t)||(w.delete(e),e.f())}),w.size!==0&&L(Z)}function tt(t){let e;return w.size===0&&L(Z),{promise:new Promise(n=>{w.add(e={c:t,f:n})}),abort(){w.delete(e)}}}let P=!1;function mt(){P=!0}function pt(){P=!1}function yt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function gt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let l=0;l<e.length;l++){const f=e[l];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const l=e[o].claim_order,f=(r>0&&e[n[r]].claim_order<=l?r+1:yt(1,r,_=>e[n[_]].claim_order,l))-1;i[o]=n[f]+1;const a=f+1;n[a]=o,r=Math.max(a,r)}const c=[],s=[];let u=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);u>=o;u--)s.push(e[u]);u--}for(;u>=0;u--)s.push(e[u]);c.reverse(),s.sort((o,l)=>o.claim_order-l.claim_order);for(let o=0,l=0;o<s.length;o++){for(;l<c.length&&s[o].claim_order>=c[l].claim_order;)l++;const f=l<c.length?c[l]:null;t.insertBefore(s[o],f)}}function $t(t,e){t.appendChild(e)}function et(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function xt(t){const e=it("style");return bt(et(t),e),e.sheet}function bt(t,e){return $t(t.head||t,e),e.sheet}function wt(t,e){if(P){for(gt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Qt(t,e,n){P&&!n?wt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function nt(t){t.parentNode&&t.parentNode.removeChild(t)}function Ut(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function it(t){return document.createElement(t)}function vt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function F(t){return document.createTextNode(t)}function Vt(){return F(" ")}function Xt(){return F("")}function Yt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Et(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Zt(t,e){for(const n in e)Et(t,n,e[n])}function kt(t){return Array.from(t.childNodes)}function Nt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function rt(t,e,n,i,r=!1){Nt(t);const c=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const u=t[s];if(e(u)){const o=n(u);return o===void 0?t.splice(s,1):t[s]=o,r||(t.claim_info.last_index=s),u}}for(let s=t.claim_info.last_index-1;s>=0;s--){const u=t[s];if(e(u)){const o=n(u);return o===void 0?t.splice(s,1):t[s]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,u}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function st(t,e,n,i){return rt(t,r=>r.nodeName===e,r=>{const c=[];for(let s=0;s<r.attributes.length;s++){const u=r.attributes[s];n[u.name]||c.push(u.name)}c.forEach(s=>r.removeAttribute(s))},()=>i(e))}function te(t,e,n){return st(t,e,n,it)}function ee(t,e,n){return st(t,e,n,vt)}function At(t,e){return rt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>F(e),!0)}function ne(t){return At(t," ")}function ie(t,e){e=""+e,t.data!==e&&(t.data=e)}function re(t,e){t.value=e??""}function se(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Ct(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function oe(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const c=r.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(r)):c===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function ce(t,e){return new t(e)}const M=new Map;let O=0;function St(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function jt(t,e){const n={stylesheet:xt(e),rules:{}};return M.set(t,n),n}function ot(t,e,n,i,r,c,s,u=0){const o=16.666/i;let l=`{
`;for(let m=0;m<=1;m+=o){const p=e+(n-e)*c(m);l+=m*100+`%{${s(p,1-p)}}
`}const f=l+`100% {${s(n,1-n)}}
}`,a=`__svelte_${St(f)}_${u}`,_=et(t),{stylesheet:d,rules:h}=M.get(_)||jt(_,t);h[a]||(h[a]=!0,d.insertRule(`@keyframes ${a} ${f}`,d.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${a} ${i}ms linear ${r}ms 1 both`,O+=1,a}function B(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),O-=r,O||Dt())}function Dt(){L(()=>{O||(M.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&nt(e)}),M.clear())})}let A;function N(t){A=t}function R(){if(!A)throw new Error("Function called outside component initialization");return A}function ue(t){R().$$.on_mount.push(t)}function le(t){R().$$.after_update.push(t)}function ae(t,e){return R().$$.context.set(t,e),e}function fe(t){return R().$$.context.get(t)}function _e(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const b=[],I=[];let v=[];const J=[],ct=Promise.resolve();let H=!1;function ut(){H||(H=!0,ct.then(lt))}function de(){return ut(),ct}function C(t){v.push(t)}const z=new Set;let x=0;function lt(){if(x!==0)return;const t=A;do{try{for(;x<b.length;){const e=b[x];x++,N(e),Mt(e.$$)}}catch(e){throw b.length=0,x=0,e}for(N(null),b.length=0,x=0;I.length;)I.pop()();for(let e=0;e<v.length;e+=1){const n=v[e];z.has(n)||(z.add(n),n())}v.length=0}while(b.length);for(;J.length;)J.pop()();H=!1,z.clear(),N(t)}function Mt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}function Ot(t){const e=[],n=[];v.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),v=e}let k;function at(){return k||(k=Promise.resolve(),k.then(()=>{k=null})),k}function T(t,e,n){t.dispatchEvent(Ct(`${e?"intro":"outro"}${n}`))}const D=new Set;let g;function he(){g={r:0,c:[],p:g}}function me(){g.r||E(g.c),g=g.p}function Tt(t,e){t&&t.i&&(D.delete(t),t.i(e))}function pe(t,e,n,i){if(t&&t.o){if(D.has(t))return;D.add(t),g.c.push(()=>{D.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const ft={duration:0};function ye(t,e,n){const i={direction:"in"};let r=e(t,n,i),c=!1,s,u,o=0;function l(){s&&B(t,s)}function f(){const{delay:_=0,duration:d=300,easing:h=K,tick:y=$,css:m}=r||ft;m&&(s=ot(t,0,1,d,_,h,m,o++)),y(0,1);const p=Y()+_,_t=p+d;u&&u.abort(),c=!0,C(()=>T(t,!0,"start")),u=tt(q=>{if(c){if(q>=_t)return y(1,0),T(t,!0,"end"),l(),c=!1;if(q>=p){const W=h((q-p)/d);y(W,1-W)}}return c})}let a=!1;return{start(){a||(a=!0,B(t),S(r)?(r=r(i),at().then(f)):f())},invalidate(){a=!1},end(){c&&(l(),c=!1)}}}function ge(t,e,n){const i={direction:"out"};let r=e(t,n,i),c=!0,s;const u=g;u.r+=1;function o(){const{delay:l=0,duration:f=300,easing:a=K,tick:_=$,css:d}=r||ft;d&&(s=ot(t,1,0,f,l,a,d));const h=Y()+l,y=h+f;C(()=>T(t,!1,"start")),tt(m=>{if(c){if(m>=y)return _(0,1),T(t,!1,"end"),--u.r||E(u.c),!1;if(m>=h){const p=a((m-h)/f);_(1-p,p)}}return c})}return S(r)?at().then(()=>{r=r(i),o()}):o(),{end(l){l&&r.tick&&r.tick(1,0),c&&(s&&B(t,s),c=!1)}}}function $e(t,e){const n={},i={},r={$$scope:1};let c=t.length;for(;c--;){const s=t[c],u=e[c];if(u){for(const o in s)o in u||(i[o]=1);for(const o in u)r[o]||(n[o]=u[o],r[o]=1);t[c]=u}else for(const o in s)r[o]=1}for(const s in i)s in n||(n[s]=void 0);return n}function xe(t){t&&t.c()}function be(t,e){t&&t.l(e)}function Pt(t,e,n,i){const{fragment:r,after_update:c}=t.$$;r&&r.m(e,n),i||C(()=>{const s=t.$$.on_mount.map(Q).filter(S);t.$$.on_destroy?t.$$.on_destroy.push(...s):E(s),t.$$.on_mount=[]}),c.forEach(C)}function Rt(t,e){const n=t.$$;n.fragment!==null&&(Ot(n.after_update),E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function qt(t,e){t.$$.dirty[0]===-1&&(b.push(t),ut(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function we(t,e,n,i,r,c,s,u=[-1]){const o=A;N(t);const l=t.$$={fragment:null,ctx:[],props:c,update:$,not_equal:r,bound:G(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:G(),dirty:u,skip_bound:!1,root:e.target||o.$$.root};s&&s(l.root);let f=!1;if(l.ctx=n?n(t,e.props||{},(a,_,...d)=>{const h=d.length?d[0]:_;return l.ctx&&r(l.ctx[a],l.ctx[a]=h)&&(!l.skip_bound&&l.bound[a]&&l.bound[a](h),f&&qt(t,a)),_}):[],l.update(),f=!0,E(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){mt();const a=kt(e.target);l.fragment&&l.fragment.l(a),a.forEach(nt)}else l.fragment&&l.fragment.c();e.intro&&Tt(t.$$.fragment),Pt(t,e.target,e.anchor,e.customElement),pt(),lt()}N(o)}class ve{$destroy(){Rt(this,1),this.$destroy=$}$on(e,n){if(!S(n))return $;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!ht(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{ge as $,Pt as A,Rt as B,oe as C,wt as D,$ as E,Lt as F,Ut as G,Ht as H,Ft as I,Gt as J,It as K,Wt as L,dt as M,vt as N,ee as O,Zt as P,$e as Q,Jt as R,ve as S,Bt as T,Yt as U,Kt as V,S as W,E as X,re as Y,C as Z,ye as _,Vt as a,fe as a0,_e as a1,ae as a2,Qt as b,ne as c,pe as d,Xt as e,me as f,Tt as g,nt as h,we as i,le as j,it as k,te as l,kt as m,Et as n,ue as o,se as p,F as q,At as r,zt as s,de as t,ie as u,he as v,I as w,ce as x,xe as y,be as z};
