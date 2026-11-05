var We=Object.defineProperty;var Be=Object.getOwnPropertyDescriptor;var $=(i,e,t,r)=>{for(var n=r>1?void 0:r?Be(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&We(e,t,n),n};var K=globalThis,Y=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol(),_e=new WeakMap,L=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Y&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=_e.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&_e.set(t,e))}return e}toString(){return this.cssText}},ve=i=>new L(typeof i=="string"?i:i+"",void 0,te),re=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((r,n,s)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[s+1],i[0]);return new L(t,i,te)},be=(i,e)=>{if(Y)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),n=K.litNonce;n!==void 0&&r.setAttribute("nonce",n),r.textContent=t.cssText,i.appendChild(r)}},ie=Y?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return ve(t)})(i):i;var{is:Ve,defineProperty:je,getOwnPropertyDescriptor:Ke,getOwnPropertyNames:Ye,getOwnPropertySymbols:Ge,getPrototypeOf:Xe}=Object,G=globalThis,we=G.trustedTypes,Je=we?we.emptyScript:"",Ze=G.reactiveElementPolyfillSupport,N=(i,e)=>i,O={toAttribute(i,e){switch(e){case Boolean:i=i?Je:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},X=(i,e)=>!Ve(i,e),$e={attribute:!0,type:String,converter:O,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),G.litPropertyMetadata??=new WeakMap;var _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$e){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),n=this.getPropertyDescriptor(e,r,t);n!==void 0&&je(this.prototype,e,n)}}static getPropertyDescriptor(e,t,r){let{get:n,set:s}=Ke(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:n,set(o){let c=n?.call(this);s?.call(this,o),this.requestUpdate(e,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$e}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let e=Xe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let t=this.properties,r=[...Ye(t),...Ge(t)];for(let n of r)this.createProperty(n,t[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,n]of t)this.elementProperties.set(r,n)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let n=this._$Eu(t,r);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let n of r)t.unshift(ie(n))}else e!==void 0&&t.push(ie(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return be(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,r);if(n!==void 0&&r.reflect===!0){let s=(r.converter?.toAttribute!==void 0?r.converter:O).toAttribute(t,r.type);this._$Em=e,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(e,t){let r=this.constructor,n=r._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let s=r.getPropertyOptions(n),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:O;this._$Em=n;let c=o.fromAttribute(t,s.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(e,t,r,n=!1,s){if(e!==void 0){let o=this.constructor;if(n===!1&&(s=this[e]),r??=o.getPropertyOptions(e),!((r.hasChanged??X)(s,t)||r.useDefault&&r.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:n,wrapped:s},o){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),s!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[n,s]of r){let{wrapped:o}=s,c=this[n];o!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,s,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[N("elementProperties")]=new Map,_[N("finalized")]=new Map,Ze?.({ReactiveElement:_}),(G.reactiveElementVersions??=[]).push("2.1.2");var de=globalThis,Ee=i=>i,J=de.trustedTypes,Ae=J?J.createPolicy("lit-html",{createHTML:i=>i}):void 0,He="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Me="?"+w,Qe=`<${Me}>`,x=document,I=()=>x.createComment(""),U=i=>i===null||typeof i!="object"&&typeof i!="function",ue=Array.isArray,et=i=>ue(i)||typeof i?.[Symbol.iterator]=="function",ne=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xe=/-->/g,Se=/>/g,E=RegExp(`>|${ne}(?:([^\\s"'>=/]+)(${ne}*=${ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ke=/'/g,Te=/"/g,De=/^(?:script|style|textarea|title)$/i,he=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),m=he(1),At=he(2),xt=he(3),v=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Ce=new WeakMap,A=x.createTreeWalker(x,129);function Pe(i,e){if(!ue(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ae!==void 0?Ae.createHTML(e):e}var tt=(i,e)=>{let t=i.length-1,r=[],n,s=e===2?"<svg>":e===3?"<math>":"",o=R;for(let c=0;c<t;c++){let a=i[c],l,u,d=-1,f=0;for(;f<a.length&&(o.lastIndex=f,u=o.exec(a),u!==null);)f=o.lastIndex,o===R?u[1]==="!--"?o=xe:u[1]!==void 0?o=Se:u[2]!==void 0?(De.test(u[2])&&(n=RegExp("</"+u[2],"g")),o=E):u[3]!==void 0&&(o=E):o===E?u[0]===">"?(o=n??R,d=-1):u[1]===void 0?d=-2:(d=o.lastIndex-u[2].length,l=u[1],o=u[3]===void 0?E:u[3]==='"'?Te:ke):o===Te||o===ke?o=E:o===xe||o===Se?o=R:(o=E,n=void 0);let g=o===E&&i[c+1].startsWith("/>")?" ":"";s+=o===R?a+Qe:d>=0?(r.push(l),a.slice(0,d)+He+a.slice(d)+w+g):a+w+(d===-2?c:g)}return[Pe(i,s+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},q=class i{constructor({strings:e,_$litType$:t},r){let n;this.parts=[];let s=0,o=0,c=e.length-1,a=this.parts,[l,u]=tt(e,t);if(this.el=i.createElement(l,r),A.currentNode=this.el.content,t===2||t===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(n=A.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let d of n.getAttributeNames())if(d.endsWith(He)){let f=u[o++],g=n.getAttribute(d).split(w),S=/([.?@])?(.*)/.exec(f);a.push({type:1,index:s,name:S[2],strings:g,ctor:S[1]==="."?oe:S[1]==="?"?ae:S[1]==="@"?ce:T}),n.removeAttribute(d)}else d.startsWith(w)&&(a.push({type:6,index:s}),n.removeAttribute(d));if(De.test(n.tagName)){let d=n.textContent.split(w),f=d.length-1;if(f>0){n.textContent=J?J.emptyScript:"";for(let g=0;g<f;g++)n.append(d[g],I()),A.nextNode(),a.push({type:2,index:++s});n.append(d[f],I())}}}else if(n.nodeType===8)if(n.data===Me)a.push({type:2,index:s});else{let d=-1;for(;(d=n.data.indexOf(w,d+1))!==-1;)a.push({type:7,index:s}),d+=w.length-1}s++}}static createElement(e,t){let r=x.createElement("template");return r.innerHTML=e,r}};function k(i,e,t=i,r){if(e===v)return e;let n=r!==void 0?t._$Co?.[r]:t._$Cl,s=U(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(i),n._$AT(i,t,r)),r!==void 0?(t._$Co??=[])[r]=n:t._$Cl=n),n!==void 0&&(e=k(i,n._$AS(i,e.values),n,r)),e}var se=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,n=(e?.creationScope??x).importNode(t,!0);A.currentNode=n;let s=A.nextNode(),o=0,c=0,a=r[0];for(;a!==void 0;){if(o===a.index){let l;a.type===2?l=new F(s,s.nextSibling,this,e):a.type===1?l=new a.ctor(s,a.name,a.strings,this,e):a.type===6&&(l=new le(s,this,e)),this._$AV.push(l),a=r[++c]}o!==a?.index&&(s=A.nextNode(),o++)}return A.currentNode=x,n}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},F=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,n){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=k(this,e,t),U(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==v&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):et(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(x.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,n=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=q.createElement(Pe(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===n)this._$AH.p(t);else{let s=new se(n,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(e){let t=Ce.get(e.strings);return t===void 0&&Ce.set(e.strings,t=new q(e)),t}k(e){ue(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,n=0;for(let s of e)n===t.length?t.push(r=new i(this.O(I()),this.O(I()),this,this.options)):r=t[n],r._$AI(s),n++;n<t.length&&(this._$AR(r&&r._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=Ee(e).nextSibling;Ee(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,n,s){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(e,t=this,r,n){let s=this.strings,o=!1;if(s===void 0)e=k(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==v,o&&(this._$AH=e);else{let c=e,a,l;for(e=s[0],a=0;a<s.length-1;a++)l=k(this,c[r+a],t,a),l===v&&(l=this._$AH[a]),o||=!U(l)||l!==this._$AH[a],l===h?e=h:e!==h&&(e+=(l??"")+s[a+1]),this._$AH[a]=l}o&&!n&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},oe=class extends T{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}},ae=class extends T{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}},ce=class extends T{constructor(e,t,r,n,s){super(e,t,r,n,s),this.type=5}_$AI(e,t=this){if((e=k(this,e,t,0)??h)===v)return;let r=this._$AH,n=e===h&&r!==h||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==h&&(r===h||n);n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},le=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}};var rt=de.litHtmlPolyfillSupport;rt?.(q,F),(de.litHtmlVersions??=[]).push("3.3.3");var Le=(i,e,t)=>{let r=t?.renderBefore??e,n=r._$litPart$;if(n===void 0){let s=t?.renderBefore??null;r._$litPart$=n=new F(e.insertBefore(I(),s),s,void 0,t??{})}return n._$AI(i),n};var me=globalThis,y=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Le(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v}};y._$litElement$=!0,y.finalized=!0,me.litElementHydrateSupport?.({LitElement:y});var it=me.litElementPolyfillSupport;it?.({LitElement:y});(me.litElementVersions??=[]).push("4.2.2");var nt={attribute:!0,type:String,converter:O,reflect:!1,hasChanged:X},st=(i=nt,e,t)=>{let{kind:r,metadata:n}=t,s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),s.set(t.name,i),r==="accessor"){let{name:o}=t;return{set(c){let a=e.get.call(this);e.set.call(this,c),this.requestUpdate(o,a,i,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,i,c),c}}}if(r==="setter"){let{name:o}=t;return function(c){let a=this[o];e.call(this,c),this.requestUpdate(o,a,i,!0,c)}}throw Error("Unsupported decorator location: "+r)};function C(i){return(e,t)=>typeof t=="object"?st(i,e,t):((r,n,s)=>{let o=n.hasOwnProperty(s);return n.constructor.createProperty(s,r),o?Object.getOwnPropertyDescriptor(n,s):void 0})(i,e,t)}function z(i){return C({...i,state:!0,attribute:!1})}var Ne={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Q=i=>(...e)=>({_$litDirective$:i,values:e}),H=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var Oe=Q(class extends H{constructor(i){if(super(i),i.type!==Ne.ATTRIBUTE||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(e=>i[e]).join(" ")+" "}update(i,[e]){if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}let t=i.element.classList;for(let r of this.st)r in e||(t.remove(r),this.st.delete(r));for(let r in e){let n=!!e[r];n===this.st.has(r)||this.nt?.has(r)||(n?(t.add(r),this.st.add(r)):(t.remove(r),this.st.delete(r)))}return v}});function B(i){return i.substr(0,i.indexOf("."))}var Re;(function(i){i.language="language",i.system="system",i.comma_decimal="comma_decimal",i.decimal_comma="decimal_comma",i.space_comma="space_comma",i.none="none"})(Re||(Re={}));var Ie;(function(i){i.language="language",i.system="system",i.am_pm="12",i.twenty_four="24"})(Ie||(Ie={}));var ot=["closed","locked","off"];var p=(i,e,t,r)=>{r=r||{},t=t??{};let n=new Event(e,{bubbles:r.bubbles===void 0?!0:r.bubbles,cancelable:!!r.cancelable,composed:r.composed===void 0?!0:r.composed});return n.detail=t,i.dispatchEvent(n),n};var at=(i,e)=>{if(i.byteLength!==e.byteLength)return!1;let t=new Uint8Array(i.buffer,i.byteOffset,i.byteLength),r=new Uint8Array(e.buffer,e.byteOffset,e.byteLength);for(let n=0;n<t.length;n++)if(t[n]!==r[n])return!1;return!0},W=(i,e)=>{if(i===e)return!0;if(i&&e&&typeof i=="object"&&typeof e=="object"){if(i.constructor!==e.constructor)return!1;let t,r;if(Array.isArray(i)){let c=e;if(r=i.length,r!==c.length)return!1;for(t=r;t--!==0;)if(!W(i[t],c[t]))return!1;return!0}if(i instanceof Map&&e instanceof Map){if(i.size!==e.size)return!1;for(t of i.entries())if(!e.has(t[0]))return!1;for(t of i.entries())if(!W(t[1],e.get(t[0])))return!1;return!0}if(i instanceof Set&&e instanceof Set){if(i.size!==e.size)return!1;for(t of i.entries())if(!e.has(t[0]))return!1;return!0}if(ArrayBuffer.isView(i)&&ArrayBuffer.isView(e))return at(i,e);if(i instanceof RegExp&&e instanceof RegExp)return i.source===e.source&&i.flags===e.flags;if(i.valueOf!==Object.prototype.valueOf)return i.valueOf()===e.valueOf();if(i.toString!==Object.prototype.toString)return i.toString()===e.toString();let n=i,s=e,o=Object.keys(n);if(r=o.length,r!==Object.keys(s).length)return!1;for(t=r;t--!==0;)if(!Object.prototype.hasOwnProperty.call(e,o[t]))return!1;for(t=r;t--!==0;){let c=o[t];if(!W(n[c],s[c]))return!1}return!0}return i!==i&&e!==e};var ee=i=>{p(window,"haptic",i)},ct=(i,e,t=!1)=>{t?history.replaceState(null,"",e):history.pushState(null,"",e),p(window,"location-changed",{replace:t})},lt=(i,e,t=!0)=>{let r=B(e),n=r==="group"?"homeassistant":r,s;switch(r){case"lock":s=t?"unlock":"lock";break;case"cover":s=t?"open_cover":"close_cover";break;default:s=t?"turn_on":"turn_off"}return i.callService(n,s,{entity_id:e})},dt=(i,e)=>{let t=ot.includes(i.states[e].state);return lt(i,e,t)},ut=(i,e,t,r)=>{if(r||(r={action:"more-info"}),!(r.confirmation&&(!r.confirmation.exemptions||!r.confirmation.exemptions.some(n=>n.user===e.user.id))&&(ee("warning"),!confirm(r.confirmation.text||`Are you sure you want to ${r.action}?`))))switch(r.action){case"more-info":(t.entity||t.camera_image)&&p(i,"hass-more-info",{entityId:t.entity?t.entity:t.camera_image});break;case"navigate":r.navigation_path&&ct(i,r.navigation_path);break;case"url":r.url_path&&window.open(r.url_path);break;case"toggle":t.entity&&(dt(e,t.entity),ee("success"));break;case"call-service":{if(!r.service){ee("failure");return}let[n,s]=r.service.split(".",2);e.callService(n,s,r.service_data,r.target),ee("success");break}case"fire-dom-event":p(i,"ll-custom",r)}},Ue=(i,e,t,r)=>{let n;r==="double_tap"&&t.double_tap_action?n=t.double_tap_action:r==="hold"&&t.hold_action?n=t.hold_action:r==="tap"&&t.tap_action&&(n=t.tap_action),ut(i,e,t,n)};function M(i){return i!==void 0&&i.action!=="none"}var b="matrix_helper";function qe(i){return i.target.value}function D(i,e){customElements.get(i)||customElements.define(i,e)}var Fe="ontouchstart"in window||navigator.maxTouchPoints>0,ht=250,pe=class extends HTMLElement{constructor(){super(...arguments);this.holdTime=500;this.held=!1;this.cancelled=!1}connectedCallback(){Object.assign(this.style,{position:"fixed",width:Fe?"100px":"50px",height:Fe?"100px":"50px",transform:"translate(-50%, -50%) scale(0)",pointerEvents:"none",zIndex:"999",background:"rgba(var(--rgb-primary-color), 0.3)",borderRadius:"50%",transition:"transform 180ms ease-in-out"}),["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{this.cancelled=!0,this.timer&&(this._stopAnimation(),clearTimeout(this.timer),this.timer=void 0)},{passive:!0})})}bind(t,r={}){t.actionHandler&&W(r,t.actionHandler.options)||(t.actionHandler?(t.removeEventListener("touchstart",t.actionHandler.start),t.removeEventListener("touchend",t.actionHandler.end),t.removeEventListener("touchcancel",t.actionHandler.end),t.removeEventListener("mousedown",t.actionHandler.start),t.removeEventListener("click",t.actionHandler.end),t.removeEventListener("keydown",t.actionHandler.handleKeyDown)):t.addEventListener("contextmenu",n=>{n.preventDefault()}),t.actionHandler={options:r},t.actionHandler.start=n=>{this.cancelled=!1;let s,o;n.touches?(s=n.touches[0].clientX,o=n.touches[0].clientY):(s=n.clientX,o=n.clientY),r.hasHold&&(this.held=!1,this.timer=window.setTimeout(()=>{this._startAnimation(s,o),this.held=!0,p(t,"action",{action:"hold"})},this.holdTime))},t.actionHandler.end=n=>{if(n.type==="touchcancel"||n.type==="touchend"&&this.cancelled)return;let s=n.target;if(n.cancelable&&n.preventDefault(),r.hasHold&&(clearTimeout(this.timer),this._stopAnimation(),this.timer=void 0),r.hasHold&&this.held)p(s,"action",{action:"hold"});else if(r.hasDoubleClick)if(n.type==="click"&&n.detail<2||!this.dblClickTimeout||this.dblClickTarget!==s){let o=window.setTimeout(()=>{this.dblClickTimeout===o&&(this.dblClickTimeout=void 0,this.dblClickTarget=void 0),p(s,"action",{action:"tap"})},ht);this.dblClickTimeout=o,this.dblClickTarget=s}else clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,this.dblClickTarget=void 0,p(s,"action",{action:"double_tap"});else p(s,"action",{action:"tap"})},t.actionHandler.handleKeyDown=n=>{["Enter"," "].includes(n.key)&&n.currentTarget.actionHandler.end(n)},t.addEventListener("touchstart",t.actionHandler.start,{passive:!0}),t.addEventListener("touchend",t.actionHandler.end),t.addEventListener("touchcancel",t.actionHandler.end),t.addEventListener("mousedown",t.actionHandler.start,{passive:!0}),t.addEventListener("click",t.actionHandler.end),t.addEventListener("keydown",t.actionHandler.handleKeyDown))}_startAnimation(t,r){Object.assign(this.style,{left:`${t}px`,top:`${r}px`,transform:"translate(-50%, -50%) scale(1)"})}_stopAnimation(){Object.assign(this.style,{left:"",top:"",transform:"translate(-50%, -50%) scale(0)"})}};D("matrix-helper-card-action-handler",pe);var mt=()=>{let i=document.body,e=i.querySelector("matrix-helper-card-action-handler");if(e)return e;let t=document.createElement("matrix-helper-card-action-handler");return i.appendChild(t),t},pt=(i,e)=>{mt().bind(i,e)},fe=class extends H{constructor(e){super(e)}render(e){}update(e,[t]){return pt(e.element,t),this.render()}},ze=Q(fe);var ge=null;function V(i){return ge||(ge=(async()=>{let e=await window.loadCardHelpers?.();if(!e)return;let t=await e.createCardElement({type:"tile",entity:"sun.sun"});t.hass=i,t.style.display="none",document.body.appendChild(t),await t.updateComplete,t.remove(),await t.constructor.getConfigElement?.();let n=document.createElement("ha-form");n.hass=i,n.data={},n.schema=[{name:"_probe",selector:{text:{}}}],n.style.display="none",document.body.appendChild(n),await n.updateComplete,n.remove()})().catch(()=>{})),ge}var ye=["more-info","navigate","url","none"],ft=[{name:"entity",selector:{entity:{filter:{domain:b}}}},{name:"content",type:"expandable",flatten:!0,schema:[{name:"name",selector:{entity_name:{}},context:{entity:"entity"}},{name:"",type:"grid",schema:[{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"color",selector:{ui_color:{include_state:!0,include_none:!0}}}]},{name:"state_content",selector:{ui_state_content:{allow_context:!0}},context:{filter_entity:"entity"}}]},{name:"interactions",type:"expandable",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{actions:ye,default_action:"more-info"}}},{name:"",type:"optional_actions",flatten:!0,schema:[{name:"hold_action",selector:{ui_action:{actions:ye,default_action:"none"}}},{name:"double_tap_action",selector:{ui_action:{actions:ye,default_action:"none"}}}]}]}],j=class extends y{constructor(){super(...arguments);this._computeLabel=t=>t.name==="state_content"?this.hass.localize("ui.panel.lovelace.editor.card.entity-row.secondary_info"):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}connectedCallback(){super.connectedCallback(),this.hass&&V(this.hass).then(()=>this.requestUpdate())}updated(t){t.has("hass")&&this.hass&&V(this.hass).then(()=>this.requestUpdate())}setConfig(t){this.config=t}render(){return!this.hass||!this.config?m``:m`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${ft}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(t){p(this,"config-changed",{config:t.detail.value})}};$([C({attribute:!1})],j.prototype,"hass",2),$([z()],j.prototype,"config",2);D("matrix-helper-card-editor",j);var gt=new Set(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function yt(i){return gt.has(i)?`var(--${i}-color)`:i}function _t(i){if(!(!i||i==="state"||i==="none"))return yt(i)}var P=class extends y{constructor(){super(...arguments);this._drafts=new Map;this._componentsRequested=!1;this._resizeObserver=new ResizeObserver(()=>this._syncPanes());this._observedBody=null;this._syncPanes=()=>{let t=this.renderRoot,r=t.querySelector(".body");r&&(t.querySelector(".grid").style.setProperty("--scrollbar-width",`${r.offsetWidth-r.clientWidth}px`),t.querySelector(".column-track").style.transform=`translateX(${-r.scrollLeft}px)`,t.querySelector(".row-track").style.transform=`translateY(${-r.scrollTop}px)`)};this._scrollbarPressed=!1}static{this.styles=re`
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
  `}updated(){this.hass&&!this._componentsRequested&&(this._componentsRequested=!0,V(this.hass).then(()=>this.requestUpdate()));let t=this.renderRoot.querySelector(".body");t!==this._observedBody&&(this._resizeObserver.disconnect(),t&&this._resizeObserver.observe(t),this._observedBody=t),this._syncPanes()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver.disconnect(),this._observedBody=null}setConfig(t){if(!t.entity||B(t.entity)!==b)throw new Error(`"entity" is required and must be a ${b} entity (e.g. ${b}.climate_profiles).`);this.config=t,this._drafts.clear(),this._error=void 0}getCardSize(){return 2+((this.config&&this.hass?.states[this.config.entity])?.attributes.rows?.length??1)}getGridOptions(){return{columns:12,min_columns:6,min_rows:3}}static getConfigElement(){return document.createElement("matrix-helper-card-editor")}static getStubConfig(t){return{type:"custom:matrix-helper-card",entity:Object.keys(t.states).find(n=>B(n)===b)??""}}shouldUpdate(t){let r=t.get("hass");return!this.config||!r||t.size>1?!0:r.states[this.config.entity]!==this.hass?.states[this.config.entity]}render(){if(!this.config||!this.hass)return m``;let t=this.hass.states[this.config.entity];if(!t)return m`<ha-card>
        <div style="padding: 16px;">Entity ${this.config.entity} not found.</div>
      </ha-card>`;let{rows:r,columns:n,data:s,row_labels:o,column_labels:c}=t.attributes;if(t.state==="unavailable"||!r||!n||!s||!o||!c)return m`<ha-card>
        <div style="padding: 16px;">Entity ${this.config.entity} is unavailable.</div>
      </ha-card>`;let a=this.hass.formatEntityName(t,this.config.name),l=_t(this.config.color),u=this.config.tap_action===void 0||M(this.config.tap_action)||M(this.config.hold_action)||M(this.config.double_tap_action);return m`
      <ha-card>
        <div
          class=${Oe({container:!0,interactive:u})}
          @action=${this._handleAction}
          @pointerenter=${this._trackHover}
          @pointermove=${this._trackHover}
          @pointerleave=${this._trackHover}
          ${ze({hasHold:M(this.config.hold_action),hasDoubleClick:M(this.config.double_tap_action)})}
        >
          <ha-ripple .disabled=${!u}></ha-ripple>
          <!-- The header is the card's keyboard-focusable button; its
               Enter/Space keydown bubbles to the container's handler. -->
          <div
            class="header"
            tabindex=${u?"0":h}
            role=${u?"button":h}
            aria-label=${u?a:h}
          >
            <ha-state-icon
              style=${l?`color: ${l}`:""}
              .icon=${this.config.icon}
              .stateObj=${t}
            ></ha-state-icon>
            <ha-tile-info>
              <span slot="primary">${a}</span>
              ${this.config.state_content?m`<span slot="secondary">
                    <state-display
                      .hass=${this.hass}
                      .stateObj=${t}
                      .content=${this.config.state_content}
                    ></state-display>
                  </span>`:h}
            </ha-tile-info>
          </div>
          <div class="content">
            ${this._error?m`<ha-alert alert-type="error">${this._error}</ha-alert>`:""}
            <div class="grid" style=${`--columns: ${n.length}`}>
              <div class="corner"></div>
              <div class="column-labels" @wheel=${this._forwardWheel}>
                <div class="column-track">
                  ${c.map(d=>m`<div class="label">${d}</div>`)}
                </div>
              </div>
              <div class="row-labels" @wheel=${this._forwardWheel}>
                <div class="row-track">
                  ${o.map(d=>m`<div class="label">${d}</div>`)}
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
                  ${r.map((d,f)=>n.map((g,S)=>this._renderCell(s,d,g,`${o[f]}, ${c[S]}`)))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `}_renderCell(t,r,n,s){let o=`${r}:${n}`,c=t[r]?.[n]??null,a=this._drafts.has(o)?this._drafts.get(o):c===null?"":String(c);return m`<div class="slot">
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
        @change=${()=>this._commitCell(r,n,c)}
      ></ha-input>
    </div>`}_forwardWheel(t){let r=this.renderRoot.querySelector(".body");if(!r)return;let n=t.deltaMode===WheelEvent.DOM_DELTA_LINE?16:1,[s,o]=t.shiftKey&&!t.deltaX?[t.deltaY,0]:[t.deltaX,t.deltaY],{scrollLeft:c,scrollTop:a}=r;r.scrollBy(s*n,o*n),(r.scrollLeft!==c||r.scrollTop!==a)&&t.preventDefault()}_isolateCell(t){t.stopPropagation()}_isOnScrollbar(t){let r=t.target;return r.classList?.contains("body")&&(t.offsetX>=r.clientWidth||t.offsetY>=r.clientHeight)}_isolateScrollbar(t){t.type==="click"?((this._scrollbarPressed||this._isOnScrollbar(t))&&t.stopPropagation(),this._scrollbarPressed=!1):this._isOnScrollbar(t)&&(this._scrollbarPressed=!0,t.stopPropagation())}_trackHover(t){let r=t.currentTarget;if(t.type==="pointerleave"||t.pointerType==="touch"){r.classList.remove("hovered","no-hover");return}let n=t.target.closest?.("ha-input.cell")!=null;r.classList.add("hovered"),r.classList.toggle("no-hover",n||this._isOnScrollbar(t))}_handleAction(t){this.hass&&this.config&&Ue(this,this.hass,this.config,t.detail.action)}async _commitCell(t,r,n){let s=`${t}:${r}`,o=this._drafts.has(s),c=(this._drafts.get(s)??"").trim();if(!o){this.requestUpdate();return}let a;if(c==="")a=null;else{let u=Number(c.replace(",","."));if(!Number.isFinite(u)){this._error=`"${c}" is not a number.`,this._drafts.delete(s),this.requestUpdate();return}a=u}if(a===n){this._drafts.delete(s),this.requestUpdate();return}if(!this.hass||!this.config){this._drafts.delete(s);return}let l={entity_id:this.config.entity,row:t,column:r};a!==null&&(l.value=a);try{await this.hass.callService(b,"set_cell",l),this._error=void 0}catch(u){this._error=u instanceof Error?u.message:String(u)}finally{this._drafts.delete(s),this.requestUpdate()}}};$([C({attribute:!1})],P.prototype,"hass",2),$([z()],P.prototype,"config",2),$([z()],P.prototype,"_error",2);D("matrix-helper-card",P);window.customCards=window.customCards||[];window.customCards.some(i=>i.type==="matrix-helper-card")||window.customCards.push({type:"matrix-helper-card",name:"Matrix Helper Card",description:"An editable grid for a Matrix Helper entity.",preview:!0,getEntitySuggestion:(i,e)=>B(e)!==b?null:{config:{type:"custom:matrix-helper-card",entity:e}}});export{P as MatrixHelperCard};
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
