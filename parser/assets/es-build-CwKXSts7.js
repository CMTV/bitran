var Ne={exports:{}};(function(Ve){(Le=>{var xe=Object.defineProperty,Be=Object.getOwnPropertyDescriptor,We=Object.getOwnPropertyNames,ze=Object.prototype.hasOwnProperty,Ge=(t,n)=>{for(var r in n)xe(t,r,{get:n[r],enumerable:!0})},qe=(t,n,r,c)=>{if(n&&typeof n=="object"||typeof n=="function")for(let h of We(n))!ze.call(t,h)&&h!==r&&xe(t,h,{get:()=>n[h],enumerable:!(c=Be(n,h))||c.enumerable});return t},Je=t=>qe(xe({},"__esModule",{value:!0}),t),re=(t,n,r)=>new Promise((c,h)=>{var w=u=>{try{x(r.next(u))}catch(E){h(E)}},f=u=>{try{x(r.throw(u))}catch(E){h(E)}},x=u=>u.done?c(u.value):Promise.resolve(u.value).then(w,f);x((r=r.apply(t,n)).next())}),he={};Ge(he,{analyzeMetafile:()=>ht,analyzeMetafileSync:()=>yt,build:()=>ct,buildSync:()=>mt,context:()=>ut,default:()=>xt,formatMessages:()=>dt,formatMessagesSync:()=>pt,initialize:()=>vt,stop:()=>wt,transform:()=>ft,transformSync:()=>gt,version:()=>at}),Le.exports=Je(he);function Ee(t){let n=c=>{if(c===null)r.write8(0);else if(typeof c=="boolean")r.write8(1),r.write8(+c);else if(typeof c=="number")r.write8(2),r.write32(c|0);else if(typeof c=="string")r.write8(3),r.write(ee(c));else if(c instanceof Uint8Array)r.write8(4),r.write(c);else if(c instanceof Array){r.write8(5),r.write32(c.length);for(let h of c)n(h)}else{let h=Object.keys(c);r.write8(6),r.write32(h.length);for(let w of h)r.write(ee(w)),n(c[w])}},r=new Se;return r.write32(0),r.write32(t.id<<1|+!t.isRequest),n(t.value),ke(r.buf,r.len-4,0),r.buf.subarray(0,r.len)}function Ye(t){let n=()=>{switch(r.read8()){case 0:return null;case 1:return!!r.read8();case 2:return r.read32();case 3:return oe(r.read());case 4:return r.read();case 5:{let f=r.read32(),x=[];for(let u=0;u<f;u++)x.push(n());return x}case 6:{let f=r.read32(),x={};for(let u=0;u<f;u++)x[oe(r.read())]=n();return x}default:throw new Error("Invalid packet")}},r=new Se(t),c=r.read32(),h=(c&1)===0;c>>>=1;let w=n();if(r.ptr!==t.length)throw new Error("Invalid packet");return{id:c,isRequest:h,value:w}}var Se=class{constructor(t=new Uint8Array(1024)){this.buf=t,this.len=0,this.ptr=0}_write(t){if(this.len+t>this.buf.length){let n=new Uint8Array((this.len+t)*2);n.set(this.buf),this.buf=n}return this.len+=t,this.len-t}write8(t){let n=this._write(1);this.buf[n]=t}write32(t){let n=this._write(4);ke(this.buf,t,n)}write(t){let n=this._write(4+t.length);ke(this.buf,t.length,n),this.buf.set(t,n+4)}_read(t){if(this.ptr+t>this.buf.length)throw new Error("Invalid packet");return this.ptr+=t,this.ptr-t}read8(){return this.buf[this._read(1)]}read32(){return Te(this.buf,this._read(4))}read(){let t=this.read32(),n=new Uint8Array(t),r=this._read(n.length);return n.set(this.buf.subarray(r,r+t)),n}},ee,oe,_e;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let t=new TextEncoder,n=new TextDecoder;ee=r=>t.encode(r),oe=r=>n.decode(r),_e='new TextEncoder().encode("")'}else if(typeof Buffer<"u")ee=t=>Buffer.from(t),oe=t=>{let{buffer:n,byteOffset:r,byteLength:c}=t;return Buffer.from(n,r,c).toString()},_e='Buffer.from("")';else throw new Error("No UTF-8 codec found");if(!(ee("")instanceof Uint8Array))throw new Error(`Invariant violation: "${_e} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);function Te(t,n){return t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24}function ke(t,n,r){t[r++]=n,t[r++]=n>>8,t[r++]=n>>16,t[r++]=n>>24}var q=JSON.stringify,$e="warning",je="silent";function Pe(t){if(Y(t,"target"),t.indexOf(",")>=0)throw new Error(`Invalid target: ${t}`);return t}var me=()=>null,B=t=>typeof t=="boolean"?null:"a boolean",k=t=>typeof t=="string"?null:"a string",ge=t=>t instanceof RegExp?null:"a RegExp object",se=t=>typeof t=="number"&&t===(t|0)?null:"an integer",Oe=t=>typeof t=="function"?null:"a function",z=t=>Array.isArray(t)?null:"an array",X=t=>typeof t=="object"&&t!==null&&!Array.isArray(t)?null:"an object",He=t=>typeof t=="object"&&t!==null?null:"an array or an object",Qe=t=>t instanceof WebAssembly.Module?null:"a WebAssembly.Module",Ce=t=>typeof t=="object"&&!Array.isArray(t)?null:"an object or null",De=t=>typeof t=="string"||typeof t=="boolean"?null:"a string or a boolean",Xe=t=>typeof t=="string"||typeof t=="object"&&t!==null&&!Array.isArray(t)?null:"a string or an object",Ke=t=>typeof t=="string"||Array.isArray(t)?null:"a string or an array",Ae=t=>typeof t=="string"||t instanceof Uint8Array?null:"a string or a Uint8Array",Ze=t=>typeof t=="string"||t instanceof URL?null:"a string or a URL";function i(t,n,r,c){let h=t[r];if(n[r+""]=!0,h===void 0)return;let w=c(h);if(w!==null)throw new Error(`${q(r)} must be ${w}`);return h}function J(t,n,r){for(let c in t)if(!(c in n))throw new Error(`Invalid option ${r}: ${q(c)}`)}function et(t){let n=Object.create(null),r=i(t,n,"wasmURL",Ze),c=i(t,n,"wasmModule",Qe),h=i(t,n,"worker",B);return J(t,n,"in initialize() call"),{wasmURL:r,wasmModule:c,worker:h}}function Ue(t){let n;if(t!==void 0){n=Object.create(null);for(let r in t){let c=t[r];if(typeof c=="string"||c===!1)n[r]=c;else throw new Error(`Expected ${q(r)} in mangle cache to map to either a string or false`)}}return n}function pe(t,n,r,c,h){let w=i(n,r,"color",B),f=i(n,r,"logLevel",k),x=i(n,r,"logLimit",se);w!==void 0?t.push(`--color=${w}`):c&&t.push("--color=true"),t.push(`--log-level=${f||h}`),t.push(`--log-limit=${x||0}`)}function Y(t,n,r){if(typeof t!="string")throw new Error(`Expected value for ${n}${r!==void 0?" "+q(r):""} to be a string, got ${typeof t} instead`);return t}function Re(t,n,r){let c=i(n,r,"legalComments",k),h=i(n,r,"sourceRoot",k),w=i(n,r,"sourcesContent",B),f=i(n,r,"target",Ke),x=i(n,r,"format",k),u=i(n,r,"globalName",k),E=i(n,r,"mangleProps",ge),$=i(n,r,"reserveProps",ge),P=i(n,r,"mangleQuoted",B),L=i(n,r,"minify",B),R=i(n,r,"minifySyntax",B),D=i(n,r,"minifyWhitespace",B),H=i(n,r,"minifyIdentifiers",B),p=i(n,r,"lineLimit",se),I=i(n,r,"drop",z),M=i(n,r,"dropLabels",z),g=i(n,r,"charset",k),a=i(n,r,"treeShaking",B),l=i(n,r,"ignoreAnnotations",B),o=i(n,r,"jsx",k),m=i(n,r,"jsxFactory",k),y=i(n,r,"jsxFragment",k),_=i(n,r,"jsxImportSource",k),T=i(n,r,"jsxDev",B),e=i(n,r,"jsxSideEffects",B),s=i(n,r,"define",X),d=i(n,r,"logOverride",X),v=i(n,r,"supported",X),S=i(n,r,"pure",z),A=i(n,r,"keepNames",B),C=i(n,r,"platform",k),U=i(n,r,"tsconfigRaw",Xe);if(c&&t.push(`--legal-comments=${c}`),h!==void 0&&t.push(`--source-root=${h}`),w!==void 0&&t.push(`--sources-content=${w}`),f&&(Array.isArray(f)?t.push(`--target=${Array.from(f).map(Pe).join(",")}`):t.push(`--target=${Pe(f)}`)),x&&t.push(`--format=${x}`),u&&t.push(`--global-name=${u}`),C&&t.push(`--platform=${C}`),U&&t.push(`--tsconfig-raw=${typeof U=="string"?U:JSON.stringify(U)}`),L&&t.push("--minify"),R&&t.push("--minify-syntax"),D&&t.push("--minify-whitespace"),H&&t.push("--minify-identifiers"),p&&t.push(`--line-limit=${p}`),g&&t.push(`--charset=${g}`),a!==void 0&&t.push(`--tree-shaking=${a}`),l&&t.push("--ignore-annotations"),I)for(let O of I)t.push(`--drop:${Y(O,"drop")}`);if(M&&t.push(`--drop-labels=${Array.from(M).map(O=>Y(O,"dropLabels")).join(",")}`),E&&t.push(`--mangle-props=${E.source}`),$&&t.push(`--reserve-props=${$.source}`),P!==void 0&&t.push(`--mangle-quoted=${P}`),o&&t.push(`--jsx=${o}`),m&&t.push(`--jsx-factory=${m}`),y&&t.push(`--jsx-fragment=${y}`),_&&t.push(`--jsx-import-source=${_}`),T&&t.push("--jsx-dev"),e&&t.push("--jsx-side-effects"),s)for(let O in s){if(O.indexOf("=")>=0)throw new Error(`Invalid define: ${O}`);t.push(`--define:${O}=${Y(s[O],"define",O)}`)}if(d)for(let O in d){if(O.indexOf("=")>=0)throw new Error(`Invalid log override: ${O}`);t.push(`--log-override:${O}=${Y(d[O],"log override",O)}`)}if(v)for(let O in v){if(O.indexOf("=")>=0)throw new Error(`Invalid supported: ${O}`);const j=v[O];if(typeof j!="boolean")throw new Error(`Expected value for supported ${q(O)} to be a boolean, got ${typeof j} instead`);t.push(`--supported:${O}=${j}`)}if(S)for(let O of S)t.push(`--pure:${Y(O,"pure")}`);A&&t.push("--keep-names")}function tt(t,n,r,c,h){var w;let f=[],x=[],u=Object.create(null),E=null,$=null;pe(f,n,u,r,c),Re(f,n,u);let P=i(n,u,"sourcemap",De),L=i(n,u,"bundle",B),R=i(n,u,"splitting",B),D=i(n,u,"preserveSymlinks",B),H=i(n,u,"metafile",B),p=i(n,u,"outfile",k),I=i(n,u,"outdir",k),M=i(n,u,"outbase",k),g=i(n,u,"tsconfig",k),a=i(n,u,"resolveExtensions",z),l=i(n,u,"nodePaths",z),o=i(n,u,"mainFields",z),m=i(n,u,"conditions",z),y=i(n,u,"external",z),_=i(n,u,"packages",k),T=i(n,u,"alias",X),e=i(n,u,"loader",X),s=i(n,u,"outExtension",X),d=i(n,u,"publicPath",k),v=i(n,u,"entryNames",k),S=i(n,u,"chunkNames",k),A=i(n,u,"assetNames",k),C=i(n,u,"inject",z),U=i(n,u,"banner",X),O=i(n,u,"footer",X),j=i(n,u,"entryPoints",He),V=i(n,u,"absWorkingDir",k),F=i(n,u,"stdin",X),N=(w=i(n,u,"write",B))!=null?w:h,K=i(n,u,"allowOverwrite",B),G=i(n,u,"mangleCache",X);if(u.plugins=!0,J(n,u,`in ${t}() call`),P&&f.push(`--sourcemap${P===!0?"":`=${P}`}`),L&&f.push("--bundle"),K&&f.push("--allow-overwrite"),R&&f.push("--splitting"),D&&f.push("--preserve-symlinks"),H&&f.push("--metafile"),p&&f.push(`--outfile=${p}`),I&&f.push(`--outdir=${I}`),M&&f.push(`--outbase=${M}`),g&&f.push(`--tsconfig=${g}`),_&&f.push(`--packages=${_}`),a){let b=[];for(let W of a){if(Y(W,"resolve extension"),W.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${W}`);b.push(W)}f.push(`--resolve-extensions=${b.join(",")}`)}if(d&&f.push(`--public-path=${d}`),v&&f.push(`--entry-names=${v}`),S&&f.push(`--chunk-names=${S}`),A&&f.push(`--asset-names=${A}`),o){let b=[];for(let W of o){if(Y(W,"main field"),W.indexOf(",")>=0)throw new Error(`Invalid main field: ${W}`);b.push(W)}f.push(`--main-fields=${b.join(",")}`)}if(m){let b=[];for(let W of m){if(Y(W,"condition"),W.indexOf(",")>=0)throw new Error(`Invalid condition: ${W}`);b.push(W)}f.push(`--conditions=${b.join(",")}`)}if(y)for(let b of y)f.push(`--external:${Y(b,"external")}`);if(T)for(let b in T){if(b.indexOf("=")>=0)throw new Error(`Invalid package name in alias: ${b}`);f.push(`--alias:${b}=${Y(T[b],"alias",b)}`)}if(U)for(let b in U){if(b.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${b}`);f.push(`--banner:${b}=${Y(U[b],"banner",b)}`)}if(O)for(let b in O){if(b.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${b}`);f.push(`--footer:${b}=${Y(O[b],"footer",b)}`)}if(C)for(let b of C)f.push(`--inject:${Y(b,"inject")}`);if(e)for(let b in e){if(b.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${b}`);f.push(`--loader:${b}=${Y(e[b],"loader",b)}`)}if(s)for(let b in s){if(b.indexOf("=")>=0)throw new Error(`Invalid out extension: ${b}`);f.push(`--out-extension:${b}=${Y(s[b],"out extension",b)}`)}if(j)if(Array.isArray(j))for(let b=0,W=j.length;b<W;b++){let Z=j[b];if(typeof Z=="object"&&Z!==null){let te=Object.create(null),Q=i(Z,te,"in",k),de=i(Z,te,"out",k);if(J(Z,te,"in entry point at index "+b),Q===void 0)throw new Error('Missing property "in" for entry point at index '+b);if(de===void 0)throw new Error('Missing property "out" for entry point at index '+b);x.push([de,Q])}else x.push(["",Y(Z,"entry point at index "+b)])}else for(let b in j)x.push([b,Y(j[b],"entry point",b)]);if(F){let b=Object.create(null),W=i(F,b,"contents",Ae),Z=i(F,b,"resolveDir",k),te=i(F,b,"sourcefile",k),Q=i(F,b,"loader",k);J(F,b,'in "stdin" object'),te&&f.push(`--sourcefile=${te}`),Q&&f.push(`--loader=${Q}`),Z&&($=Z),typeof W=="string"?E=ee(W):W instanceof Uint8Array&&(E=W)}let ce=[];if(l)for(let b of l)b+="",ce.push(b);return{entries:x,flags:f,write:N,stdinContents:E,stdinResolveDir:$,absWorkingDir:V,nodePaths:ce,mangleCache:Ue(G)}}function nt(t,n,r,c){let h=[],w=Object.create(null);pe(h,n,w,r,c),Re(h,n,w);let f=i(n,w,"sourcemap",De),x=i(n,w,"sourcefile",k),u=i(n,w,"loader",k),E=i(n,w,"banner",k),$=i(n,w,"footer",k),P=i(n,w,"mangleCache",X);return J(n,w,`in ${t}() call`),f&&h.push(`--sourcemap=${f===!0?"external":f}`),x&&h.push(`--sourcefile=${x}`),u&&h.push(`--loader=${u}`),E&&h.push(`--banner=${E}`),$&&h.push(`--footer=${$}`),{flags:h,mangleCache:Ue(P)}}function rt(t){const n={},r={didClose:!1,reason:""};let c={},h=0,w=0,f=new Uint8Array(16*1024),x=0,u=g=>{let a=x+g.length;if(a>f.length){let o=new Uint8Array(a*2);o.set(f),f=o}f.set(g,x),x+=g.length;let l=0;for(;l+4<=x;){let o=Te(f,l);if(l+4+o>x)break;l+=4,D(f.subarray(l,l+o)),l+=o}l>0&&(f.copyWithin(0,l,x),x-=l)},E=g=>{r.didClose=!0,g&&(r.reason=": "+(g.message||g));const a="The service was stopped"+r.reason;for(let l in c)c[l](a,null);c={}},$=(g,a,l)=>{if(r.didClose)return l("The service is no longer running"+r.reason,null);let o=h++;c[o]=(m,y)=>{try{l(m,y)}finally{g&&g.unref()}},g&&g.ref(),t.writeToStdin(Ee({id:o,isRequest:!0,value:a}))},P=(g,a)=>{if(r.didClose)throw new Error("The service is no longer running"+r.reason);t.writeToStdin(Ee({id:g,isRequest:!1,value:a}))},L=(g,a)=>re(this,null,function*(){try{if(a.command==="ping"){P(g,{});return}if(typeof a.key=="number"){const l=n[a.key];if(!l)return;const o=l[a.command];if(o){yield o(g,a);return}}throw new Error("Invalid command: "+a.command)}catch(l){const o=[ie(l,t,null,void 0,"")];try{P(g,{errors:o})}catch{}}}),R=!0,D=g=>{if(R){R=!1;let l=String.fromCharCode(...g);if(l!=="0.21.4")throw new Error(`Cannot start service: Host version "0.21.4" does not match binary version ${q(l)}`);return}let a=Ye(g);if(a.isRequest)L(a.id,a.value);else{let l=c[a.id];delete c[a.id],a.value.error?l(a.value.error,{}):l(null,a.value)}};return{readFromStdout:u,afterClose:E,service:{buildOrContext:({callName:g,refs:a,options:l,isTTY:o,defaultWD:m,callback:y})=>{let _=0;const T=w++,e={},s={ref(){++_===1&&a&&a.ref()},unref(){--_===0&&(delete n[T],a&&a.unref())}};n[T]=e,s.ref(),st(g,T,$,P,s,t,e,l,o,m,(d,v)=>{try{y(d,v)}finally{s.unref()}})},transform:({callName:g,refs:a,input:l,options:o,isTTY:m,fs:y,callback:_})=>{const T=Ie();let e=s=>{try{if(typeof l!="string"&&!(l instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:d,mangleCache:v}=nt(g,o,m,je),S={command:"transform",flags:d,inputFS:s!==null,input:s!==null?ee(s):typeof l=="string"?ee(l):l};v&&(S.mangleCache=v),$(a,S,(A,C)=>{if(A)return _(new Error(A),null);let U=ae(C.errors,T),O=ae(C.warnings,T),j=1,V=()=>{if(--j===0){let F={warnings:O,code:C.code,map:C.map,mangleCache:void 0,legalComments:void 0};"legalComments"in C&&(F.legalComments=C==null?void 0:C.legalComments),C.mangleCache&&(F.mangleCache=C==null?void 0:C.mangleCache),_(null,F)}};if(U.length>0)return _(ue("Transform failed",U,O),null);C.codeFS&&(j++,y.readFile(C.code,(F,N)=>{F!==null?_(F,null):(C.code=N,V())})),C.mapFS&&(j++,y.readFile(C.map,(F,N)=>{F!==null?_(F,null):(C.map=N,V())})),V()})}catch(d){let v=[];try{pe(v,o,{},m,je)}catch{}const S=ie(d,t,T,void 0,"");$(a,{command:"error",flags:v,error:S},()=>{S.detail=T.load(S.detail),_(ue("Transform failed",[S],[]),null)})}};if((typeof l=="string"||l instanceof Uint8Array)&&l.length>1024*1024){let s=e;e=()=>y.writeFile(l,s)}e(null)},formatMessages:({callName:g,refs:a,messages:l,options:o,callback:m})=>{if(!o)throw new Error(`Missing second argument in ${g}() call`);let y={},_=i(o,y,"kind",k),T=i(o,y,"color",B),e=i(o,y,"terminalWidth",se);if(J(o,y,`in ${g}() call`),_===void 0)throw new Error(`Missing "kind" in ${g}() call`);if(_!=="error"&&_!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${g}() call`);let s={command:"format-msgs",messages:ne(l,"messages",null,"",e),isWarning:_==="warning"};T!==void 0&&(s.color=T),e!==void 0&&(s.terminalWidth=e),$(a,s,(d,v)=>{if(d)return m(new Error(d),null);m(null,v.messages)})},analyzeMetafile:({callName:g,refs:a,metafile:l,options:o,callback:m})=>{o===void 0&&(o={});let y={},_=i(o,y,"color",B),T=i(o,y,"verbose",B);J(o,y,`in ${g}() call`);let e={command:"analyze-metafile",metafile:l};_!==void 0&&(e.color=_),T!==void 0&&(e.verbose=T),$(a,e,(s,d)=>{if(s)return m(new Error(s),null);m(null,d.result)})}}}}function st(t,n,r,c,h,w,f,x,u,E,$){const P=Ie(),L=t==="context",R=(p,I)=>{const M=[];try{pe(M,x,{},u,$e)}catch{}const g=ie(p,w,P,void 0,I);r(h,{command:"error",flags:M,error:g},()=>{g.detail=P.load(g.detail),$(ue(L?"Context failed":"Build failed",[g],[]),null)})};let D;if(typeof x=="object"){const p=x.plugins;if(p!==void 0){if(!Array.isArray(p))return R(new Error('"plugins" must be an array'),"");D=p}}if(D&&D.length>0){if(w.isSync)return R(new Error("Cannot use plugins in synchronous API calls"),"");it(n,r,c,h,w,f,x,D,P).then(p=>{if(!p.ok)return R(p.error,p.pluginName);try{H(p.requestPlugins,p.runOnEndCallbacks,p.scheduleOnDisposeCallbacks)}catch(I){R(I,"")}},p=>R(p,""));return}try{H(null,(p,I)=>I([],[]),()=>{})}catch(p){R(p,"")}function H(p,I,M){const g=w.hasFS,{entries:a,flags:l,write:o,stdinContents:m,stdinResolveDir:y,absWorkingDir:_,nodePaths:T,mangleCache:e}=tt(t,x,u,$e,g);if(o&&!w.hasFS)throw new Error('The "write" option is unavailable in this environment');const s={command:"build",key:n,entries:a,flags:l,write:o,stdinContents:m,stdinResolveDir:y,absWorkingDir:_||E,nodePaths:T,context:L};p&&(s.plugins=p),e&&(s.mangleCache=e);const d=(A,C)=>{const U={errors:ae(A.errors,P),warnings:ae(A.warnings,P),outputFiles:void 0,metafile:void 0,mangleCache:void 0},O=U.errors.slice(),j=U.warnings.slice();A.outputFiles&&(U.outputFiles=A.outputFiles.map(ot)),A.metafile&&(U.metafile=JSON.parse(A.metafile)),A.mangleCache&&(U.mangleCache=A.mangleCache),A.writeToStdout!==void 0&&console.log(oe(A.writeToStdout).replace(/\n$/,"")),I(U,(V,F)=>{if(O.length>0||V.length>0){const N=ue("Build failed",O.concat(V),j.concat(F));return C(N,null,V,F)}C(null,U,V,F)})};let v,S;L&&(f["on-end"]=(A,C)=>new Promise(U=>{d(C,(O,j,V,F)=>{const N={errors:V,warnings:F};S&&S(O,j),v=void 0,S=void 0,c(A,N),U()})})),r(h,s,(A,C)=>{if(A)return $(new Error(A),null);if(!L)return d(C,(j,V)=>(M(),$(j,V)));if(C.errors.length>0)return $(ue("Context failed",C.errors,C.warnings),null);let U=!1;const O={rebuild:()=>(v||(v=new Promise((j,V)=>{let F;S=(K,G)=>{F||(F=()=>K?V(K):j(G))};const N=()=>{r(h,{command:"rebuild",key:n},(G,ce)=>{G?V(new Error(G)):F?F():N()})};N()})),v),watch:(j={})=>new Promise((V,F)=>{if(!w.hasFS)throw new Error('Cannot use the "watch" API in this environment');J(j,{},"in watch() call"),r(h,{command:"watch",key:n},G=>{G?F(new Error(G)):V(void 0)})}),serve:(j={})=>new Promise((V,F)=>{if(!w.hasFS)throw new Error('Cannot use the "serve" API in this environment');const N={},K=i(j,N,"port",se),G=i(j,N,"host",k),ce=i(j,N,"servedir",k),b=i(j,N,"keyfile",k),W=i(j,N,"certfile",k),Z=i(j,N,"fallback",k),te=i(j,N,"onRequest",Oe);J(j,N,"in serve() call");const Q={command:"serve",key:n,onRequest:!!te};K!==void 0&&(Q.port=K),G!==void 0&&(Q.host=G),ce!==void 0&&(Q.servedir=ce),b!==void 0&&(Q.keyfile=b),W!==void 0&&(Q.certfile=W),Z!==void 0&&(Q.fallback=Z),r(h,Q,(de,_t)=>{if(de)return F(new Error(de));te&&(f["serve-request"]=(kt,Et)=>{te(Et.args),c(kt,{})}),V(_t)})}),cancel:()=>new Promise(j=>{if(U)return j();r(h,{command:"cancel",key:n},()=>{j()})}),dispose:()=>new Promise(j=>{if(U)return j();U=!0,r(h,{command:"dispose",key:n},()=>{j(),M(),h.unref()})})};h.ref(),$(null,O)})}}var it=(t,n,r,c,h,w,f,x,u)=>re(void 0,null,function*(){let E=[],$=[],P={},L={},R=[],D=0,H=0,p=[],I=!1;x=[...x];for(let a of x){let l={};if(typeof a!="object")throw new Error(`Plugin at index ${H} must be an object`);const o=i(a,l,"name",k);if(typeof o!="string"||o==="")throw new Error(`Plugin at index ${H} is missing a name`);try{let m=i(a,l,"setup",Oe);if(typeof m!="function")throw new Error("Plugin is missing a setup function");J(a,l,`on plugin ${q(o)}`);let y={name:o,onStart:!1,onEnd:!1,onResolve:[],onLoad:[]};H++;let T=m({initialOptions:f,resolve:(e,s={})=>{if(!I)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof e!="string")throw new Error("The path to resolve must be a string");let d=Object.create(null),v=i(s,d,"pluginName",k),S=i(s,d,"importer",k),A=i(s,d,"namespace",k),C=i(s,d,"resolveDir",k),U=i(s,d,"kind",k),O=i(s,d,"pluginData",me),j=i(s,d,"with",X);return J(s,d,"in resolve() call"),new Promise((V,F)=>{const N={command:"resolve",path:e,key:t,pluginName:o};if(v!=null&&(N.pluginName=v),S!=null&&(N.importer=S),A!=null&&(N.namespace=A),C!=null&&(N.resolveDir=C),U!=null)N.kind=U;else throw new Error('Must specify "kind" when calling "resolve"');O!=null&&(N.pluginData=u.store(O)),j!=null&&(N.with=lt(j,"with")),n(c,N,(K,G)=>{K!==null?F(new Error(K)):V({errors:ae(G.errors,u),warnings:ae(G.warnings,u),path:G.path,external:G.external,sideEffects:G.sideEffects,namespace:G.namespace,suffix:G.suffix,pluginData:u.load(G.pluginData)})})})},onStart(e){let s='This error came from the "onStart" callback registered here:',d=ye(new Error(s),h,"onStart");E.push({name:o,callback:e,note:d}),y.onStart=!0},onEnd(e){let s='This error came from the "onEnd" callback registered here:',d=ye(new Error(s),h,"onEnd");$.push({name:o,callback:e,note:d}),y.onEnd=!0},onResolve(e,s){let d='This error came from the "onResolve" callback registered here:',v=ye(new Error(d),h,"onResolve"),S={},A=i(e,S,"filter",ge),C=i(e,S,"namespace",k);if(J(e,S,`in onResolve() call for plugin ${q(o)}`),A==null)throw new Error("onResolve() call is missing a filter");let U=D++;P[U]={name:o,callback:s,note:v},y.onResolve.push({id:U,filter:A.source,namespace:C||""})},onLoad(e,s){let d='This error came from the "onLoad" callback registered here:',v=ye(new Error(d),h,"onLoad"),S={},A=i(e,S,"filter",ge),C=i(e,S,"namespace",k);if(J(e,S,`in onLoad() call for plugin ${q(o)}`),A==null)throw new Error("onLoad() call is missing a filter");let U=D++;L[U]={name:o,callback:s,note:v},y.onLoad.push({id:U,filter:A.source,namespace:C||""})},onDispose(e){R.push(e)},esbuild:h.esbuild});T&&(yield T),p.push(y)}catch(m){return{ok:!1,error:m,pluginName:o}}}w["on-start"]=(a,l)=>re(void 0,null,function*(){let o={errors:[],warnings:[]};yield Promise.all(E.map(m=>re(void 0,[m],function*({name:y,callback:_,note:T}){try{let e=yield _();if(e!=null){if(typeof e!="object")throw new Error(`Expected onStart() callback in plugin ${q(y)} to return an object`);let s={},d=i(e,s,"errors",z),v=i(e,s,"warnings",z);J(e,s,`from onStart() callback in plugin ${q(y)}`),d!=null&&o.errors.push(...ne(d,"errors",u,y,void 0)),v!=null&&o.warnings.push(...ne(v,"warnings",u,y,void 0))}}catch(e){o.errors.push(ie(e,h,u,T&&T(),y))}}))),r(a,o)}),w["on-resolve"]=(a,l)=>re(void 0,null,function*(){let o={},m="",y,_;for(let T of l.ids)try{({name:m,callback:y,note:_}=P[T]);let e=yield y({path:l.path,importer:l.importer,namespace:l.namespace,resolveDir:l.resolveDir,kind:l.kind,pluginData:u.load(l.pluginData),with:l.with});if(e!=null){if(typeof e!="object")throw new Error(`Expected onResolve() callback in plugin ${q(m)} to return an object`);let s={},d=i(e,s,"pluginName",k),v=i(e,s,"path",k),S=i(e,s,"namespace",k),A=i(e,s,"suffix",k),C=i(e,s,"external",B),U=i(e,s,"sideEffects",B),O=i(e,s,"pluginData",me),j=i(e,s,"errors",z),V=i(e,s,"warnings",z),F=i(e,s,"watchFiles",z),N=i(e,s,"watchDirs",z);J(e,s,`from onResolve() callback in plugin ${q(m)}`),o.id=T,d!=null&&(o.pluginName=d),v!=null&&(o.path=v),S!=null&&(o.namespace=S),A!=null&&(o.suffix=A),C!=null&&(o.external=C),U!=null&&(o.sideEffects=U),O!=null&&(o.pluginData=u.store(O)),j!=null&&(o.errors=ne(j,"errors",u,m,void 0)),V!=null&&(o.warnings=ne(V,"warnings",u,m,void 0)),F!=null&&(o.watchFiles=we(F,"watchFiles")),N!=null&&(o.watchDirs=we(N,"watchDirs"));break}}catch(e){o={id:T,errors:[ie(e,h,u,_&&_(),m)]};break}r(a,o)}),w["on-load"]=(a,l)=>re(void 0,null,function*(){let o={},m="",y,_;for(let T of l.ids)try{({name:m,callback:y,note:_}=L[T]);let e=yield y({path:l.path,namespace:l.namespace,suffix:l.suffix,pluginData:u.load(l.pluginData),with:l.with});if(e!=null){if(typeof e!="object")throw new Error(`Expected onLoad() callback in plugin ${q(m)} to return an object`);let s={},d=i(e,s,"pluginName",k),v=i(e,s,"contents",Ae),S=i(e,s,"resolveDir",k),A=i(e,s,"pluginData",me),C=i(e,s,"loader",k),U=i(e,s,"errors",z),O=i(e,s,"warnings",z),j=i(e,s,"watchFiles",z),V=i(e,s,"watchDirs",z);J(e,s,`from onLoad() callback in plugin ${q(m)}`),o.id=T,d!=null&&(o.pluginName=d),v instanceof Uint8Array?o.contents=v:v!=null&&(o.contents=ee(v)),S!=null&&(o.resolveDir=S),A!=null&&(o.pluginData=u.store(A)),C!=null&&(o.loader=C),U!=null&&(o.errors=ne(U,"errors",u,m,void 0)),O!=null&&(o.warnings=ne(O,"warnings",u,m,void 0)),j!=null&&(o.watchFiles=we(j,"watchFiles")),V!=null&&(o.watchDirs=we(V,"watchDirs"));break}}catch(e){o={id:T,errors:[ie(e,h,u,_&&_(),m)]};break}r(a,o)});let M=(a,l)=>l([],[]);$.length>0&&(M=(a,l)=>{re(void 0,null,function*(){const o=[],m=[];for(const{name:y,callback:_,note:T}of $){let e,s;try{const d=yield _(a);if(d!=null){if(typeof d!="object")throw new Error(`Expected onEnd() callback in plugin ${q(y)} to return an object`);let v={},S=i(d,v,"errors",z),A=i(d,v,"warnings",z);J(d,v,`from onEnd() callback in plugin ${q(y)}`),S!=null&&(e=ne(S,"errors",u,y,void 0)),A!=null&&(s=ne(A,"warnings",u,y,void 0))}}catch(d){e=[ie(d,h,u,T&&T(),y)]}if(e){o.push(...e);try{a.errors.push(...e)}catch{}}if(s){m.push(...s);try{a.warnings.push(...s)}catch{}}}l(o,m)})});let g=()=>{for(const a of R)setTimeout(()=>a(),0)};return I=!0,{ok:!0,requestPlugins:p,runOnEndCallbacks:M,scheduleOnDisposeCallbacks:g}});function Ie(){const t=new Map;let n=0;return{load(r){return t.get(r)},store(r){if(r===void 0)return-1;const c=n++;return t.set(c,r),c}}}function ye(t,n,r){let c,h=!1;return()=>{if(h)return c;h=!0;try{let w=(t.stack+"").split(`
`);w.splice(1,1);let f=Me(n,w,r);if(f)return c={text:t.message,location:f},c}catch{}}}function ie(t,n,r,c,h){let w="Internal error",f=null;try{w=(t&&t.message||t)+""}catch{}try{f=Me(n,(t.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:h,text:w,location:f,notes:c?[c]:[],detail:r?r.store(t):-1}}function Me(t,n,r){let c="    at ";if(t.readFileSync&&!n[0].startsWith(c)&&n[1].startsWith(c))for(let h=1;h<n.length;h++){let w=n[h];if(w.startsWith(c))for(w=w.slice(c.length);;){let f=/^(?:new |async )?\S+ \((.*)\)$/.exec(w);if(f){w=f[1];continue}if(f=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(w),f){w=f[1];continue}if(f=/^(\S+):(\d+):(\d+)$/.exec(w),f){let x;try{x=t.readFileSync(f[1],"utf8")}catch{break}let u=x.split(/\r\n|\r|\n|\u2028|\u2029/)[+f[2]-1]||"",E=+f[3]-1,$=u.slice(E,E+r.length)===r?r.length:0;return{file:f[1],namespace:"file",line:+f[2],column:ee(u.slice(0,E)).length,length:ee(u.slice(E,E+$)).length,lineText:u+`
`+n.slice(1).join(`
`),suggestion:""}}break}}return null}function ue(t,n,r){let c=5;t+=n.length<1?"":` with ${n.length} error${n.length<2?"":"s"}:`+n.slice(0,c+1).map((w,f)=>{if(f===c)return`
...`;if(!w.location)return`
error: ${w.text}`;let{file:x,line:u,column:E}=w.location,$=w.pluginName?`[plugin: ${w.pluginName}] `:"";return`
${x}:${u}:${E}: ERROR: ${$}${w.text}`}).join("");let h=new Error(t);for(const[w,f]of[["errors",n],["warnings",r]])Object.defineProperty(h,w,{configurable:!0,enumerable:!0,get:()=>f,set:x=>Object.defineProperty(h,w,{configurable:!0,enumerable:!0,value:x})});return h}function ae(t,n){for(const r of t)r.detail=n.load(r.detail);return t}function Fe(t,n,r){if(t==null)return null;let c={},h=i(t,c,"file",k),w=i(t,c,"namespace",k),f=i(t,c,"line",se),x=i(t,c,"column",se),u=i(t,c,"length",se),E=i(t,c,"lineText",k),$=i(t,c,"suggestion",k);if(J(t,c,n),E){const P=E.slice(0,(x&&x>0?x:0)+(u&&u>0?u:0)+(r&&r>0?r:80));!/[\x7F-\uFFFF]/.test(P)&&!/\n/.test(E)&&(E=P)}return{file:h||"",namespace:w||"",line:f||0,column:x||0,length:u||0,lineText:E||"",suggestion:$||""}}function ne(t,n,r,c,h){let w=[],f=0;for(const x of t){let u={},E=i(x,u,"id",k),$=i(x,u,"pluginName",k),P=i(x,u,"text",k),L=i(x,u,"location",Ce),R=i(x,u,"notes",z),D=i(x,u,"detail",me),H=`in element ${f} of "${n}"`;J(x,u,H);let p=[];if(R)for(const I of R){let M={},g=i(I,M,"text",k),a=i(I,M,"location",Ce);J(I,M,H),p.push({text:g||"",location:Fe(a,H,h)})}w.push({id:E||"",pluginName:$||c,text:P||"",location:Fe(L,H,h),notes:p,detail:r?r.store(D):-1}),f++}return w}function we(t,n){const r=[];for(const c of t){if(typeof c!="string")throw new Error(`${q(n)} must be an array of strings`);r.push(c)}return r}function lt(t,n){const r=Object.create(null);for(const c in t){const h=t[c];if(typeof h!="string")throw new Error(`key ${q(c)} in object ${q(n)} must be a string`);r[c]=h}return r}function ot({path:t,contents:n,hash:r}){let c=null;return{path:t,contents:n,hash:r,get text(){const h=this.contents;return(c===null||h!==n)&&(n=h,c=oe(h)),c}}}var at="0.21.4",ct=t=>fe().build(t),ut=t=>fe().context(t),ft=(t,n)=>fe().transform(t,n),dt=(t,n)=>fe().formatMessages(t,n),ht=(t,n)=>fe().analyzeMetafile(t,n),mt=()=>{throw new Error('The "buildSync" API only works in node')},gt=()=>{throw new Error('The "transformSync" API only works in node')},pt=()=>{throw new Error('The "formatMessagesSync" API only works in node')},yt=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},wt=()=>(ve&&ve(),Promise.resolve()),le,ve,be,fe=()=>{if(be)return be;throw le?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},vt=t=>{t=et(t||{});let n=t.wasmURL,r=t.wasmModule,c=t.worker!==!1;if(!n&&!r)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(le)throw new Error('Cannot call "initialize" more than once');return le=bt(n||"",r,c),le.catch(()=>{le=void 0}),le},bt=(t,n,r)=>re(void 0,null,function*(){let c;if(r){let E=new Blob([`onmessage=((postMessage) => {
      // Copyright 2018 The Go Authors. All rights reserved.
      // Use of this source code is governed by a BSD-style
      // license that can be found in the LICENSE file.
      var __async = (__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
          var fulfilled = (value) => {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          };
          var rejected = (value) => {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          };
          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
          step((generator = generator.apply(__this, __arguments)).next());
        });
      };
      let onmessage;
      let globalThis = {};
      for (let o = self; o; o = Object.getPrototypeOf(o))
        for (let k of Object.getOwnPropertyNames(o))
          if (!(k in globalThis))
            Object.defineProperty(globalThis, k, { get: () => self[k] });
      "use strict";
      (() => {
        const enosys = () => {
          const err = new Error("not implemented");
          err.code = "ENOSYS";
          return err;
        };
        if (!globalThis.fs) {
          let outputBuf = "";
          globalThis.fs = {
            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
            // unused
            writeSync(fd, buf) {
              outputBuf += decoder.decode(buf);
              const nl = outputBuf.lastIndexOf("\\n");
              if (nl != -1) {
                console.log(outputBuf.substring(0, nl));
                outputBuf = outputBuf.substring(nl + 1);
              }
              return buf.length;
            },
            write(fd, buf, offset, length, position, callback) {
              if (offset !== 0 || length !== buf.length || position !== null) {
                callback(enosys());
                return;
              }
              const n = this.writeSync(fd, buf);
              callback(null, n);
            },
            chmod(path, mode, callback) {
              callback(enosys());
            },
            chown(path, uid, gid, callback) {
              callback(enosys());
            },
            close(fd, callback) {
              callback(enosys());
            },
            fchmod(fd, mode, callback) {
              callback(enosys());
            },
            fchown(fd, uid, gid, callback) {
              callback(enosys());
            },
            fstat(fd, callback) {
              callback(enosys());
            },
            fsync(fd, callback) {
              callback(null);
            },
            ftruncate(fd, length, callback) {
              callback(enosys());
            },
            lchown(path, uid, gid, callback) {
              callback(enosys());
            },
            link(path, link, callback) {
              callback(enosys());
            },
            lstat(path, callback) {
              callback(enosys());
            },
            mkdir(path, perm, callback) {
              callback(enosys());
            },
            open(path, flags, mode, callback) {
              callback(enosys());
            },
            read(fd, buffer, offset, length, position, callback) {
              callback(enosys());
            },
            readdir(path, callback) {
              callback(enosys());
            },
            readlink(path, callback) {
              callback(enosys());
            },
            rename(from, to, callback) {
              callback(enosys());
            },
            rmdir(path, callback) {
              callback(enosys());
            },
            stat(path, callback) {
              callback(enosys());
            },
            symlink(path, link, callback) {
              callback(enosys());
            },
            truncate(path, length, callback) {
              callback(enosys());
            },
            unlink(path, callback) {
              callback(enosys());
            },
            utimes(path, atime, mtime, callback) {
              callback(enosys());
            }
          };
        }
        if (!globalThis.process) {
          globalThis.process = {
            getuid() {
              return -1;
            },
            getgid() {
              return -1;
            },
            geteuid() {
              return -1;
            },
            getegid() {
              return -1;
            },
            getgroups() {
              throw enosys();
            },
            pid: -1,
            ppid: -1,
            umask() {
              throw enosys();
            },
            cwd() {
              throw enosys();
            },
            chdir() {
              throw enosys();
            }
          };
        }
        if (!globalThis.crypto) {
          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
        }
        if (!globalThis.performance) {
          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
        }
        if (!globalThis.TextEncoder) {
          throw new Error("globalThis.TextEncoder is not available, polyfill required");
        }
        if (!globalThis.TextDecoder) {
          throw new Error("globalThis.TextDecoder is not available, polyfill required");
        }
        const encoder = new TextEncoder("utf-8");
        const decoder = new TextDecoder("utf-8");
        globalThis.Go = class {
          constructor() {
            this.argv = ["js"];
            this.env = {};
            this.exit = (code) => {
              if (code !== 0) {
                console.warn("exit code:", code);
              }
            };
            this._exitPromise = new Promise((resolve) => {
              this._resolveExitPromise = resolve;
            });
            this._pendingEvent = null;
            this._scheduledTimeouts = /* @__PURE__ */ new Map();
            this._nextCallbackTimeoutID = 1;
            const setInt64 = (addr, v) => {
              this.mem.setUint32(addr + 0, v, true);
              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
            };
            const getInt64 = (addr) => {
              const low = this.mem.getUint32(addr + 0, true);
              const high = this.mem.getInt32(addr + 4, true);
              return low + high * 4294967296;
            };
            const loadValue = (addr) => {
              const f = this.mem.getFloat64(addr, true);
              if (f === 0) {
                return void 0;
              }
              if (!isNaN(f)) {
                return f;
              }
              const id = this.mem.getUint32(addr, true);
              return this._values[id];
            };
            const storeValue = (addr, v) => {
              const nanHead = 2146959360;
              if (typeof v === "number" && v !== 0) {
                if (isNaN(v)) {
                  this.mem.setUint32(addr + 4, nanHead, true);
                  this.mem.setUint32(addr, 0, true);
                  return;
                }
                this.mem.setFloat64(addr, v, true);
                return;
              }
              if (v === void 0) {
                this.mem.setFloat64(addr, 0, true);
                return;
              }
              let id = this._ids.get(v);
              if (id === void 0) {
                id = this._idPool.pop();
                if (id === void 0) {
                  id = this._values.length;
                }
                this._values[id] = v;
                this._goRefCounts[id] = 0;
                this._ids.set(v, id);
              }
              this._goRefCounts[id]++;
              let typeFlag = 0;
              switch (typeof v) {
                case "object":
                  if (v !== null) {
                    typeFlag = 1;
                  }
                  break;
                case "string":
                  typeFlag = 2;
                  break;
                case "symbol":
                  typeFlag = 3;
                  break;
                case "function":
                  typeFlag = 4;
                  break;
              }
              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
              this.mem.setUint32(addr, id, true);
            };
            const loadSlice = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return new Uint8Array(this._inst.exports.mem.buffer, array, len);
            };
            const loadSliceOfValues = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              const a = new Array(len);
              for (let i = 0; i < len; i++) {
                a[i] = loadValue(array + i * 8);
              }
              return a;
            };
            const loadString = (addr) => {
              const saddr = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
            };
            const timeOrigin = Date.now() - performance.now();
            this.importObject = {
              go: {
                // Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
                // may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
                // function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
                // This changes the SP, thus we have to update the SP used by the imported function.
                // func wasmExit(code int32)
                "runtime.wasmExit": (sp) => {
                  sp >>>= 0;
                  const code = this.mem.getInt32(sp + 8, true);
                  this.exited = true;
                  delete this._inst;
                  delete this._values;
                  delete this._goRefCounts;
                  delete this._ids;
                  delete this._idPool;
                  this.exit(code);
                },
                // func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
                "runtime.wasmWrite": (sp) => {
                  sp >>>= 0;
                  const fd = getInt64(sp + 8);
                  const p = getInt64(sp + 16);
                  const n = this.mem.getInt32(sp + 24, true);
                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
                },
                // func resetMemoryDataView()
                "runtime.resetMemoryDataView": (sp) => {
                  sp >>>= 0;
                  this.mem = new DataView(this._inst.exports.mem.buffer);
                },
                // func nanotime1() int64
                "runtime.nanotime1": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                },
                // func walltime() (sec int64, nsec int32)
                "runtime.walltime": (sp) => {
                  sp >>>= 0;
                  const msec = (/* @__PURE__ */ new Date()).getTime();
                  setInt64(sp + 8, msec / 1e3);
                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
                },
                // func scheduleTimeoutEvent(delay int64) int32
                "runtime.scheduleTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this._nextCallbackTimeoutID;
                  this._nextCallbackTimeoutID++;
                  this._scheduledTimeouts.set(id, setTimeout(
                    () => {
                      this._resume();
                      while (this._scheduledTimeouts.has(id)) {
                        console.warn("scheduleTimeoutEvent: missed timeout event");
                        this._resume();
                      }
                    },
                    getInt64(sp + 8) + 1
                    // setTimeout has been seen to fire up to 1 millisecond early
                  ));
                  this.mem.setInt32(sp + 16, id, true);
                },
                // func clearTimeoutEvent(id int32)
                "runtime.clearTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getInt32(sp + 8, true);
                  clearTimeout(this._scheduledTimeouts.get(id));
                  this._scheduledTimeouts.delete(id);
                },
                // func getRandomData(r []byte)
                "runtime.getRandomData": (sp) => {
                  sp >>>= 0;
                  crypto.getRandomValues(loadSlice(sp + 8));
                },
                // func finalizeRef(v ref)
                "syscall/js.finalizeRef": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getUint32(sp + 8, true);
                  this._goRefCounts[id]--;
                  if (this._goRefCounts[id] === 0) {
                    const v = this._values[id];
                    this._values[id] = null;
                    this._ids.delete(v);
                    this._idPool.push(id);
                  }
                },
                // func stringVal(value string) ref
                "syscall/js.stringVal": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, loadString(sp + 8));
                },
                // func valueGet(v ref, p string) ref
                "syscall/js.valueGet": (sp) => {
                  sp >>>= 0;
                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
                  sp = this._inst.exports.getsp() >>> 0;
                  storeValue(sp + 32, result);
                },
                // func valueSet(v ref, p string, x ref)
                "syscall/js.valueSet": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
                },
                // func valueDelete(v ref, p string)
                "syscall/js.valueDelete": (sp) => {
                  sp >>>= 0;
                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
                },
                // func valueIndex(v ref, i int) ref
                "syscall/js.valueIndex": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
                },
                // valueSetIndex(v ref, i int, x ref)
                "syscall/js.valueSetIndex": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
                },
                // func valueCall(v ref, m string, args []ref) (ref, bool)
                "syscall/js.valueCall": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const m = Reflect.get(v, loadString(sp + 16));
                    const args = loadSliceOfValues(sp + 32);
                    const result = Reflect.apply(m, v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, result);
                    this.mem.setUint8(sp + 64, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, err);
                    this.mem.setUint8(sp + 64, 0);
                  }
                },
                // func valueInvoke(v ref, args []ref) (ref, bool)
                "syscall/js.valueInvoke": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.apply(v, void 0, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                // func valueNew(v ref, args []ref) (ref, bool)
                "syscall/js.valueNew": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.construct(v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                // func valueLength(v ref) int
                "syscall/js.valueLength": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
                },
                // valuePrepareString(v ref) (ref, int)
                "syscall/js.valuePrepareString": (sp) => {
                  sp >>>= 0;
                  const str = encoder.encode(String(loadValue(sp + 8)));
                  storeValue(sp + 16, str);
                  setInt64(sp + 24, str.length);
                },
                // valueLoadString(v ref, b []byte)
                "syscall/js.valueLoadString": (sp) => {
                  sp >>>= 0;
                  const str = loadValue(sp + 8);
                  loadSlice(sp + 16).set(str);
                },
                // func valueInstanceOf(v ref, t ref) bool
                "syscall/js.valueInstanceOf": (sp) => {
                  sp >>>= 0;
                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
                },
                // func copyBytesToGo(dst []byte, src ref) (int, bool)
                "syscall/js.copyBytesToGo": (sp) => {
                  sp >>>= 0;
                  const dst = loadSlice(sp + 8);
                  const src = loadValue(sp + 32);
                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                // func copyBytesToJS(dst ref, src []byte) (int, bool)
                "syscall/js.copyBytesToJS": (sp) => {
                  sp >>>= 0;
                  const dst = loadValue(sp + 8);
                  const src = loadSlice(sp + 16);
                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                "debug": (value) => {
                  console.log(value);
                }
              }
            };
          }
          run(instance) {
            return __async(this, null, function* () {
              if (!(instance instanceof WebAssembly.Instance)) {
                throw new Error("Go.run: WebAssembly.Instance expected");
              }
              this._inst = instance;
              this.mem = new DataView(this._inst.exports.mem.buffer);
              this._values = [
                // JS values that Go currently has references to, indexed by reference id
                NaN,
                0,
                null,
                true,
                false,
                globalThis,
                this
              ];
              this._goRefCounts = new Array(this._values.length).fill(Infinity);
              this._ids = /* @__PURE__ */ new Map([
                // mapping from JS values to reference ids
                [0, 1],
                [null, 2],
                [true, 3],
                [false, 4],
                [globalThis, 5],
                [this, 6]
              ]);
              this._idPool = [];
              this.exited = false;
              let offset = 4096;
              const strPtr = (str) => {
                const ptr = offset;
                const bytes = encoder.encode(str + "\\0");
                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
                offset += bytes.length;
                if (offset % 8 !== 0) {
                  offset += 8 - offset % 8;
                }
                return ptr;
              };
              const argc = this.argv.length;
              const argvPtrs = [];
              this.argv.forEach((arg) => {
                argvPtrs.push(strPtr(arg));
              });
              argvPtrs.push(0);
              const keys = Object.keys(this.env).sort();
              keys.forEach((key) => {
                argvPtrs.push(strPtr(\`\${key}=\${this.env[key]}\`));
              });
              argvPtrs.push(0);
              const argv = offset;
              argvPtrs.forEach((ptr) => {
                this.mem.setUint32(offset, ptr, true);
                this.mem.setUint32(offset + 4, 0, true);
                offset += 8;
              });
              const wasmMinDataAddr = 4096 + 8192;
              if (offset >= wasmMinDataAddr) {
                throw new Error("total length of command line and environment variables exceeds limit");
              }
              this._inst.exports.run(argc, argv);
              if (this.exited) {
                this._resolveExitPromise();
              }
              yield this._exitPromise;
            });
          }
          _resume() {
            if (this.exited) {
              throw new Error("Go program has already exited");
            }
            this._inst.exports.resume();
            if (this.exited) {
              this._resolveExitPromise();
            }
          }
          _makeFuncWrapper(id) {
            const go = this;
            return function() {
              const event = { id, this: this, args: arguments };
              go._pendingEvent = event;
              go._resume();
              return event.result;
            };
          }
        };
      })();
      onmessage = ({ data: wasm }) => {
        let decoder = new TextDecoder();
        let fs = globalThis.fs;
        let stderr = "";
        fs.writeSync = (fd, buffer) => {
          if (fd === 1) {
            postMessage(buffer);
          } else if (fd === 2) {
            stderr += decoder.decode(buffer);
            let parts = stderr.split("\\n");
            if (parts.length > 1) console.log(parts.slice(0, -1).join("\\n"));
            stderr = parts[parts.length - 1];
          } else {
            throw new Error("Bad write");
          }
          return buffer.length;
        };
        let stdin = [];
        let resumeStdin;
        let stdinPos = 0;
        onmessage = ({ data }) => {
          if (data.length > 0) {
            stdin.push(data);
            if (resumeStdin) resumeStdin();
          }
          return go;
        };
        fs.read = (fd, buffer, offset, length, position, callback) => {
          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
            throw new Error("Bad read");
          }
          if (stdin.length === 0) {
            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);
            return;
          }
          let first = stdin[0];
          let count = Math.max(0, Math.min(length, first.length - stdinPos));
          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
          stdinPos += count;
          if (stdinPos === first.length) {
            stdin.shift();
            stdinPos = 0;
          }
          callback(null, count);
        };
        let go = new globalThis.Go();
        go.argv = ["", \`--service=\${"0.21.4"}\`];
        tryToInstantiateModule(wasm, go).then(
          (instance) => {
            postMessage(null);
            go.run(instance);
          },
          (error) => {
            postMessage(error);
          }
        );
        return go;
      };
      function tryToInstantiateModule(wasm, go) {
        return __async(this, null, function* () {
          if (wasm instanceof WebAssembly.Module) {
            return WebAssembly.instantiate(wasm, go.importObject);
          }
          const res = yield fetch(wasm);
          if (!res.ok) throw new Error(\`Failed to download \${JSON.stringify(wasm)}\`);
          if ("instantiateStreaming" in WebAssembly && /^application\\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {
            const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);
            return result2.instance;
          }
          const bytes = yield res.arrayBuffer();
          const result = yield WebAssembly.instantiate(bytes, go.importObject);
          return result.instance;
        });
      }
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});c=new Worker(URL.createObjectURL(E))}else{let E=(P=>{var L=(p,I,M)=>new Promise((g,a)=>{var l=y=>{try{m(M.next(y))}catch(_){a(_)}},o=y=>{try{m(M.throw(y))}catch(_){a(_)}},m=y=>y.done?g(y.value):Promise.resolve(y.value).then(l,o);m((M=M.apply(p,I)).next())});let R,D={};for(let p=self;p;p=Object.getPrototypeOf(p))for(let I of Object.getOwnPropertyNames(p))I in D||Object.defineProperty(D,I,{get:()=>self[I]});(()=>{const p=()=>{const g=new Error("not implemented");return g.code="ENOSYS",g};if(!D.fs){let g="";D.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(a,l){g+=M.decode(l);const o=g.lastIndexOf(`
`);return o!=-1&&(console.log(g.substring(0,o)),g=g.substring(o+1)),l.length},write(a,l,o,m,y,_){if(o!==0||m!==l.length||y!==null){_(p());return}const T=this.writeSync(a,l);_(null,T)},chmod(a,l,o){o(p())},chown(a,l,o,m){m(p())},close(a,l){l(p())},fchmod(a,l,o){o(p())},fchown(a,l,o,m){m(p())},fstat(a,l){l(p())},fsync(a,l){l(null)},ftruncate(a,l,o){o(p())},lchown(a,l,o,m){m(p())},link(a,l,o){o(p())},lstat(a,l){l(p())},mkdir(a,l,o){o(p())},open(a,l,o,m){m(p())},read(a,l,o,m,y,_){_(p())},readdir(a,l){l(p())},readlink(a,l){l(p())},rename(a,l,o){o(p())},rmdir(a,l){l(p())},stat(a,l){l(p())},symlink(a,l,o){o(p())},truncate(a,l,o){o(p())},unlink(a,l){l(p())},utimes(a,l,o,m){m(p())}}}if(D.process||(D.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw p()},pid:-1,ppid:-1,umask(){throw p()},cwd(){throw p()},chdir(){throw p()}}),!D.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!D.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!D.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!D.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");const I=new TextEncoder("utf-8"),M=new TextDecoder("utf-8");D.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=e=>{e!==0&&console.warn("exit code:",e)},this._exitPromise=new Promise(e=>{this._resolveExitPromise=e}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;const g=(e,s)=>{this.mem.setUint32(e+0,s,!0),this.mem.setUint32(e+4,Math.floor(s/4294967296),!0)},a=e=>{const s=this.mem.getUint32(e+0,!0),d=this.mem.getInt32(e+4,!0);return s+d*4294967296},l=e=>{const s=this.mem.getFloat64(e,!0);if(s===0)return;if(!isNaN(s))return s;const d=this.mem.getUint32(e,!0);return this._values[d]},o=(e,s)=>{if(typeof s=="number"&&s!==0){if(isNaN(s)){this.mem.setUint32(e+4,2146959360,!0),this.mem.setUint32(e,0,!0);return}this.mem.setFloat64(e,s,!0);return}if(s===void 0){this.mem.setFloat64(e,0,!0);return}let v=this._ids.get(s);v===void 0&&(v=this._idPool.pop(),v===void 0&&(v=this._values.length),this._values[v]=s,this._goRefCounts[v]=0,this._ids.set(s,v)),this._goRefCounts[v]++;let S=0;switch(typeof s){case"object":s!==null&&(S=1);break;case"string":S=2;break;case"symbol":S=3;break;case"function":S=4;break}this.mem.setUint32(e+4,2146959360|S,!0),this.mem.setUint32(e,v,!0)},m=e=>{const s=a(e+0),d=a(e+8);return new Uint8Array(this._inst.exports.mem.buffer,s,d)},y=e=>{const s=a(e+0),d=a(e+8),v=new Array(d);for(let S=0;S<d;S++)v[S]=l(s+S*8);return v},_=e=>{const s=a(e+0),d=a(e+8);return M.decode(new DataView(this._inst.exports.mem.buffer,s,d))},T=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":e=>{e>>>=0;const s=this.mem.getInt32(e+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(s)},"runtime.wasmWrite":e=>{e>>>=0;const s=a(e+8),d=a(e+16),v=this.mem.getInt32(e+24,!0);D.fs.writeSync(s,new Uint8Array(this._inst.exports.mem.buffer,d,v))},"runtime.resetMemoryDataView":e=>{this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":e=>{e>>>=0,g(e+8,(T+performance.now())*1e6)},"runtime.walltime":e=>{e>>>=0;const s=new Date().getTime();g(e+8,s/1e3),this.mem.setInt32(e+16,s%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":e=>{e>>>=0;const s=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(s,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(s);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},a(e+8)+1)),this.mem.setInt32(e+16,s,!0)},"runtime.clearTimeoutEvent":e=>{e>>>=0;const s=this.mem.getInt32(e+8,!0);clearTimeout(this._scheduledTimeouts.get(s)),this._scheduledTimeouts.delete(s)},"runtime.getRandomData":e=>{e>>>=0,crypto.getRandomValues(m(e+8))},"syscall/js.finalizeRef":e=>{e>>>=0;const s=this.mem.getUint32(e+8,!0);if(this._goRefCounts[s]--,this._goRefCounts[s]===0){const d=this._values[s];this._values[s]=null,this._ids.delete(d),this._idPool.push(s)}},"syscall/js.stringVal":e=>{e>>>=0,o(e+24,_(e+8))},"syscall/js.valueGet":e=>{e>>>=0;const s=Reflect.get(l(e+8),_(e+16));e=this._inst.exports.getsp()>>>0,o(e+32,s)},"syscall/js.valueSet":e=>{e>>>=0,Reflect.set(l(e+8),_(e+16),l(e+32))},"syscall/js.valueDelete":e=>{e>>>=0,Reflect.deleteProperty(l(e+8),_(e+16))},"syscall/js.valueIndex":e=>{e>>>=0,o(e+24,Reflect.get(l(e+8),a(e+16)))},"syscall/js.valueSetIndex":e=>{e>>>=0,Reflect.set(l(e+8),a(e+16),l(e+24))},"syscall/js.valueCall":e=>{e>>>=0;try{const s=l(e+8),d=Reflect.get(s,_(e+16)),v=y(e+32),S=Reflect.apply(d,s,v);e=this._inst.exports.getsp()>>>0,o(e+56,S),this.mem.setUint8(e+64,1)}catch(s){e=this._inst.exports.getsp()>>>0,o(e+56,s),this.mem.setUint8(e+64,0)}},"syscall/js.valueInvoke":e=>{e>>>=0;try{const s=l(e+8),d=y(e+16),v=Reflect.apply(s,void 0,d);e=this._inst.exports.getsp()>>>0,o(e+40,v),this.mem.setUint8(e+48,1)}catch(s){e=this._inst.exports.getsp()>>>0,o(e+40,s),this.mem.setUint8(e+48,0)}},"syscall/js.valueNew":e=>{e>>>=0;try{const s=l(e+8),d=y(e+16),v=Reflect.construct(s,d);e=this._inst.exports.getsp()>>>0,o(e+40,v),this.mem.setUint8(e+48,1)}catch(s){e=this._inst.exports.getsp()>>>0,o(e+40,s),this.mem.setUint8(e+48,0)}},"syscall/js.valueLength":e=>{e>>>=0,g(e+16,parseInt(l(e+8).length))},"syscall/js.valuePrepareString":e=>{e>>>=0;const s=I.encode(String(l(e+8)));o(e+16,s),g(e+24,s.length)},"syscall/js.valueLoadString":e=>{e>>>=0;const s=l(e+8);m(e+16).set(s)},"syscall/js.valueInstanceOf":e=>{e>>>=0,this.mem.setUint8(e+24,l(e+8)instanceof l(e+16)?1:0)},"syscall/js.copyBytesToGo":e=>{e>>>=0;const s=m(e+8),d=l(e+32);if(!(d instanceof Uint8Array||d instanceof Uint8ClampedArray)){this.mem.setUint8(e+48,0);return}const v=d.subarray(0,s.length);s.set(v),g(e+40,v.length),this.mem.setUint8(e+48,1)},"syscall/js.copyBytesToJS":e=>{e>>>=0;const s=l(e+8),d=m(e+16);if(!(s instanceof Uint8Array||s instanceof Uint8ClampedArray)){this.mem.setUint8(e+48,0);return}const v=d.subarray(0,s.length);s.set(v),g(e+40,v.length),this.mem.setUint8(e+48,1)},debug:e=>{console.log(e)}}}}run(g){return L(this,null,function*(){if(!(g instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=g,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,D,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[D,5],[this,6]]),this._idPool=[],this.exited=!1;let a=4096;const l=e=>{const s=a,d=I.encode(e+"\0");return new Uint8Array(this.mem.buffer,a,d.length).set(d),a+=d.length,a%8!==0&&(a+=8-a%8),s},o=this.argv.length,m=[];this.argv.forEach(e=>{m.push(l(e))}),m.push(0),Object.keys(this.env).sort().forEach(e=>{m.push(l(`${e}=${this.env[e]}`))}),m.push(0);const _=a;if(m.forEach(e=>{this.mem.setUint32(a,e,!0),this.mem.setUint32(a+4,0,!0),a+=8}),a>=12288)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(o,_),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(g){const a=this;return function(){const l={id:g,this:this,args:arguments};return a._pendingEvent=l,a._resume(),l.result}}}})(),R=({data:p})=>{let I=new TextDecoder,M=D.fs,g="";M.writeSync=(y,_)=>{if(y===1)P(_);else if(y===2){g+=I.decode(_);let T=g.split(`
`);T.length>1&&console.log(T.slice(0,-1).join(`
`)),g=T[T.length-1]}else throw new Error("Bad write");return _.length};let a=[],l,o=0;R=({data:y})=>(y.length>0&&(a.push(y),l&&l()),m),M.read=(y,_,T,e,s,d)=>{if(y!==0||T!==0||e!==_.length||s!==null)throw new Error("Bad read");if(a.length===0){l=()=>M.read(y,_,T,e,s,d);return}let v=a[0],S=Math.max(0,Math.min(e,v.length-o));_.set(v.subarray(o,o+S),T),o+=S,o===v.length&&(a.shift(),o=0),d(null,S)};let m=new D.Go;return m.argv=["","--service=0.21.4"],H(p,m).then(y=>{P(null),m.run(y)},y=>{P(y)}),m};function H(p,I){return L(this,null,function*(){if(p instanceof WebAssembly.Module)return WebAssembly.instantiate(p,I.importObject);const M=yield fetch(p);if(!M.ok)throw new Error(`Failed to download ${JSON.stringify(p)}`);if("instantiateStreaming"in WebAssembly&&/^application\/wasm($|;)/i.test(M.headers.get("Content-Type")||""))return(yield WebAssembly.instantiateStreaming(M,I.importObject)).instance;const g=yield M.arrayBuffer();return(yield WebAssembly.instantiate(g,I.importObject)).instance})}return p=>R(p)})(P=>c.onmessage({data:P})),$;c={onmessage:null,postMessage:P=>setTimeout(()=>$=E({data:P})),terminate(){if($)for(let P of $._scheduledTimeouts.values())clearTimeout(P)}}}let h,w;const f=new Promise((E,$)=>{h=E,w=$});c.onmessage=({data:E})=>{c.onmessage=({data:$})=>x($),E?w(E):h()},c.postMessage(n||new URL(t,location.href).toString());let{readFromStdout:x,service:u}=rt({writeToStdin(E){c.postMessage(E)},isSync:!1,hasFS:!1,esbuild:he});yield f,ve=()=>{c.terminate(),le=void 0,ve=void 0,be=void 0},be={build:E=>new Promise(($,P)=>u.buildOrContext({callName:"build",refs:null,options:E,isTTY:!1,defaultWD:"/",callback:(L,R)=>L?P(L):$(R)})),context:E=>new Promise(($,P)=>u.buildOrContext({callName:"context",refs:null,options:E,isTTY:!1,defaultWD:"/",callback:(L,R)=>L?P(L):$(R)})),transform:(E,$)=>new Promise((P,L)=>u.transform({callName:"transform",refs:null,input:E,options:$||{},isTTY:!1,fs:{readFile(R,D){D(new Error("Internal error"),null)},writeFile(R,D){D(null)}},callback:(R,D)=>R?L(R):P(D)})),formatMessages:(E,$)=>new Promise((P,L)=>u.formatMessages({callName:"formatMessages",refs:null,messages:E,options:$,callback:(R,D)=>R?L(R):P(D)})),analyzeMetafile:(E,$)=>new Promise((P,L)=>u.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof E=="string"?E:JSON.stringify(E),options:$,callback:(R,D)=>R?L(R):P(D)}))}}),xt=he})(Ve)})(Ne);var Tt=Ne.exports;const St="/parser/assets/esbuild-ChaQgL1m.wasm",$t=Object.freeze(Object.defineProperty({__proto__:null,default:St},Symbol.toStringTag,{value:"Module"}));export{Tt as b,$t as e};
