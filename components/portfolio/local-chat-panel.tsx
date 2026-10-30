'use client';
import {useEffect,useRef,useState} from 'react';
import {X,Send,RotateCcw,Volume2,VolumeX,UserRound} from 'lucide-react';
import {formatChatTime} from '@/app/ai/chat-history';
import type {useLocalAIChat} from '@/hooks/use-local-ai-chat';
const Avatar=()=> <img className="kamado-avatar" src="/assets/kamado-avatar.svg" alt="Kamado, Tanjiro-inspired avatar" width={36} height={36}/>;
export default function LocalChatPanel({controller:c}:{controller:ReturnType<typeof useLocalAIChat>}){
 const log=useRef<HTMLDivElement>(null),audio=useRef<AudioContext|null>(null),wasBusy=useRef(c.busy);
 const [now,setNow]=useState(Date.now()),[sound,setSound]=useState(false),[confirmClear,setConfirmClear]=useState(false);
 useEffect(()=>{const clock=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(clock);},[]);
 useEffect(()=>{log.current?.scrollTo({top:log.current.scrollHeight});},[c.messages,c.busy]);
 useEffect(()=>{
  if(wasBusy.current&&!c.busy&&sound&&audio.current&&c.messages.at(-1)?.notice!=='Cancelled'){
   try{const a=audio.current,o=a.createOscillator(),gain=a.createGain();o.type='sine';o.frequency.value=660;gain.gain.setValueAtTime(.035,a.currentTime);gain.gain.exponentialRampToValueAtTime(.001,a.currentTime+.15);o.connect(gain);gain.connect(a.destination);o.start();o.stop(a.currentTime+.16);}catch{/* Audio is optional. */}
  }
  wasBusy.current=c.busy;
 },[c.busy,c.messages,sound]);
 useEffect(()=>()=>{void audio.current?.close();},[]);
 function toggleSound(){if(!sound){try{audio.current??=new AudioContext();void audio.current.resume();}catch{return;}}setSound(!sound);}
 const elapsed=c.startedAt?Math.max(0,Math.floor((now-c.startedAt)/1000)):0,countdown=Math.max(0,5-elapsed);
 const date=(iso:string)=>new Intl.DateTimeFormat(undefined,{year:'numeric',month:'short',day:'numeric'}).format(new Date(iso));
 return <aside className="chat-panel local-chat" aria-label="Kamado chat">
  <div className="chat-title"><div className="kamado-identity"><Avatar/><div><strong>Kamado</strong><small>Ali’s portfolio companion</small></div></div><div className="chat-heading-actions"><button className="icon" aria-label={sound?'Mute reply sound':'Enable reply sound'} title={sound?'Sound on':'Sound off'} onClick={toggleSound}>{sound?<Volume2 size={15}/>:<VolumeX size={15}/>}</button><button className="icon" aria-label="Clear chat history" title="Clear chat" onClick={()=>setConfirmClear(!confirmClear)}><RotateCcw size={16}/></button><button className="icon" aria-label="Close assistant" onClick={()=>c.setChat(false)}><X size={18}/></button></div></div>
  <div className="chat-local-clock">Your local time · {formatChatTime(new Date(now).toISOString())}</div>
  {confirmClear&&<div className="chat-clear-confirm">Clear saved messages on this browser?<div><button onClick={()=>{c.clear();setConfirmClear(false);}}>Clear history</button><button onClick={()=>setConfirmClear(false)}>Keep chat</button></div></div>}
  {c.status==='error'&&<div className="chat-error-strip" role="status">{c.detail} <button onClick={c.retry}>Retry AI</button></div>}
  <div className="messages" ref={log} role="log" aria-live="polite" aria-relevant="additions text">
   <div className="kamado-welcome"><Avatar/><p>Hey, I’m Kamado! Ask about Ali’s work, talk tech, or ask me for a joke. 🌿</p></div>
   {c.messages.map((m,i)=>{
    const waiting=c.busy&&i===c.messages.length-1&&!m.content;
    const newDate=m.createdAt&&(!c.messages[i-1]?.createdAt||date(m.createdAt)!==date(c.messages[i-1].createdAt!));
    return <div key={i}>{newDate&&<div className="chat-date">{date(m.createdAt!)}</div>}<div className={'chat-message-row '+m.role}>
     {m.role==='assistant'?<Avatar/>:<span className="visitor-avatar" aria-label="You"><UserRound size={17}/></span>}
     <div className={m.role+'-message'}><div className="chat-speaker">{m.role==='assistant'?'Kamado':'You'}</div>
      {waiting?<div className="kamado-typing"><div role="status" aria-label="Kamado is composing a complete reply">Kamado is typing<span className="typing-dots" aria-hidden="true"><i/><i/><i/></span></div><div className="typing-timer" aria-hidden="true"><b>{countdown}s</b><span>{countdown>0?'Next status check':`Still thinking · ${elapsed}s elapsed`}</span></div><span className="typing-detail">{c.status==='loading'?'Warming up local AI. Your full reply will appear when ready.':'Composing your full reply in the background.'}</span></div>:<p>{m.content.replace(/\*\*(.*?)\*\*/g,'$1')}</p>}
      {!waiting&&<div className="chat-message-meta">{m.notice&&<span>{m.notice}</span>}{m.createdAt&&<time dateTime={m.createdAt} title={new Date(m.createdAt).toLocaleString()}>{formatChatTime(m.createdAt)}</time>}</div>}
     </div></div></div>;
   })}
  </div>
  <div className="chat-links"><button disabled={c.busy} onClick={()=>c.ask('What are Ali’s skills?')}>Skills</button><button disabled={c.busy} onClick={()=>c.ask('Tell me a joke')}>Make me smile</button><a href="#contact" onClick={()=>c.setChat(false)}>Contact</a>{c.busy&&<button onClick={c.stop}>Cancel reply</button>}</div>
  <form onSubmit={e=>{e.preventDefault();c.ask(c.question)}}><input aria-label="Your question" placeholder="Message Kamado…" value={c.question} onChange={e=>c.setQuestion(e.target.value)} maxLength={1000}/><button className="icon" disabled={c.busy||!c.question.trim()} aria-label="Send question"><Send size={18}/></button></form>
  <small className="chat-footnote">{c.storageAvailable?'Saved on this browser · Last 120 messages':'History cannot be saved in this browser'}<br/>AI can make mistakes. <a href="/ai/about.html" target="_blank" rel="noreferrer">About Kamado</a></small>
 </aside>;
}
