'use client';
import {useEffect,useRef,useState} from 'react';
import {instantAnswer} from '@/app/ai/instant-answer';
import {portfolioGuide} from '@/app/portfolio-guide';
import {CHAT_STORAGE_KEY,MAX_MESSAGES,readChatHistory} from '@/app/ai/chat-history';
import type {ChatMessage} from '@/app/ai/config';
type Status='idle'|'loading'|'ready'|'error';
const stamp=()=>new Date().toISOString();
export function useLocalAIChat(){
 const [chat,setChat]=useState(false),[messages,setMessages]=useState<ChatMessage[]>([]),[question,setQuestion]=useState(''),[busy,setBusy]=useState(false),[status,setStatus]=useState<Status>('idle'),[detail,setDetail]=useState(''),[startedAt,setStartedAt]=useState<number|null>(null),[storageAvailable,setStorageAvailable]=useState(true);
 const worker=useRef<Worker|null>(null),state=useRef<Status>('idle'),locked=useRef(false),requestId=useRef(0),history=useRef<ChatMessage[]>([]),pending=useRef<ChatMessage[]|null>(null),timer=useRef<ReturnType<typeof setTimeout>|null>(null),alive=useRef(true),buffer=useRef('');
 function update(next:ChatMessage[]){
  const limited=next.slice(-MAX_MESSAGES);history.current=limited;setMessages(limited);
  try{localStorage.setItem(CHAT_STORAGE_KEY,JSON.stringify({version:1,messages:limited}));}catch{setStorageAvailable(false);}
 }
 function clearTimer(){if(timer.current)clearTimeout(timer.current);timer.current=null;}
 function transition(next:Status){state.current=next;setStatus(next);}
 function finish(content:string,notice='On-device AI'){
  clearTimer();const queued=pending.current;
  if(queued)update([...queued,{role:'assistant',content,notice,createdAt:stamp()}]);
  pending.current=null;buffer.current='';locked.current=false;setBusy(false);setStartedAt(null);
 }
 function fail(){worker.current?.terminate();worker.current=null;transition('error');setDetail('Local AI is unavailable. You can retry or ask about Ali’s portfolio.');finish(portfolioGuide(pending.current||history.current),'Portfolio guide');}
 function generate(next:ChatMessage[]){
  pending.current=next;buffer.current='';const id=++requestId.current;
  clearTimer();timer.current=setTimeout(fail,180000);
  worker.current?.postMessage({type:'generate',id,messages:next});
 }
 function start(){
  if(state.current==='loading'||state.current==='ready')return;
  transition('loading');
  try{
   const w=new Worker('/ai/local-ai.worker.js?v=kamado-20261028',{type:'module'});worker.current=w;
   w.onmessage=e=>{
    if(!alive.current||worker.current!==w)return;const d=e.data;
    if(d.type==='ready'){clearTimer();transition('ready');if(pending.current)generate(pending.current);return;}
    if(d.id!==undefined&&d.id!==requestId.current)return;
    // Buffer all generated words offscreen. Only a completed answer reaches React.
    if(d.type==='token'){buffer.current+=d.text;return;}
    if(d.type==='done')finish(d.text?.trim()||buffer.current.trim()||'Please try rephrasing your question.');
    if(d.type==='error')fail();
   };
   w.onerror=()=>{if(worker.current===w)fail();};
   timer.current=setTimeout(fail,600000);w.postMessage({type:'load'});
  }catch{fail();}
 }
 useEffect(()=>{
  alive.current=true;
  try{const saved=readChatHistory(localStorage.getItem(CHAT_STORAGE_KEY));history.current=saved;setMessages(saved);}catch{setStorageAvailable(false);}
  return()=>{alive.current=false;clearTimer();worker.current?.terminate();worker.current=null;state.current='idle';};
 },[]);
 function ask(q:string){
  if(!q.trim()||locked.current)return;
  setChat(true);setQuestion('');
  const next:ChatMessage[]=[...history.current,{role:'user',content:q.trim().slice(0,1000),createdAt:stamp()}];
  const instant=instantAnswer(next);
  if(instant){update([...next,{role:'assistant',content:instant,notice:/joke|funny|laugh|pun|bored|roast/i.test(q)?'Quick reply':'Portfolio guide',createdAt:stamp()}]);return;}
  locked.current=true;setBusy(true);setStartedAt(Date.now());pending.current=next;
  update([...next,{role:'assistant',content:'',notice:'On-device AI',createdAt:stamp()}]);
  if(state.current==='ready')generate(next);else if(state.current==='error')fail();else start();
 }
 function stop(){
  worker.current?.terminate();worker.current=null;++requestId.current;transition('idle');finish('Reply cancelled. Send another message whenever you’re ready.','Cancelled');
 }
 function clear(){
  worker.current?.terminate();worker.current=null;++requestId.current;clearTimer();transition('idle');pending.current=null;buffer.current='';locked.current=false;setBusy(false);setStartedAt(null);history.current=[];setMessages([]);setQuestion('');
  try{localStorage.removeItem(CHAT_STORAGE_KEY);}catch{setStorageAvailable(false);}
 }
 function retry(){if(state.current==='error')start();}
 return {chat,setChat,messages,question,setQuestion,busy,status,detail,startedAt,storageAvailable,ask,stop,clear,retry};
}
