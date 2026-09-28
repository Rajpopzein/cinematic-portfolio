import React,{useEffect,useRef,useState} from 'react';
import{createRoot}from'react-dom/client';
import{ArrowRight,Menu,Sun,Moon,Code2,Cloud,BrainCircuit,Cog}from'lucide-react';
import'./styles.css';

const skills=[
 ['Web Development','React · Node · Python',Code2],
 ['Cloud & DevOps','AWS · Terraform · Docker',Cloud],
 ['AI & Agents','LLMs · RAG · Automation',BrainCircuit],
 ['Hardware & IoT','ESP32 · Robotics · 3D',Cog],
];

function RevealPortrait(){
 const ref=useRef(null);
 const [p,setP]=useState({x:72,y:42,active:false});
 const move=e=>{const r=ref.current.getBoundingClientRect();const t=e.touches?.[0]||e;setP({x:(t.clientX-r.left)/r.width*100,y:(t.clientY-r.top)/r.height*100,active:true})};
 return <div ref={ref} className="portrait" onMouseMove={move} onMouseLeave={()=>setP(v=>({...v,active:false}))} onTouchMove={move}>
   <img className="human" src="/images/human.png" alt="Rajkumar"/>
   <img className="robot" src="/images/robot.png" alt="" style={{'--x':p.x+'%','--y':p.y+'%','--r':p.active?'24%':'0%'}}/>
   <div className="liquidGlow" style={{'--x':p.x+'%','--y':p.y+'%','--o':p.active?1:0}}/>
   <span className="revealHint">MOVE / DRAG TO REVEAL</span>
 </div>
}

function App(){
 const[light,setLight]=useState(false);
 return <main className={light?'site light':'site'}>
  <header><a className="brand" href="#"><b>R</b><span>RAJKUMAR</span></a><nav><a href="#about">About</a><a href="#work">Work</a><a href="#experiments">Experiments</a><a href="#contact">Contact</a></nav><div className="headActions"><button className="theme" onClick={()=>setLight(!light)} aria-label="Toggle theme">{light?<Moon/>:<Sun/>}</button><a className="connect" href="#contact">Let's Connect <ArrowRight/></a><Menu className="menu"/></div></header>
  <section className="hero">
   <div className="copy"><p className="eyebrow">HI, I'M</p><h1>RAJKUMAR</h1><h2>SOFTWARE DEVELOPER</h2><p className="intro">Building scalable systems, AI-powered tools and practical solutions that make life easier.<br/>Always curious, always building.</p><div className="cta"><a href="#work">View My Work <ArrowRight/></a><a className="ghost" href="#about">About Me</a></div><div className="stats"><div><b>4+</b><span>Years Experience</span></div><div><b>50+</b><span>Projects & Tools</span></div><div><b>3</b><span>Content Channels</span></div><div><b>∞</b><span>Always Building</span></div></div></div>
   <RevealPortrait/>
   <aside>{skills.map(([a,b,I],n)=><a href="#work" className="skill" key={a}><span className="icon"><I/></span><span><b>{a}</b><small>{b}</small></span><em>0{n+1}</em></a>)}</aside>
  </section>
  <section id="about" className="section"><p className="eyebrow">ABOUT</p><h3>Curious builder.<br/>Practical engineer.</h3><p>I build software across web, cloud, AI and connected hardware, with a focus on systems that are useful in the real world.</p></section>
  <section id="work" className="section"><p className="eyebrow">SELECTED WORK</p><h3>Projects that matter.</h3><div className="projects"><article><small>FINTECH</small><h4>Ledger Finance Tracker</h4><p>Multi-user finance tracking, imports, reconciliation and AI-assisted insights.</p></article><article><small>AI SYSTEMS</small><h4>Multi-Agent Hub</h4><p>Peer-agent orchestration with real-time discussion and execution state.</p></article><article><small>CLOUD SECURITY</small><h4>CVRA</h4><p>AWS vulnerability remediation workflows for common cloud findings.</p></article></div></section>
  <footer id="contact"><h3>Let's build something useful.</h3><p>RAJKUMAR © 2026</p></footer>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);