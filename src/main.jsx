import React,{useEffect,useRef,useState} from 'react';
import{createRoot}from'react-dom/client';
import{ArrowRight,Menu,Sun,Moon,Code2,Cloud,BrainCircuit,Cog}from'lucide-react';
import'./styles.css';
import loaderVideo from './loaderMicroVideo.js';


function IntroLoader(){
 const[visible,setVisible]=useState(true);
 const[leaving,setLeaving]=useState(false);
 const finishing=useRef(false);
 const videoRef=useRef(null);

 const finish=()=>{
   if(finishing.current)return;
   finishing.current=true;
   setLeaving(true);
   window.setTimeout(()=>setVisible(false),500);
 };

 useEffect(()=>{
   const video=videoRef.current;
   if(video){
     video.muted=true;
     video.defaultMuted=true;
     const start=()=>video.play().catch(()=>{});
     start();
     video.addEventListener('canplay',start,{once:true});
     return()=>video.removeEventListener('canplay',start);
   }
 },[]);

 useEffect(()=>{
   const fallback=window.setTimeout(finish,22000);
   return()=>window.clearTimeout(fallback);
 },[]);

 if(!visible)return null;
 return <div className={`introLoader${leaving?' leaving':''}`} aria-hidden="true">
   <video
     ref={videoRef}
     className="introDirectVideo"
     src={loaderVideo}
     autoPlay
     muted
     playsInline
     preload="auto"
     onCanPlay={e=>e.currentTarget.play().catch(()=>{})}
     onError={finish}
     onEnded={finish}
   />
 </div>;
}

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
       el.classList.toggle('is-revealing',current.current.a>.025||target.current.a>.025);
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
   <div className="portraitVisual">
     <img className="human" src="/images/ChatGPT Image Sep 28, 2026, 08_56_10 PM-1.png" alt="Rajkumar"/>
     <div className="robotReveal" aria-hidden="true"><img className="robot" src="/images/ChatGPT Image Sep 28, 2026, 08_56_11 PM-2.png" alt=""/></div>
     <div className="waterCavity" aria-hidden="true"><i className="cavityShade"/><i className="cavityHighlight"/></div>
     <div className="touchPool" aria-hidden="true"/>
     <div className="waterRipples" aria-hidden="true"><i/><i/></div>
   </div>
   <span className="revealHint">PRESS / DRAG TO REVEAL</span>
 </div>
}

