const ge=`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
uniform vec4 uPeaks[4]; // x, y, sigma, height
float field(vec2 p, float t){
  float z = 0.0, amp = 1.0, f = 0.38;
  for (int o = 0; o < 3; o++) { z += amp * snoise(vec3(p * f, t * 0.08 + float(o) * 7.1)); amp *= 0.42; f *= 2.3; }
  for (int k = 0; k < 4; k++) { vec2 d = p - uPeaks[k].xy; z += uPeaks[k].w * exp(-dot(d,d) / (2.0 * uPeaks[k].z * uPeaks[k].z)); }
  return z;
}`,ze=(()=>{const t=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],o=new Uint8Array(256);for(let s=0;s<256;s++)o[s]=s;let r=1337;for(let s=255;s>0;s--){r=r*16807%2147483647;const i=r%(s+1);[o[s],o[i]]=[o[i],o[s]]}const n=new Uint8Array(512),c=new Uint8Array(512);for(let s=0;s<512;s++)n[s]=o[s&255],c[s]=n[s]%12;const f=1/3,a=1/6;return(s,i,l)=>{const x=(s+i+l)*f,u=Math.floor(s+x),P=Math.floor(i+x),E=Math.floor(l+x),L=(u+P+E)*a,g=s-(u-L),A=i-(P-L),v=l-(E-L);let b,R,w,F,S,z;g>=A?A>=v?(b=1,R=0,w=0,F=1,S=1,z=0):g>=v?(b=1,R=0,w=0,F=1,S=0,z=1):(b=0,R=0,w=1,F=1,S=0,z=1):A<v?(b=0,R=0,w=1,F=0,S=1,z=1):g<v?(b=0,R=1,w=0,F=0,S=1,z=1):(b=0,R=1,w=0,F=1,S=1,z=0);const X=g-b+a,$=A-R+a,J=v-w+a,K=g-F+2*a,Q=A-S+2*a,ee=v-z+2*a,te=g-1+3*a,oe=A-1+3*a,ie=v-1+3*a,k=u&255,V=P&255,Y=E&255;let U=0,T=.6-g*g-A*A-v*v;if(T>0){const m=t[c[k+n[V+n[Y]]]];T*=T,U+=T*T*(m[0]*g+m[1]*A+m[2]*v)}let B=.6-X*X-$*$-J*J;if(B>0){const m=t[c[k+b+n[V+R+n[Y+w]]]];B*=B,U+=B*B*(m[0]*X+m[1]*$+m[2]*J)}let D=.6-K*K-Q*Q-ee*ee;if(D>0){const m=t[c[k+F+n[V+S+n[Y+z]]]];D*=D,U+=D*D*(m[0]*K+m[1]*Q+m[2]*ee)}let I=.6-te*te-oe*oe-ie*ie;if(I>0){const m=t[c[k+1+n[V+1+n[Y+1]]]];I*=I,U+=I*I*(m[0]*te+m[1]*oe+m[2]*ie)}return 32*U}})(),Me=[{ax:2.2,ay:1.4,fx:.05,fy:.031,ph:0,sigma:1.9,h:1.6},{ax:1.8,ay:2.3,fx:.037,fy:.046,ph:2.1,sigma:1.5,h:1.2},{ax:2.6,ay:1,fx:.024,fy:.058,ph:4,sigma:2.2,h:1},{ax:1.2,ay:2.6,fx:.061,fy:.027,ph:1.3,sigma:1.4,h:-1.1}];function ye(t){return Me.map(o=>[o.ax*Math.sin(o.fx*t+o.ph),o.ay*Math.cos(o.fy*t+o.ph),o.sigma,o.h])}function re(t,o,r,n){let c=0,f=1,a=.38;for(let s=0;s<3;s++)c+=f*ze(t*a,o*a,r*.08+s*7.1),f*=.42,a*=2.3;for(const[s,i,l,x]of n){const u=t-s,P=o-i;c+=x*Math.exp(-(u*u+P*P)/(2*l*l))}return c}const ne=t=>[1,3,5].map(o=>parseInt(t.slice(o,o+2),16)/255),O={drift:1,lo:ne("#294d75"),hi:ne("#8cc9f0"),col:ne("#ffa126")},p=document.getElementById("hero-canvas"),e=p&&p.getContext("webgl2",{antialias:!0,alpha:!1,powerPreference:"high-performance"}),Ee=matchMedia("(prefers-reduced-motion: reduce)").matches,Le={A:{grid:220,particles:48,trail:160,dpr:Math.min(devicePixelRatio,2)},B:{grid:90,particles:20,trail:80,dpr:1},C:{grid:140,particles:32,trail:120,dpr:Math.min(devicePixelRatio,2),still:!0}};function Ue(){return Ee?"C":/Mobi|Android/i.test(navigator.userAgent)||(navigator.hardwareConcurrency||8)<=4?"B":"A"}const Te=`#version 300 es
precision highp float;
in vec2 aPos; uniform mat4 uVP; uniform float uT; uniform float uSize; uniform float uZScale;
out float vDepth; out float vZ;
${ge}
void main(){
  float z = field(aPos, uT) * uZScale;
  vec4 w = vec4(aPos.x, z, aPos.y, 1.0);
  gl_Position = uVP * w; vDepth = gl_Position.w; vZ = z / uZScale;
  gl_PointSize = uSize * clamp(14.0 / gl_Position.w, 0.35, 1.8);
}`,Be=`#version 300 es
precision highp float;
in float vDepth; in float vZ; uniform float uAlpha; uniform int uPoint; uniform vec3 uLo; uniform vec3 uHi; out vec4 o;
void main(){
  if (uPoint == 1) { vec2 d = gl_PointCoord - 0.5; if (dot(d,d) > 0.25) discard; }
  float fog = smoothstep(30.0, 9.0, vDepth);
  vec3 col = mix(uLo, uHi, smoothstep(-1.0, 1.8, vZ));
  o = vec4(col, uAlpha * fog);
}`,De=`#version 300 es
precision highp float;
in vec2 aPos; in float aAge; uniform mat4 uVP; uniform float uT; uniform float uZScale;
uniform int uMode; // 0 = line, 1 = head point, 2 = dots along the trail
out float vAge; out float vDepth;
${ge}
void main(){
  float z = field(aPos, uT) * uZScale + 0.06;
  gl_Position = uVP * vec4(aPos.x, z, aPos.y, 1.0);
  vAge = aAge; vDepth = gl_Position.w;
  float head = clamp(70.0 / gl_Position.w, 2.5, 8.0);
  float dot_ = clamp(46.0 / gl_Position.w, 1.8, 5.5) * (1.0 - aAge * 0.6);
  gl_PointSize = uMode == 1 ? head : dot_;
}`,Ie=`#version 300 es
precision highp float; precision highp int;
in float vAge; in float vDepth; uniform int uMode; uniform vec3 uCol; out vec4 o;
void main(){
  if (uMode != 0) { vec2 d = gl_PointCoord - 0.5; if (dot(d,d) > 0.25) discard; }
  float fog = smoothstep(30.0, 9.0, vDepth);
  vec3 amber = uCol, hot = mix(uCol, vec3(1.0), 0.72);
  vec3 col = uMode == 1 ? hot : mix(hot, amber, clamp(vAge * 2.5, 0.0, 1.0));
  float a = uMode == 1 ? 1.0 : (1.0 - vAge) * (uMode == 2 ? 1.0 : 0.8);
  o = vec4(col, a * fog);
}`;function ue(t,o){const r=e.createShader(t);if(e.shaderSource(r,o),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(r));return r}function me(t,o){const r=e.createProgram();if(e.attachShader(r,ue(e.VERTEX_SHADER,t)),e.attachShader(r,ue(e.FRAGMENT_SHADER,o)),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(r));return r}function Ce(t,o,r,n){const c=1/Math.tan(t/2),f=1/(r-n);return new Float32Array([c/o,0,0,0,0,c,0,0,0,0,(n+r)*f,-1,0,0,2*n*r*f,0])}function Ne(t,o,r){const n=he(Ve(t,o)),c=he(de(r,n)),f=de(n,c);return new Float32Array([c[0],f[0],n[0],0,c[1],f[1],n[1],0,c[2],f[2],n[2],0,-ae(c,t),-ae(f,t),-ae(n,t),1])}function ke(t,o){const r=new Float32Array(16);for(let n=0;n<4;n++)for(let c=0;c<4;c++){let f=0;for(let a=0;a<4;a++)f+=t[a*4+c]*o[n*4+a];r[n*4+c]=f}return r}const Ve=(t,o)=>[t[0]-o[0],t[1]-o[1],t[2]-o[2]],ae=(t,o)=>t[0]*o[0]+t[1]*o[1]+t[2]*o[2],de=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]],he=t=>{const o=Math.hypot(...t);return[t[0]/o,t[1]/o,t[2]/o]},M=7,ve=.85;let be,h,d,y,ce,pe,Re,_e,se,Z,G,W=[],_=0,Ye=performance.now(),C=0,H=0,j=[0,0],fe=0,xe=0,le=!1,q=!0;function Oe(t){const o=new Float32Array(t*t*2);let r=0;for(let f=0;f<t;f++)for(let a=0;a<t;a++)o[r++]=(a/(t-1)-.5)*2*M,o[r++]=(f/(t-1)-.5)*2*M;const n=[];for(let f=0;f<t;f++)for(let a=0;a<t;a++)a<t-1&&n.push(f*t+a,f*t+a+1),f<t-1&&n.push(f*t+a,(f+1)*t+a);ce=e.createVertexArray(),e.bindVertexArray(ce);const c=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,o,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),pe=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,pe),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint32Array(n),e.STATIC_DRAW),Re=n.length,_e=t*t,e.bindVertexArray(null)}function Pe(t){t.x=(Math.random()-.5)*2*M*.9,t.y=(Math.random()-.5)*2*M*.9,t.vx=0,t.vy=0,t.stall=0,t.life=0,t.hist=[],t.m=[0,0],t.v=[0,0],t.step=0}function He(t){W=[];for(let o=0;o<t;o++){const r={};Pe(r),r.life=Math.random()*400,W.push(r)}}function we(t,o,r){for(const i of W){const l=re(i.x,i.y,t,o),x=(re(i.x+.02,i.y,t,o)-l)/.02,u=(re(i.x,i.y+.02,t,o)-l)/.02;i.step++,i.m[0]=.93*i.m[0]+(1-.93)*x,i.m[1]=.93*i.m[1]+(1-.93)*u,i.v[0]=.98*i.v[0]+(1-.98)*x*x,i.v[1]=.98*i.v[1]+(1-.98)*u*u;const P=i.m[0]/(1-Math.pow(.93,i.step)),E=i.m[1]/(1-Math.pow(.93,i.step)),L=i.v[0]/(1-Math.pow(.98,i.step)),g=i.v[1]/(1-Math.pow(.98,i.step)),A=.06*P/(Math.sqrt(L)+1e-6),v=.06*E/(Math.sqrt(g)+1e-6);i.x+=A,i.y+=v,i.life++;const b=Math.hypot(A,v);i.stall=b<.004?i.stall+1:0,i.life%2===0&&(i.hist.push(i.x,i.y),i.hist.length>r*2&&i.hist.splice(0,2)),(Math.abs(i.x)>M||Math.abs(i.y)>M||i.stall>50||i.life>800)&&(i.hist.length>0&&i.hist.splice(0,i.hist.length),Pe(i))}}function Fe(){const t=p.clientWidth||innerWidth,o=p.clientHeight||innerHeight;p.width=t*h.dpr,p.height=o*h.dpr,e.viewport(0,0,p.width,p.height)}function Se(t){cancelAnimationFrame(_),be=t,h=Object.assign({},Le[t]),Fe(),d=d||me(Te,Be),y=y||me(De,Ie),Oe(h.grid),He(h.particles),se=e.createVertexArray(),e.bindVertexArray(se),Z=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,Z),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),G=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,G),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,1,e.FLOAT,!1,0,0),e.bindVertexArray(null),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.disable(e.DEPTH_TEST),C=0,H=performance.now();const o=ye(fe);for(let r=0;r<h.trail;r++)we(0,o,h.trail);_=requestAnimationFrame(N)}function N(t){const o=h.still?0:(t-Ye)/1e3;fe+=Math.max(0,o-xe)*O.drift,xe=o;const r=ye(fe);h.still||we(o,r,h.trail);const n=p.width/p.height,c=h.still?0:o*.03,f=[Math.sin(c+j[0]*.15)*12.5,5.2+j[1]*.8,Math.cos(c+j[0]*.15)*12.5],a=ke(Ce(.85,n,.1,60),Ne(f,[0,-.4,0],[0,1,0]));e.clearColor(.027,.039,.059,1),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(d),e.uniformMatrix4fv(e.getUniformLocation(d,"uVP"),!1,a),e.uniform1f(e.getUniformLocation(d,"uT"),o),e.uniform1f(e.getUniformLocation(d,"uZScale"),ve),e.uniform4fv(e.getUniformLocation(d,"uPeaks"),new Float32Array(r.flat())),e.uniform3fv(e.getUniformLocation(d,"uLo"),O.lo),e.uniform3fv(e.getUniformLocation(d,"uHi"),O.hi),e.bindVertexArray(ce),e.uniform1i(e.getUniformLocation(d,"uPoint"),0),e.uniform1f(e.getUniformLocation(d,"uAlpha"),.22),e.drawElements(e.LINES,Re,e.UNSIGNED_INT,0),e.uniform1i(e.getUniformLocation(d,"uPoint"),1),e.uniform1f(e.getUniformLocation(d,"uAlpha"),.6),e.uniform1f(e.getUniformLocation(d,"uSize"),1.5*h.dpr),e.drawArrays(e.POINTS,0,_e),e.useProgram(y),e.blendFunc(e.SRC_ALPHA,e.ONE),e.uniformMatrix4fv(e.getUniformLocation(y,"uVP"),!1,a),e.uniform1f(e.getUniformLocation(y,"uT"),o),e.uniform1f(e.getUniformLocation(y,"uZScale"),ve),e.uniform4fv(e.getUniformLocation(y,"uPeaks"),new Float32Array(r.flat())),e.uniform3fv(e.getUniformLocation(y,"uCol"),O.col),e.bindVertexArray(se);const s=[];for(const i of W){const l=i.hist.length/2;if(l<2)continue;const x=new Float32Array(l);for(let u=0;u<l;u++)x[u]=1-u/(l-1);e.bindBuffer(e.ARRAY_BUFFER,Z),e.bufferData(e.ARRAY_BUFFER,new Float32Array(i.hist),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,G),e.bufferData(e.ARRAY_BUFFER,x,e.DYNAMIC_DRAW),e.uniform1i(e.getUniformLocation(y,"uMode"),0),e.drawArrays(e.LINE_STRIP,0,l),e.uniform1i(e.getUniformLocation(y,"uMode"),2),e.drawArrays(e.POINTS,0,l),s.push(i.hist[i.hist.length-2],i.hist[i.hist.length-1])}if(e.bindBuffer(e.ARRAY_BUFFER,Z),e.bufferData(e.ARRAY_BUFFER,new Float32Array(s),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,G),e.bufferData(e.ARRAY_BUFFER,new Float32Array(s.length/2),e.DYNAMIC_DRAW),e.uniform1i(e.getUniformLocation(y,"uMode"),1),e.drawArrays(e.POINTS,0,s.length/2),e.bindVertexArray(null),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),C++,t-H>1e3){const i=Math.round(C*1e3/(t-H));be==="A"&&i<40&&C>15&&!document.hidden&&Se("B"),C=0,H=t}!h.still&&!le&&q&&!document.hidden&&(_=requestAnimationFrame(N))}window.__bench=(t=60)=>{le=!0,cancelAnimationFrame(_);const o=new Uint8Array(4),r=performance.now();for(let c=0;c<t;c++)N(r+c*16.7),e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,o);const n=(performance.now()-r)/t;return le=!1,_=requestAnimationFrame(N),n};function Ae(){!h.still&&q&&!document.hidden&&(cancelAnimationFrame(_),_=requestAnimationFrame(N))}e?(addEventListener("resize",()=>{Fe()}),addEventListener("pointermove",t=>{j=[(t.clientX/innerWidth-.5)*2,(t.clientY/innerHeight-.5)*2]}),document.addEventListener("visibilitychange",()=>{document.hidden?cancelAnimationFrame(_):Ae()}),new IntersectionObserver(([t])=>{q=t.isIntersecting,q?Ae():cancelAnimationFrame(_)},{threshold:.01}).observe(p),Se(Ue())):p&&(p.style.background="radial-gradient(ellipse at 50% 70%, #11233a, #070a0f 70%)");
