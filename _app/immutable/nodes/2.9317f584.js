import{s as ae,h as ke,n as B,i as Ae,d as $e,u as pe,e as _e,f as me,j as et,k as tt,r as nt,c as be,l as st}from"../chunks/scheduler.98d76842.js";import{S as re,i as le,A as at,H as rt,B as lt,j as Q,C as ft,f as _,D as We,a as d,g as X,h as Y,k as w,y,d as h,t as v,s as D,c as V,E as we,F as Ee,p as Ce,b as Pe,r as W,u as C,v as P,w as M,m as z,n as G}from"../chunks/index.eba105c3.js";import{g as ot}from"../chunks/spread.84d39b6c.js";import{X as it}from"../chunks/x-mark.107293df.js";import{m as de,g as ut}from"../chunks/_commonjsHelpers.9087c66b.js";import{p as Ve}from"../chunks/stores.08eea697.js";import{f as ne,a as T}from"../chunks/dictionaryUtils.1c62cfc4.js";import{a as Oe}from"../chunks/_t18s.298bc31f.js";import{G as ct}from"../chunks/github.10a1297e.js";function $t(s){let e,n,t='<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>',a=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},s[0]],r={};for(let i=0;i<a.length;i+=1)r=ke(r,a[i]);return{c(){e=at("svg"),n=new rt(!0),this.h()},l(i){e=lt(i,"svg",{viewBox:!0,width:!0,height:!0});var f=Q(e);n=ft(f,!0),f.forEach(_),this.h()},h(){n.a=null,We(e,r)},m(i,f){d(i,e,f),n.m(t,e)},p(i,[f]){We(e,r=ot(a,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},f&1&&i[0]]))},i:B,o:B,d(i){i&&_(e)}}}function pt(s,e,n){return s.$$set=t=>{n(0,e=ke(ke({},e),Ae(t)))},e=Ae(e),[e]}class _t extends re{constructor(e){super(),le(this,e,pt,$t,ae,{})}}function mt(s){let e,n,t,a,r;const i=s[3].default,f=$e(i,s,s[2],null);return{c(){e=X("a"),n=X("span"),f&&f.c(),this.h()},l(u){e=Y(u,"A",{href:!0,class:!0,"aria-current":!0});var l=Q(e);n=Y(l,"SPAN",{class:!0});var o=Q(n);f&&f.l(o),o.forEach(_),l.forEach(_),this.h()},h(){w(n,"class","truncate"),w(e,"href",s[1]),w(e,"class",t=de("flex justify-between gap-2 py-2 px-2 rounded-md text-sm transition text-zinc-600 hover:text-zinc-900",s[0]&&"bg-orange-50")),w(e,"aria-current",a=s[0]?"page":void 0)},m(u,l){d(u,e,l),y(e,n),f&&f.m(n,null),r=!0},p(u,[l]){f&&f.p&&(!r||l&4)&&pe(f,i,u,u[2],r?me(i,u[2],l,null):_e(u[2]),null),(!r||l&2)&&w(e,"href",u[1]),(!r||l&1&&t!==(t=de("flex justify-between gap-2 py-2 px-2 rounded-md text-sm transition text-zinc-600 hover:text-zinc-900",u[0]&&"bg-orange-50")))&&w(e,"class",t),(!r||l&1&&a!==(a=u[0]?"page":void 0))&&w(e,"aria-current",a)},i(u){r||(h(f,u),r=!0)},o(u){v(f,u),r=!1},d(u){u&&_(e),f&&f.d(u)}}}function gt(s,e,n){let{$$slots:t={},$$scope:a}=e,{active:r=!1}=e,{href:i="#"}=e;return s.$$set=f=>{"active"in f&&n(0,r=f.active),"href"in f&&n(1,i=f.href),"$$scope"in f&&n(2,a=f.$$scope)},[r,i,a,t]}class dt extends re{constructor(e){super(),le(this,e,gt,mt,ae,{active:0,href:1})}}function ht(s){let e,n;const t=s[1].default,a=$e(t,s,s[0],null);return{c(){e=X("h3"),a&&a.c(),this.h()},l(r){e=Y(r,"H3",{class:!0});var i=Q(e);a&&a.l(i),i.forEach(_),this.h()},h(){w(e,"class","uppercase font-bold text-gray-500 text-sm py-2")},m(r,i){d(r,e,i),a&&a.m(e,null),n=!0},p(r,[i]){a&&a.p&&(!n||i&1)&&pe(a,t,r,r[0],n?me(t,r[0],i,null):_e(r[0]),null)},i(r){n||(h(a,r),n=!0)},o(r){v(a,r),n=!1},d(r){r&&_(e),a&&a.d(r)}}}function vt(s,e,n){let{$$slots:t={},$$scope:a}=e;return s.$$set=r=>{"$$scope"in r&&n(0,a=r.$$scope)},[a,t]}class bt extends re{constructor(e){super(),le(this,e,vt,ht,ae,{})}}const kt=s=>({}),Me=s=>({Link:dt,Heading:bt});function wt(s){let e,n;const t=s[1].default,a=$e(t,s,s[0],Me);return{c(){e=X("div"),a&&a.c(),this.h()},l(r){e=Y(r,"DIV",{class:!0});var i=Q(e);a&&a.l(i),i.forEach(_),this.h()},h(){w(e,"class","grid")},m(r,i){d(r,e,i),a&&a.m(e,null),n=!0},p(r,[i]){a&&a.p&&(!n||i&1)&&pe(a,t,r,r[0],n?me(t,r[0],i,kt):_e(r[0]),Me)},i(r){n||(h(a,r),n=!0)},o(r){v(a,r),n=!1},d(r){r&&_(e),a&&a.d(r)}}}function Et(s,e,n){let{$$slots:t={},$$scope:a}=e;return s.$$set=r=>{"$$scope"in r&&n(0,a=r.$$scope)},[a,t]}class he extends re{constructor(e){super(),le(this,e,Et,wt,ae,{})}}var qe={exports:{}};(function(s){(function(e,n,t){if(!e)return;for(var a={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},r={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},i={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},f={option:"alt",command:"meta",return:"enter",escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},u,l=1;l<20;++l)a[111+l]="f"+l;for(l=0;l<=9;++l)a[l+96]=l.toString();function o(c,m,A){if(c.addEventListener){c.addEventListener(m,A,!1);return}c.attachEvent("on"+m,A)}function p(c){if(c.type=="keypress"){var m=String.fromCharCode(c.which);return c.shiftKey||(m=m.toLowerCase()),m}return a[c.which]?a[c.which]:r[c.which]?r[c.which]:String.fromCharCode(c.which).toLowerCase()}function $(c,m){return c.sort().join(",")===m.sort().join(",")}function g(c){var m=[];return c.shiftKey&&m.push("shift"),c.altKey&&m.push("alt"),c.ctrlKey&&m.push("ctrl"),c.metaKey&&m.push("meta"),m}function S(c){if(c.preventDefault){c.preventDefault();return}c.returnValue=!1}function I(c){if(c.stopPropagation){c.stopPropagation();return}c.cancelBubble=!0}function Z(c){return c=="shift"||c=="ctrl"||c=="alt"||c=="meta"}function F(){if(!u){u={};for(var c in a)c>95&&c<112||a.hasOwnProperty(c)&&(u[a[c]]=c)}return u}function te(c,m,A){return A||(A=F()[c]?"keydown":"keypress"),A=="keypress"&&m.length&&(A="keydown"),A}function j(c){return c==="+"?["+"]:(c=c.replace(/\+{2}/g,"+plus"),c.split("+"))}function L(c,m){var A,N,b,k=[];for(A=j(c),b=0;b<A.length;++b)N=A[b],f[N]&&(N=f[N]),m&&m!="keypress"&&i[N]&&(N=i[N],k.push("shift")),Z(N)&&k.push(N);return m=te(N,k,m),{key:N,modifiers:k,action:m}}function H(c,m){return c===null||c===n?!1:c===m?!0:H(c.parentNode,m)}function K(c){var m=this;if(c=c||n,!(m instanceof K))return new K(c);m.target=c,m._callbacks={},m._directMap={};var A={},N,b=!1,k=!1,fe=!1;function se(E){E=E||{};var q=!1,U;for(U in A){if(E[U]){q=!0;continue}A[U]=0}q||(fe=!1)}function ee(E,q,U,O,J,ie){var R,x,ge=[],ce=U.type;if(!m._callbacks[E])return[];for(ce=="keyup"&&Z(E)&&(q=[E]),R=0;R<m._callbacks[E].length;++R)if(x=m._callbacks[E][R],!(!O&&x.seq&&A[x.seq]!=x.level)&&ce==x.action&&(ce=="keypress"&&!U.metaKey&&!U.ctrlKey||$(q,x.modifiers))){var Fe=!O&&x.combo==J,xe=O&&x.seq==O&&x.level==ie;(Fe||xe)&&m._callbacks[E].splice(R,1),ge.push(x)}return ge}function oe(E,q,U,O){m.stopCallback(q,q.target||q.srcElement,U,O)||E(q,U)===!1&&(S(q),I(q))}m._handleKey=function(E,q,U){var O=ee(E,q,U),J,ie={},R=0,x=!1;for(J=0;J<O.length;++J)O[J].seq&&(R=Math.max(R,O[J].level));for(J=0;J<O.length;++J){if(O[J].seq){if(O[J].level!=R)continue;x=!0,ie[O[J].seq]=1,oe(O[J].callback,U,O[J].combo,O[J].seq);continue}x||oe(O[J].callback,U,O[J].combo)}var ge=U.type=="keypress"&&k;U.type==fe&&!Z(E)&&!ge&&se(ie),k=x&&U.type=="keydown"};function ue(E){typeof E.which!="number"&&(E.which=E.keyCode);var q=p(E);if(q){if(E.type=="keyup"&&b===q){b=!1;return}m.handleKey(q,g(E),E)}}function Qe(){clearTimeout(N),N=setTimeout(se,1e3)}function Ze(E,q,U,O){A[E]=0;function J(ce){return function(){fe=ce,++A[E],Qe()}}function ie(ce){oe(U,ce,E),O!=="keyup"&&(b=p(ce)),setTimeout(se,10)}for(var R=0;R<q.length;++R){var x=R+1===q.length,ge=x?ie:J(O||L(q[R+1]).action);Se(q[R],ge,O,E,R)}}function Se(E,q,U,O,J){m._directMap[E+":"+U]=q,E=E.replace(/\s+/g," ");var ie=E.split(" "),R;if(ie.length>1){Ze(E,ie,q,U);return}R=L(E,U),m._callbacks[R.key]=m._callbacks[R.key]||[],ee(R.key,R.modifiers,{type:R.action},O,E,J),m._callbacks[R.key][O?"unshift":"push"]({callback:q,modifiers:R.modifiers,action:R.action,seq:O,level:J,combo:E})}m._bindMultiple=function(E,q,U){for(var O=0;O<E.length;++O)Se(E[O],q,U)},o(c,"keypress",ue),o(c,"keydown",ue),o(c,"keyup",ue)}K.prototype.bind=function(c,m,A){var N=this;return c=c instanceof Array?c:[c],N._bindMultiple.call(N,c,m,A),N},K.prototype.unbind=function(c,m){var A=this;return A.bind.call(A,c,function(){},m)},K.prototype.trigger=function(c,m){var A=this;return A._directMap[c+":"+m]&&A._directMap[c+":"+m]({},c),A},K.prototype.reset=function(){var c=this;return c._callbacks={},c._directMap={},c},K.prototype.stopCallback=function(c,m){var A=this;if((" "+m.className+" ").indexOf(" mousetrap ")>-1||H(m,A.target))return!1;if("composedPath"in c&&typeof c.composedPath=="function"){var N=c.composedPath()[0];N!==c.target&&(m=N)}return m.tagName=="INPUT"||m.tagName=="SELECT"||m.tagName=="TEXTAREA"||m.isContentEditable},K.prototype.handleKey=function(){var c=this;return c._handleKey.apply(c,arguments)},K.addKeycodes=function(c){for(var m in c)c.hasOwnProperty(m)&&(a[m]=c[m]);u=null},K.init=function(){var c=K(n);for(var m in c)m.charAt(0)!=="_"&&(K[m]=function(A){return function(){return c[A].apply(c,arguments)}}(m))},K.init(),e.Mousetrap=K,s.exports&&(s.exports=K),typeof t=="function"&&t.amd&&t(function(){return K})})(typeof window<"u"?window:null,typeof window<"u"?document:null)})(qe);var St=qe.exports;const Te=ut(St);function At(s){return(...e)=>s.reduce((n,t)=>n=[t(...n)],e||[])}function Wt(s){let e=document.defaultView.getComputedStyle(s,null);return e.getPropertyValue("display")!=="none"&&e.getPropertyValue("visibility")!=="hidden"}const Ct=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'];function Pt(s){const e={"alt+tab":f,end:l,home:u,"shift+tab":f,down:i,tab:i,up:f};Object.entries(e).forEach(([o,p])=>{Te.bind(o,At([$=>({event:$}),n,t,a,r,p]))});function n(o){return o.event.preventDefault(),o}function t(o){return o.event.stopPropagation(),o}function a(o){let p=[...s.querySelectorAll(Ct)];return{...o,allFocusableItems:p.filter(Wt)}}function r(o){let p=document.activeElement;return p&&!s.contains(p)?o:{...o,currentlyFocusedItem:p}}function i({allFocusableItems:o,currentlyFocusedItem:p}){if(!p){o[0]&&o[0].focus();return}let $=o.indexOf(p);if(o.length-1===$){o[0]&&o[0].focus();return}o[$+1]&&o[$+1].focus()}function f({allFocusableItems:o,currentlyFocusedItem:p}){if(!p){o[o.length-1].focus();return}let $=o.indexOf(p);if($===0){o[o.length-1]&&o[o.length-1].focus();return}o[$-1]&&o[$-1].focus()}function u({allFocusableItems:o}){o[0]&&o[0].focus()}function l({allFocusableItems:o}){o[o.length-1].focus()}return{destroy(){Object.keys(e).forEach(o=>Te.unbind(o))}}}function Mt(s,e){let n=null;function t(a){if(a){const{destroy:r}=Pt(s);n=r}else n&&n(),n=null}return t(e),{update:t,destroy(){n&&n(),n=null}}}const Be=(s=void 0)=>ne("guide",{de:"Anleitung",en:"Guide"},s),He=(s=void 0)=>ne("gettingStarted",{de:"Schnellstart",en:"Getting Started"},s),ye=(s=void 0)=>ne("messageSyntax",{de:"Syntax",en:"Syntax"},s),Ne=(s=void 0)=>ne("switching_locales",{de:"Sprache wechseln",en:"Switching Locales"},s),je=(s=void 0)=>ne("best_practices",{de:"Empfehlungen",en:"Best Practices"},s),Re=(s=void 0)=>ne("seo",{de:"SEO",en:"SEO"},s),ze=(s=void 0)=>ne("reference",{de:"Referenz",en:"Reference"},s),Ge=(s=void 0)=>ne("$t18s",{de:"$t18s",en:"$t18s"},s),Ie=(s=void 0)=>ne("plugin_config",{de:"Plugin Konfiguration",en:"Plugin Configuration"},s),Ue=(s=void 0)=>ne("appendix",{de:"Anhang",en:"Appendix"},s),Xe=(s=void 0)=>ne("comparisons",{de:"Vergleiche",en:"Comparisons"},s),Ye=(s=void 0)=>ne("roadmap",{de:"Weiterentwicklung",en:"Roadmap"},s),Je=(s=void 0)=>ne("playground",{de:"Playground",en:"Playground"},s);function Le(s){let e,n,t;return{c(){e=X("div"),this.h()},l(a){e=Y(a,"DIV",{class:!0}),Q(e).forEach(_),this.h()},h(){w(e,"class","fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden")},m(a,r){d(a,e,r),n||(t=Ee(e,"click",s[3]),n=!0)},p:B,d(a){a&&_(e),n=!1,t()}}}function Tt(s){let e,n;return e=new _t({props:{class:"w-6 h-6"}}),{c(){W(e.$$.fragment)},l(t){C(e.$$.fragment,t)},m(t,a){P(e,t,a),n=!0},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){M(e,t)}}}function Lt(s){let e,n;return e=new it({props:{class:"w-6 h-6"}}),{c(){W(e.$$.fragment)},l(t){C(e.$$.fragment,t)},m(t,a){P(e,t,a),n=!0},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){M(e,t)}}}function Ke(s){let e,n,t,a,r,i,f,u,l,o,p;return n=new he({props:{$$slots:{default:[qt,({Heading:$,Link:g})=>({6:$,7:g}),({Heading:$,Link:g})=>($?64:0)|(g?128:0)]},$$scope:{ctx:s}}}),a=new he({props:{$$slots:{default:[yt,({Heading:$,Link:g})=>({6:$,7:g}),({Heading:$,Link:g})=>($?64:0)|(g?128:0)]},$$scope:{ctx:s}}}),i=new he({props:{$$slots:{default:[zt,({Heading:$,Link:g})=>({6:$,7:g}),({Heading:$,Link:g})=>($?64:0)|(g?128:0)]},$$scope:{ctx:s}}}),u=new he({props:{$$slots:{default:[Yt,({Heading:$,Link:g})=>({6:$,7:g}),({Heading:$,Link:g})=>($?64:0)|(g?128:0)]},$$scope:{ctx:s}}}),{c(){e=X("nav"),W(n.$$.fragment),t=D(),W(a.$$.fragment),r=D(),W(i.$$.fragment),f=D(),W(u.$$.fragment),this.h()},l($){e=Y($,"NAV",{class:!0});var g=Q(e);C(n.$$.fragment,g),t=V(g),C(a.$$.fragment,g),r=V(g),C(i.$$.fragment,g),f=V(g),C(u.$$.fragment,g),g.forEach(_),this.h()},h(){w(e,"class","absolute grid gap-2 top-0 left-0 -translate-y-full bg-white rounded-t-lg border-t w-full p-4 max-h-96 overflow-y-auto")},m($,g){d($,e,g),P(n,e,null),y(e,t),P(a,e,null),y(e,r),P(i,e,null),y(e,f),P(u,e,null),l=!0,o||(p=Ee(e,"click",s[5]),o=!0)},p($,g){const S={};g&262&&(S.$$scope={dirty:g,ctx:$}),n.$set(S);const I={};g&262&&(I.$$scope={dirty:g,ctx:$}),a.$set(I);const Z={};g&262&&(Z.$$scope={dirty:g,ctx:$}),i.$set(Z);const F={};g&262&&(F.$$scope={dirty:g,ctx:$}),u.$set(F)},i($){l||(h(n.$$.fragment,$),h(a.$$.fragment,$),h(i.$$.fragment,$),h(u.$$.fragment,$),l=!0)},o($){v(n.$$.fragment,$),v(a.$$.fragment,$),v(i.$$.fragment,$),v(u.$$.fragment,$),l=!1},d($){$&&_(e),M(n),M(a),M(i),M(u),o=!1,p()}}}function Kt(s){let e=Be()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function Dt(s){let e=He()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function Vt(s){let e=ye()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function Ot(s){let e=Ne()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function qt(s){let e,n,t,a,r,i,f,u;return e=new s[6]({props:{$$slots:{default:[Kt]},$$scope:{ctx:s}}}),t=new s[7]({props:{href:T("/[[locale=locale]]/getting-started",s[1]),active:s[2].url.pathname.endsWith("/getting-started"),$$slots:{default:[Dt]},$$scope:{ctx:s}}}),r=new s[7]({props:{href:T("/[[locale=locale]]/syntax",s[1]),active:s[2].url.pathname.endsWith("/syntax"),$$slots:{default:[Vt]},$$scope:{ctx:s}}}),f=new s[7]({props:{href:T("/[[locale=locale]]/switching-locales",s[1]),active:s[2].url.pathname.endsWith("/switching-locales"),$$slots:{default:[Ot]},$$scope:{ctx:s}}}),{c(){W(e.$$.fragment),n=D(),W(t.$$.fragment),a=D(),W(r.$$.fragment),i=D(),W(f.$$.fragment)},l(l){C(e.$$.fragment,l),n=V(l),C(t.$$.fragment,l),a=V(l),C(r.$$.fragment,l),i=V(l),C(f.$$.fragment,l)},m(l,o){P(e,l,o),d(l,n,o),P(t,l,o),d(l,a,o),P(r,l,o),d(l,i,o),P(f,l,o),u=!0},p(l,o){const p={};o&256&&(p.$$scope={dirty:o,ctx:l}),e.$set(p);const $={};o&2&&($.href=T("/[[locale=locale]]/getting-started",l[1])),o&4&&($.active=l[2].url.pathname.endsWith("/getting-started")),o&256&&($.$$scope={dirty:o,ctx:l}),t.$set($);const g={};o&2&&(g.href=T("/[[locale=locale]]/syntax",l[1])),o&4&&(g.active=l[2].url.pathname.endsWith("/syntax")),o&256&&(g.$$scope={dirty:o,ctx:l}),r.$set(g);const S={};o&2&&(S.href=T("/[[locale=locale]]/switching-locales",l[1])),o&4&&(S.active=l[2].url.pathname.endsWith("/switching-locales")),o&256&&(S.$$scope={dirty:o,ctx:l}),f.$set(S)},i(l){u||(h(e.$$.fragment,l),h(t.$$.fragment,l),h(r.$$.fragment,l),h(f.$$.fragment,l),u=!0)},o(l){v(e.$$.fragment,l),v(t.$$.fragment,l),v(r.$$.fragment,l),v(f.$$.fragment,l),u=!1},d(l){l&&(_(n),_(a),_(i)),M(e,l),M(t,l),M(r,l),M(f,l)}}}function Bt(s){let e=je()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function Ht(s){let e=Re()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function yt(s){let e,n,t,a;return e=new s[6]({props:{$$slots:{default:[Bt]},$$scope:{ctx:s}}}),t=new s[7]({props:{href:T("/[[locale=locale]]/seo",s[1]),active:s[2].url.pathname.endsWith("/seo"),$$slots:{default:[Ht]},$$scope:{ctx:s}}}),{c(){W(e.$$.fragment),n=D(),W(t.$$.fragment)},l(r){C(e.$$.fragment,r),n=V(r),C(t.$$.fragment,r)},m(r,i){P(e,r,i),d(r,n,i),P(t,r,i),a=!0},p(r,i){const f={};i&256&&(f.$$scope={dirty:i,ctx:r}),e.$set(f);const u={};i&2&&(u.href=T("/[[locale=locale]]/seo",r[1])),i&4&&(u.active=r[2].url.pathname.endsWith("/seo")),i&256&&(u.$$scope={dirty:i,ctx:r}),t.$set(u)},i(r){a||(h(e.$$.fragment,r),h(t.$$.fragment,r),a=!0)},o(r){v(e.$$.fragment,r),v(t.$$.fragment,r),a=!1},d(r){r&&_(n),M(e,r),M(t,r)}}}function Nt(s){let e=ze()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function jt(s){let e=Ie()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function Rt(s){let e=Ge()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function zt(s){let e,n,t,a,r,i;return e=new s[6]({props:{$$slots:{default:[Nt]},$$scope:{ctx:s}}}),t=new s[7]({props:{href:T("/[[locale=locale]]/plugin-config",s[1]),active:s[2].url.pathname.endsWith("/plugin-config"),$$slots:{default:[jt]},$$scope:{ctx:s}}}),r=new s[7]({props:{href:T("/[[locale=locale]]/$t18s",s[1]),active:s[2].url.pathname.endsWith("/$t18s"),$$slots:{default:[Rt]},$$scope:{ctx:s}}}),{c(){W(e.$$.fragment),n=D(),W(t.$$.fragment),a=D(),W(r.$$.fragment)},l(f){C(e.$$.fragment,f),n=V(f),C(t.$$.fragment,f),a=V(f),C(r.$$.fragment,f)},m(f,u){P(e,f,u),d(f,n,u),P(t,f,u),d(f,a,u),P(r,f,u),i=!0},p(f,u){const l={};u&256&&(l.$$scope={dirty:u,ctx:f}),e.$set(l);const o={};u&2&&(o.href=T("/[[locale=locale]]/plugin-config",f[1])),u&4&&(o.active=f[2].url.pathname.endsWith("/plugin-config")),u&256&&(o.$$scope={dirty:u,ctx:f}),t.$set(o);const p={};u&2&&(p.href=T("/[[locale=locale]]/$t18s",f[1])),u&4&&(p.active=f[2].url.pathname.endsWith("/$t18s")),u&256&&(p.$$scope={dirty:u,ctx:f}),r.$set(p)},i(f){i||(h(e.$$.fragment,f),h(t.$$.fragment,f),h(r.$$.fragment,f),i=!0)},o(f){v(e.$$.fragment,f),v(t.$$.fragment,f),v(r.$$.fragment,f),i=!1},d(f){f&&(_(n),_(a)),M(e,f),M(t,f),M(r,f)}}}function Gt(s){let e=Ue()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function It(s){let e=Xe()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function Ut(s){let e=Ye()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function Xt(s){let e=Je()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function Yt(s){let e,n,t,a,r,i,f,u;return e=new s[6]({props:{$$slots:{default:[Gt]},$$scope:{ctx:s}}}),t=new s[7]({props:{href:T("/[[locale=locale]]/comparisons",s[1]),active:s[2].url.pathname.endsWith("/comparisons"),$$slots:{default:[It]},$$scope:{ctx:s}}}),r=new s[7]({props:{href:T("/[[locale=locale]]/roadmap",s[1]),active:s[2].url.pathname.endsWith("/roadmap"),$$slots:{default:[Ut]},$$scope:{ctx:s}}}),f=new s[7]({props:{href:T("/[[locale=locale]]/playground",s[1]),active:s[2].url.pathname.endsWith("/playground"),$$slots:{default:[Xt]},$$scope:{ctx:s}}}),{c(){W(e.$$.fragment),n=D(),W(t.$$.fragment),a=D(),W(r.$$.fragment),i=D(),W(f.$$.fragment)},l(l){C(e.$$.fragment,l),n=V(l),C(t.$$.fragment,l),a=V(l),C(r.$$.fragment,l),i=V(l),C(f.$$.fragment,l)},m(l,o){P(e,l,o),d(l,n,o),P(t,l,o),d(l,a,o),P(r,l,o),d(l,i,o),P(f,l,o),u=!0},p(l,o){const p={};o&256&&(p.$$scope={dirty:o,ctx:l}),e.$set(p);const $={};o&2&&($.href=T("/[[locale=locale]]/comparisons",l[1])),o&4&&($.active=l[2].url.pathname.endsWith("/comparisons")),o&256&&($.$$scope={dirty:o,ctx:l}),t.$set($);const g={};o&2&&(g.href=T("/[[locale=locale]]/roadmap",l[1])),o&4&&(g.active=l[2].url.pathname.endsWith("/roadmap")),o&256&&(g.$$scope={dirty:o,ctx:l}),r.$set(g);const S={};o&2&&(S.href=T("/[[locale=locale]]/playground",l[1])),o&4&&(S.active=l[2].url.pathname.endsWith("/playground")),o&256&&(S.$$scope={dirty:o,ctx:l}),f.$set(S)},i(l){u||(h(e.$$.fragment,l),h(t.$$.fragment,l),h(r.$$.fragment,l),h(f.$$.fragment,l),u=!0)},o(l){v(e.$$.fragment,l),v(t.$$.fragment,l),v(r.$$.fragment,l),v(f.$$.fragment,l),u=!1},d(l){l&&(_(n),_(a),_(i)),M(e,l),M(t,l),M(r,l),M(f,l)}}}function Jt(s){let e,n,t,a,r='<img src="/icon.svg" alt="t18s" class="w-6 h-6"/> <span class="font-semibold">T18S</span>',i,f,u,l,o,p,$,g,S,I=s[0]&&Le(s);const Z=[Lt,Tt],F=[];function te(L,H){return L[0]?0:1}u=te(s),l=F[u]=Z[u](s);let j=s[0]&&Ke(s);return{c(){I&&I.c(),e=D(),n=X("header"),t=X("div"),a=X("a"),a.innerHTML=r,i=D(),f=X("button"),l.c(),o=D(),j&&j.c(),this.h()},l(L){I&&I.l(L),e=V(L),n=Y(L,"HEADER",{class:!0});var H=Q(n);t=Y(H,"DIV",{class:!0});var K=Q(t);a=Y(K,"A",{class:!0,href:!0,"data-svelte-h":!0}),we(a)!=="svelte-16j6fdo"&&(a.innerHTML=r),i=V(K),f=Y(K,"BUTTON",{});var c=Q(f);l.l(c),c.forEach(_),K.forEach(_),o=V(H),j&&j.l(H),H.forEach(_),this.h()},h(){w(a,"class","flex gap-2"),w(a,"href","/"),w(t,"class","flex p-4 border-t items-center justify-between z-50 bg-white"),w(n,"class","block md:hidden relative z-50 print:hidden")},m(L,H){I&&I.m(L,H),d(L,e,H),d(L,n,H),y(n,t),y(t,a),y(t,i),y(t,f),F[u].m(f,null),y(n,o),j&&j.m(n,null),$=!0,g||(S=[Ee(f,"click",s[4]),et(p=Mt.call(null,n,s[0]))],g=!0)},p(L,[H]){L[0]?I?I.p(L,H):(I=Le(L),I.c(),I.m(e.parentNode,e)):I&&(I.d(1),I=null);let K=u;u=te(L),u!==K&&(Ce(),v(F[K],1,1,()=>{F[K]=null}),Pe(),l=F[u],l||(l=F[u]=Z[u](L),l.c()),h(l,1),l.m(f,null)),L[0]?j?(j.p(L,H),H&1&&h(j,1)):(j=Ke(L),j.c(),h(j,1),j.m(n,null)):j&&(Ce(),v(j,1,1,()=>{j=null}),Pe()),p&&tt(p.update)&&H&1&&p.update.call(null,L[0])},i(L){$||(h(l),h(j),$=!0)},o(L){v(l),v(j),$=!1},d(L){L&&(_(e),_(n)),I&&I.d(L),F[u].d(),j&&j.d(),g=!1,nt(S)}}}function Qt(s,e,n){let t,a;be(s,Oe,l=>n(1,t=l)),be(s,Ve,l=>n(2,a=l));let r=!1;return[r,t,a,()=>n(0,r=!1),()=>n(0,r=!r),()=>n(0,r=!1)]}class Zt extends re{constructor(e){super(),le(this,e,Qt,Jt,ae,{})}}function Ft(s){let e,n;const t=s[1].default,a=$e(t,s,s[0],null);return{c(){e=X("h3"),a&&a.c(),this.h()},l(r){e=Y(r,"H3",{class:!0});var i=Q(e);a&&a.l(i),i.forEach(_),this.h()},h(){w(e,"class","uppercase font-bold text-gray-500 text-sm pb-2 pt-4")},m(r,i){d(r,e,i),a&&a.m(e,null),n=!0},p(r,[i]){a&&a.p&&(!n||i&1)&&pe(a,t,r,r[0],n?me(t,r[0],i,null):_e(r[0]),null)},i(r){n||(h(a,r),n=!0)},o(r){v(a,r),n=!1},d(r){r&&_(e),a&&a.d(r)}}}function xt(s,e,n){let{$$slots:t={},$$scope:a}=e;return s.$$set=r=>{"$$scope"in r&&n(0,a=r.$$scope)},[a,t]}class en extends re{constructor(e){super(),le(this,e,xt,Ft,ae,{})}}function tn(s){let e,n,t,a;const r=s[3].default,i=$e(r,s,s[2],null);return{c(){e=X("a"),i&&i.c(),this.h()},l(f){e=Y(f,"A",{class:!0,"data-sveltekit-keepfocus":!0,"aria-current":!0,href:!0});var u=Q(e);i&&i.l(u),u.forEach(_),this.h()},h(){w(e,"class",n=de("text-gray-700 relative outline-orange-400 hover:bg-orange-50 py-1.5 px-4 rounded-r-md border-l border-gray-100",s[0]&&" text-orange-600 border-orange-600","focus-visible:bg-orange-400/20 focus-visible:outline-none")),w(e,"data-sveltekit-keepfocus",""),w(e,"aria-current",t=s[0]?"page":void 0),w(e,"href",s[1])},m(f,u){d(f,e,u),i&&i.m(e,null),a=!0},p(f,[u]){i&&i.p&&(!a||u&4)&&pe(i,r,f,f[2],a?me(r,f[2],u,null):_e(f[2]),null),(!a||u&1&&n!==(n=de("text-gray-700 relative outline-orange-400 hover:bg-orange-50 py-1.5 px-4 rounded-r-md border-l border-gray-100",f[0]&&" text-orange-600 border-orange-600","focus-visible:bg-orange-400/20 focus-visible:outline-none")))&&w(e,"class",n),(!a||u&1&&t!==(t=f[0]?"page":void 0))&&w(e,"aria-current",t),(!a||u&2)&&w(e,"href",f[1])},i(f){a||(h(i,f),a=!0)},o(f){v(i,f),a=!1},d(f){f&&_(e),i&&i.d(f)}}}function nn(s,e,n){let{$$slots:t={},$$scope:a}=e,{active:r=!1}=e,{href:i}=e;return s.$$set=f=>{"active"in f&&n(0,r=f.active),"href"in f&&n(1,i=f.href),"$$scope"in f&&n(2,a=f.$$scope)},[r,i,a,t]}class sn extends re{constructor(e){super(),le(this,e,nn,tn,ae,{active:0,href:1})}}const an=s=>({}),De=s=>({Heading:en,Link:sn});function rn(s){let e,n;const t=s[1].default,a=$e(t,s,s[0],De);return{c(){e=X("div"),a&&a.c(),this.h()},l(r){e=Y(r,"DIV",{class:!0});var i=Q(e);a&&a.l(i),i.forEach(_),this.h()},h(){w(e,"class","grid")},m(r,i){d(r,e,i),a&&a.m(e,null),n=!0},p(r,[i]){a&&a.p&&(!n||i&1)&&pe(a,t,r,r[0],n?me(t,r[0],i,an):_e(r[0]),De)},i(r){n||(h(a,r),n=!0)},o(r){v(a,r),n=!1},d(r){r&&_(e),a&&a.d(r)}}}function ln(s,e,n){let{$$slots:t={},$$scope:a}=e;return s.$$set=r=>{"$$scope"in r&&n(0,a=r.$$scope)},[a,t]}class ve extends re{constructor(e){super(),le(this,e,ln,rn,ae,{})}}function fn(s){let e=Be()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function on(s){let e=He()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function un(s){let e=ye()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function cn(s){let e=Ne()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function $n(s){let e,n,t,a,r,i,f,u;return e=new s[2]({props:{$$slots:{default:[fn]},$$scope:{ctx:s}}}),t=new s[3]({props:{href:T("/[[locale=locale]]/getting-started",s[0]),active:s[1].url.pathname.endsWith("/getting-started"),$$slots:{default:[on]},$$scope:{ctx:s}}}),r=new s[3]({props:{href:T("/[[locale=locale]]/syntax",s[0]),active:s[1].url.pathname.endsWith("/syntax"),$$slots:{default:[un]},$$scope:{ctx:s}}}),f=new s[3]({props:{href:T("/[[locale=locale]]/switching-locales",s[0]),active:s[1].url.pathname.endsWith("/switching-locales"),$$slots:{default:[cn]},$$scope:{ctx:s}}}),{c(){W(e.$$.fragment),n=D(),W(t.$$.fragment),a=D(),W(r.$$.fragment),i=D(),W(f.$$.fragment)},l(l){C(e.$$.fragment,l),n=V(l),C(t.$$.fragment,l),a=V(l),C(r.$$.fragment,l),i=V(l),C(f.$$.fragment,l)},m(l,o){P(e,l,o),d(l,n,o),P(t,l,o),d(l,a,o),P(r,l,o),d(l,i,o),P(f,l,o),u=!0},p(l,o){const p={};o&16&&(p.$$scope={dirty:o,ctx:l}),e.$set(p);const $={};o&1&&($.href=T("/[[locale=locale]]/getting-started",l[0])),o&2&&($.active=l[1].url.pathname.endsWith("/getting-started")),o&16&&($.$$scope={dirty:o,ctx:l}),t.$set($);const g={};o&1&&(g.href=T("/[[locale=locale]]/syntax",l[0])),o&2&&(g.active=l[1].url.pathname.endsWith("/syntax")),o&16&&(g.$$scope={dirty:o,ctx:l}),r.$set(g);const S={};o&1&&(S.href=T("/[[locale=locale]]/switching-locales",l[0])),o&2&&(S.active=l[1].url.pathname.endsWith("/switching-locales")),o&16&&(S.$$scope={dirty:o,ctx:l}),f.$set(S)},i(l){u||(h(e.$$.fragment,l),h(t.$$.fragment,l),h(r.$$.fragment,l),h(f.$$.fragment,l),u=!0)},o(l){v(e.$$.fragment,l),v(t.$$.fragment,l),v(r.$$.fragment,l),v(f.$$.fragment,l),u=!1},d(l){l&&(_(n),_(a),_(i)),M(e,l),M(t,l),M(r,l),M(f,l)}}}function pn(s){let e=je()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function _n(s){let e=Re()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function mn(s){let e,n,t,a;return e=new s[2]({props:{$$slots:{default:[pn]},$$scope:{ctx:s}}}),t=new s[3]({props:{href:T("/[[locale=locale]]/seo",s[0]),active:s[1].url.pathname.endsWith("/seo"),$$slots:{default:[_n]},$$scope:{ctx:s}}}),{c(){W(e.$$.fragment),n=D(),W(t.$$.fragment)},l(r){C(e.$$.fragment,r),n=V(r),C(t.$$.fragment,r)},m(r,i){P(e,r,i),d(r,n,i),P(t,r,i),a=!0},p(r,i){const f={};i&16&&(f.$$scope={dirty:i,ctx:r}),e.$set(f);const u={};i&1&&(u.href=T("/[[locale=locale]]/seo",r[0])),i&2&&(u.active=r[1].url.pathname.endsWith("/seo")),i&16&&(u.$$scope={dirty:i,ctx:r}),t.$set(u)},i(r){a||(h(e.$$.fragment,r),h(t.$$.fragment,r),a=!0)},o(r){v(e.$$.fragment,r),v(t.$$.fragment,r),a=!1},d(r){r&&_(n),M(e,r),M(t,r)}}}function gn(s){let e=ze()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function dn(s){let e=Ie()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function hn(s){let e=Ge()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function vn(s){let e,n,t,a,r,i;return e=new s[2]({props:{$$slots:{default:[gn]},$$scope:{ctx:s}}}),t=new s[3]({props:{href:T("/[[locale=locale]]/plugin-config",s[0]),active:s[1].url.pathname.endsWith("/plugin-config"),$$slots:{default:[dn]},$$scope:{ctx:s}}}),r=new s[3]({props:{href:T("/[[locale=locale]]/$t18s",s[0]),active:s[1].url.pathname.endsWith("/$t18s"),$$slots:{default:[hn]},$$scope:{ctx:s}}}),{c(){W(e.$$.fragment),n=D(),W(t.$$.fragment),a=D(),W(r.$$.fragment)},l(f){C(e.$$.fragment,f),n=V(f),C(t.$$.fragment,f),a=V(f),C(r.$$.fragment,f)},m(f,u){P(e,f,u),d(f,n,u),P(t,f,u),d(f,a,u),P(r,f,u),i=!0},p(f,u){const l={};u&16&&(l.$$scope={dirty:u,ctx:f}),e.$set(l);const o={};u&1&&(o.href=T("/[[locale=locale]]/plugin-config",f[0])),u&2&&(o.active=f[1].url.pathname.endsWith("/plugin-config")),u&16&&(o.$$scope={dirty:u,ctx:f}),t.$set(o);const p={};u&1&&(p.href=T("/[[locale=locale]]/$t18s",f[0])),u&2&&(p.active=f[1].url.pathname.endsWith("/$t18s")),u&16&&(p.$$scope={dirty:u,ctx:f}),r.$set(p)},i(f){i||(h(e.$$.fragment,f),h(t.$$.fragment,f),h(r.$$.fragment,f),i=!0)},o(f){v(e.$$.fragment,f),v(t.$$.fragment,f),v(r.$$.fragment,f),i=!1},d(f){f&&(_(n),_(a)),M(e,f),M(t,f),M(r,f)}}}function bn(s){let e=Ue()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function kn(s){let e=Xe()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function wn(s){let e=Ye()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function En(s){let e=Je()+"",n;return{c(){n=z(e)},l(t){n=G(t,e)},m(t,a){d(t,n,a)},p:B,d(t){t&&_(n)}}}function Sn(s){let e,n,t,a,r,i,f,u;return e=new s[2]({props:{$$slots:{default:[bn]},$$scope:{ctx:s}}}),t=new s[3]({props:{href:T("/[[locale=locale]]/comparisons",s[0]),active:s[1].url.pathname.endsWith("/comparisons"),$$slots:{default:[kn]},$$scope:{ctx:s}}}),r=new s[3]({props:{href:T("/[[locale=locale]]/roadmap",s[0]),active:s[1].url.pathname.endsWith("/roadmap"),$$slots:{default:[wn]},$$scope:{ctx:s}}}),f=new s[3]({props:{href:T("/[[locale=locale]]/playground",s[0]),active:s[1].url.pathname.endsWith("/playground"),$$slots:{default:[En]},$$scope:{ctx:s}}}),{c(){W(e.$$.fragment),n=D(),W(t.$$.fragment),a=D(),W(r.$$.fragment),i=D(),W(f.$$.fragment)},l(l){C(e.$$.fragment,l),n=V(l),C(t.$$.fragment,l),a=V(l),C(r.$$.fragment,l),i=V(l),C(f.$$.fragment,l)},m(l,o){P(e,l,o),d(l,n,o),P(t,l,o),d(l,a,o),P(r,l,o),d(l,i,o),P(f,l,o),u=!0},p(l,o){const p={};o&16&&(p.$$scope={dirty:o,ctx:l}),e.$set(p);const $={};o&1&&($.href=T("/[[locale=locale]]/comparisons",l[0])),o&2&&($.active=l[1].url.pathname.endsWith("/comparisons")),o&16&&($.$$scope={dirty:o,ctx:l}),t.$set($);const g={};o&1&&(g.href=T("/[[locale=locale]]/roadmap",l[0])),o&2&&(g.active=l[1].url.pathname.endsWith("/roadmap")),o&16&&(g.$$scope={dirty:o,ctx:l}),r.$set(g);const S={};o&1&&(S.href=T("/[[locale=locale]]/playground",l[0])),o&2&&(S.active=l[1].url.pathname.endsWith("/playground")),o&16&&(S.$$scope={dirty:o,ctx:l}),f.$set(S)},i(l){u||(h(e.$$.fragment,l),h(t.$$.fragment,l),h(r.$$.fragment,l),h(f.$$.fragment,l),u=!0)},o(l){v(e.$$.fragment,l),v(t.$$.fragment,l),v(r.$$.fragment,l),v(f.$$.fragment,l),u=!1},d(l){l&&(_(n),_(a),_(i)),M(e,l),M(t,l),M(r,l),M(f,l)}}}function An(s){let e,n,t,a,r,i,f,u="T18S",l,o,p,$,g,S,I,Z,F,te,j,L,H,K,c="View on Github",m,A,N;return $=new ve({props:{$$slots:{default:[$n,({Heading:b,Link:k})=>({2:b,3:k}),({Heading:b,Link:k})=>(b?4:0)|(k?8:0)]},$$scope:{ctx:s}}}),S=new ve({props:{$$slots:{default:[mn,({Heading:b,Link:k})=>({2:b,3:k}),({Heading:b,Link:k})=>(b?4:0)|(k?8:0)]},$$scope:{ctx:s}}}),Z=new ve({props:{$$slots:{default:[vn,({Heading:b,Link:k})=>({2:b,3:k}),({Heading:b,Link:k})=>(b?4:0)|(k?8:0)]},$$scope:{ctx:s}}}),te=new ve({props:{$$slots:{default:[Sn,({Heading:b,Link:k})=>({2:b,3:k}),({Heading:b,Link:k})=>(b?4:0)|(k?8:0)]},$$scope:{ctx:s}}}),A=new ct({props:{class:"w-6 h-6"}}),{c(){e=X("aside"),n=X("header"),t=X("a"),a=X("img"),i=D(),f=X("span"),f.textContent=u,o=D(),p=X("nav"),W($.$$.fragment),g=D(),W(S.$$.fragment),I=D(),W(Z.$$.fragment),F=D(),W(te.$$.fragment),j=D(),L=X("footer"),H=X("a"),K=X("span"),K.textContent=c,m=D(),W(A.$$.fragment),this.h()},l(b){e=Y(b,"ASIDE",{role:!0,class:!0});var k=Q(e);n=Y(k,"HEADER",{});var fe=Q(n);t=Y(fe,"A",{href:!0,class:!0});var se=Q(t);a=Y(se,"IMG",{src:!0,alt:!0,class:!0}),i=V(se),f=Y(se,"SPAN",{class:!0,"data-svelte-h":!0}),we(f)!=="svelte-a2c855"&&(f.textContent=u),se.forEach(_),fe.forEach(_),o=V(k),p=Y(k,"NAV",{class:!0});var ee=Q(p);C($.$$.fragment,ee),g=V(ee),C(S.$$.fragment,ee),I=V(ee),C(Z.$$.fragment,ee),F=V(ee),C(te.$$.fragment,ee),ee.forEach(_),j=V(k),L=Y(k,"FOOTER",{});var oe=Q(L);H=Y(oe,"A",{class:!0,href:!0,target:!0});var ue=Q(H);K=Y(ue,"SPAN",{class:!0,"data-svelte-h":!0}),we(K)!=="svelte-12kxj66"&&(K.textContent=c),m=V(ue),C(A.$$.fragment,ue),ue.forEach(_),oe.forEach(_),k.forEach(_),this.h()},h(){st(a.src,r="/icon.svg")||w(a,"src",r),w(a,"alt","t18s"),w(a,"class","w-8 h-8 bg-transparent"),w(f,"class","text-lg font-bold text-gray-950"),w(t,"href",l=T("/[[locale=locale]]",s[0])),w(t,"class","flex gap-2 items-center outline-orange-400"),w(p,"class","grid gap-2"),w(K,"class","sr-only"),w(H,"class",de("text-gray-300 hover:text-orange-500 rounded-full outline-offset-4 outline-orange-400","focus-visible:text-orange-400","grid place-items-center w-min")),w(H,"href","https://github.com/LorisSigrist/t18s"),w(H,"target","_blank"),w(e,"role","banner"),w(e,"class","hidden md:flex flex-col w-96 gap-8 overflow-y-auto pt-16 px-12 print:hidden")},m(b,k){d(b,e,k),y(e,n),y(n,t),y(t,a),y(t,i),y(t,f),y(e,o),y(e,p),P($,p,null),y(p,g),P(S,p,null),y(p,I),P(Z,p,null),y(p,F),P(te,p,null),y(e,j),y(e,L),y(L,H),y(H,K),y(H,m),P(A,H,null),N=!0},p(b,[k]){(!N||k&1&&l!==(l=T("/[[locale=locale]]",b[0])))&&w(t,"href",l);const fe={};k&19&&(fe.$$scope={dirty:k,ctx:b}),$.$set(fe);const se={};k&19&&(se.$$scope={dirty:k,ctx:b}),S.$set(se);const ee={};k&19&&(ee.$$scope={dirty:k,ctx:b}),Z.$set(ee);const oe={};k&19&&(oe.$$scope={dirty:k,ctx:b}),te.$set(oe)},i(b){N||(h($.$$.fragment,b),h(S.$$.fragment,b),h(Z.$$.fragment,b),h(te.$$.fragment,b),h(A.$$.fragment,b),N=!0)},o(b){v($.$$.fragment,b),v(S.$$.fragment,b),v(Z.$$.fragment,b),v(te.$$.fragment,b),v(A.$$.fragment,b),N=!1},d(b){b&&_(e),M($),M(S),M(Z),M(te),M(A)}}}function Wn(s,e,n){let t,a;return be(s,Oe,r=>n(0,t=r)),be(s,Ve,r=>n(1,a=r)),[t,a]}class Cn extends re{constructor(e){super(),le(this,e,Wn,An,ae,{})}}function Pn(s){let e,n,t,a,r,i,f,u;n=new Cn({}),a=new Zt({});const l=s[1].default,o=$e(l,s,s[0],null);return{c(){e=X("div"),W(n.$$.fragment),t=D(),W(a.$$.fragment),r=D(),i=X("main"),f=X("div"),o&&o.c(),this.h()},l(p){e=Y(p,"DIV",{class:!0});var $=Q(e);C(n.$$.fragment,$),t=V($),C(a.$$.fragment,$),r=V($),i=Y($,"MAIN",{class:!0});var g=Q(i);f=Y(g,"DIV",{class:!0});var S=Q(f);o&&o.l(S),S.forEach(_),g.forEach(_),$.forEach(_),this.h()},h(){w(f,"class","prose mb-12"),w(i,"class","w-full h-full overflow-y-auto pt-12 sm:pt-16 px-4 print:overflow-y-visible print:h-auto"),w(e,"class","fixed inset-0 flex flex-col-reverse md:flex-row print:block print:static")},m(p,$){d(p,e,$),P(n,e,null),y(e,t),P(a,e,null),y(e,r),y(e,i),y(i,f),o&&o.m(f,null),u=!0},p(p,[$]){o&&o.p&&(!u||$&1)&&pe(o,l,p,p[0],u?me(l,p[0],$,null):_e(p[0]),null)},i(p){u||(h(n.$$.fragment,p),h(a.$$.fragment,p),h(o,p),u=!0)},o(p){v(n.$$.fragment,p),v(a.$$.fragment,p),v(o,p),u=!1},d(p){p&&_(e),M(n),M(a),o&&o.d(p)}}}function Mn(s,e,n){let{$$slots:t={},$$scope:a}=e;return s.$$set=r=>{"$$scope"in r&&n(0,a=r.$$scope)},[a,t]}class yn extends re{constructor(e){super(),le(this,e,Mn,Pn,ae,{})}}export{yn as component};
