import{s as ye,n as R}from"../chunks/scheduler.98d76842.js";import{S as Te,i as Me,g as v,s as u,r as c,h,E as w,c as i,u as p,k as W,a as $,v as m,d as _,t as g,f as o,w as d}from"../chunks/index.eba105c3.js";import{C as G,P as B}from"../chunks/Prism.6d2a9aa4.js";const Pe=`import { isLocale } from "$t18s";
export const match = isLocale;
`;function ke(f){let l,r;return l=new B({props:{language:"typescript",code:'type Locale = "en" | "de";'}}),{c(){c(l.$$.fragment)},l(t){p(l.$$.fragment,t)},m(t,s){m(l,t,s),r=!0},p:R,i(t){r||(_(l.$$.fragment,t),r=!0)},o(t){g(l.$$.fragment,t),r=!1},d(t){d(l,t)}}}function Se(f){let l,r;return l=new f[0]({props:{$$slots:{default:[ke]},$$scope:{ctx:f}}}),{c(){c(l.$$.fragment)},l(t){p(l.$$.fragment,t)},m(t,s){m(l,t,s),r=!0},p(t,s){const a={};s&4&&(a.$$scope={dirty:s,ctx:t}),l.$set(a)},i(t){r||(_(l.$$.fragment,t),r=!0)},o(t){g(l.$$.fragment,t),r=!1},d(t){d(l,t)}}}function qe(f){let l,r;return l=new B({props:{language:"typescript",code:"const locale = Writable<Locale>;"}}),{c(){c(l.$$.fragment)},l(t){p(l.$$.fragment,t)},m(t,s){m(l,t,s),r=!0},p:R,i(t){r||(_(l.$$.fragment,t),r=!0)},o(t){g(l.$$.fragment,t),r=!1},d(t){d(l,t)}}}function je(f){let l,r;return l=new f[0]({props:{$$slots:{default:[qe]},$$scope:{ctx:f}}}),{c(){c(l.$$.fragment)},l(t){p(l.$$.fragment,t)},m(t,s){m(l,t,s),r=!0},p(t,s){const a={};s&4&&(a.$$scope={dirty:s,ctx:t}),l.$set(a)},i(t){r||(_(l.$$.fragment,t),r=!0)},o(t){g(l.$$.fragment,t),r=!1},d(t){d(l,t)}}}function ze(f){let l,r;return l=new B({props:{language:"typescript",code:"const isLocale = (thing: any) => thing is Locale;"}}),{c(){c(l.$$.fragment)},l(t){p(l.$$.fragment,t)},m(t,s){m(l,t,s),r=!0},p:R,i(t){r||(_(l.$$.fragment,t),r=!0)},o(t){g(l.$$.fragment,t),r=!1},d(t){d(l,t)}}}function Ae(f){let l,r;return l=new f[0]({props:{$$slots:{default:[ze]},$$scope:{ctx:f}}}),{c(){c(l.$$.fragment)},l(t){p(l.$$.fragment,t)},m(t,s){m(l,t,s),r=!0},p(t,s){const a={};s&4&&(a.$$scope={dirty:s,ctx:t}),l.$set(a)},i(t){r||(_(l.$$.fragment,t),r=!0)},o(t){g(l.$$.fragment,t),r=!1},d(t){d(l,t)}}}function Ee(f){let l,r;return l=new B({props:{language:"javascript",code:Pe}}),{c(){c(l.$$.fragment)},l(t){p(l.$$.fragment,t)},m(t,s){m(l,t,s),r=!0},p:R,i(t){r||(_(l.$$.fragment,t),r=!0)},o(t){g(l.$$.fragment,t),r=!1},d(t){d(l,t)}}}function Ie(f){let l,r,t,s;return l=new f[1]({props:{title:"src/params/locale.js"}}),t=new f[0]({props:{$$slots:{default:[Ee]},$$scope:{ctx:f}}}),{c(){c(l.$$.fragment),r=u(),c(t.$$.fragment)},l(a){p(l.$$.fragment,a),r=i(a),p(t.$$.fragment,a)},m(a,C){m(l,a,C),$(a,r,C),m(t,a,C),s=!0},p(a,C){const L={};C&4&&(L.$$scope={dirty:C,ctx:a}),t.$set(L)},i(a){s||(_(l.$$.fragment,a),_(t.$$.fragment,a),s=!0)},o(a){g(l.$$.fragment,a),g(t.$$.fragment,a),s=!1},d(a){a&&o(r),d(l,a),d(t,a)}}}function Oe(f){let l,r;return l=new B({props:{language:"typescript",code:"const fallbackLocale: Locale | null; //will be one or the other based on your config"}}),{c(){c(l.$$.fragment)},l(t){p(l.$$.fragment,t)},m(t,s){m(l,t,s),r=!0},p:R,i(t){r||(_(l.$$.fragment,t),r=!0)},o(t){g(l.$$.fragment,t),r=!1},d(t){d(l,t)}}}function Ue(f){let l,r;return l=new f[0]({props:{$$slots:{default:[Oe]},$$scope:{ctx:f}}}),{c(){c(l.$$.fragment)},l(t){p(l.$$.fragment,t)},m(t,s){m(l,t,s),r=!0},p(t,s){const a={};s&4&&(a.$$scope={dirty:s,ctx:t}),l.$set(a)},i(t){r||(_(l.$$.fragment,t),r=!0)},o(t){g(l.$$.fragment,t),r=!1},d(t){d(l,t)}}}function We(f){let l,r="$t18s Module Reference",t,s,a=`The <code>$t18s</code> module contains all runtime code for t18s. It is how you interact
with the library.`,C,L,ae="<code>type Locale</code>",D,j,fe="A union type of all the locales you have registered with t18s.",F,b,J,x,ue="<code>locales</code>",K,z,ie=`An array of all the locales you have registered with t18s. Useful for places
where you need to iterate over all locales, such as Locale Switchers or SEO.`,N,H,ce="<code>$locale</code> Store",Q,A,pe="A writable store containing the currently active locale.",V,y,X,T,me="<code>isLocale</code>",Y,E,_e=`A convenience function for checking if something is a valid locale or not.
Only the locales that are registered with t18s are considered valid.`,Z,M,ee,I,ge="It is useful for quickly creating a param matcher for locales.",te,P,le,k,de="<code>setLocale</code>",ne,O,ve="Sets the current locale. Useful for Locale Switchers.",re,S,he="<code>const fallbackLocale</code>",se,U,we=`The fallback locale you specified in your config, or null if you don’t specify one. Will be definitely
typed based on your config.`,$e,q,oe;return b=new G({props:{$$slots:{default:[Se,({Tab:e})=>({0:e}),({Tab:e})=>e?1:0]},$$scope:{ctx:f}}}),y=new G({props:{$$slots:{default:[je,({Tab:e})=>({0:e}),({Tab:e})=>e?1:0]},$$scope:{ctx:f}}}),M=new G({props:{$$slots:{default:[Ae,({Tab:e})=>({0:e}),({Tab:e})=>e?1:0]},$$scope:{ctx:f}}}),P=new G({props:{$$slots:{default:[Ie,({Tab:e,Header:n})=>({0:e,1:n}),({Tab:e,Header:n})=>(e?1:0)|(n?2:0)]},$$scope:{ctx:f}}}),q=new G({props:{$$slots:{default:[Ue,({Tab:e})=>({0:e}),({Tab:e})=>e?1:0]},$$scope:{ctx:f}}}),{c(){l=v("h1"),l.textContent=r,t=u(),s=v("p"),s.innerHTML=a,C=u(),L=v("h2"),L.innerHTML=ae,D=u(),j=v("p"),j.textContent=fe,F=u(),c(b.$$.fragment),J=u(),x=v("h2"),x.innerHTML=ue,K=u(),z=v("p"),z.textContent=ie,N=u(),H=v("h2"),H.innerHTML=ce,Q=u(),A=v("p"),A.textContent=pe,V=u(),c(y.$$.fragment),X=u(),T=v("h2"),T.innerHTML=me,Y=u(),E=v("p"),E.textContent=_e,Z=u(),c(M.$$.fragment),ee=u(),I=v("p"),I.textContent=ge,te=u(),c(P.$$.fragment),le=u(),k=v("h2"),k.innerHTML=de,ne=u(),O=v("p"),O.textContent=ve,re=u(),S=v("h2"),S.innerHTML=he,se=u(),U=v("p"),U.textContent=we,$e=u(),c(q.$$.fragment),this.h()},l(e){l=h(e,"H1",{id:!0,"data-svelte-h":!0}),w(l)!=="svelte-4cots8"&&(l.textContent=r),t=i(e),s=h(e,"P",{"data-svelte-h":!0}),w(s)!=="svelte-164y51w"&&(s.innerHTML=a),C=i(e),L=h(e,"H2",{id:!0,"data-svelte-h":!0}),w(L)!=="svelte-ewdkbq"&&(L.innerHTML=ae),D=i(e),j=h(e,"P",{"data-svelte-h":!0}),w(j)!=="svelte-1oz16hf"&&(j.textContent=fe),F=i(e),p(b.$$.fragment,e),J=i(e),x=h(e,"H2",{id:!0,"data-svelte-h":!0}),w(x)!=="svelte-bzuwjh"&&(x.innerHTML=ue),K=i(e),z=h(e,"P",{"data-svelte-h":!0}),w(z)!=="svelte-1upgwye"&&(z.textContent=ie),N=i(e),H=h(e,"H2",{id:!0,"data-svelte-h":!0}),w(H)!=="svelte-1klhwk0"&&(H.innerHTML=ce),Q=i(e),A=h(e,"P",{"data-svelte-h":!0}),w(A)!=="svelte-1yg4i5b"&&(A.textContent=pe),V=i(e),p(y.$$.fragment,e),X=i(e),T=h(e,"H2",{id:!0,"data-svelte-h":!0}),w(T)!=="svelte-ew0p29"&&(T.innerHTML=me),Y=i(e),E=h(e,"P",{"data-svelte-h":!0}),w(E)!=="svelte-1b1ywai"&&(E.textContent=_e),Z=i(e),p(M.$$.fragment,e),ee=i(e),I=h(e,"P",{"data-svelte-h":!0}),w(I)!=="svelte-yz1fz5"&&(I.textContent=ge),te=i(e),p(P.$$.fragment,e),le=i(e),k=h(e,"H2",{id:!0,"data-svelte-h":!0}),w(k)!=="svelte-1ih8y63"&&(k.innerHTML=de),ne=i(e),O=h(e,"P",{"data-svelte-h":!0}),w(O)!=="svelte-e0qpq0"&&(O.textContent=ve),re=i(e),S=h(e,"H2",{id:!0,"data-svelte-h":!0}),w(S)!=="svelte-dbpd5e"&&(S.innerHTML=he),se=i(e),U=h(e,"P",{"data-svelte-h":!0}),w(U)!=="svelte-oxo3j4"&&(U.textContent=we),$e=i(e),p(q.$$.fragment,e),this.h()},h(){W(l,"id","t18s-module-reference"),W(L,"id","type-locale"),W(x,"id","locales"),W(H,"id","locale-store"),W(T,"id","islocale"),W(k,"id","setlocale"),W(S,"id","const-fallbacklocale")},m(e,n){$(e,l,n),$(e,t,n),$(e,s,n),$(e,C,n),$(e,L,n),$(e,D,n),$(e,j,n),$(e,F,n),m(b,e,n),$(e,J,n),$(e,x,n),$(e,K,n),$(e,z,n),$(e,N,n),$(e,H,n),$(e,Q,n),$(e,A,n),$(e,V,n),m(y,e,n),$(e,X,n),$(e,T,n),$(e,Y,n),$(e,E,n),$(e,Z,n),m(M,e,n),$(e,ee,n),$(e,I,n),$(e,te,n),m(P,e,n),$(e,le,n),$(e,k,n),$(e,ne,n),$(e,O,n),$(e,re,n),$(e,S,n),$(e,se,n),$(e,U,n),$(e,$e,n),m(q,e,n),oe=!0},p(e,[n]){const Ce={};n&4&&(Ce.$$scope={dirty:n,ctx:e}),b.$set(Ce);const Le={};n&4&&(Le.$$scope={dirty:n,ctx:e}),y.$set(Le);const be={};n&4&&(be.$$scope={dirty:n,ctx:e}),M.$set(be);const xe={};n&4&&(xe.$$scope={dirty:n,ctx:e}),P.$set(xe);const He={};n&4&&(He.$$scope={dirty:n,ctx:e}),q.$set(He)},i(e){oe||(_(b.$$.fragment,e),_(y.$$.fragment,e),_(M.$$.fragment,e),_(P.$$.fragment,e),_(q.$$.fragment,e),oe=!0)},o(e){g(b.$$.fragment,e),g(y.$$.fragment,e),g(M.$$.fragment,e),g(P.$$.fragment,e),g(q.$$.fragment,e),oe=!1},d(e){e&&(o(l),o(t),o(s),o(C),o(L),o(D),o(j),o(F),o(J),o(x),o(K),o(z),o(N),o(H),o(Q),o(A),o(V),o(X),o(T),o(Y),o(E),o(Z),o(ee),o(I),o(te),o(le),o(k),o(ne),o(O),o(re),o(S),o(se),o(U),o($e)),d(b,e),d(y,e),d(M,e),d(P,e),d(q,e)}}}class De extends Te{constructor(l){super(),Me(this,l,null,We,ye,{})}}export{De as component};
