import React,{useEffect,useRef,useState} from 'react';
import{createRoot}from'react-dom/client';
import{ArrowRight,Menu,Sun,Moon,Code2,Cloud,BrainCircuit,Cog}from'lucide-react';
import'./styles.css';

const skills=[
 ['Frontend & Web','React · JavaScript · HTML/CSS',Code2],
 ['Backend & APIs','Python · FastAPI · Express.js',BrainCircuit],
 ['AWS & Cloud','Lambda · API Gateway · S3 · DynamoDB',Cloud],
 ['DevOps & Tools','Docker · Vagrant · Linux · GitHub',Cog],
];

function RevealPortrait(){
 const ref=useRef(null);
 const target=useRef({x:72,y:42,a:0});
 const current=useRef({x:72,y:42,a:0});

 useEffect(()=>{
   let raf;
   const tick=()=>{
     const el=ref.current;
     if(el){
       current.current.x+=(target.current.x-current.current.x)*.13;
       current.current.y+=(target.current.y-current.current.y)*.13;
       current.current.a+=(target.current.a-current.current.a)*.18;
       el.style.setProperty('--x',current.current.x.toFixed(2)+'%');
       el.style.setProperty('--y',current.current.y.toFixed(2)+'%');
       el.style.setProperty('--reveal',current.current.a.toFixed(3));
     }
     raf=requestAnimationFrame(tick);
   };
   raf=requestAnimationFrame(tick);
   return()=>cancelAnimationFrame(raf);
 },[]);

 const move=e=>{
   const el=ref.current;if(!el)return;
   const r=el.getBoundingClientRect();
   target.current.x=Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100));
   target.current.y=Math.max(0,Math.min(100,((e.clientY-r.top)/r.height)*100));
   target.current.a=1;
 };
 const leave=()=>{target.current.a=0};
 const pointerUp=e=>{if(e.pointerType==='touch'||e.pointerType==='pen')leave()};

 return <div
   ref={ref}
   className="portrait waterPortrait"
   style={{'--x':'72%','--y':'42%','--reveal':0}}
   onPointerMove={move}
   onPointerEnter={move}
   onPointerDown={e=>{e.currentTarget.setPointerCapture?.(e.pointerId);move(e)}}
   onPointerUp={pointerUp}
   onPointerCancel={leave}
   onPointerLeave={leave}
 >
   <img className="human" src="/images/ChatGPT Image Sep 28, 2026, 08_56_10 PM-1.png" alt="Rajkumar"/>
   <img className="robot waterReveal" src="/images/ChatGPT Image Sep 28, 2026, 08_56_11 PM-2.png" alt="" aria-hidden="true"/>
   <div className="waterCavity" aria-hidden="true"><i className="cavityShade"/><i className="cavityHighlight"/></div>
   <div className="touchPool" aria-hidden="true"/>
   <div className="waterRipples" aria-hidden="true"><i/><i/></div>
   <span className="revealHint">TOUCH THE SURFACE</span>
 </div>
}

function App(){
 const[light,setLight]=useState(false);
 const heroRef=useRef(null);
 const moveParallax=e=>{
   const el=heroRef.current;if(!el)return;
   const r=el.getBoundingClientRect();
   const x=Math.max(-1,Math.min(1,((e.clientX-r.left)/r.width-.5)*2));
   const y=Math.max(-1,Math.min(1,((e.clientY-r.top)/r.height-.5)*2));
   el.style.setProperty('--px',x.toFixed(3));
   el.style.setProperty('--py',y.toFixed(3));
 };
 const resetParallax=()=>{
   const el=heroRef.current;if(!el)return;
   el.style.setProperty('--px','0');el.style.setProperty('--py','0');
 };
 return <main className={light?'site light':'site'}>
  <header><a className="brand" href="#"><b>R</b><span>RAJKUMAR</span></a><nav><a href="#about">About</a><a href="#work">Work</a><a href="#experiments">Experiments</a><a href="#contact">Contact</a></nav><div className="headActions"><button className="theme" onClick={()=>setLight(!light)} aria-label="Toggle theme">{light?<Moon/>:<Sun/>}</button><a className="connect" href="#contact">Let's Connect <ArrowRight/></a><Menu className="menu"/></div></header>
  <section ref={heroRef} className="hero" onPointerMove={moveParallax} onPointerLeave={resetParallax}>
   <div className="copy"><p className="eyebrow">HI, I'M</p><h1>RAJKUMAR</h1><h2>SOFTWARE DEVELOPER</h2><p className="intro">Software developer building React applications, backend APIs and AWS cloud solutions with Python, FastAPI and Express.js.</p><div className="cta"><a href="#work">View My Work <ArrowRight/></a><a className="ghost" href="#about">About Me</a></div><div className="stats"><div><b>React</b><span>Frontend</span></div><div><b>Python</b><span>Backend</span></div><div><b>AWS</b><span>Cloud</span></div><div><b>FastAPI</b><span>APIs</span></div></div></div>
   <RevealPortrait/>
   <aside>{skills.map(([a,b,I],n)=><a href="#work" className="skill" key={a}><span className="icon"><I/></span><span><b>{a}</b><small>{b}</small></span><em>0{n+1}</em></a>)}</aside>
  </section>
  <section id="about" className="section"><p className="eyebrow">ABOUT</p><h3>Curious builder.<br/>Practical engineer.</h3><p>I build React frontends, Express.js and FastAPI backends, and AWS infrastructure tooling. My work includes Cognito authentication, Lambda microservices, data migration, S3 uploads, DynamoDB, API Gateway and Azure Functions.</p></section>
  <section id="work" className="section"><p className="eyebrow">SELECTED WORK</p><h3>Projects & systems.</h3><div className="projects"><article><small>PYTHON · AWS LAMBDA</small><h4>VIDA</h4><p>Microservice APIs using Lambda, API Gateway and S3, including CSV-to-JSON migration into DynamoDB and multipart large-file uploads.</p></article><article><small>REACT · EXPRESS.JS</small><h4>Team Management</h4><p>HR portal for employee work progress, queries, leave and work-hour tracking, with Cognito authentication, Redux Toolkit and Material UI.</p></article><article><small>FASTAPI · PYTHON · BOTO3</small><h4>AWS Infrastructure Portal</h4><p>APIs for AWS infrastructure management, including EC2, IAM, Slack integration and YAML generation for DevOps workflows.</p></article><article><small>PYTHON · BEAUTIFULSOUP</small><h4>TTDC Bot</h4><p>API that fetches webpage data and structures the extracted information as JSON.</p></article><article><small>FASTAPI · AZURE</small><h4>HelloHalfred</h4><p>Patient and doctor CRUD APIs deployed with Azure Functions and integrated with Azure SQL Database.</p></article></div></section>
  <footer id="contact"><h3>Let's build something useful.</h3><p><a href="mailto:rajkumarrbtech@hotmail.com">rajkumarrbtech@hotmail.com</a> · <a href="https://github.com/Rajpopzein">GitHub</a> · <a href="https://www.linkedin.com/in/raj-kumar-39b403160">LinkedIn</a></p><p>RAJKUMAR © 2026</p></footer>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);