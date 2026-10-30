import {portfolioGuide} from '../portfolio-guide';
import type {ChatMessage} from './config';
/** Route only known portfolio intents. Open-ended requests still reach the model. */
export function instantAnswer(messages:ChatMessage[]):string|null {
 const q=(messages.at(-1)?.content||'').trim().toLowerCase();
 if(/\b(joke|funny|laugh|pun|bored|roast me)\b/.test(q)){
  const jokes=['Why did the developer go broke? They used up all their cache. 😄','My code and I have a lot in common: we both work better after a break. ☕','Why do programmers prefer dark mode? Because light attracts bugs. 🐛'];
  return 'Kamado’s tiny comedy break: '+jokes[messages.filter(m=>m.role==='user').length%jokes.length];
 }
 if(/^(who are you|what is your name|your name)[?!.\s]*$/.test(q))return 'I’m Kamado — Ali’s portfolio companion. Ask about his work, chat about web development, or challenge me to make you smile.';

 if(/^(hi|hello|hey|salam|assalamu alaikum|thanks|thank you)[!.\s]*$/.test(q))return portfolioGuide(messages);
 if(/^(how are you|how are you doing)[?!.\s]*$/.test(q))return 'Hello! I’m ready to help you explore Ali’s work. What would you like to know?';
 const topic=/\b(skills?|projects?|portfolio|education|experience|github|repos?|repositories|cv|resume|contact|email|phone|whatsapp|hire|pricing|rates|availability|chess|game)\b/;
 // Do not intercept code requests or general explanations merely mentioning a technology.
 if(/\b(write|generate|debug|implement|tutorial|compare|explain|teach)\b/.test(q)&&!(/\bali\b/.test(q)||/\b(speed trump|tour express|medii care)\b/.test(q)))return null;
 const personal=/\b(ali|his|your)\b/.test(q);
 const direct=/^(skills?|projects?|portfolio|education|experience|github|repos?|cv|resume|contact|email|phone|whatsapp|pricing|chess|game)[?!.\s]*$/.test(q);
 if((topic.test(q)&&(personal||direct||/\b(contact|email|phone|whatsapp|github|cv|resume)\b/.test(q)))||/\b(speed trump|tour express|medii care|about ali|who is ali)\b/.test(q))return portfolioGuide(messages);
 if(/^(tell me more|more details|more)[?!.\s]*$/.test(q)){
  const previous=messages.slice(0,-1).reverse().find(m=>m.role==='assistant');
  if(previous?.notice==='Portfolio guide')return portfolioGuide(messages);
 }
 return null;
}
