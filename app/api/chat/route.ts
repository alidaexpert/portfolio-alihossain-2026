import {portfolioGuide} from '../../portfolio-guide';
import {z} from 'zod';
const schema=z.object({messages:z.array(z.object({role:z.enum(['user','assistant']),content:z.string().min(1).max(3000)})).min(1).max(20)});
/** Compatibility route only. No provider, API key lookup or paid inference path exists. */
export async function POST(request:Request){
 try{
  if(Number(request.headers.get('content-length'))>24000)return new Response('Request too large',{status:413});
  const raw=await request.text();if(new TextEncoder().encode(raw).byteLength>24000)return new Response('Request too large',{status:413});
  const {messages}=schema.parse(JSON.parse(raw));
  return Response.json({message:portfolioGuide(messages),mode:'guide',notice:'Free portfolio guide · prepared answer. Enable local AI in the browser for generated replies.'});
 }catch{return Response.json({message:'Please send a short portfolio question.'},{status:400});}
}
