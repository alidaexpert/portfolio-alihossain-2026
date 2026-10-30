import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
// Explicit static worker path avoids SSR rewriting import.meta.url to file://.
await build({
 entryPoints:[fileURLToPath(new URL('../app/ai/local-ai.worker.ts',import.meta.url))],
 outfile:fileURLToPath(new URL('../public/ai/local-ai.worker.js',import.meta.url)),
 bundle:true,format:'esm',platform:'browser',target:'es2022',minify:true,
 legalComments:'eof',
});

import {mkdir,copyFile} from 'node:fs/promises';
const runtime=new URL('../public/ai/runtime/',import.meta.url);await mkdir(runtime,{recursive:true});
for(const name of ['ort-wasm-simd-threaded.jsep.mjs','ort-wasm-simd-threaded.jsep.wasm']){
 await copyFile(new URL('../node_modules/@huggingface/transformers/dist/'+name,import.meta.url),new URL(name,runtime));
}
