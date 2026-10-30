import {profile,projects,skills,experience,education} from '../content';
import type {ChatMessage} from './config';
/** Lightweight retrieval over verified site facts; no embedding API or training required. */
export function retrievePortfolioContext(messages:ChatMessage[]){
 const query=messages.filter(m=>m.role==='user').slice(-2).map(m=>m.content.toLowerCase()).join(' ');
 const documents=[
  {tags:'skill stack technology react javascript frontend backend tools',text:'Skills: '+skills.map(s=>s[0]).join(', ')},
  ...projects.map(p=>({tags:'project portfolio work '+p.title.toLowerCase()+' '+p.category.toLowerCase(),text:`${p.title}: ${p.description} Technologies: ${p.tech.join(', ')}. Website: ${p.url}`})),
  {tags:'education course study university degree qualification',text:'Education: '+education.map(e=>e.join(', ')).join('; ')},
  {tags:'experience job career employment company',text:'Work: '+experience.map(e=>`${e.role}, ${e.company}, ${e.date}. ${e.note}`).join('; ')},
  {tags:'contact hire email phone whatsapp call price available',text:`Email: ${profile.email}. Phone: ${profile.phone}. Rates and current availability are not published. Ask Ali directly.`},
  {tags:'github repository code repo',text:'GitHub: https://github.com/alidaexpert'},
  {tags:'cv resume download',text:'CV: '+profile.cv},
 ];
 const words=query.match(/[a-z]{3,}/g)||[];
 return documents.map(d=>({...d,score:words.reduce((n,w)=>n+(d.tags.includes(w)?2:d.text.toLowerCase().includes(w)?1:0),0)})).filter(d=>d.score>0).sort((a,b)=>b.score-a.score).slice(0,2).map(d=>d.text).join('\n');
}
export function buildLocalPrompt(messages:ChatMessage[]){
 return `You are Kamado, Ali Hossain's warm, witty portfolio assistant. For casual chat, respond naturally; for playful questions, offer a short friendly joke. Never pretend to be Ali or the actual anime character. Answer the visitor's question using the information below. Reply directly in one short sentence, without an introduction or list. For facts not listed, say you don't know.

Ali Hossain is a Full Stack MERN Developer. Ali's skills include React, JavaScript, HTML, CSS, Redux, Node.js, Express, MongoDB, PHP and Firebase. Ali's email is ${profile.email}.
${retrievePortfolioContext(messages)}`;
}
