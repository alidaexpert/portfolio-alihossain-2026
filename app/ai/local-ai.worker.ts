import {pipeline,env,TextStreamer,InterruptableStoppingCriteria,type TextGenerationPipeline} from '@huggingface/transformers';
import {buildLocalPrompt} from './context';
import type {ChatMessage} from './config';
// Single-thread WASM works without WebGPU, SharedArrayBuffer or cross-origin isolation.
env.allowLocalModels=false;
env.backends.onnx.wasm!.numThreads=1;
env.backends.onnx.wasm!.proxy=false;
env.backends.onnx.wasm!.wasmPaths=new URL('/ai/runtime/',self.location.href).href;
let generator:TextGenerationPipeline|null=null;
let generating=false;
const stop=new InterruptableStoppingCriteria();
self.onmessage=async(event:MessageEvent)=>{
 const {type,id,messages}=event.data;
 if(type==='stop'){stop.interrupt();return;}
 try{
  if(type==='load'){
   const createPipeline=pipeline as unknown as (task:string,model:string,options:Record<string,unknown>)=>Promise<TextGenerationPipeline>;
   generator=await createPipeline('text-generation','onnx-community/SmolLM2-360M-Instruct-ONNX',{
    device:'wasm',dtype:'q4',progress_callback:(p:{status:string;progress:number})=>{if(p.status==='progress')self.postMessage({type:'progress',progress:p.progress/100});},
   }) as TextGenerationPipeline;
   self.postMessage({type:'ready'});
  }else if(type==='generate'&&generator&&!generating){
   generating=true;stop.reset();
   const history=(messages as ChatMessage[]).slice(-2).map(m=>({role:m.role,content:m.content.slice(0,240)}));
   let reply='';
   const streamer=new TextStreamer(generator.tokenizer,{skip_prompt:true,skip_special_tokens:true,callback_function:text=>{reply+=text;self.postMessage({type:'token',id,text});}});
   const options={max_new_tokens:64,do_sample:false,repetition_penalty:1.1,streamer,stopping_criteria:[stop]};
   const last=history[history.length-1];
   last.content=`${buildLocalPrompt(messages)}\n\nVisitor question: ${last.content}\nAnswer:`;
   await generator(history,options);
   // If the token budget ends mid-sentence, keep the completed part of the reply.
   const endings=[...reply.matchAll(/[a-z][.!?](?=\s|$)/gi)];
   const end=endings.at(-1);
   const text=!stop.interrupted&&end&&reply.slice(end.index!+2).trim()?reply.slice(0,end.index!+2):reply;
   self.postMessage({type:'done',id,stopped:stop.interrupted,text});
  }
 }catch(error){
  console.error('Local assistant failed:',error);
  self.postMessage({type:'error',id,stage:type});
 }finally{if(type==='generate')generating=false;}
};
