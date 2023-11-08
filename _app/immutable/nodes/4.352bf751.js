import{s as _e,h as q,n as Z,i as ee,c as Re}from"../chunks/scheduler.01b8d7a8.js";import{S as $e,i as xe,A as Ie,H as Ae,B as Ke,j as c,C as je,f as o,D as te,a as we,g as m,m as z,s as _,r as K,h as g,n as H,c as $,u as j,k as u,y as n,v as G,d as R,t as L,w as N}from"../chunks/index.2642cb86.js";import{C as Le,P as Ne}from"../chunks/Prism.61fcda81.js";import{g as Ge}from"../chunks/spread.84d39b6c.js";import{f as S,a as ke}from"../chunks/dictionaryUtils.85998b43.js";import{a as qe}from"../chunks/_t18s.9368f756.js";import{R as Me}from"../chunks/Ripple.11c6eb41.js";function Oe(a){let e,s,t='<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6.75 7.5l3 2.25l-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"/>',l=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},a[0]],f={};for(let r=0;r<l.length;r+=1)f=q(f,l[r]);return{c(){e=Ie("svg"),s=new Ae(!0),this.h()},l(r){e=Ke(r,"svg",{viewBox:!0,width:!0,height:!0});var d=c(e);s=je(d,!0),d.forEach(o),this.h()},h(){s.a=null,te(e,f)},m(r,d){we(r,e,d),s.m(t,e)},p(r,[d]){te(e,f=Ge(l,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},d&1&&r[0]]))},i:Z,o:Z,d(r){r&&o(e)}}}function Ue(a,e,s){return a.$$set=t=>{s(0,e=q(q({},e),ee(t)))},e=ee(e),[e]}class Ze extends $e{constructor(e){super(),xe(this,e,Ue,Oe,_e,{})}}function Fe(a){let e,s,t='<path fill="currentColor" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361a5.093 5.093 0 0 0-.717-.26a5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529c.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416c.47.197.892.407 1.266.628c.374.222.695.473.963.753c.268.279.472.598.614.957c.142.359.214.776.214 1.253c0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085a4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164a5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09c.249-.06.456-.144.623-.25c.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089a2.12 2.12 0 0 0-.537-.5a5.597 5.597 0 0 0-.807-.444a27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405c-.45-.553-.676-1.222-.676-2.005c0-.614.123-1.141.369-1.582c.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629a7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>',l=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},a[0]],f={};for(let r=0;r<l.length;r+=1)f=q(f,l[r]);return{c(){e=Ie("svg"),s=new Ae(!0),this.h()},l(r){e=Ke(r,"svg",{viewBox:!0,width:!0,height:!0});var d=c(e);s=je(d,!0),d.forEach(o),this.h()},h(){s.a=null,te(e,f)},m(r,d){we(r,e,d),s.m(t,e)},p(r,[d]){te(e,f=Ge(l,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},d&1&&r[0]]))},i:Z,o:Z,d(r){r&&o(e)}}}function Je(a,e,s){return a.$$set=t=>{s(0,e=q(q({},e),ee(t)))},e=ee(e),[e]}class Qe extends $e{constructor(e){super(),xe(this,e,Je,Fe,_e,{})}}const We=(a=void 0)=>S("title",{de:"Kompiliert.",en:"Precompiled."},a),Xe=(a=void 0)=>S("description",{de:"T18s kompilier Übersetzungen beim Build. Keine riesigen i18n Bundles mehr auf dem Client.",en:"T18s compiles your translations at build time. No more huge i18n bundles on the client."},a),Ye=(a=void 0)=>S("title",{de:"Typsicher.",en:"Typesafety."},a),et=(a=void 0)=>S("description",{de:"T18S generiert und erzwingt Typen für Übersetzungen. Vergiss nie wieder die richtigen Argumente zu verwenden.",en:"T18S generates & enforces types for your translations. No more forgetting to pass the right arguments."},a),tt=(a=void 0)=>S("title",{de:"i18n mit Typsicherheit",en:"i18n meets Typesafety"},a),st=(a=void 0)=>S("mission_statement",{de:"T18S bietet die besete Übersetzungserfahrung für SvelteKit, mit Typsicherheit, Performance und einfacher Bedienung.",en:"T18S aims to provide the best internationalization experience for SvelteKit, delivering typesafety, performance, and ease of use."},a),at=(a=void 0)=>S("get_started_cta",{de:"Loslegen",en:"Get Started"},a);function nt(a){let e,s;return e=new Ne({props:{language:"bash",code:"npm i -D t18s"}}),{c(){K(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,l){G(e,t,l),s=!0},p:Z,i(t){s||(R(e.$$.fragment,t),s=!0)},o(t){L(e.$$.fragment,t),s=!1},d(t){N(e,t)}}}function rt(a){let e,s;return e=new a[1]({props:{$$slots:{default:[nt]},$$scope:{ctx:a}}}),{c(){K(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,l){G(e,t,l),s=!0},p(t,l){const f={};l&4&&(f.$$scope={dirty:l,ctx:t}),e.$set(f)},i(t){s||(R(e.$$.fragment,t),s=!0)},o(t){L(e.$$.fragment,t),s=!1},d(t){N(e,t)}}}function lt(a){let e,s,t,l,f=tt()+"",r,d,P,be=st()+"",se,ae,M,D,h,x,C,ne,ye=Ye()+"",re,le,k,Ee=et()+"",ie,oe,w,b,B,ce,Te=We()+"",de,ue,I,De=Xe()+"",me,ge,y,A,E,fe,v,V,Ce=at()+"",he,F,O;return C=new Qe({props:{class:"absolute left-1 top-1 h-5 w-5 text-orange-500","aria-hidden":!0}}),B=new Ze({props:{class:"absolute left-1 top-1 h-5 w-5 text-orange-500","aria-hidden":!0}}),E=new Le({props:{$$slots:{default:[rt,({Tab:i})=>({1:i}),({Tab:i})=>i?2:0]},$$scope:{ctx:a}}}),V=new Me({}),{c(){e=m("div"),s=m("div"),t=m("hgroup"),l=m("h1"),r=z(f),d=_(),P=m("p"),se=z(be),ae=_(),M=m("div"),D=m("dl"),h=m("div"),x=m("dt"),K(C.$$.fragment),ne=_(),re=z(ye),le=_(),k=m("dd"),ie=z(Ee),oe=_(),w=m("div"),b=m("dt"),K(B.$$.fragment),ce=_(),de=z(Te),ue=_(),I=m("dd"),me=z(De),ge=_(),y=m("div"),A=m("div"),K(E.$$.fragment),fe=_(),v=m("a"),K(V.$$.fragment),he=z(Ce),this.h()},l(i){e=g(i,"DIV",{class:!0});var T=c(e);s=g(T,"DIV",{class:!0});var p=c(s);t=g(p,"HGROUP",{class:!0});var J=c(t);l=g(J,"H1",{class:!0});var Be=c(l);r=H(Be,f),Be.forEach(o),d=$(J),P=g(J,"P",{class:!0});var Ve=c(P);se=H(Ve,be),Ve.forEach(o),J.forEach(o),ae=$(p),M=g(p,"DIV",{});var ze=c(M);D=g(ze,"DL",{class:!0});var ve=c(D);h=g(ve,"DIV",{class:!0});var U=c(h);x=g(U,"DT",{class:!0});var Q=c(x);j(C.$$.fragment,Q),ne=$(Q),re=H(Q,ye),Q.forEach(o),le=$(U),k=g(U,"DD",{class:!0});var He=c(k);ie=H(He,Ee),He.forEach(o),oe=$(U),U.forEach(o),w=g(ve,"DIV",{class:!0});var W=c(w);b=g(W,"DT",{class:!0});var X=c(b);j(B.$$.fragment,X),ce=$(X),de=H(X,Te),X.forEach(o),ue=$(W),I=g(W,"DD",{class:!0});var Se=c(I);me=H(Se,De),Se.forEach(o),W.forEach(o),ve.forEach(o),ze.forEach(o),ge=$(p),y=g(p,"DIV",{class:!0});var Y=c(y);A=g(Y,"DIV",{class:!0});var Pe=c(A);j(E.$$.fragment,Pe),Pe.forEach(o),fe=$(Y),v=g(Y,"A",{href:!0,class:!0});var pe=c(v);j(V.$$.fragment,pe),he=H(pe,Ce),pe.forEach(o),Y.forEach(o),p.forEach(o),T.forEach(o),this.h()},h(){u(l,"class","text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"),u(P,"class","mt-6 text-lg leading-8 text-gray-600"),u(t,"class","text-center"),u(x,"class","inline font-semibold text-orange-500"),u(k,"class","inline"),u(h,"class","relative pl-9"),u(b,"class","inline font-semibold text-orange-500"),u(I,"class","inline"),u(w,"class","relative pl-9"),u(D,"class","mx-auto mt-8 px-4 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-12"),u(A,"class","w-56 max-w-full text-left"),u(v,"href",F=ke("/[[locale=locale]]/getting-started",a[0])),u(v,"class","rounded-md relative bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"),u(y,"class","flex flex-row flex-wrap gap-x-4 items-center justify-center"),u(s,"class","max-w-2xl flex flex-col gap-4"),u(e,"class","bg-white fixed inset-0 grid place-items-center px-4 py-12 overflow-y-auto")},m(i,T){we(i,e,T),n(e,s),n(s,t),n(t,l),n(l,r),n(t,d),n(t,P),n(P,se),n(s,ae),n(s,M),n(M,D),n(D,h),n(h,x),G(C,x,null),n(x,ne),n(x,re),n(h,le),n(h,k),n(k,ie),n(h,oe),n(D,w),n(w,b),G(B,b,null),n(b,ce),n(b,de),n(w,ue),n(w,I),n(I,me),n(s,ge),n(s,y),n(y,A),G(E,A,null),n(y,fe),n(y,v),G(V,v,null),n(v,he),O=!0},p(i,[T]){const p={};T&4&&(p.$$scope={dirty:T,ctx:i}),E.$set(p),(!O||T&1&&F!==(F=ke("/[[locale=locale]]/getting-started",i[0])))&&u(v,"href",F)},i(i){O||(R(C.$$.fragment,i),R(B.$$.fragment,i),R(E.$$.fragment,i),R(V.$$.fragment,i),O=!0)},o(i){L(C.$$.fragment,i),L(B.$$.fragment,i),L(E.$$.fragment,i),L(V.$$.fragment,i),O=!1},d(i){i&&o(e),N(C),N(B),N(E),N(V)}}}function it(a,e,s){let t;return Re(a,qe,l=>s(0,t=l)),[t]}class ht extends $e{constructor(e){super(),xe(this,e,it,lt,_e,{})}}export{ht as component};