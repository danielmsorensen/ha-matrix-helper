var Ve=Object.defineProperty;var je=Object.getOwnPropertyDescriptor;var A=(n,t,e,r)=>{for(var i=r>1?void 0:r?je(t,e):t,s=n.length-1,o;s>=0;s--)(o=n[s])&&(i=(r?o(t,e,i):o(i))||i);return r&&i&&Ve(t,e,i),i};var j=globalThis,K=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol(),_e=new WeakMap,L=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(K&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=_e.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&_e.set(e,t))}return t}toString(){return this.cssText}},ve=n=>new L(typeof n=="string"?n:n+"",void 0,ee),te=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((r,i,s)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[s+1],n[0]);return new L(e,n,ee)},be=(n,t)=>{if(K)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),i=j.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,n.appendChild(r)}},re=K?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return ve(e)})(n):n;var{is:Ke,defineProperty:Ye,getOwnPropertyDescriptor:Ge,getOwnPropertyNames:Xe,getOwnPropertySymbols:Je,getPrototypeOf:Ze}=Object,Y=globalThis,we=Y.trustedTypes,Qe=we?we.emptyScript:"",et=Y.reactiveElementPolyfillSupport,N=(n,t)=>n,O={toAttribute(n,t){switch(t){case Boolean:n=n?Qe:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},G=(n,t)=>!Ke(n,t),$e={attribute:!0,type:String,converter:O,reflect:!1,useDefault:!1,hasChanged:G};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$e){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&Ye(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){let{get:i,set:s}=Ge(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let c=i?.call(this);s?.call(this,o),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$e}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let t=Ze(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let e=this.properties,r=[...Xe(e),...Je(e)];for(let i of r)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let i of r)e.unshift(re(i))}else t!==void 0&&e.push(re(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return be(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){let s=(r.converter?.toAttribute!==void 0?r.converter:O).toAttribute(e,r.type);this._$Em=t,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){let r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let s=r.getPropertyOptions(i),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:O;this._$Em=i;let c=o.fromAttribute(e,s.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,r,i=!1,s){if(t!==void 0){let o=this.constructor;if(i===!1&&(s=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??G)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:s},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),s!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,s]of r){let{wrapped:o}=s,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,s,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[N("elementProperties")]=new Map,v[N("finalized")]=new Map,et?.({ReactiveElement:v}),(Y.reactiveElementVersions??=[]).push("2.1.2");var le=globalThis,Ae=n=>n,X=le.trustedTypes,Ee=X?X.createPolicy("lit-html",{createHTML:n=>n}):void 0,He="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,Me="?"+$,tt=`<${Me}>`,S=document,I=()=>S.createComment(""),U=n=>n===null||typeof n!="object"&&typeof n!="function",de=Array.isArray,rt=n=>de(n)||typeof n?.[Symbol.iterator]=="function",ie=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xe=/-->/g,Se=/>/g,E=RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ke=/'/g,Ce=/"/g,De=/^(?:script|style|textarea|title)$/i,ue=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),f=ue(1),St=ue(2),kt=ue(3),b=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Te=new WeakMap,x=S.createTreeWalker(S,129);function Pe(n,t){if(!de(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ee!==void 0?Ee.createHTML(t):t}var it=(n,t)=>{let e=n.length-1,r=[],i,s=t===2?"<svg>":t===3?"<math>":"",o=R;for(let c=0;c<e;c++){let a=n[c],l,u,d=-1,p=0;for(;p<a.length&&(o.lastIndex=p,u=o.exec(a),u!==null);)p=o.lastIndex,o===R?u[1]==="!--"?o=xe:u[1]!==void 0?o=Se:u[2]!==void 0?(De.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=E):u[3]!==void 0&&(o=E):o===E?u[0]===">"?(o=i??R,d=-1):u[1]===void 0?d=-2:(d=o.lastIndex-u[2].length,l=u[1],o=u[3]===void 0?E:u[3]==='"'?Ce:ke):o===Ce||o===ke?o=E:o===xe||o===Se?o=R:(o=E,i=void 0);let m=o===E&&n[c+1].startsWith("/>")?" ":"";s+=o===R?a+tt:d>=0?(r.push(l),a.slice(0,d)+He+a.slice(d)+$+m):a+$+(d===-2?c:m)}return[Pe(n,s+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},q=class n{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let s=0,o=0,c=t.length-1,a=this.parts,[l,u]=it(t,e);if(this.el=n.createElement(l,r),x.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=x.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(He)){let p=u[o++],m=i.getAttribute(d).split($),y=/([.?@])?(.*)/.exec(p);a.push({type:1,index:s,name:y[2],strings:m,ctor:y[1]==="."?se:y[1]==="?"?oe:y[1]==="@"?ae:C}),i.removeAttribute(d)}else d.startsWith($)&&(a.push({type:6,index:s}),i.removeAttribute(d));if(De.test(i.tagName)){let d=i.textContent.split($),p=d.length-1;if(p>0){i.textContent=X?X.emptyScript:"";for(let m=0;m<p;m++)i.append(d[m],I()),x.nextNode(),a.push({type:2,index:++s});i.append(d[p],I())}}}else if(i.nodeType===8)if(i.data===Me)a.push({type:2,index:s});else{let d=-1;for(;(d=i.data.indexOf($,d+1))!==-1;)a.push({type:7,index:s}),d+=$.length-1}s++}}static createElement(t,e){let r=S.createElement("template");return r.innerHTML=t,r}};function k(n,t,e=n,r){if(t===b)return t;let i=r!==void 0?e._$Co?.[r]:e._$Cl,s=U(t)?void 0:t._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(n),i._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(t=k(n,i._$AS(n,t.values),i,r)),t}var ne=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??S).importNode(e,!0);x.currentNode=i;let s=x.nextNode(),o=0,c=0,a=r[0];for(;a!==void 0;){if(o===a.index){let l;a.type===2?l=new F(s,s.nextSibling,this,t):a.type===1?l=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(l=new ce(s,this,t)),this._$AV.push(l),a=r[++c]}o!==a?.index&&(s=x.nextNode(),o++)}return x.currentNode=S,i}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},F=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),U(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):rt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=q.createElement(Pe(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{let s=new ne(i,this),o=s.u(this.options);s.p(e),this.T(o),this._$AH=s}}_$AC(t){let e=Te.get(t.strings);return e===void 0&&Te.set(t.strings,e=new q(t)),e}k(t){de(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,i=0;for(let s of t)i===e.length?e.push(r=new n(this.O(I()),this.O(I()),this,this.options)):r=e[i],r._$AI(s),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=Ae(t).nextSibling;Ae(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,s){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(t,e=this,r,i){let s=this.strings,o=!1;if(s===void 0)t=k(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==b,o&&(this._$AH=t);else{let c=t,a,l;for(t=s[0],a=0;a<s.length-1;a++)l=k(this,c[r+a],e,a),l===b&&(l=this._$AH[a]),o||=!U(l)||l!==this._$AH[a],l===h?t=h:t!==h&&(t+=(l??"")+s[a+1]),this._$AH[a]=l}o&&!i&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},se=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},oe=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},ae=class extends C{constructor(t,e,r,i,s){super(t,e,r,i,s),this.type=5}_$AI(t,e=this){if((t=k(this,t,e,0)??h)===b)return;let r=this._$AH,i=t===h&&r!==h||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==h&&(r===h||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ce=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}};var nt=le.litHtmlPolyfillSupport;nt?.(q,F),(le.litHtmlVersions??=[]).push("3.3.3");var Le=(n,t,e)=>{let r=e?.renderBefore??t,i=r._$litPart$;if(i===void 0){let s=e?.renderBefore??null;r._$litPart$=i=new F(t.insertBefore(I(),s),s,void 0,e??{})}return i._$AI(n),i};var he=globalThis,_=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Le(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};_._$litElement$=!0,_.finalized=!0,he.litElementHydrateSupport?.({LitElement:_});var st=he.litElementPolyfillSupport;st?.({LitElement:_});(he.litElementVersions??=[]).push("4.2.2");var ot={attribute:!0,type:String,converter:O,reflect:!1,hasChanged:G},at=(n=ot,t,e)=>{let{kind:r,metadata:i}=e,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),s.set(e.name,n),r==="accessor"){let{name:o}=e;return{set(c){let a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,n,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,n,c),c}}}if(r==="setter"){let{name:o}=e;return function(c){let a=this[o];t.call(this,c),this.requestUpdate(o,a,n,!0,c)}}throw Error("Unsupported decorator location: "+r)};function T(n){return(t,e)=>typeof e=="object"?at(n,t,e):((r,i,s)=>{let o=i.hasOwnProperty(s);return i.constructor.createProperty(s,r),o?Object.getOwnPropertyDescriptor(i,s):void 0})(n,t,e)}function z(n){return T({...n,state:!0,attribute:!1})}var Ne={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Z=n=>(...t)=>({_$litDirective$:n,values:t}),H=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Oe=Z(class extends H{constructor(n){if(super(n),n.type!==Ne.ATTRIBUTE||n.name!=="class"||n.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(t=>n[t]).join(" ")+" "}update(n,[t]){if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let e=n.element.classList;for(let r of this.st)r in t||(e.remove(r),this.st.delete(r));for(let r in t){let i=!!t[r];i===this.st.has(r)||this.nt?.has(r)||(i?(e.add(r),this.st.add(r)):(e.remove(r),this.st.delete(r)))}return b}});function W(n){return n.substr(0,n.indexOf("."))}var Re;(function(n){n.language="language",n.system="system",n.comma_decimal="comma_decimal",n.decimal_comma="decimal_comma",n.space_comma="space_comma",n.none="none"})(Re||(Re={}));var Ie;(function(n){n.language="language",n.system="system",n.am_pm="12",n.twenty_four="24"})(Ie||(Ie={}));var ct=["closed","locked","off"];var g=(n,t,e,r)=>{r=r||{},e=e??{};let i=new Event(t,{bubbles:r.bubbles===void 0?!0:r.bubbles,cancelable:!!r.cancelable,composed:r.composed===void 0?!0:r.composed});return i.detail=e,n.dispatchEvent(i),i};var Q=n=>{g(window,"haptic",n)},lt=(n,t,e=!1)=>{e?history.replaceState(null,"",t):history.pushState(null,"",t),g(window,"location-changed",{replace:e})},dt=(n,t,e=!0)=>{let r=W(t),i=r==="group"?"homeassistant":r,s;switch(r){case"lock":s=e?"unlock":"lock";break;case"cover":s=e?"open_cover":"close_cover";break;default:s=e?"turn_on":"turn_off"}return n.callService(i,s,{entity_id:t})},ut=(n,t)=>{let e=ct.includes(n.states[t].state);return dt(n,t,e)},ht=(n,t,e,r)=>{if(r||(r={action:"more-info"}),!(r.confirmation&&(!r.confirmation.exemptions||!r.confirmation.exemptions.some(i=>i.user===t.user.id))&&(Q("warning"),!confirm(r.confirmation.text||`Are you sure you want to ${r.action}?`))))switch(r.action){case"more-info":(e.entity||e.camera_image)&&g(n,"hass-more-info",{entityId:e.entity?e.entity:e.camera_image});break;case"navigate":r.navigation_path&&lt(n,r.navigation_path);break;case"url":r.url_path&&window.open(r.url_path);break;case"toggle":e.entity&&(ut(t,e.entity),Q("success"));break;case"call-service":{if(!r.service){Q("failure");return}let[i,s]=r.service.split(".",2);t.callService(i,s,r.service_data,r.target),Q("success");break}case"fire-dom-event":g(n,"ll-custom",r)}},Ue=(n,t,e,r)=>{let i;r==="double_tap"&&e.double_tap_action?i=e.double_tap_action:r==="hold"&&e.hold_action?i=e.hold_action:r==="tap"&&e.tap_action&&(i=e.tap_action),ht(n,t,e,i)};function M(n){return n!==void 0&&n.action!=="none"}var w="matrix_helper";function qe(n){return n.target.value}function me(n){return n.split("_").filter(Boolean).map(t=>t.replace(/[a-z]/i,e=>e.toUpperCase())).join(" ")}function D(n,t){customElements.get(n)||customElements.define(n,t)}var Fe="ontouchstart"in window||navigator.maxTouchPoints>0;function mt(n,t){return!!n?.hasHold==!!t?.hasHold&&!!n?.hasDoubleClick==!!t?.hasDoubleClick}var pt=250,pe=class extends HTMLElement{constructor(){super(...arguments);this.holdTime=500;this.held=!1;this.cancelled=!1}connectedCallback(){Object.assign(this.style,{position:"fixed",width:Fe?"100px":"50px",height:Fe?"100px":"50px",transform:"translate(-50%, -50%) scale(0)",pointerEvents:"none",zIndex:"999",background:"rgba(var(--rgb-primary-color), 0.3)",borderRadius:"50%",transition:"transform 180ms ease-in-out"}),["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(e=>{document.addEventListener(e,()=>{this.cancelled=!0,this.timer&&(this._stopAnimation(),clearTimeout(this.timer),this.timer=void 0)},{passive:!0})})}bind(e,r={}){e.actionHandler&&mt(r,e.actionHandler.options)||(e.actionHandler?(e.removeEventListener("touchstart",e.actionHandler.start),e.removeEventListener("touchend",e.actionHandler.end),e.removeEventListener("touchcancel",e.actionHandler.end),e.removeEventListener("mousedown",e.actionHandler.start),e.removeEventListener("click",e.actionHandler.end),e.removeEventListener("keydown",e.actionHandler.handleKeyDown)):e.addEventListener("contextmenu",i=>{i.preventDefault()}),e.actionHandler={options:r},e.actionHandler.start=i=>{this.cancelled=!1;let s,o;i.touches?(s=i.touches[0].clientX,o=i.touches[0].clientY):(s=i.clientX,o=i.clientY),r.hasHold&&(this.held=!1,this.timer=window.setTimeout(()=>{this._startAnimation(s,o),this.held=!0,g(e,"action",{action:"hold"})},this.holdTime))},e.actionHandler.end=i=>{if(i.type==="touchcancel"||i.type==="touchend"&&this.cancelled)return;let s=i.target;if(i.cancelable&&i.preventDefault(),r.hasHold&&(clearTimeout(this.timer),this._stopAnimation(),this.timer=void 0),r.hasHold&&this.held)g(s,"action",{action:"hold"});else if(r.hasDoubleClick)if(i.type==="click"&&i.detail<2||!this.dblClickTimeout||this.dblClickTarget!==s){let o=window.setTimeout(()=>{this.dblClickTimeout===o&&(this.dblClickTimeout=void 0,this.dblClickTarget=void 0),g(s,"action",{action:"tap"})},pt);this.dblClickTimeout=o,this.dblClickTarget=s}else clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,this.dblClickTarget=void 0,g(s,"action",{action:"double_tap"});else g(s,"action",{action:"tap"})},e.actionHandler.handleKeyDown=i=>{["Enter"," "].includes(i.key)&&i.currentTarget.actionHandler.end(i)},e.addEventListener("touchstart",e.actionHandler.start,{passive:!0}),e.addEventListener("touchend",e.actionHandler.end),e.addEventListener("touchcancel",e.actionHandler.end),e.addEventListener("mousedown",e.actionHandler.start,{passive:!0}),e.addEventListener("click",e.actionHandler.end),e.addEventListener("keydown",e.actionHandler.handleKeyDown))}_startAnimation(e,r){Object.assign(this.style,{left:`${e}px`,top:`${r}px`,transform:"translate(-50%, -50%) scale(1)"})}_stopAnimation(){Object.assign(this.style,{left:"",top:"",transform:"translate(-50%, -50%) scale(0)"})}};D("matrix-helper-card-action-handler",pe);var ft=()=>{let n=document.body,t=n.querySelector("matrix-helper-card-action-handler");if(t)return t;let e=document.createElement("matrix-helper-card-action-handler");return n.appendChild(e),e},gt=(n,t)=>{ft().bind(n,t)},fe=class extends H{constructor(t){super(t)}render(t){}update(t,[e]){return gt(t.element,e),this.render()}},ze=Z(fe);var ge=null;function B(n){return ge||(ge=(async()=>{let t=await window.loadCardHelpers?.();if(!t)return;let e=await t.createCardElement({type:"tile",entity:"sun.sun"});e.hass=n,e.style.display="none",document.body.appendChild(e),await e.updateComplete,e.remove(),await e.constructor.getConfigElement?.();let i=document.createElement("ha-form");i.hass=n,i.data={},i.schema=[{name:"_probe",selector:{text:{}}}],i.style.display="none",document.body.appendChild(i),await i.updateComplete,i.remove()})().catch(()=>{})),ge}var ye=["more-info","navigate","url","none"],yt=[{name:"entity",selector:{entity:{filter:{domain:w}}}},{name:"content",type:"expandable",flatten:!0,schema:[{name:"name",selector:{entity_name:{}},context:{entity:"entity"}},{name:"",type:"grid",schema:[{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"color",selector:{ui_color:{include_state:!0,include_none:!0}}}]},{name:"state_content",selector:{ui_state_content:{allow_context:!0}},context:{filter_entity:"entity"}}]},{name:"interactions",type:"expandable",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{actions:ye,default_action:"more-info"}}},{name:"",type:"optional_actions",flatten:!0,schema:[{name:"hold_action",selector:{ui_action:{actions:ye,default_action:"none"}}},{name:"double_tap_action",selector:{ui_action:{actions:ye,default_action:"none"}}}]}]}],V=class extends _{constructor(){super(...arguments);this._computeLabel=e=>e.name==="state_content"?this.hass.localize("ui.panel.lovelace.editor.card.entity-row.secondary_info"):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${e.name}`)}connectedCallback(){super.connectedCallback(),this.hass&&B(this.hass).then(()=>this.requestUpdate())}updated(e){e.has("hass")&&this.hass&&B(this.hass).then(()=>this.requestUpdate())}setConfig(e){this.config=e}render(){return!this.hass||!this.config?f``:f`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${yt}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(e){g(this,"config-changed",{config:e.detail.value})}};A([T({attribute:!1})],V.prototype,"hass",2),A([z()],V.prototype,"config",2);D("matrix-helper-card-editor",V);var _t=new Set(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function vt(n){return _t.has(n)?`var(--${n}-color)`:n}function bt(n){if(!(!n||n==="state"||n==="none"))return vt(n)}var P=class extends _{constructor(){super(...arguments);this._drafts=new Map;this._componentsRequested=!1;this._resizeObserver=new ResizeObserver(()=>this._syncPanes());this._observedBody=null;this._syncPanes=()=>{let e=this.renderRoot,r=e.querySelector(".body");r&&(e.querySelector(".grid").style.setProperty("--scrollbar-width",`${r.offsetWidth-r.clientWidth}px`),e.querySelector(".column-track").style.transform=`translateX(${-r.scrollLeft}px)`,e.querySelector(".row-track").style.transform=`translateY(${-r.scrollTop}px)`)};this._scrollbarPressed=!1}static{this.styles=te`
    /* height: 100% + the flex column chain below lets .table-wrapper fill
       whatever height the sections view's per-card "Rows" control (see
       getGridOptions()) assigns -- same pattern as HA's own map card. With
       no explicit row count (the default, and always the case in masonry
       view), height: 100% resolves against an auto-sized ancestor and is a
       no-op, so the card still just sizes to its content as before. */
    ha-card {
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    /* Like HA's tile card, the whole card is the tap/hold/double-tap target
       and shows the hover/ripple, except the cell inputs -- and, since this
       card scrolls, the scrollbar. Unlike tile, the grid has to take pointer
       events to scroll, so its content can't be made click-through; instead
       the action handler and ripple live on .container, an ancestor of the
       grid, and cells and the scrollbar stop their own pointer/key events
       from reaching them (see _isolateCell / _isolateScrollbar). */
    .container {
      position: relative;
      isolation: isolate;
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }
    .container.interactive {
      cursor: pointer;
    }
    /* Behind the content, as on tile, so the cells -- whose outlined fields
       are already opaque -- are never tinted. Its hover is switched off while
       the pointer is over a cell or the scrollbar (see _trackHover). */
    ha-ripple {
      position: absolute;
      inset: 0;
      z-index: -1;
      border-radius: var(--ha-card-border-radius, 12px);
    }
    .container.no-hover ha-ripple {
      --ha-ripple-hover-opacity: 0;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 16px 12px;
      border-radius: var(--ha-card-border-radius, 12px)
        var(--ha-card-border-radius, 12px) 0 0;
    }
    .header:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .content {
      padding: 0 16px 16px;
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }
    .header ha-state-icon {
      --mdc-icon-size: 24px;
      color: var(--state-icon-color, var(--secondary-text-color));
    }
    /* Frozen panes, spreadsheet-style: a corner, a column-label strip, a
       row-label strip and the scrolling body. The label strips are clipped
       and follow the body's scroll (see _syncPanes) rather than overlaying
       it, so nothing ever scrolls underneath them. That way they need no
       background of their own, and the ripple behind shows through them
       exactly as it does everywhere else on the card, with any theme. */
    .grid {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: max-content minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
      --row-height: 40px;
    }
    .column-labels,
    .row-labels {
      overflow: hidden;
    }
    /* Same width as the body's content area, so its columns line up with
       the body's when the body shows a vertical scrollbar. */
    .column-labels {
      padding-inline-end: var(--scrollbar-width, 0px);
    }
    .body {
      overflow: auto;
    }
    .column-track,
    .body-track {
      display: grid;
      grid-template-columns: repeat(var(--columns), minmax(112px, 1fr));
    }
    .row-track,
    .body-track {
      grid-auto-rows: var(--row-height);
    }
    .row-track {
      display: grid;
    }
    .label {
      font-weight: 500;
      color: var(--secondary-text-color);
      padding: 4px 8px;
    }
    .column-labels .label {
      text-align: center;
      overflow-wrap: anywhere;
      align-self: end;
    }
    .row-labels .label {
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
    .slot {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 8px;
    }
    ha-input.cell {
      width: 96px;
      cursor: text;
    }
  `}updated(){this.hass&&!this._componentsRequested&&(this._componentsRequested=!0,B(this.hass).then(()=>this.requestUpdate()));let e=this.renderRoot.querySelector(".body");e!==this._observedBody&&(this._resizeObserver.disconnect(),e&&this._resizeObserver.observe(e),this._observedBody=e),this._syncPanes()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver.disconnect(),this._observedBody=null}setConfig(e){if(!e.entity||W(e.entity)!==w)throw new Error(`"entity" is required and must be a ${w} entity (e.g. ${w}.climate_profiles).`);this.config=e,this._drafts.clear(),this._error=void 0}getCardSize(){return 2+((this.config&&this.hass?.states[this.config.entity])?.attributes.rows?.length??1)}getGridOptions(){return{columns:12,min_columns:6,min_rows:3}}static getConfigElement(){return document.createElement("matrix-helper-card-editor")}static getStubConfig(e){return{type:"custom:matrix-helper-card",entity:Object.keys(e.states).find(i=>W(i)===w)??""}}shouldUpdate(e){let r=e.get("hass");return!this.config||!r||e.size>1?!0:r.states[this.config.entity]!==this.hass?.states[this.config.entity]}render(){if(!this.config||!this.hass)return f``;let e=this.hass.states[this.config.entity];if(!e)return f`<ha-card>
        <div style="padding: 16px;">Entity ${this.config.entity} not found.</div>
      </ha-card>`;let{rows:r,columns:i,data:s,row_labels:o,column_labels:c}=e.attributes;if(e.state==="unavailable"||!r||!i||!s)return f`<ha-card>
        <div style="padding: 16px;">Entity ${this.config.entity} is unavailable.</div>
      </ha-card>`;let a=this.hass.formatEntityName?.(e,this.config.name)??e.attributes.friendly_name,l=bt(this.config.color),u=r.map((m,y)=>o?.[y]??me(m)),d=i.map((m,y)=>c?.[y]??me(m)),p=this.config.tap_action===void 0||M(this.config.tap_action)||M(this.config.hold_action)||M(this.config.double_tap_action);return f`
      <ha-card>
        <div
          class=${Oe({container:!0,interactive:p})}
          @action=${this._handleAction}
          @pointerenter=${this._trackHover}
          @pointermove=${this._trackHover}
          @pointerleave=${this._trackHover}
          ${ze({hasHold:M(this.config.hold_action),hasDoubleClick:M(this.config.double_tap_action)})}
        >
          <ha-ripple .disabled=${!p}></ha-ripple>
          <!-- The header is the card's keyboard-focusable button; its
               Enter/Space keydown bubbles to the container's handler. -->
          <div
            class="header"
            tabindex=${p?"0":h}
            role=${p?"button":h}
            aria-label=${p?a:h}
          >
            <ha-state-icon
              style=${l?`color: ${l}`:""}
              .icon=${this.config.icon}
              .stateObj=${e}
            ></ha-state-icon>
            <ha-tile-info>
              <span slot="primary">${a}</span>
              ${this.config.state_content?f`<span slot="secondary">
                    <state-display
                      .hass=${this.hass}
                      .stateObj=${e}
                      .content=${this.config.state_content}
                    ></state-display>
                  </span>`:h}
            </ha-tile-info>
          </div>
          <div class="content">
            ${this._error?f`<ha-alert alert-type="error">${this._error}</ha-alert>`:""}
            <div class="grid" style=${`--columns: ${i.length}`}>
              <div class="corner"></div>
              <div class="column-labels" @wheel=${this._forwardWheel}>
                <div class="column-track">
                  ${d.map(m=>f`<div class="label">${m}</div>`)}
                </div>
              </div>
              <div class="row-labels" @wheel=${this._forwardWheel}>
                <div class="row-track">
                  ${u.map(m=>f`<div class="label">${m}</div>`)}
                </div>
              </div>
              <div
                class="body"
                @scroll=${this._syncPanes}
                @mousedown=${this._isolateScrollbar}
                @pointerdown=${this._isolateScrollbar}
                @click=${this._isolateScrollbar}
              >
                <div class="body-track">
                  ${r.map((m,y)=>i.map((We,Be)=>this._renderCell(s,m,We,`${u[y]}, ${d[Be]}`)))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `}_renderCell(e,r,i,s){let o=`${r}:${i}`,c=e[r]?.[i]??null,a=this._drafts.has(o)?this._drafts.get(o):c===null?"":String(c);return f`<div class="slot">
      <ha-input
        class="cell"
        appearance="outlined"
        type="text"
        inputmode="decimal"
        aria-label=${s}
        .value=${a}
        @input=${l=>{this._drafts.set(o,qe(l)),this.requestUpdate()}}
        @mousedown=${this._isolateCell}
        @touchstart=${this._isolateCell}
        @touchend=${this._isolateCell}
        @pointerdown=${this._isolateCell}
        @click=${this._isolateCell}
        @keydown=${l=>{this._isolateCell(l),l.key==="Escape"&&(this._drafts.delete(o),this.requestUpdate()),(l.key==="Enter"||l.key==="Escape")&&l.target.blur()}}
        @change=${()=>this._commitCell(r,i,c)}
      ></ha-input>
    </div>`}_forwardWheel(e){let r=this.renderRoot.querySelector(".body");if(!r)return;let i=e.deltaMode===WheelEvent.DOM_DELTA_LINE?16:1,[s,o]=e.shiftKey&&!e.deltaX?[e.deltaY,0]:[e.deltaX,e.deltaY],{scrollLeft:c,scrollTop:a}=r;r.scrollBy(s*i,o*i),(r.scrollLeft!==c||r.scrollTop!==a)&&e.preventDefault()}_isolateCell(e){e.stopPropagation()}_isOnScrollbar(e){let r=e.target;return r.classList?.contains("body")&&(e.offsetX>=r.clientWidth||e.offsetY>=r.clientHeight)}_isolateScrollbar(e){e.type==="click"?((this._scrollbarPressed||this._isOnScrollbar(e))&&e.stopPropagation(),this._scrollbarPressed=!1):this._isOnScrollbar(e)&&(this._scrollbarPressed=!0,e.stopPropagation())}_trackHover(e){let r=e.currentTarget;if(e.type==="pointerleave"||e.pointerType==="touch"){r.classList.remove("hovered","no-hover");return}let i=e.target.closest?.("ha-input.cell")!=null;r.classList.add("hovered"),r.classList.toggle("no-hover",i||this._isOnScrollbar(e))}_handleAction(e){this.hass&&this.config&&Ue(this,this.hass,this.config,e.detail.action)}async _commitCell(e,r,i){let s=`${e}:${r}`,o=this._drafts.has(s),c=(this._drafts.get(s)??"").trim();if(!o){this.requestUpdate();return}let a;if(c==="")a=null;else{let u=Number(c.replace(",","."));if(!Number.isFinite(u)){this._error=`"${c}" is not a number.`,this._drafts.delete(s),this.requestUpdate();return}a=u}if(a===i){this._drafts.delete(s),this.requestUpdate();return}if(!this.hass||!this.config){this._drafts.delete(s);return}let l={entity_id:this.config.entity,row:e,column:r};a!==null&&(l.value=a);try{await this.hass.callService(w,"set_cell",l),this._error=void 0}catch(u){this._error=u instanceof Error?u.message:String(u)}finally{this._drafts.delete(s),this.requestUpdate()}}};A([T({attribute:!1})],P.prototype,"hass",2),A([z()],P.prototype,"config",2),A([z()],P.prototype,"_error",2);D("matrix-helper-card",P);window.customCards=window.customCards||[];window.customCards.some(n=>n.type==="matrix-helper-card")||window.customCards.push({type:"matrix-helper-card",name:"Matrix Helper Card",description:"An editable grid for a Matrix Helper entity.",preview:!0,getEntitySuggestion:(n,t)=>W(t)!==w?null:{config:{type:"custom:matrix-helper-card",entity:t}}});export{P as MatrixHelperCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