function App(){
 const[light,setLight]=useState(false);
 useEffect(()=>{
   document.documentElement.classList.toggle('light-mode',light);
   document.body.classList.toggle('light-mode',light);
   return()=>{
     document.documentElement.classList.remove('light-mode');
     document.body.classList.remove('light-mode');
   };
 },[light]);

 useEffect(()=>{
   const items=[...document.querySelectorAll('.motion-item')];
   if(!('IntersectionObserver' in window)){
     items.forEach(el=>el.classList.add('in-view'));
     return;
   }
   const observer=new IntersectionObserver(entries=>{
     entries.forEach(entry=>{
       if(entry.isIntersecting){
         entry.target.classList.add('in-view');
         observer.unobserve(entry.target);
       }
     });
   },{threshold:.16,rootMargin:'0px 0px -8% 0px'});
   items.forEach(el=>observer.observe(el));
   return()=>observer.disconnect();
 },[]);
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
 return <>
  <IntroLoader/>
  <main className={light?'site light':'site'}>
  <header><a className="brand" href="#"><b>R</b><span>RAJKUMAR</span></a><nav><a href="#about">About</a><a href="#work">Work</a><a href="#experiments">Experiments</a><a href="#contact">Contact</a></nav><div className="headActions"><button className="theme" onClick={()=>setLight(!light)} aria-label="Toggle theme">{light?<Moon/>:<Sun/>}</button><a className="connect" href="#contact">Let's Connect <ArrowRight/></a><Menu className="menu"/></div></header>
  <section ref={heroRef} className="hero" onPointerMove={moveParallax} onPointerLeave={resetParallax}>
   <div className="copy"><p className="eyebrow">HI, I'M</p><h1>RAJKUMAR</h1><h2>SOFTWARE DEVELOPER</h2><p className="intro">Software developer building React applications, backend APIs and AWS cloud solutions with Python, FastAPI and Express.js.</p><div className="cta"><a href="#work">View My Work <ArrowRight/></a><a className="ghost" href="#about">About Me</a></div><div className="stats"><div><b>React</b><span>Frontend</span></div><div><b>Python</b><span>Backend</span></div><div><b>AWS</b><span>Cloud</span></div><div><b>FastAPI</b><span>APIs</span></div></div></div>
   <RevealPortrait/>
   <aside>{skills.map(([a,b,I],n)=><a href="#work" className="skill" key={a}><span className="icon"><I/></span><span><b>{a}</b><small>{b}</small></span><em>0{n+1}</em></a>)}</aside>
  </section>
  <section id="about" className="section aboutSection">
   <div className="aboutLayout">
    <div className="aboutCopy motion-item">
     <p className="eyebrow">ABOUT</p>
     <h3>Curious builder.<br/>Practical engineer.</h3>
     <p>I build React frontends, Express.js and FastAPI backends, and AWS infrastructure tooling. My work includes Cognito authentication, Lambda microservices, data migration, S3 uploads, DynamoDB, API Gateway and Azure Functions.</p>
    </div>
    <div className="aboutPanel">
     <div className="metricGrid">
      <article className="metricCard motion-item" style={{'--delay':'60ms'}}><Code2/><strong>5+</strong><span>PROJECTS BUILT</span></article>
      <article className="metricCard motion-item" style={{'--delay':'120ms'}}><Cloud/><strong>AWS</strong><span>CLOUD EXPERIENCE</span></article>
      <article className="metricCard motion-item" style={{'--delay':'180ms'}}><BrainCircuit/><strong>Full-stack</strong><span>REACT · NODE · PYTHON · FASTAPI</span></article>
      <article className="metricCard motion-item" style={{'--delay':'240ms'}}><Cog/><strong>Real-world</strong><span>DATA · APIS · INFRASTRUCTURE</span></article>
     </div>
     <div className="toolsCard motion-item" style={{'--delay':'300ms'}}>
      <p className="eyebrow">TOOLS & TECHNOLOGIES</p>
      <div className="toolChips">{['React','JavaScript','Node.js','FastAPI','AWS','Python','DynamoDB','Azure','Docker','CI/CD'].map((tool,i)=><span key={tool} style={{'--chip-delay':`${i*45}ms`}}>{tool}</span>)}</div>
     </div>
    </div>
   </div>
  </section>
  <section id="work" className="section workSection">
   <div className="workIntro motion-item">
    <div><p className="eyebrow">SELECTED WORK</p><h3>Projects & systems.</h3></div>
    <p>A selection of recent projects spanning web apps, backend services, and cloud infrastructure.</p>
    <a className="workLink" href="https://github.com/Rajpopzein" target="_blank" rel="noreferrer">View all projects <ArrowRight/></a>
   </div>
   <div className="projects">
    <article className="motion-item" style={{'--delay':'60ms'}}><small>PYTHON · AWS LAMBDA</small><h4>VIDA</h4><p>Microservice APIs using Lambda, API Gateway and S3, including CSV-to-JSON migration into DynamoDB and multipart large-file uploads.</p></article>
    <article className="motion-item" style={{'--delay':'120ms'}}><small>REACT · EXPRESS.JS</small><h4>Team Management</h4><p>HR portal for employee work progress, queries, leave and work-hour tracking, with Cognito authentication, Redux Toolkit and Material UI.</p></article>
    <article className="motion-item" style={{'--delay':'180ms'}}><small>FASTAPI · PYTHON · BOTO3</small><h4>AWS Infrastructure Portal</h4><p>APIs for AWS infrastructure management, including EC2, IAM, Slack integration and YAML generation for DevOps workflows.</p></article>
    <article className="motion-item" style={{'--delay':'240ms'}}><small>PYTHON · BEAUTIFULSOUP</small><h4>TTDC Bot</h4><p>API that fetches webpage data and structures the extracted information as JSON.</p></article>
    <article className="motion-item" style={{'--delay':'300ms'}}><small>FASTAPI · AZURE</small><h4>HelloHalfred</h4><p>Patient and doctor CRUD APIs deployed with Azure Functions and integrated with Azure SQL Database.</p></article>
   </div>
  </section>
  <footer id="contact" className="contactFooter">
   <div className="footerTop motion-item">
    <div className="footerLead">
     <p className="eyebrow">LET'S CONNECT</p>
     <h3>Have an idea?<br/>Let's build it.</h3>
     <p>For product ideas, engineering collaborations, or interesting technical problems, send me a message.</p>
    </div>
    <div className="footerContact">
     <a className="footerEmail" href="mailto:rajkumarrbtech@hotmail.com">
      <span><small>EMAIL ME</small><strong>rajkumarrbtech@hotmail.com</strong></span>
      <ArrowRight/>
     </a>
     <div className="footerLinks">
      <a href="https://github.com/Rajpopzein" target="_blank" rel="noreferrer">GitHub <ArrowRight/></a>
      <a href="https://www.linkedin.com/in/raj-kumar-39b403160" target="_blank" rel="noreferrer">LinkedIn <ArrowRight/></a>
     </div>
     <div className="footerStack"><i/><span>React · Python · AWS · FastAPI</span></div>
    </div>
   </div>
   <div className="footerBottom">
    <a className="footerMark" href="#"><b>R</b><span>RAJKUMAR</span></a>
    <span>SOFTWARE DEVELOPER</span>
    <span>© 2026</span>
   </div>
  </footer>
 </main>
 </>
}
createRoot(document.getElementById('root')).render(<App/>);