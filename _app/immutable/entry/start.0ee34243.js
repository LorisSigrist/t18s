import{o as me,t as ye}from"../chunks/scheduler.01b8d7a8.js";import{p as We,e as Xe}from"../chunks/routing.f0b9763f.js";import{S as He,a as Be,I as M,g as De,f as Ce,b as we,c as le,s as te,i as _e,d as F,e as J,P as $e,h as Ze}from"../chunks/singletons.5bdf3357.js";function Qe(n,o){return n==="/"||o==="ignore"?n:o==="never"?n.endsWith("/")?n.slice(0,-1):n:o==="always"&&!n.endsWith("/")?n+"/":n}function et(n){return n.split("%25").map(decodeURI).join("%25")}function tt(n){for(const o in n)n[o]=decodeURIComponent(n[o]);return n}const nt=["href","pathname","search","searchParams","toString","toJSON"];function at(n,o){const l=new URL(n);for(const c of nt)Object.defineProperty(l,c,{get(){return o(),n[c]},enumerable:!0,configurable:!0});return rt(l),l}function rt(n){Object.defineProperty(n,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const ot="/__data.json";function it(n){return n.replace(/\/$/,"")+ot}function st(...n){let o=5381;for(const l of n)if(typeof l=="string"){let c=l.length;for(;c;)o=o*33^l.charCodeAt(--c)}else if(ArrayBuffer.isView(l)){const c=new Uint8Array(l.buffer,l.byteOffset,l.byteLength);let h=c.length;for(;h;)o=o*33^c[--h]}else throw new TypeError("value must be a string or TypedArray");return(o>>>0).toString(36)}const Ge=window.fetch;window.fetch=(n,o)=>((n instanceof Request?n.method:(o==null?void 0:o.method)||"GET")!=="GET"&&ae.delete(Ee(n)),Ge(n,o));const ae=new Map;function ct(n,o){const l=Ee(n,o),c=document.querySelector(l);if(c!=null&&c.textContent){const{body:h,...d}=JSON.parse(c.textContent),O=c.getAttribute("data-ttl");return O&&ae.set(l,{body:h,init:d,ttl:1e3*Number(O)}),Promise.resolve(new Response(h,d))}return window.fetch(n,o)}function lt(n,o,l){if(ae.size>0){const c=Ee(n,l),h=ae.get(c);if(h){if(performance.now()<h.ttl&&["default","force-cache","only-if-cached",void 0].includes(l==null?void 0:l.cache))return new Response(h.body,h.init);ae.delete(c)}}return window.fetch(o,l)}function Ee(n,o){let c=`script[data-sveltekit-fetched][data-url=${JSON.stringify(n instanceof Request?n.url:n)}]`;if(o!=null&&o.headers||o!=null&&o.body){const h=[];o.headers&&h.push([...new Headers(o.headers)].join(",")),o.body&&(typeof o.body=="string"||ArrayBuffer.isView(o.body))&&h.push(o.body),c+=`[data-hash="${st(...h)}"]`}return c}function ft({nodes:n,server_loads:o,dictionary:l,matchers:c}){const h=new Set(o);return Object.entries(l).map(([f,[E,m,y]])=>{const{pattern:C,params:D}=We(f),k={id:f,exec:x=>{const U=C.exec(x);if(U)return Xe(U,D,c)},errors:[1,...y||[]].map(x=>n[x]),layouts:[0,...m||[]].map(O),leaf:d(E)};return k.errors.length=k.layouts.length=Math.max(k.errors.length,k.layouts.length),k});function d(f){const E=f<0;return E&&(f=~f),[E,n[f]]}function O(f){return f===void 0?f:[h.has(f),n[f]]}}function Je(n){try{return JSON.parse(sessionStorage[n])}catch{}}function Me(n,o){const l=JSON.stringify(o);try{sessionStorage[n]=l}catch{}}const ut=-1,dt=-2,pt=-3,ht=-4,gt=-5,mt=-6;function yt(n,o){if(typeof n=="number")return h(n,!0);if(!Array.isArray(n)||n.length===0)throw new Error("Invalid input");const l=n,c=Array(l.length);function h(d,O=!1){if(d===ut)return;if(d===pt)return NaN;if(d===ht)return 1/0;if(d===gt)return-1/0;if(d===mt)return-0;if(O)throw new Error("Invalid input");if(d in c)return c[d];const f=l[d];if(!f||typeof f!="object")c[d]=f;else if(Array.isArray(f))if(typeof f[0]=="string"){const E=f[0],m=o==null?void 0:o[E];if(m)return c[d]=m(h(f[1]));switch(E){case"Date":c[d]=new Date(f[1]);break;case"Set":const y=new Set;c[d]=y;for(let k=1;k<f.length;k+=1)y.add(h(f[k]));break;case"Map":const C=new Map;c[d]=C;for(let k=1;k<f.length;k+=2)C.set(h(f[k]),h(f[k+1]));break;case"RegExp":c[d]=new RegExp(f[1],f[2]);break;case"Object":c[d]=Object(f[1]);break;case"BigInt":c[d]=BigInt(f[1]);break;case"null":const D=Object.create(null);c[d]=D;for(let k=1;k<f.length;k+=2)D[f[k]]=h(f[k+1]);break;default:throw new Error(`Unknown type ${E}`)}}else{const E=new Array(f.length);c[d]=E;for(let m=0;m<f.length;m+=1){const y=f[m];y!==dt&&(E[m]=h(y))}}else{const E={};c[d]=E;for(const m in f){const y=f[m];E[m]=h(y)}}return c[d]}return h(0)}function wt(n){return n.filter(o=>o!=null)}const Ke=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...Ke];const _t=new Set([...Ke]);[..._t];async function vt(n){var o;for(const l in n)if(typeof((o=n[l])==null?void 0:o.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(n).map(async([c,h])=>[c,await h])));return n}class ne{constructor(o,l){this.status=o,typeof l=="string"?this.body={message:l}:l?this.body=l:this.body={message:`Error: ${o}`}}toString(){return JSON.stringify(this.body)}}class Ve{constructor(o,l){this.status=o,this.location=l}}const bt="x-sveltekit-invalidated",Et="x-sveltekit-trailing-slash",K=Je(He)??{},ee=Je(Be)??{};function ve(n){K[n]=te()}function St(n,o){var je;const l=ft(n),c=n.nodes[0],h=n.nodes[1];c(),h();const d=document.documentElement,O=[],f=[];let E=null;const m={before_navigate:[],on_navigate:[],after_navigate:[]};let y={branch:[],error:null,url:null},C=!1,D=!1,k=!0,x=!1,U=!1,H=!1,B=!1,V,T=(je=history.state)==null?void 0:je[M];T||(T=Date.now(),history.replaceState({...history.state,[M]:T},"",location.href));const fe=K[T];fe&&(history.scrollRestoration="manual",scrollTo(fe.x,fe.y));let q,z,W;async function Se(){if(W=W||Promise.resolve(),await W,!W)return;W=null;const e=new URL(location.href),i=Z(e,!0);E=null;const t=z={},r=i&&await pe(i);if(t===z&&r){if(r.type==="redirect")return re(new URL(r.location,e).href,{},1,t);r.props.page!==void 0&&(q=r.props.page),V.$set(r.props)}}function ke(e){f.some(i=>i==null?void 0:i.snapshot)&&(ee[e]=f.map(i=>{var t;return(t=i==null?void 0:i.snapshot)==null?void 0:t.capture()}))}function Re(e){var i;(i=ee[e])==null||i.forEach((t,r)=>{var a,s;(s=(a=f[r])==null?void 0:a.snapshot)==null||s.restore(t)})}function Ae(){ve(T),Me(He,K),ke(T),Me(Be,ee)}async function re(e,{noScroll:i=!1,replaceState:t=!1,keepFocus:r=!1,state:a={},invalidateAll:s=!1},u,_){return typeof e=="string"&&(e=new URL(e,De(document))),ce({url:e,scroll:i?te():null,keepfocus:r,redirect_count:u,details:{state:a,replaceState:t},nav_token:_,accepted:()=>{s&&(B=!0)},blocked:()=>{},type:"goto"})}async function Le(e){return E={id:e.id,promise:pe(e).then(i=>(i.type==="loaded"&&i.state.error&&(E=null),i))},E.promise}async function oe(...e){const t=l.filter(r=>e.some(a=>r.exec(a))).map(r=>Promise.all([...r.layouts,r.leaf].map(a=>a==null?void 0:a[1]())));await Promise.all(t)}function Ie(e){var r;y=e.state;const i=document.querySelector("style[data-sveltekit]");i&&i.remove(),q=e.props.page,V=new n.root({target:o,props:{...e.props,stores:F,components:f},hydrate:!0}),Re(T);const t={from:null,to:{params:y.params,route:{id:((r=y.route)==null?void 0:r.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};m.after_navigate.forEach(a=>a(t)),D=!0}async function X({url:e,params:i,branch:t,status:r,error:a,route:s,form:u}){let _="never";for(const g of t)(g==null?void 0:g.slash)!==void 0&&(_=g.slash);e.pathname=Qe(e.pathname,_),e.search=e.search;const v={type:"loaded",state:{url:e,params:i,branch:t,error:a,route:s},props:{constructors:wt(t).map(g=>g.node.component)}};u!==void 0&&(v.props.form=u);let w={},L=!q,R=0;for(let g=0;g<Math.max(t.length,y.branch.length);g+=1){const p=t[g],P=y.branch[g];(p==null?void 0:p.data)!==(P==null?void 0:P.data)&&(L=!0),p&&(w={...w,...p.data},L&&(v.props[`data_${R}`]=w),R+=1)}return(!y.url||e.href!==y.url.href||y.error!==a||u!==void 0&&u!==q.form||L)&&(v.props.page={error:a,params:i,route:{id:(s==null?void 0:s.id)??null},status:r,url:new URL(e),form:u??null,data:L?w:q.data}),v}async function ue({loader:e,parent:i,url:t,params:r,route:a,server_data_node:s}){var w,L,R;let u=null;const _={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},v=await e();if((w=v.universal)!=null&&w.load){let I=function(...p){for(const P of p){const{href:N}=new URL(P,t);_.dependencies.add(N)}};const g={route:new Proxy(a,{get:(p,P)=>(_.route=!0,p[P])}),params:new Proxy(r,{get:(p,P)=>(_.params.add(P),p[P])}),data:(s==null?void 0:s.data)??null,url:at(t,()=>{_.url=!0}),async fetch(p,P){let N;p instanceof Request?(N=p.url,P={body:p.method==="GET"||p.method==="HEAD"?void 0:await p.blob(),cache:p.cache,credentials:p.credentials,headers:p.headers,integrity:p.integrity,keepalive:p.keepalive,method:p.method,mode:p.mode,redirect:p.redirect,referrer:p.referrer,referrerPolicy:p.referrerPolicy,signal:p.signal,...P}):N=p;const $=new URL(N,t);return I($.href),$.origin===t.origin&&(N=$.href.slice(t.origin.length)),D?lt(N,$.href,P):ct(N,P)},setHeaders:()=>{},depends:I,parent(){return _.parent=!0,i()}};u=await v.universal.load.call(null,g)??null,u=u?await vt(u):null}return{node:v,loader:e,server:s,universal:(L=v.universal)!=null&&L.load?{type:"data",data:u,uses:_}:null,data:u??(s==null?void 0:s.data)??null,slash:((R=v.universal)==null?void 0:R.trailingSlash)??(s==null?void 0:s.slash)}}function Pe(e,i,t,r,a){if(B)return!0;if(!r)return!1;if(r.parent&&e||r.route&&i||r.url&&t)return!0;for(const s of r.params)if(a[s]!==y.params[s])return!0;for(const s of r.dependencies)if(O.some(u=>u(new URL(s))))return!0;return!1}function de(e,i){return(e==null?void 0:e.type)==="data"?e:(e==null?void 0:e.type)==="skip"?i??null:null}async function pe({id:e,invalidating:i,url:t,params:r,route:a}){if((E==null?void 0:E.id)===e)return E.promise;const{errors:s,layouts:u,leaf:_}=a,v=[...u,_];s.forEach(b=>b==null?void 0:b().catch(()=>{})),v.forEach(b=>b==null?void 0:b[1]().catch(()=>{}));let w=null;const L=y.url?e!==y.url.pathname+y.url.search:!1,R=y.route?a.id!==y.route.id:!1;let I=!1;const g=v.map((b,A)=>{var G;const S=y.branch[A],j=!!(b!=null&&b[0])&&((S==null?void 0:S.loader)!==b[1]||Pe(I,R,L,(G=S.server)==null?void 0:G.uses,r));return j&&(I=!0),j});if(g.some(Boolean)){try{w=await qe(t,g)}catch(b){return ie({status:b instanceof ne?b.status:500,error:await Q(b,{url:t,params:r,route:{id:a.id}}),url:t,route:a})}if(w.type==="redirect")return w}const p=w==null?void 0:w.nodes;let P=!1;const N=v.map(async(b,A)=>{var he;if(!b)return;const S=y.branch[A],j=p==null?void 0:p[A];if((!j||j.type==="skip")&&b[1]===(S==null?void 0:S.loader)&&!Pe(P,R,L,(he=S.universal)==null?void 0:he.uses,r))return S;if(P=!0,(j==null?void 0:j.type)==="error")throw j;return ue({loader:b[1],url:t,params:r,route:a,parent:async()=>{var xe;const Te={};for(let ge=0;ge<A;ge+=1)Object.assign(Te,(xe=await N[ge])==null?void 0:xe.data);return Te},server_data_node:de(j===void 0&&b[0]?{type:"skip"}:j??null,b[0]?S==null?void 0:S.server:void 0)})});for(const b of N)b.catch(()=>{});const $=[];for(let b=0;b<v.length;b+=1)if(v[b])try{$.push(await N[b])}catch(A){if(A instanceof Ve)return{type:"redirect",location:A.location};let S=500,j;if(p!=null&&p.includes(A))S=A.status??S,j=A.error;else if(A instanceof ne)S=A.status,j=A.body;else{if(await F.updated.check())return await Y(t);j=await Q(A,{params:r,url:t,route:{id:a.id}})}const G=await Oe(b,$,s);return G?await X({url:t,params:r,branch:$.slice(0,G.idx).concat(G.node),status:S,error:j,route:a}):await Ne(t,{id:a.id},j,S)}else $.push(void 0);return await X({url:t,params:r,branch:$,status:200,error:null,route:a,form:i?void 0:null})}async function Oe(e,i,t){for(;e--;)if(t[e]){let r=e;for(;!i[r];)r-=1;try{return{idx:r+1,node:{node:await t[e](),loader:t[e],data:{},server:null,universal:null}}}catch{continue}}}async function ie({status:e,error:i,url:t,route:r}){const a={};let s=null;if(n.server_loads[0]===0)try{const w=await qe(t,[!0]);if(w.type!=="data"||w.nodes[0]&&w.nodes[0].type!=="data")throw 0;s=w.nodes[0]??null}catch{(t.origin!==location.origin||t.pathname!==location.pathname||C)&&await Y(t)}const _=await ue({loader:c,url:t,params:a,route:r,parent:()=>Promise.resolve({}),server_data_node:de(s)}),v={node:await h(),loader:h,universal:null,server:null,data:null};return await X({url:t,params:a,branch:[_,v],status:e,error:i,route:null})}function Z(e,i){if(_e(e,J))return;const t=se(e);for(const r of l){const a=r.exec(t);if(a)return{id:e.pathname+e.search,invalidating:i,route:r,params:tt(a),url:e}}}function se(e){return et(e.pathname.slice(J.length)||"/")}function Ue({url:e,type:i,intent:t,delta:r}){let a=!1;const s=Fe(y,t,e,i);r!==void 0&&(s.navigation.delta=r);const u={...s.navigation,cancel:()=>{a=!0,s.reject(new Error("navigation was cancelled"))}};return U||m.before_navigate.forEach(_=>_(u)),a?null:s}async function ce({url:e,scroll:i,keepfocus:t,redirect_count:r,details:a,type:s,delta:u,nav_token:_={},accepted:v,blocked:w}){var N,$,b;const L=Z(e,!1),R=Ue({url:e,type:s,delta:u,intent:L});if(!R){w();return}const I=T;v(),U=!0,D&&F.navigating.set(R.navigation),z=_;let g=L&&await pe(L);if(!g){if(_e(e,J))return await Y(e);g=await Ne(e,{id:null},await Q(new Error(`Not found: ${e.pathname}`),{url:e,params:{},route:{id:null}}),404)}if(e=(L==null?void 0:L.url)||e,z!==_)return R.reject(new Error("navigation was aborted")),!1;if(g.type==="redirect")if(r>=20)g=await ie({status:500,error:await Q(new Error("Redirect loop"),{url:e,params:{},route:{id:null}}),url:e,route:{id:null}});else return re(new URL(g.location,e).href,{},r+1,_),!1;else((N=g.props.page)==null?void 0:N.status)>=400&&await F.updated.check()&&await Y(e);if(O.length=0,B=!1,x=!0,ve(I),ke(I),($=g.props.page)!=null&&$.url&&g.props.page.url.pathname!==e.pathname&&(e.pathname=(b=g.props.page)==null?void 0:b.url.pathname),a){const A=a.replaceState?0:1;if(a.state[M]=T+=A,history[a.replaceState?"replaceState":"pushState"](a.state,"",e),!a.replaceState){let S=T+1;for(;ee[S]||K[S];)delete ee[S],delete K[S],S+=1}}if(E=null,D){y=g.state,g.props.page&&(g.props.page.url=e);const A=(await Promise.all(m.on_navigate.map(S=>S(R.navigation)))).filter(S=>typeof S=="function");if(A.length>0){let S=function(){m.after_navigate=m.after_navigate.filter(j=>!A.includes(j))};A.push(S),m.after_navigate.push(...A)}V.$set(g.props)}else Ie(g);const{activeElement:p}=document;if(await ye(),k){const A=e.hash&&document.getElementById(decodeURIComponent(e.hash.slice(1)));i?scrollTo(i.x,i.y):A?A.scrollIntoView():scrollTo(0,0)}const P=document.activeElement!==p&&document.activeElement!==document.body;!t&&!P&&be(),k=!0,g.props.page&&(q=g.props.page),U=!1,s==="popstate"&&Re(T),R.fulfil(void 0),m.after_navigate.forEach(A=>A(R.navigation)),F.navigating.set(null),x=!1}async function Ne(e,i,t,r){return e.origin===location.origin&&e.pathname===location.pathname&&!C?await ie({status:r,error:t,url:e,route:i}):await Y(e)}function Y(e){return location.href=e.href,new Promise(()=>{})}function Ye(){let e;d.addEventListener("mousemove",s=>{const u=s.target;clearTimeout(e),e=setTimeout(()=>{r(u,2)},20)});function i(s){r(s.composedPath()[0],1)}d.addEventListener("mousedown",i),d.addEventListener("touchstart",i,{passive:!0});const t=new IntersectionObserver(s=>{for(const u of s)u.isIntersecting&&(oe(se(new URL(u.target.href))),t.unobserve(u.target))},{threshold:0});function r(s,u){const _=Ce(s,d);if(!_)return;const{url:v,external:w,download:L}=we(_,J);if(w||L)return;const R=le(_);if(!R.reload)if(u<=R.preload_data){const I=Z(v,!1);I&&Le(I)}else u<=R.preload_code&&oe(se(v))}function a(){t.disconnect();for(const s of d.querySelectorAll("a")){const{url:u,external:_,download:v}=we(s,J);if(_||v)continue;const w=le(s);w.reload||(w.preload_code===$e.viewport&&t.observe(s),w.preload_code===$e.eager&&oe(se(u)))}}m.after_navigate.push(a),a()}function Q(e,i){return e instanceof ne?e.body:n.hooks.handleError({error:e,event:i})??{message:i.route.id!=null?"Internal Error":"Not Found"}}return{after_navigate:e=>{me(()=>(m.after_navigate.push(e),()=>{const i=m.after_navigate.indexOf(e);m.after_navigate.splice(i,1)}))},before_navigate:e=>{me(()=>(m.before_navigate.push(e),()=>{const i=m.before_navigate.indexOf(e);m.before_navigate.splice(i,1)}))},on_navigate:e=>{me(()=>(m.on_navigate.push(e),()=>{const i=m.on_navigate.indexOf(e);m.on_navigate.splice(i,1)}))},disable_scroll_handling:()=>{(x||!D)&&(k=!1)},goto:(e,i={})=>re(e,i,0),invalidate:e=>{if(typeof e=="function")O.push(e);else{const{href:i}=new URL(e,location.href);O.push(t=>t.href===i)}return Se()},invalidate_all:()=>(B=!0,Se()),preload_data:async e=>{const i=new URL(e,De(document)),t=Z(i,!1);if(!t)throw new Error(`Attempted to preload a URL that does not belong to this app: ${i}`);await Le(t)},preload_code:oe,apply_action:async e=>{if(e.type==="error"){const i=new URL(location.href),{branch:t,route:r}=y;if(!r)return;const a=await Oe(y.branch.length,t,r.errors);if(a){const s=await X({url:i,params:y.params,branch:t.slice(0,a.idx).concat(a.node),status:e.status??500,error:e.error,route:r});y=s.state,V.$set(s.props),ye().then(be)}}else e.type==="redirect"?re(e.location,{invalidateAll:!0},0):(V.$set({form:null,page:{...q,form:e.data,status:e.status}}),await ye(),V.$set({form:e.data}),e.type==="success"&&be())},_start_router:()=>{var i;history.scrollRestoration="manual",addEventListener("beforeunload",t=>{let r=!1;if(Ae(),!U){const a=Fe(y,void 0,null,"leave"),s={...a.navigation,cancel:()=>{r=!0,a.reject(new Error("navigation was cancelled"))}};m.before_navigate.forEach(u=>u(s))}r?(t.preventDefault(),t.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ae()}),(i=navigator.connection)!=null&&i.saveData||Ye(),d.addEventListener("click",t=>{var I;if(t.button||t.which!==1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.defaultPrevented)return;const r=Ce(t.composedPath()[0],d);if(!r)return;const{url:a,external:s,target:u,download:_}=we(r,J);if(!a)return;if(u==="_parent"||u==="_top"){if(window.parent!==window)return}else if(u&&u!=="_self")return;const v=le(r);if(!(r instanceof SVGAElement)&&a.protocol!==location.protocol&&!(a.protocol==="https:"||a.protocol==="http:")||_)return;if(s||v.reload){Ue({url:a,type:"link"})?U=!0:t.preventDefault();return}const[L,R]=a.href.split("#");if(R!==void 0&&L===location.href.split("#")[0]){if(y.url.hash===a.hash){t.preventDefault(),(I=r.ownerDocument.getElementById(R))==null||I.scrollIntoView();return}if(H=!0,ve(T),e(a),!v.replace_state)return;H=!1,t.preventDefault()}ce({url:a,scroll:v.noscroll?te():null,keepfocus:v.keep_focus??!1,redirect_count:0,details:{state:{},replaceState:v.replace_state??a.href===location.href},accepted:()=>t.preventDefault(),blocked:()=>t.preventDefault(),type:"link"})}),d.addEventListener("submit",t=>{if(t.defaultPrevented)return;const r=HTMLFormElement.prototype.cloneNode.call(t.target),a=t.submitter;if(((a==null?void 0:a.formMethod)||r.method)!=="get")return;const u=new URL((a==null?void 0:a.hasAttribute("formaction"))&&(a==null?void 0:a.formAction)||r.action);if(_e(u,J))return;const _=t.target,{keep_focus:v,noscroll:w,reload:L,replace_state:R}=le(_);if(L)return;t.preventDefault(),t.stopPropagation();const I=new FormData(_),g=a==null?void 0:a.getAttribute("name");g&&I.append(g,(a==null?void 0:a.getAttribute("value"))??""),u.search=new URLSearchParams(I).toString(),ce({url:u,scroll:w?te():null,keepfocus:v??!1,redirect_count:0,details:{state:{},replaceState:R??u.href===location.href},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",async t=>{var r;if(z={},(r=t.state)!=null&&r[M]){if(t.state[M]===T)return;const a=K[t.state[M]],s=new URL(location.href);if(y.url.href.split("#")[0]===location.href.split("#")[0]){e(s),K[T]=te(),T=t.state[M],scrollTo(a.x,a.y);return}const u=t.state[M]-T;await ce({url:s,scroll:a,keepfocus:!1,redirect_count:0,details:null,accepted:()=>{T=t.state[M]},blocked:()=>{history.go(-u)},type:"popstate",delta:u,nav_token:z})}else if(!H){const a=new URL(location.href);e(a)}}),addEventListener("hashchange",()=>{H&&(H=!1,history.replaceState({...history.state,[M]:++T},"",location.href))});for(const t of document.querySelectorAll("link"))t.rel==="icon"&&(t.href=t.href);addEventListener("pageshow",t=>{t.persisted&&F.navigating.set(null)});function e(t){y.url=t,F.page.set({...q,url:t}),F.page.notify()}},_hydrate:async({status:e=200,error:i,node_ids:t,params:r,route:a,data:s,form:u})=>{C=!0;const _=new URL(location.href);({params:r={},route:a={id:null}}=Z(_,!1)||{});let v;try{const w=t.map(async(I,g)=>{const p=s[g];return p!=null&&p.uses&&(p.uses=ze(p.uses)),ue({loader:n.nodes[I],url:_,params:r,route:a,parent:async()=>{const P={};for(let N=0;N<g;N+=1)Object.assign(P,(await w[N]).data);return P},server_data_node:de(p)})}),L=await Promise.all(w),R=l.find(({id:I})=>I===a.id);if(R){const I=R.layouts;for(let g=0;g<I.length;g++)I[g]||L.splice(g,0,void 0)}v=await X({url:_,params:r,branch:L,status:e,error:i,form:u,route:R??null})}catch(w){if(w instanceof Ve){await Y(new URL(w.location,location.href));return}v=await ie({status:w instanceof ne?w.status:500,error:await Q(w,{url:_,params:r,route:a}),url:_,route:a})}Ie(v)}}}async function qe(n,o){const l=new URL(n);l.pathname=it(n.pathname),n.pathname.endsWith("/")&&l.searchParams.append(Et,"1"),l.searchParams.append(bt,o.map(h=>h?"1":"0").join(""));const c=await Ge(l.href);if(!c.ok)throw new ne(c.status,await c.json());return new Promise(async h=>{var y;const d=new Map,O=c.body.getReader(),f=new TextDecoder;function E(C){return yt(C,{Promise:D=>new Promise((k,x)=>{d.set(D,{fulfil:k,reject:x})})})}let m="";for(;;){const{done:C,value:D}=await O.read();if(C&&!m)break;for(m+=!D&&m?`
`:f.decode(D);;){const k=m.indexOf(`
`);if(k===-1)break;const x=JSON.parse(m.slice(0,k));if(m=m.slice(k+1),x.type==="redirect")return h(x);if(x.type==="data")(y=x.nodes)==null||y.forEach(U=>{(U==null?void 0:U.type)==="data"&&(U.uses=ze(U.uses),U.data=E(U.data))}),h(x);else if(x.type==="chunk"){const{id:U,data:H,error:B}=x,V=d.get(U);d.delete(U),B?V.reject(E(B)):V.fulfil(E(H))}}}})}function ze(n){return{dependencies:new Set((n==null?void 0:n.dependencies)??[]),params:new Set((n==null?void 0:n.params)??[]),parent:!!(n!=null&&n.parent),route:!!(n!=null&&n.route),url:!!(n!=null&&n.url)}}function be(){const n=document.querySelector("[autofocus]");if(n)n.focus();else{const o=document.body,l=o.getAttribute("tabindex");o.tabIndex=-1,o.focus({preventScroll:!0,focusVisible:!1}),l!==null?o.setAttribute("tabindex",l):o.removeAttribute("tabindex");const c=getSelection();if(c&&c.type!=="None"){const h=[];for(let d=0;d<c.rangeCount;d+=1)h.push(c.getRangeAt(d));setTimeout(()=>{if(c.rangeCount===h.length){for(let d=0;d<c.rangeCount;d+=1){const O=h[d],f=c.getRangeAt(d);if(O.commonAncestorContainer!==f.commonAncestorContainer||O.startContainer!==f.startContainer||O.endContainer!==f.endContainer||O.startOffset!==f.startOffset||O.endOffset!==f.endOffset)return}c.removeAllRanges()}})}}}function Fe(n,o,l,c){var E,m;let h,d;const O=new Promise((y,C)=>{h=y,d=C});return O.catch(()=>{}),{navigation:{from:{params:n.params,route:{id:((E=n.route)==null?void 0:E.id)??null},url:n.url},to:l&&{params:(o==null?void 0:o.params)??null,route:{id:((m=o==null?void 0:o.route)==null?void 0:m.id)??null},url:l},willUnload:!o,type:c,complete:O},fulfil:h,reject:d}}async function Lt(n,o,l){const c=St(n,o);Ze({client:c}),l?await c._hydrate(l):c.goto(location.href,{replaceState:!0}),c._start_router()}export{Lt as start};