import{S as C,i as T,s as N,k as b,a as I,l as g,m as p,c as P,h as c,n as u,b as m,D as $,E as U,_ as j,F as G,q as D,r as V,u as O,G as pe,U as he,M as X,N as _e,O as me,P as x,Q as be,R as ee,y as A,z as B,A as H,g as d,d as _,B as S,$ as ge,I as q,J as L,K as R,L as F,w as ve,e as M,v as J,f as K,a0 as W}from"./index.54710c39.js";import{m as z}from"./class-merge.a51d4999.js";import{w as te}from"./index.bb9e4fdf.js";function ne(i,e,s){const t=i.slice();t[6]=e[s],t[9]=s;const n=t[9]===t[2];return t[7]=n,t}function le(i){let e,s;return{c(){e=b("h3"),s=D(i[0]),this.h()},l(t){e=g(t,"H3",{class:!0});var n=p(e);s=V(n,i[0]),n.forEach(c),this.h()},h(){u(e,"class","mr-auto py-3 text-xs font-semibold text-white")},m(t,n){m(t,e,n),$(e,s)},p(t,n){n&1&&O(s,t[0])},d(t){t&&c(e)}}}function se(i){let e,s=i[1],t=[];for(let n=0;n<s.length;n+=1)t[n]=ie(ne(i,s,n));return{c(){e=b("div");for(let n=0;n<t.length;n+=1)t[n].c();this.h()},l(n){e=g(n,"DIV",{role:!0,"aria-orientation":!0,class:!0});var l=p(e);for(let a=0;a<t.length;a+=1)t[a].l(l);l.forEach(c),this.h()},h(){u(e,"role","tablist"),u(e,"aria-orientation","horizontal"),u(e,"class","-mb-px flex gap-4 text-xs font-medium")},m(n,l){m(n,e,l);for(let a=0;a<t.length;a+=1)t[a]&&t[a].m(e,null)},p(n,l){if(l&22){s=n[1];let a;for(a=0;a<s.length;a+=1){const r=ne(n,s,a);t[a]?t[a].p(r,l):(t[a]=ie(r),t[a].c(),t[a].m(e,null))}for(;a<t.length;a+=1)t[a].d(1);t.length=s.length}},d(n){n&&c(e),pe(t,n)}}}function ie(i){let e,s=i[6]+"",t,n,l,a;function r(){return i[5](i[9])}return{c(){e=b("button"),t=D(s),this.h()},l(o){e=g(o,"BUTTON",{role:!0,class:!0});var f=p(e);t=V(f,s),f.forEach(c),this.h()},h(){u(e,"role","tab"),u(e,"class",n=z("border-b py-3 transition ui-not-focus-visible:outline-none",i[7]?"border-orange-500 text-orange-400":"border-transparent text-zinc-400 hover:text-zinc-300"))},m(o,f){m(o,e,f),$(e,t),l||(a=he(e,"click",r),l=!0)},p(o,f){i=o,f&2&&s!==(s=i[6]+"")&&O(t,s),f&4&&n!==(n=z("border-b py-3 transition ui-not-focus-visible:outline-none",i[7]?"border-orange-500 text-orange-400":"border-transparent text-zinc-400 hover:text-zinc-300"))&&u(e,"class",n)},d(o){o&&c(e),l=!1,a()}}}function ke(i){let e,s,t=i[0]&&le(i),n=i[1].length>1&&se(i);return{c(){e=b("div"),t&&t.c(),s=I(),n&&n.c(),this.h()},l(l){e=g(l,"DIV",{class:!0});var a=p(e);t&&t.l(a),s=P(a),n&&n.l(a),a.forEach(c),this.h()},h(){u(e,"class","flex flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent")},m(l,a){m(l,e,a),t&&t.m(e,null),$(e,s),n&&n.m(e,null)},p(l,[a]){l[0]?t?t.p(l,a):(t=le(l),t.c(),t.m(e,s)):t&&(t.d(1),t=null),l[1].length>1?n?n.p(l,a):(n=se(l),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},i:U,o:U,d(l){l&&c(e),t&&t.d(),n&&n.d()}}}function $e(i,e,s){let t,n,{title:l=null}=e;const a=j("code-group-tabs");G(i,a,f=>s(1,t=f));const r=j("code-group-active-tab");G(i,r,f=>s(2,n=f));const o=f=>r.set(f);return i.$$set=f=>{"title"in f&&s(0,l=f.title)},[l,t,n,a,r,o]}class we extends C{constructor(e){super(),T(this,e,$e,ke,N,{title:0})}}function ye(i){let e,s='<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184c1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/>',t=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},i[0]],n={};for(let l=0;l<t.length;l+=1)n=X(n,t[l]);return{c(){e=_e("svg"),this.h()},l(l){e=me(l,"svg",{viewBox:!0,width:!0,height:!0});var a=p(e);a.forEach(c),this.h()},h(){x(e,n)},m(l,a){m(l,e,a),e.innerHTML=s},p(l,[a]){x(e,n=be(t,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},a&1&&l[0]]))},i:U,o:U,d(l){l&&c(e)}}}function Ee(i,e,s){return i.$$set=t=>{s(0,e=X(X({},e),ee(t)))},e=ee(e),[e]}class ze extends C{constructor(e){super(),T(this,e,Ee,ye,N,{})}}function Ce(i){let e,s,t,n,l,a,r,o,f,v,E,w,h,Y;return t=new ze({props:{className:"h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400"}}),{c(){e=b("button"),s=b("span"),A(t.$$.fragment),n=D(`
    Copy`),a=I(),r=b("span"),o=D("Copied!"),this.h()},l(k){e=g(k,"BUTTON",{class:!0});var y=p(e);s=g(y,"SPAN",{"aria-hidden":!0,class:!0});var Q=p(s);B(t.$$.fragment,Q),n=V(Q,`
    Copy`),Q.forEach(c),a=P(y),r=g(y,"SPAN",{"aria-hidden":!0,class:!0});var Z=p(r);o=V(Z,"Copied!"),Z.forEach(c),y.forEach(c),this.h()},h(){u(s,"aria-hidden",i[0]),u(s,"class",l=z("pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300",i[0]&&"translate-y-1.5 opacity-0")),u(r,"aria-hidden",f=!i[0]),u(r,"class",v=z("pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300",!i[0]&&"-translate-y-1.5 opacity-0")),u(e,"class",E=z("group/button text-sm absolute right-4 top-2.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100",i[0]?"bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20":"bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5"))},m(k,y){m(k,e,y),$(e,s),H(t,s,null),$(s,n),$(e,a),$(e,r),$(r,o),w=!0,h||(Y=he(e,"click",i[1]),h=!0)},p(k,[y]){(!w||y&1)&&u(s,"aria-hidden",k[0]),(!w||y&1&&l!==(l=z("pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300",k[0]&&"translate-y-1.5 opacity-0")))&&u(s,"class",l),(!w||y&1&&f!==(f=!k[0]))&&u(r,"aria-hidden",f),(!w||y&1&&v!==(v=z("pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300",!k[0]&&"-translate-y-1.5 opacity-0")))&&u(r,"class",v),(!w||y&1&&E!==(E=z("group/button text-sm absolute right-4 top-2.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100",k[0]?"bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20":"bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5")))&&u(e,"class",E)},i(k){w||(d(t.$$.fragment,k),w=!0)},o(k){_(t.$$.fragment,k),w=!1},d(k){k&&c(e),S(t),h=!1,Y()}}}function Te(i,e,s){let{copied:t=!1}=e;function n(l){ge.call(this,i,l)}return i.$$set=l=>{"copied"in l&&s(0,t=l.copied)},[t,n]}class Ne extends C{constructor(e){super(),T(this,e,Te,Ce,N,{copied:0})}}function Ie(i){let e,s,t,n,l;const a=i[4].default,r=q(a,i,i[3],null);return n=new Ne({props:{copied:i[1]}}),n.$on("click",i[2]),{c(){e=b("div"),s=b("pre"),r&&r.c(),t=I(),A(n.$$.fragment),this.h()},l(o){e=g(o,"DIV",{class:!0});var f=p(e);s=g(f,"PRE",{class:!0});var v=p(s);r&&r.l(v),v.forEach(c),t=P(f),B(n.$$.fragment,f),f.forEach(c),this.h()},h(){u(s,"class","overflow-x-auto p-4 text-xs text-white"),u(e,"class","relative")},m(o,f){m(o,e,f),$(e,s),r&&r.m(s,null),i[5](s),$(e,t),H(n,e,null),l=!0},p(o,[f]){r&&r.p&&(!l||f&8)&&L(r,a,o,o[3],l?F(a,o[3],f,null):R(o[3]),null);const v={};f&2&&(v.copied=o[1]),n.$set(v)},i(o){l||(d(r,o),d(n.$$.fragment,o),l=!0)},o(o){_(r,o),_(n.$$.fragment,o),l=!1},d(o){o&&c(e),r&&r.d(o),i[5](null),S(n)}}}function Pe(i,e,s){let{$$slots:t={},$$scope:n}=e,l,a=!1;function r(){s(1,a=!0),navigator.clipboard.writeText(l.innerText),setTimeout(()=>{s(1,a=!1)},1e3)}function o(f){ve[f?"unshift":"push"](()=>{l=f,s(0,l)})}return i.$$set=f=>{"$$scope"in f&&s(3,n=f.$$scope)},[l,a,r,n,t,o]}class De extends C{constructor(e){super(),T(this,e,Pe,Ie,N,{})}}function Ve(i){let e,s;const t=i[1].default,n=q(t,i,i[0],null);return{c(){e=b("span"),n&&n.c(),this.h()},l(l){e=g(l,"SPAN",{class:!0});var a=p(e);n&&n.l(a),a.forEach(c),this.h()},h(){u(e,"class","font-mono text-[0.625rem] font-semibold leading-6 text-emerald-500 dark:text-emerald-400")},m(l,a){m(l,e,a),n&&n.m(e,null),s=!0},p(l,[a]){n&&n.p&&(!s||a&1)&&L(n,t,l,l[0],s?F(t,l[0],a,null):R(l[0]),null)},i(l){s||(d(n,l),s=!0)},o(l){_(n,l),s=!1},d(l){l&&c(e),n&&n.d(l)}}}function Ae(i,e,s){let{$$slots:t={},$$scope:n}=e;return i.$$set=l=>{"$$scope"in l&&s(0,n=l.$$scope)},[n,t]}class Be extends C{constructor(e){super(),T(this,e,Ae,Ve,N,{})}}function ae(i){let e,s,t,n,l=i[0]&&re(i),a=i[0]&&i[1]&&oe(),r=i[1]&&fe(i);return{c(){e=b("div"),l&&l.c(),s=I(),a&&a.c(),t=I(),r&&r.c(),this.h()},l(o){e=g(o,"DIV",{class:!0});var f=p(e);l&&l.l(f),s=P(f),a&&a.l(f),t=P(f),r&&r.l(f),f.forEach(c),this.h()},h(){u(e,"class","flex h-9 items-center gap-2 border-y border-t-transparent bg-zinc-900 px-4 border-b-white/5 bg-white/1")},m(o,f){m(o,e,f),l&&l.m(e,null),$(e,s),a&&a.m(e,null),$(e,t),r&&r.m(e,null),n=!0},p(o,f){o[0]?l?(l.p(o,f),f&1&&d(l,1)):(l=re(o),l.c(),d(l,1),l.m(e,s)):l&&(J(),_(l,1,1,()=>{l=null}),K()),o[0]&&o[1]?a||(a=oe(),a.c(),a.m(e,t)):a&&(a.d(1),a=null),o[1]?r?r.p(o,f):(r=fe(o),r.c(),r.m(e,null)):r&&(r.d(1),r=null)},i(o){n||(d(l),n=!0)},o(o){_(l),n=!1},d(o){o&&c(e),l&&l.d(),a&&a.d(),r&&r.d()}}}function re(i){let e,s,t;return s=new Be({props:{$$slots:{default:[He]},$$scope:{ctx:i}}}),{c(){e=b("div"),A(s.$$.fragment),this.h()},l(n){e=g(n,"DIV",{class:!0});var l=p(e);B(s.$$.fragment,l),l.forEach(c),this.h()},h(){u(e,"class","dark flex")},m(n,l){m(n,e,l),H(s,e,null),t=!0},p(n,l){const a={};l&5&&(a.$$scope={dirty:l,ctx:n}),s.$set(a)},i(n){t||(d(s.$$.fragment,n),t=!0)},o(n){_(s.$$.fragment,n),t=!1},d(n){n&&c(e),S(s)}}}function He(i){let e;return{c(){e=D(i[0])},l(s){e=V(s,i[0])},m(s,t){m(s,e,t)},p(s,t){t&1&&O(e,s[0])},d(s){s&&c(e)}}}function oe(i){let e;return{c(){e=b("span"),this.h()},l(s){e=g(s,"SPAN",{class:!0}),p(e).forEach(c),this.h()},h(){u(e,"class","h-0.5 w-0.5 rounded-full bg-zinc-500")},m(s,t){m(s,e,t)},d(s){s&&c(e)}}}function fe(i){let e,s;return{c(){e=b("span"),s=D(i[1]),this.h()},l(t){e=g(t,"SPAN",{class:!0});var n=p(e);s=V(n,i[1]),n.forEach(c),this.h()},h(){u(e,"class","font-mono text-xs text-zinc-400")},m(t,n){m(t,e,n),$(e,s)},p(t,n){n&2&&O(s,t[1])},d(t){t&&c(e)}}}function Se(i){let e,s,t=(i[0]||i[1])&&ae(i);return{c(){t&&t.c(),e=M()},l(n){t&&t.l(n),e=M()},m(n,l){t&&t.m(n,l),m(n,e,l),s=!0},p(n,[l]){n[0]||n[1]?t?(t.p(n,l),l&3&&d(t,1)):(t=ae(n),t.c(),d(t,1),t.m(e.parentNode,e)):t&&(J(),_(t,1,1,()=>{t=null}),K())},i(n){s||(d(t),s=!0)},o(n){_(t),s=!1},d(n){t&&t.d(n),n&&c(e)}}}function Ue(i,e,s){let{tag:t=null}=e,{label:n=null}=e;return i.$$set=l=>{"tag"in l&&s(0,t=l.tag),"label"in l&&s(1,n=l.label)},[t,n]}class je extends C{constructor(e){super(),T(this,e,Ue,Se,N,{tag:0,label:1})}}function ce(i){let e,s,t,n,l=(i[0]||i[1])&&ue(i);return t=new De({props:{$$slots:{default:[Ge]},$$scope:{ctx:i}}}),{c(){e=b("div"),l&&l.c(),s=I(),A(t.$$.fragment),this.h()},l(a){e=g(a,"DIV",{class:!0});var r=p(e);l&&l.l(r),s=P(r),B(t.$$.fragment,r),r.forEach(c),this.h()},h(){u(e,"class","group dark:bg-white/2.5")},m(a,r){m(a,e,r),l&&l.m(e,null),$(e,s),H(t,e,null),n=!0},p(a,r){a[0]||a[1]?l?(l.p(a,r),r&3&&d(l,1)):(l=ue(a),l.c(),d(l,1),l.m(e,s)):l&&(J(),_(l,1,1,()=>{l=null}),K());const o={};r&512&&(o.$$scope={dirty:r,ctx:a}),t.$set(o)},i(a){n||(d(l),d(t.$$.fragment,a),n=!0)},o(a){_(l),_(t.$$.fragment,a),n=!1},d(a){a&&c(e),l&&l.d(),S(t)}}}function ue(i){let e,s;return e=new je({props:{tag:i[1],label:i[0]}}),{c(){A(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,n){H(e,t,n),s=!0},p(t,n){const l={};n&2&&(l.tag=t[1]),n&1&&(l.label=t[0]),e.$set(l)},i(t){s||(d(e.$$.fragment,t),s=!0)},o(t){_(e.$$.fragment,t),s=!1},d(t){S(e,t)}}}function Ge(i){let e;const s=i[8].default,t=q(s,i,i[9],null);return{c(){t&&t.c()},l(n){t&&t.l(n)},m(n,l){t&&t.m(n,l),e=!0},p(n,l){t&&t.p&&(!e||l&512)&&L(t,s,n,n[9],e?F(s,n[9],l,null):R(n[9]),null)},i(n){e||(d(t,n),e=!0)},o(n){_(t,n),e=!1},d(n){t&&t.d(n)}}}function Me(i){let e,s,t=i[2]&&ce(i);return{c(){t&&t.c(),e=M()},l(n){t&&t.l(n),e=M()},m(n,l){t&&t.m(n,l),m(n,e,l),s=!0},p(n,[l]){n[2]?t?(t.p(n,l),l&4&&d(t,1)):(t=ce(n),t.c(),d(t,1),t.m(e.parentNode,e)):t&&(J(),_(t,1,1,()=>{t=null}),K())},i(n){s||(d(t),s=!0)},o(n){_(t),s=!1},d(n){t&&t.d(n),n&&c(e)}}}function Oe(i,e,s){let t,n,l,{$$slots:a={},$$scope:r}=e,{label:o=null}=e,{tag:f=null}=e,{name:v="default"}=e;const E=j("code-group-tabs");G(i,E,h=>s(7,l=h));const w=j("code-group-active-tab");return G(i,w,h=>s(6,n=h)),E.update(h=>[...h,v]),i.$$set=h=>{"label"in h&&s(0,o=h.label),"tag"in h&&s(1,f=h.tag),"name"in h&&s(5,v=h.name),"$$scope"in h&&s(9,r=h.$$scope)},i.$$.update=()=>{i.$$.dirty&224&&s(2,t=l.findIndex(h=>h===v)===n)},[o,f,t,E,w,v,n,l,a,r]}class qe extends C{constructor(e){super(),T(this,e,Oe,Me,N,{label:0,tag:1,name:5})}}const Le=i=>({}),de=i=>({Header:we,Tab:qe});function Re(i){let e,s;const t=i[1].default,n=q(t,i,i[0],de);return{c(){e=b("div"),n&&n.c(),this.h()},l(l){e=g(l,"DIV",{class:!0});var a=p(e);n&&n.l(a),a.forEach(c),this.h()},h(){u(e,"class","shadow-md my-6 overflow-hidden rounded-md bg-zinc-900 dark:ring-1 dark:ring-white/10 not-prose")},m(l,a){m(l,e,a),n&&n.m(e,null),s=!0},p(l,[a]){n&&n.p&&(!s||a&1)&&L(n,t,l,l[0],s?F(t,l[0],a,Le):R(l[0]),de)},i(l){s||(d(n,l),s=!0)},o(l){_(n,l),s=!1},d(l){l&&c(e),n&&n.d(l)}}}function Fe(i,e,s){let{$$slots:t={},$$scope:n}=e,l=te([]),a=te(0);return W("code-group-id",crypto.randomUUID()),W("code-group-tabs",l),W("code-group-active-tab",a),i.$$set=r=>{"$$scope"in r&&s(0,n=r.$$scope)},[n,t]}class We extends C{constructor(e){super(),T(this,e,Fe,Re,N,{})}}export{We as C};
