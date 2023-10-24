import{S as E,i as z,s as C,k as _,a as T,l as m,m as h,c as N,h as c,n as u,b as p,D as v,E as S,q as P,r as V,u as j,G as fe,U as oe,M as R,N as ce,O as ue,P as W,Q as de,R as X,y as A,z as B,A as D,g as d,d as b,B as I,a0 as he,I as G,J as M,K as O,L as U,w as _e,e as Y,v as J,f as K}from"./index.05797707.js";import{m as y}from"./class-merge.a51d4999.js";function Z(a,e,s){const n=a.slice();n[4]=e[s],n[7]=s;const t=n[7]===n[0];return n[5]=t,n}function x(a){let e,s;return{c(){e=_("h3"),s=P(a[1]),this.h()},l(n){e=m(n,"H3",{class:!0});var t=h(e);s=V(t,a[1]),t.forEach(c),this.h()},h(){u(e,"class","mr-auto py-3 text-xs font-semibold text-white")},m(n,t){p(n,e,t),v(e,s)},p(n,t){t&2&&j(s,n[1])},d(n){n&&c(e)}}}function ee(a){let e,s=a[2],n=[];for(let t=0;t<s.length;t+=1)n[t]=te(Z(a,s,t));return{c(){e=_("div");for(let t=0;t<n.length;t+=1)n[t].c();this.h()},l(t){e=m(t,"DIV",{role:!0,"aria-orientation":!0,class:!0});var l=h(e);for(let i=0;i<n.length;i+=1)n[i].l(l);l.forEach(c),this.h()},h(){u(e,"role","tablist"),u(e,"aria-orientation","horizontal"),u(e,"class","-mb-px flex gap-4 text-xs font-medium")},m(t,l){p(t,e,l);for(let i=0;i<n.length;i+=1)n[i]&&n[i].m(e,null)},p(t,l){if(l&5){s=t[2];let i;for(i=0;i<s.length;i+=1){const r=Z(t,s,i);n[i]?n[i].p(r,l):(n[i]=te(r),n[i].c(),n[i].m(e,null))}for(;i<n.length;i+=1)n[i].d(1);n.length=s.length}},d(t){t&&c(e),fe(n,t)}}}function te(a){let e,s=a[4]+"",n,t,l,i;function r(){return a[3](a[7])}return{c(){e=_("button"),n=P(s),this.h()},l(o){e=m(o,"BUTTON",{role:!0,class:!0});var f=h(e);n=V(f,s),f.forEach(c),this.h()},h(){u(e,"role","tab"),u(e,"class",t=y("border-b py-3 transition ui-not-focus-visible:outline-none",a[5]?"border-orange-500 text-orange-400":"border-transparent text-zinc-400 hover:text-zinc-300"))},m(o,f){p(o,e,f),v(e,n),l||(i=oe(e,"click",r),l=!0)},p(o,f){a=o,f&4&&s!==(s=a[4]+"")&&j(n,s),f&1&&t!==(t=y("border-b py-3 transition ui-not-focus-visible:outline-none",a[5]?"border-orange-500 text-orange-400":"border-transparent text-zinc-400 hover:text-zinc-300"))&&u(e,"class",t)},d(o){o&&c(e),l=!1,i()}}}function me(a){let e,s,n=a[1]&&x(a),t=a[2].length>0&&ee(a);return{c(){e=_("div"),n&&n.c(),s=T(),t&&t.c(),this.h()},l(l){e=m(l,"DIV",{class:!0});var i=h(e);n&&n.l(i),s=N(i),t&&t.l(i),i.forEach(c),this.h()},h(){u(e,"class","flex flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent")},m(l,i){p(l,e,i),n&&n.m(e,null),v(e,s),t&&t.m(e,null)},p(l,[i]){l[1]?n?n.p(l,i):(n=x(l),n.c(),n.m(e,s)):n&&(n.d(1),n=null),l[2].length>0?t?t.p(l,i):(t=ee(l),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:S,o:S,d(l){l&&c(e),n&&n.d(),t&&t.d()}}}function pe(a,e,s){let{title:n=null}=e,{tabs:t=[]}=e,{activeTab:l=0}=e;const i=r=>s(0,l=r);return a.$$set=r=>{"title"in r&&s(1,n=r.title),"tabs"in r&&s(2,t=r.tabs),"activeTab"in r&&s(0,l=r.activeTab)},[l,n,t,i]}class ge extends E{constructor(e){super(),z(this,e,pe,me,C,{title:1,tabs:2,activeTab:0})}}function be(a){let e,s='<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184c1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/>',n=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},a[0]],t={};for(let l=0;l<n.length;l+=1)t=R(t,n[l]);return{c(){e=ce("svg"),this.h()},l(l){e=ue(l,"svg",{viewBox:!0,width:!0,height:!0});var i=h(e);i.forEach(c),this.h()},h(){W(e,t)},m(l,i){p(l,e,i),e.innerHTML=s},p(l,[i]){W(e,t=de(n,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},i&1&&l[0]]))},i:S,o:S,d(l){l&&c(e)}}}function ve(a,e,s){return a.$$set=n=>{s(0,e=R(R({},e),X(n)))},e=X(e),[e]}class $e extends E{constructor(e){super(),z(this,e,ve,be,C,{})}}function ke(a){let e,s,n,t,l,i,r,o,f,k,H,w,q,Q;return n=new $e({props:{className:"h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400"}}),{c(){e=_("button"),s=_("span"),A(n.$$.fragment),t=P(`
    Copy`),i=T(),r=_("span"),o=P("Copied!"),this.h()},l(g){e=m(g,"BUTTON",{class:!0});var $=h(e);s=m($,"SPAN",{"aria-hidden":!0,class:!0});var L=h(s);B(n.$$.fragment,L),t=V(L,`
    Copy`),L.forEach(c),i=N($),r=m($,"SPAN",{"aria-hidden":!0,class:!0});var F=h(r);o=V(F,"Copied!"),F.forEach(c),$.forEach(c),this.h()},h(){u(s,"aria-hidden",a[0]),u(s,"class",l=y("pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300",a[0]&&"translate-y-1.5 opacity-0")),u(r,"aria-hidden",f=!a[0]),u(r,"class",k=y("pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300",!a[0]&&"-translate-y-1.5 opacity-0")),u(e,"class",H=y("group/button text-sm absolute right-4 top-2.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100",a[0]?"bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20":"bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5"))},m(g,$){p(g,e,$),v(e,s),D(n,s,null),v(s,t),v(e,i),v(e,r),v(r,o),w=!0,q||(Q=oe(e,"click",a[1]),q=!0)},p(g,[$]){(!w||$&1)&&u(s,"aria-hidden",g[0]),(!w||$&1&&l!==(l=y("pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300",g[0]&&"translate-y-1.5 opacity-0")))&&u(s,"class",l),(!w||$&1&&f!==(f=!g[0]))&&u(r,"aria-hidden",f),(!w||$&1&&k!==(k=y("pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300",!g[0]&&"-translate-y-1.5 opacity-0")))&&u(r,"class",k),(!w||$&1&&H!==(H=y("group/button text-sm absolute right-4 top-2.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100",g[0]?"bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20":"bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5")))&&u(e,"class",H)},i(g){w||(d(n.$$.fragment,g),w=!0)},o(g){b(n.$$.fragment,g),w=!1},d(g){g&&c(e),I(n),q=!1,Q()}}}function we(a,e,s){let{copied:n=!1}=e;function t(l){he.call(this,a,l)}return a.$$set=l=>{"copied"in l&&s(0,n=l.copied)},[n,t]}class ye extends E{constructor(e){super(),z(this,e,we,ke,C,{copied:0})}}function Ee(a){let e,s,n,t,l;const i=a[4].default,r=G(i,a,a[3],null);return t=new ye({props:{copied:a[1]}}),t.$on("click",a[2]),{c(){e=_("div"),s=_("pre"),r&&r.c(),n=T(),A(t.$$.fragment),this.h()},l(o){e=m(o,"DIV",{class:!0});var f=h(e);s=m(f,"PRE",{class:!0});var k=h(s);r&&r.l(k),k.forEach(c),n=N(f),B(t.$$.fragment,f),f.forEach(c),this.h()},h(){u(s,"class","overflow-x-auto p-4 text-xs text-white"),u(e,"class","relative")},m(o,f){p(o,e,f),v(e,s),r&&r.m(s,null),a[5](s),v(e,n),D(t,e,null),l=!0},p(o,[f]){r&&r.p&&(!l||f&8)&&M(r,i,o,o[3],l?U(i,o[3],f,null):O(o[3]),null);const k={};f&2&&(k.copied=o[1]),t.$set(k)},i(o){l||(d(r,o),d(t.$$.fragment,o),l=!0)},o(o){b(r,o),b(t.$$.fragment,o),l=!1},d(o){o&&c(e),r&&r.d(o),a[5](null),I(t)}}}function ze(a,e,s){let{$$slots:n={},$$scope:t}=e,l,i=!1;function r(){s(1,i=!0),navigator.clipboard.writeText(l.innerText),setTimeout(()=>{s(1,i=!1)},1e3)}function o(f){_e[f?"unshift":"push"](()=>{l=f,s(0,l)})}return a.$$set=f=>{"$$scope"in f&&s(3,t=f.$$scope)},[l,i,r,t,n,o]}class Ce extends E{constructor(e){super(),z(this,e,ze,Ee,C,{})}}function Te(a){let e,s;const n=a[1].default,t=G(n,a,a[0],null);return{c(){e=_("span"),t&&t.c(),this.h()},l(l){e=m(l,"SPAN",{class:!0});var i=h(e);t&&t.l(i),i.forEach(c),this.h()},h(){u(e,"class","font-mono text-[0.625rem] font-semibold leading-6 text-emerald-500 dark:text-emerald-400")},m(l,i){p(l,e,i),t&&t.m(e,null),s=!0},p(l,[i]){t&&t.p&&(!s||i&1)&&M(t,n,l,l[0],s?U(n,l[0],i,null):O(l[0]),null)},i(l){s||(d(t,l),s=!0)},o(l){b(t,l),s=!1},d(l){l&&c(e),t&&t.d(l)}}}function Ne(a,e,s){let{$$slots:n={},$$scope:t}=e;return a.$$set=l=>{"$$scope"in l&&s(0,t=l.$$scope)},[t,n]}class Pe extends E{constructor(e){super(),z(this,e,Ne,Te,C,{})}}function ne(a){let e,s,n,t,l=a[0]&&le(a),i=a[0]&&a[1]&&se(),r=a[1]&&ie(a);return{c(){e=_("div"),l&&l.c(),s=T(),i&&i.c(),n=T(),r&&r.c(),this.h()},l(o){e=m(o,"DIV",{class:!0});var f=h(e);l&&l.l(f),s=N(f),i&&i.l(f),n=N(f),r&&r.l(f),f.forEach(c),this.h()},h(){u(e,"class","flex h-9 items-center gap-2 border-y border-t-transparent bg-zinc-900 px-4 border-b-white/5 bg-white/1")},m(o,f){p(o,e,f),l&&l.m(e,null),v(e,s),i&&i.m(e,null),v(e,n),r&&r.m(e,null),t=!0},p(o,f){o[0]?l?(l.p(o,f),f&1&&d(l,1)):(l=le(o),l.c(),d(l,1),l.m(e,s)):l&&(J(),b(l,1,1,()=>{l=null}),K()),o[0]&&o[1]?i||(i=se(),i.c(),i.m(e,n)):i&&(i.d(1),i=null),o[1]?r?r.p(o,f):(r=ie(o),r.c(),r.m(e,null)):r&&(r.d(1),r=null)},i(o){t||(d(l),t=!0)},o(o){b(l),t=!1},d(o){o&&c(e),l&&l.d(),i&&i.d(),r&&r.d()}}}function le(a){let e,s,n;return s=new Pe({props:{$$slots:{default:[Ve]},$$scope:{ctx:a}}}),{c(){e=_("div"),A(s.$$.fragment),this.h()},l(t){e=m(t,"DIV",{class:!0});var l=h(e);B(s.$$.fragment,l),l.forEach(c),this.h()},h(){u(e,"class","dark flex")},m(t,l){p(t,e,l),D(s,e,null),n=!0},p(t,l){const i={};l&5&&(i.$$scope={dirty:l,ctx:t}),s.$set(i)},i(t){n||(d(s.$$.fragment,t),n=!0)},o(t){b(s.$$.fragment,t),n=!1},d(t){t&&c(e),I(s)}}}function Ve(a){let e;return{c(){e=P(a[0])},l(s){e=V(s,a[0])},m(s,n){p(s,e,n)},p(s,n){n&1&&j(e,s[0])},d(s){s&&c(e)}}}function se(a){let e;return{c(){e=_("span"),this.h()},l(s){e=m(s,"SPAN",{class:!0}),h(e).forEach(c),this.h()},h(){u(e,"class","h-0.5 w-0.5 rounded-full bg-zinc-500")},m(s,n){p(s,e,n)},d(s){s&&c(e)}}}function ie(a){let e,s;return{c(){e=_("span"),s=P(a[1]),this.h()},l(n){e=m(n,"SPAN",{class:!0});var t=h(e);s=V(t,a[1]),t.forEach(c),this.h()},h(){u(e,"class","font-mono text-xs text-zinc-400")},m(n,t){p(n,e,t),v(e,s)},p(n,t){t&2&&j(s,n[1])},d(n){n&&c(e)}}}function Ae(a){let e,s,n=(a[0]||a[1])&&ne(a);return{c(){n&&n.c(),e=Y()},l(t){n&&n.l(t),e=Y()},m(t,l){n&&n.m(t,l),p(t,e,l),s=!0},p(t,[l]){t[0]||t[1]?n?(n.p(t,l),l&3&&d(n,1)):(n=ne(t),n.c(),d(n,1),n.m(e.parentNode,e)):n&&(J(),b(n,1,1,()=>{n=null}),K())},i(t){s||(d(n),s=!0)},o(t){b(n),s=!1},d(t){n&&n.d(t),t&&c(e)}}}function Be(a,e,s){let{tag:n=null}=e,{label:t=null}=e;return a.$$set=l=>{"tag"in l&&s(0,n=l.tag),"label"in l&&s(1,t=l.label)},[n,t]}class De extends E{constructor(e){super(),z(this,e,Be,Ae,C,{tag:0,label:1})}}function ae(a){let e,s;return e=new De({props:{tag:a[1],label:a[0]}}),{c(){A(e.$$.fragment)},l(n){B(e.$$.fragment,n)},m(n,t){D(e,n,t),s=!0},p(n,t){const l={};t&2&&(l.tag=n[1]),t&1&&(l.label=n[0]),e.$set(l)},i(n){s||(d(e.$$.fragment,n),s=!0)},o(n){b(e.$$.fragment,n),s=!1},d(n){I(e,n)}}}function Ie(a){let e;const s=a[2].default,n=G(s,a,a[3],null);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,l){n&&n.m(t,l),e=!0},p(t,l){n&&n.p&&(!e||l&8)&&M(n,s,t,t[3],e?U(s,t[3],l,null):O(t[3]),null)},i(t){e||(d(n,t),e=!0)},o(t){b(n,t),e=!1},d(t){n&&n.d(t)}}}function He(a){let e,s,n,t,l=(a[0]||a[1])&&ae(a);return n=new Ce({props:{$$slots:{default:[Ie]},$$scope:{ctx:a}}}),{c(){e=_("div"),l&&l.c(),s=T(),A(n.$$.fragment),this.h()},l(i){e=m(i,"DIV",{class:!0});var r=h(e);l&&l.l(r),s=N(r),B(n.$$.fragment,r),r.forEach(c),this.h()},h(){u(e,"class","group dark:bg-white/2.5")},m(i,r){p(i,e,r),l&&l.m(e,null),v(e,s),D(n,e,null),t=!0},p(i,[r]){i[0]||i[1]?l?(l.p(i,r),r&3&&d(l,1)):(l=ae(i),l.c(),d(l,1),l.m(e,s)):l&&(J(),b(l,1,1,()=>{l=null}),K());const o={};r&8&&(o.$$scope={dirty:r,ctx:i}),n.$set(o)},i(i){t||(d(l),d(n.$$.fragment,i),t=!0)},o(i){b(l),b(n.$$.fragment,i),t=!1},d(i){i&&c(e),l&&l.d(),I(n)}}}function Se(a,e,s){let{$$slots:n={},$$scope:t}=e,{label:l=null}=e,{tag:i=null}=e;return a.$$set=r=>{"label"in r&&s(0,l=r.label),"tag"in r&&s(1,i=r.tag),"$$scope"in r&&s(3,t=r.$$scope)},[l,i,n,t]}class je extends E{constructor(e){super(),z(this,e,Se,He,C,{label:0,tag:1})}}const Ge=a=>({}),re=a=>({Header:ge,Tab:je});function Me(a){let e,s;const n=a[1].default,t=G(n,a,a[0],re);return{c(){e=_("div"),t&&t.c(),this.h()},l(l){e=m(l,"DIV",{class:!0});var i=h(e);t&&t.l(i),i.forEach(c),this.h()},h(){u(e,"class","shadow-xl my-6 overflow-hidden rounded-md bg-zinc-900 dark:ring-1 dark:ring-white/10 not-prose")},m(l,i){p(l,e,i),t&&t.m(e,null),s=!0},p(l,[i]){t&&t.p&&(!s||i&1)&&M(t,n,l,l[0],s?U(n,l[0],i,Ge):O(l[0]),re)},i(l){s||(d(t,l),s=!0)},o(l){b(t,l),s=!1},d(l){l&&c(e),t&&t.d(l)}}}function Oe(a,e,s){let{$$slots:n={},$$scope:t}=e;return a.$$set=l=>{"$$scope"in l&&s(0,t=l.$$scope)},[t,n]}class Le extends E{constructor(e){super(),z(this,e,Oe,Me,C,{})}}export{Le as C};
