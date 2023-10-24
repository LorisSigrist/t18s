import{S as Vt,i as Xt,s as Zt,k as m,q as u,a as g,y as w,l as h,m as c,r as $,h as l,c as d,z as v,b as i,D as o,A as b,g as E,d as k,B as y,E as X}from"../chunks/index.90d50ca5.js";import{C as V}from"../chunks/CodeGroup.56f46765.js";import{P as Z}from"../chunks/Prism.a7e47b46.js";import{C as en}from"../chunks/Callout.686e165a.js";const tn=`<head>
    <link rel="alternate" href="/en" hreflang="en" />
    <link rel="alternate" href="/de" hreflang="de" />
</head>`,nn=`<head>
    <link rel="alternate" href="/en" hreflang="en" />
    <link rel="alternate" href="/de" hreflang="de" />

    <!--Use the english site as the default-->
    <link rel="alternate" href="/en"; hreflang="x-default" />
</head>
`,an=`<!DOCTYPE html>
<html lang="%lang%">
	<!-- ... -->
</html>
`,ln=`export const handle = async ({ event, resolve }) => {
  //Determine the locale from the URL.
  //Implementing this is up to you, depending on your routing solution.
  const locale = getLocale(event);

  const response = await resolve(event, {
    //Replace the placeholder %lang% with the current locale.
    transformPageChunk({ html }) {
      html = html.replace("%lang%", locale);
      return html;
    },
  });

  return response;
};
`,rn=`<script>
    import { locale } from "$t18s";
    import { browser } from "$app/environment";
    $: if(browser) document.documentElement.lang = $locale;
<\/script>
  
<slot /> `,sn='<a href="/de" hreflang="de">Deutsch</a>';function on(p){let n,s;return n=new Z({props:{language:"html",code:tn}}),{c(){w(n.$$.fragment)},l(t){v(n.$$.fragment,t)},m(t,f){b(n,t,f),s=!0},p:X,i(t){s||(E(n.$$.fragment,t),s=!0)},o(t){k(n.$$.fragment,t),s=!1},d(t){y(n,t)}}}function fn(p){let n,s;return n=new p[1]({props:{$$slots:{default:[on]},$$scope:{ctx:p}}}),{c(){w(n.$$.fragment)},l(t){v(n.$$.fragment,t)},m(t,f){b(n,t,f),s=!0},p(t,f){const r={};f&4&&(r.$$scope={dirty:f,ctx:t}),n.$set(r)},i(t){s||(E(n.$$.fragment,t),s=!0)},o(t){k(n.$$.fragment,t),s=!1},d(t){y(n,t)}}}function un(p){let n,s;return n=new Z({props:{language:"html",code:nn}}),{c(){w(n.$$.fragment)},l(t){v(n.$$.fragment,t)},m(t,f){b(n,t,f),s=!0},p:X,i(t){s||(E(n.$$.fragment,t),s=!0)},o(t){k(n.$$.fragment,t),s=!1},d(t){y(n,t)}}}function $n(p){let n,s;return n=new p[1]({props:{$$slots:{default:[un]},$$scope:{ctx:p}}}),{c(){w(n.$$.fragment)},l(t){v(n.$$.fragment,t)},m(t,f){b(n,t,f),s=!0},p(t,f){const r={};f&4&&(r.$$scope={dirty:f,ctx:t}),n.$set(r)},i(t){s||(E(n.$$.fragment,t),s=!0)},o(t){k(n.$$.fragment,t),s=!1},d(t){y(n,t)}}}function pn(p){let n,s;return n=new Z({props:{language:"html",code:sn}}),{c(){w(n.$$.fragment)},l(t){v(n.$$.fragment,t)},m(t,f){b(n,t,f),s=!0},p:X,i(t){s||(E(n.$$.fragment,t),s=!0)},o(t){k(n.$$.fragment,t),s=!1},d(t){y(n,t)}}}function mn(p){let n,s;return n=new p[1]({props:{$$slots:{default:[pn]},$$scope:{ctx:p}}}),{c(){w(n.$$.fragment)},l(t){v(n.$$.fragment,t)},m(t,f){b(n,t,f),s=!0},p(t,f){const r={};f&4&&(r.$$scope={dirty:f,ctx:t}),n.$set(r)},i(t){s||(E(n.$$.fragment,t),s=!0)},o(t){k(n.$$.fragment,t),s=!1},d(t){y(n,t)}}}function hn(p){let n,s;return n=new Z({props:{language:"html",code:an}}),{c(){w(n.$$.fragment)},l(t){v(n.$$.fragment,t)},m(t,f){b(n,t,f),s=!0},p:X,i(t){s||(E(n.$$.fragment,t),s=!0)},o(t){k(n.$$.fragment,t),s=!1},d(t){y(n,t)}}}function cn(p){let n,s,t,f;return n=new p[0]({props:{title:"src/app.html"}}),t=new p[1]({props:{$$slots:{default:[hn]},$$scope:{ctx:p}}}),{c(){w(n.$$.fragment),s=g(),w(t.$$.fragment)},l(r){v(n.$$.fragment,r),s=d(r),v(t.$$.fragment,r)},m(r,_){b(n,r,_),i(r,s,_),b(t,r,_),f=!0},p(r,_){const O={};_&4&&(O.$$scope={dirty:_,ctx:r}),t.$set(O)},i(r){f||(E(n.$$.fragment,r),E(t.$$.fragment,r),f=!0)},o(r){k(n.$$.fragment,r),k(t.$$.fragment,r),f=!1},d(r){y(n,r),r&&l(s),y(t,r)}}}function gn(p){let n,s;return n=new Z({props:{language:"javascript",code:ln}}),{c(){w(n.$$.fragment)},l(t){v(n.$$.fragment,t)},m(t,f){b(n,t,f),s=!0},p:X,i(t){s||(E(n.$$.fragment,t),s=!0)},o(t){k(n.$$.fragment,t),s=!1},d(t){y(n,t)}}}function dn(p){let n,s,t,f;return n=new p[0]({props:{title:"src/hooks.server.js"}}),t=new p[1]({props:{$$slots:{default:[gn]},$$scope:{ctx:p}}}),{c(){w(n.$$.fragment),s=g(),w(t.$$.fragment)},l(r){v(n.$$.fragment,r),s=d(r),v(t.$$.fragment,r)},m(r,_){b(n,r,_),i(r,s,_),b(t,r,_),f=!0},p(r,_){const O={};_&4&&(O.$$scope={dirty:_,ctx:r}),t.$set(O)},i(r){f||(E(n.$$.fragment,r),E(t.$$.fragment,r),f=!0)},o(r){k(n.$$.fragment,r),k(t.$$.fragment,r),f=!1},d(r){y(n,r),r&&l(s),y(t,r)}}}function _n(p){let n,s;return n=new Z({props:{language:"svelte",code:rn}}),{c(){w(n.$$.fragment)},l(t){v(n.$$.fragment,t)},m(t,f){b(n,t,f),s=!0},p:X,i(t){s||(E(n.$$.fragment,t),s=!0)},o(t){k(n.$$.fragment,t),s=!1},d(t){y(n,t)}}}function wn(p){let n,s,t,f;return n=new p[0]({props:{title:"src/routes/+layout.svelte"}}),t=new p[1]({props:{$$slots:{default:[_n]},$$scope:{ctx:p}}}),{c(){w(n.$$.fragment),s=g(),w(t.$$.fragment)},l(r){v(n.$$.fragment,r),s=d(r),v(t.$$.fragment,r)},m(r,_){b(n,r,_),i(r,s,_),b(t,r,_),f=!0},p(r,_){const O={};_&4&&(O.$$scope={dirty:_,ctx:r}),t.$set(O)},i(r){f||(E(n.$$.fragment,r),E(t.$$.fragment,r),f=!0)},o(r){k(n.$$.fragment,r),k(t.$$.fragment,r),f=!1},d(r){y(n,r),r&&l(s),y(t,r)}}}function vn(p){let n;return{c(){n=u(`This may become built in behavior in the future, depending on feedback. Old
    code probably won't break, so you can add this now without worrying about it.`)},l(s){n=$(s,`This may become built in behavior in the future, depending on feedback. Old
    code probably won't break, so you can add this now without worrying about it.`)},m(s,t){i(s,n,t)},d(s){s&&l(n)}}}function bn(p){let n,s,t,f,r,_,O,Me,we,U,Ne,ve,x,Qe,be,D,Ee,T,Ve,ee,Xe,Ze,te,et,tt,ne,nt,at,ke,I,ye,z,lt,Oe,L,rt,ae,st,ot,Te,A,ft,le,it,ut,Ce,q,Se,G,$t,Pe,S,pt,re,mt,ht,se,ct,gt,De,F,dt,Ie,H,_t,oe,wt,vt,Le,W,bt,fe,Et,kt,Ae,j,qe,B,yt,ie,Ot,Tt,He,K,We,M,Ct,je,Y,St,ue,Pt,Dt,Be,P,It,$e,Lt,At,pe,qt,Ht,Ke,J,Ye,R,Je;return D=new V({props:{$$slots:{default:[fn,({Tab:e})=>({1:e}),({Tab:e})=>e?2:0]},$$scope:{ctx:p}}}),I=new V({props:{$$slots:{default:[$n,({Tab:e})=>({1:e}),({Tab:e})=>e?2:0]},$$scope:{ctx:p}}}),q=new V({props:{$$slots:{default:[mn,({Tab:e})=>({1:e}),({Tab:e})=>e?2:0]},$$scope:{ctx:p}}}),j=new V({props:{$$slots:{default:[cn,({Header:e,Tab:a})=>({0:e,1:a}),({Header:e,Tab:a})=>(e?1:0)|(a?2:0)]},$$scope:{ctx:p}}}),K=new V({props:{$$slots:{default:[dn,({Header:e,Tab:a})=>({0:e,1:a}),({Header:e,Tab:a})=>(e?1:0)|(a?2:0)]},$$scope:{ctx:p}}}),J=new V({props:{$$slots:{default:[wn,({Header:e,Tab:a})=>({0:e,1:a}),({Header:e,Tab:a})=>(e?1:0)|(a?2:0)]},$$scope:{ctx:p}}}),R=new en({props:{type:"info",$$slots:{default:[vn]},$$scope:{ctx:p}}}),{c(){n=m("h1"),s=u("SEO"),t=g(),f=m("p"),r=u(`There are quite a few SEO related things you need to keep in mind when developing
    a multi-language site. This page will give you a quick overview of the most important ones.`),_=g(),O=m("h2"),Me=u("Alternate Links"),we=g(),U=m("p"),Ne=u(`Alternate links are a way to tell search engines that a page exists in multiple languages, 
    and where to find them. This is done by adding a link tag to the head of your page.`),ve=g(),x=m("p"),Qe=u(`You should add a link tag for each language your site is available in, including the 
    one the page is currently in.`),be=g(),w(D.$$.fragment),Ee=g(),T=m("p"),Ve=u("If you have a "),ee=m("i"),Xe=u('"default lanugage"'),Ze=u(` that you want to use when the user's language is not available,
    you should add a link tag with the `),te=m("code"),et=u("hreflang"),tt=u(" attribute set to "),ne=m("code"),nt=u("x-default"),at=u(`. This 
    tells search engines that this is the default language.`),ke=g(),w(I.$$.fragment),ye=g(),z=m("h2"),lt=u("Locale Switchers"),Oe=g(),L=m("p"),rt=u("It is recommended that you use "),ae=m("code"),st=u("a"),ot=u(` tags for your locale switchers. This is because
    search engines and the SvelteKit prerenderer will follow these links, and index the pages they lead to. They
    also work if JavaScript is disabled.`),Te=g(),A=m("p"),ft=u(`But, we need to make sure to tell the search engines that these links just lead to the same page
    in a different language, not separate pages. We do this by adding an `),le=m("code"),it=u("hreflang"),ut=u(" attribute."),Ce=g(),w(q.$$.fragment),Se=g(),G=m("h2"),$t=u("The Lang Attribute"),Pe=g(),S=m("p"),pt=u("Browsers determine the page's language by looking at the "),re=m("code"),mt=u("lang"),ht=u(" attribute on the "),se=m("code"),ct=u("html"),gt=u(` tag.
    We need to make sure that this attribute is set to the correct language, both during server rendering,
    and when switching languages on the client.`),De=g(),F=m("h3"),dt=u("On the Server"),Ie=g(),H=m("p"),_t=u("SvelteKit offers a relatively simple way to set the "),oe=m("code"),wt=u("lang"),vt=u(` attribute during server rendering.
    We can set it in a hook.`),Le=g(),W=m("p"),bt=u("In the app template, let's add a placeholder string in the "),fe=m("code"),Et=u("lang"),kt=u(" attribute."),Ae=g(),w(j.$$.fragment),qe=g(),B=m("p"),yt=u("Then in the server "),ie=m("code"),Ot=u("handle"),Tt=u(" hook, we can replace it with the correct language."),He=g(),w(K.$$.fragment),We=g(),M=m("h3"),Ct=u("On the client"),je=g(),Y=m("p"),St=u("T18S does not do a full page reload when switching languages, so we need to make sure that the "),ue=m("code"),Pt=u("lang"),Dt=u(` attribute
    gets set correctly when switching languages on the client.`),Be=g(),P=m("p"),It=u(`In the root layout. Check that we are in the browser, 
    and then reactively set the `),$e=m("code"),Lt=u("lang"),At=u(" attribute base on the "),pe=m("code"),qt=u("$locale"),Ht=u(` store exported
    by T18S.`),Ke=g(),w(J.$$.fragment),Ye=g(),w(R.$$.fragment)},l(e){n=h(e,"H1",{});var a=c(n);s=$(a,"SEO"),a.forEach(l),t=d(e),f=h(e,"P",{});var me=c(f);r=$(me,`There are quite a few SEO related things you need to keep in mind when developing
    a multi-language site. This page will give you a quick overview of the most important ones.`),me.forEach(l),_=d(e),O=h(e,"H2",{});var he=c(O);Me=$(he,"Alternate Links"),he.forEach(l),we=d(e),U=h(e,"P",{});var ce=c(U);Ne=$(ce,`Alternate links are a way to tell search engines that a page exists in multiple languages, 
    and where to find them. This is done by adding a link tag to the head of your page.`),ce.forEach(l),ve=d(e),x=h(e,"P",{});var ge=c(x);Qe=$(ge,`You should add a link tag for each language your site is available in, including the 
    one the page is currently in.`),ge.forEach(l),be=d(e),v(D.$$.fragment,e),Ee=d(e),T=h(e,"P",{});var C=c(T);Ve=$(C,"If you have a "),ee=h(C,"I",{});var de=c(ee);Xe=$(de,'"default lanugage"'),de.forEach(l),Ze=$(C,` that you want to use when the user's language is not available,
    you should add a link tag with the `),te=h(C,"CODE",{});var _e=c(te);et=$(_e,"hreflang"),_e.forEach(l),tt=$(C," attribute set to "),ne=h(C,"CODE",{});var Wt=c(ne);nt=$(Wt,"x-default"),Wt.forEach(l),at=$(C,`. This 
    tells search engines that this is the default language.`),C.forEach(l),ke=d(e),v(I.$$.fragment,e),ye=d(e),z=h(e,"H2",{});var jt=c(z);lt=$(jt,"Locale Switchers"),jt.forEach(l),Oe=d(e),L=h(e,"P",{});var Re=c(L);rt=$(Re,"It is recommended that you use "),ae=h(Re,"CODE",{});var Bt=c(ae);st=$(Bt,"a"),Bt.forEach(l),ot=$(Re,` tags for your locale switchers. This is because
    search engines and the SvelteKit prerenderer will follow these links, and index the pages they lead to. They
    also work if JavaScript is disabled.`),Re.forEach(l),Te=d(e),A=h(e,"P",{});var Ue=c(A);ft=$(Ue,`But, we need to make sure to tell the search engines that these links just lead to the same page
    in a different language, not separate pages. We do this by adding an `),le=h(Ue,"CODE",{});var Kt=c(le);it=$(Kt,"hreflang"),Kt.forEach(l),ut=$(Ue," attribute."),Ue.forEach(l),Ce=d(e),v(q.$$.fragment,e),Se=d(e),G=h(e,"H2",{});var Yt=c(G);$t=$(Yt,"The Lang Attribute"),Yt.forEach(l),Pe=d(e),S=h(e,"P",{});var N=c(S);pt=$(N,"Browsers determine the page's language by looking at the "),re=h(N,"CODE",{});var Jt=c(re);mt=$(Jt,"lang"),Jt.forEach(l),ht=$(N," attribute on the "),se=h(N,"CODE",{});var Rt=c(se);ct=$(Rt,"html"),Rt.forEach(l),gt=$(N,` tag.
    We need to make sure that this attribute is set to the correct language, both during server rendering,
    and when switching languages on the client.`),N.forEach(l),De=d(e),F=h(e,"H3",{});var Ut=c(F);dt=$(Ut,"On the Server"),Ut.forEach(l),Ie=d(e),H=h(e,"P",{});var xe=c(H);_t=$(xe,"SvelteKit offers a relatively simple way to set the "),oe=h(xe,"CODE",{});var xt=c(oe);wt=$(xt,"lang"),xt.forEach(l),vt=$(xe,` attribute during server rendering.
    We can set it in a hook.`),xe.forEach(l),Le=d(e),W=h(e,"P",{});var ze=c(W);bt=$(ze,"In the app template, let's add a placeholder string in the "),fe=h(ze,"CODE",{});var zt=c(fe);Et=$(zt,"lang"),zt.forEach(l),kt=$(ze," attribute."),ze.forEach(l),Ae=d(e),v(j.$$.fragment,e),qe=d(e),B=h(e,"P",{});var Ge=c(B);yt=$(Ge,"Then in the server "),ie=h(Ge,"CODE",{});var Gt=c(ie);Ot=$(Gt,"handle"),Gt.forEach(l),Tt=$(Ge," hook, we can replace it with the correct language."),Ge.forEach(l),He=d(e),v(K.$$.fragment,e),We=d(e),M=h(e,"H3",{});var Ft=c(M);Ct=$(Ft,"On the client"),Ft.forEach(l),je=d(e),Y=h(e,"P",{});var Fe=c(Y);St=$(Fe,"T18S does not do a full page reload when switching languages, so we need to make sure that the "),ue=h(Fe,"CODE",{});var Mt=c(ue);Pt=$(Mt,"lang"),Mt.forEach(l),Dt=$(Fe,` attribute
    gets set correctly when switching languages on the client.`),Fe.forEach(l),Be=d(e),P=h(e,"P",{});var Q=c(P);It=$(Q,`In the root layout. Check that we are in the browser, 
    and then reactively set the `),$e=h(Q,"CODE",{});var Nt=c($e);Lt=$(Nt,"lang"),Nt.forEach(l),At=$(Q," attribute base on the "),pe=h(Q,"CODE",{});var Qt=c(pe);qt=$(Qt,"$locale"),Qt.forEach(l),Ht=$(Q,` store exported
    by T18S.`),Q.forEach(l),Ke=d(e),v(J.$$.fragment,e),Ye=d(e),v(R.$$.fragment,e)},m(e,a){i(e,n,a),o(n,s),i(e,t,a),i(e,f,a),o(f,r),i(e,_,a),i(e,O,a),o(O,Me),i(e,we,a),i(e,U,a),o(U,Ne),i(e,ve,a),i(e,x,a),o(x,Qe),i(e,be,a),b(D,e,a),i(e,Ee,a),i(e,T,a),o(T,Ve),o(T,ee),o(ee,Xe),o(T,Ze),o(T,te),o(te,et),o(T,tt),o(T,ne),o(ne,nt),o(T,at),i(e,ke,a),b(I,e,a),i(e,ye,a),i(e,z,a),o(z,lt),i(e,Oe,a),i(e,L,a),o(L,rt),o(L,ae),o(ae,st),o(L,ot),i(e,Te,a),i(e,A,a),o(A,ft),o(A,le),o(le,it),o(A,ut),i(e,Ce,a),b(q,e,a),i(e,Se,a),i(e,G,a),o(G,$t),i(e,Pe,a),i(e,S,a),o(S,pt),o(S,re),o(re,mt),o(S,ht),o(S,se),o(se,ct),o(S,gt),i(e,De,a),i(e,F,a),o(F,dt),i(e,Ie,a),i(e,H,a),o(H,_t),o(H,oe),o(oe,wt),o(H,vt),i(e,Le,a),i(e,W,a),o(W,bt),o(W,fe),o(fe,Et),o(W,kt),i(e,Ae,a),b(j,e,a),i(e,qe,a),i(e,B,a),o(B,yt),o(B,ie),o(ie,Ot),o(B,Tt),i(e,He,a),b(K,e,a),i(e,We,a),i(e,M,a),o(M,Ct),i(e,je,a),i(e,Y,a),o(Y,St),o(Y,ue),o(ue,Pt),o(Y,Dt),i(e,Be,a),i(e,P,a),o(P,It),o(P,$e),o($e,Lt),o(P,At),o(P,pe),o(pe,qt),o(P,Ht),i(e,Ke,a),b(J,e,a),i(e,Ye,a),b(R,e,a),Je=!0},p(e,[a]){const me={};a&4&&(me.$$scope={dirty:a,ctx:e}),D.$set(me);const he={};a&4&&(he.$$scope={dirty:a,ctx:e}),I.$set(he);const ce={};a&4&&(ce.$$scope={dirty:a,ctx:e}),q.$set(ce);const ge={};a&4&&(ge.$$scope={dirty:a,ctx:e}),j.$set(ge);const C={};a&4&&(C.$$scope={dirty:a,ctx:e}),K.$set(C);const de={};a&4&&(de.$$scope={dirty:a,ctx:e}),J.$set(de);const _e={};a&4&&(_e.$$scope={dirty:a,ctx:e}),R.$set(_e)},i(e){Je||(E(D.$$.fragment,e),E(I.$$.fragment,e),E(q.$$.fragment,e),E(j.$$.fragment,e),E(K.$$.fragment,e),E(J.$$.fragment,e),E(R.$$.fragment,e),Je=!0)},o(e){k(D.$$.fragment,e),k(I.$$.fragment,e),k(q.$$.fragment,e),k(j.$$.fragment,e),k(K.$$.fragment,e),k(J.$$.fragment,e),k(R.$$.fragment,e),Je=!1},d(e){e&&l(n),e&&l(t),e&&l(f),e&&l(_),e&&l(O),e&&l(we),e&&l(U),e&&l(ve),e&&l(x),e&&l(be),y(D,e),e&&l(Ee),e&&l(T),e&&l(ke),y(I,e),e&&l(ye),e&&l(z),e&&l(Oe),e&&l(L),e&&l(Te),e&&l(A),e&&l(Ce),y(q,e),e&&l(Se),e&&l(G),e&&l(Pe),e&&l(S),e&&l(De),e&&l(F),e&&l(Ie),e&&l(H),e&&l(Le),e&&l(W),e&&l(Ae),y(j,e),e&&l(qe),e&&l(B),e&&l(He),y(K,e),e&&l(We),e&&l(M),e&&l(je),e&&l(Y),e&&l(Be),e&&l(P),e&&l(Ke),y(J,e),e&&l(Ye),y(R,e)}}}class Tn extends Vt{constructor(n){super(),Xt(this,n,null,bn,Zt,{})}}export{Tn as component};
