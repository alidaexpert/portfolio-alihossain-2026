import type {ChatMessage} from './config';
export const CHAT_STORAGE_KEY='ali-kamado-chat-v1';
export const MAX_MESSAGES=120;
/** Treat browser storage as untrusted; never render HTML or revive runtime objects. */
export function readChatHistory(raw:string|null):ChatMessage[]{
 if(!raw)return [];
 try{
  const value=JSON.parse(raw);if(value.version!==1||!Array.isArray(value.messages))return [];
  return value.messages.slice(-MAX_MESSAGES).filter((m:ChatMessage)=>m&&(m.role==='user'||m.role==='assistant')&&typeof m.content==='string'&&typeof m.createdAt==='string'&&Number.isFinite(Date.parse(m.createdAt))).map((m:ChatMessage)=>({role:m.role,content:(m.content||'This reply was interrupted. Please send your question again.').slice(0,10000),createdAt:m.createdAt,notice:typeof m.notice==='string'?m.notice.slice(0,60):undefined}));
 }catch{return [];}
}
export function formatChatTime(iso:string){return new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit',timeZoneName:'short'}).format(new Date(iso));}
