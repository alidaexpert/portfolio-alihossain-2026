'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {OrbitControls,ContactShadows} from '@react-three/drei';
import {useRef} from 'react';
import * as THREE from 'three';
function Part({p,s,c,r=[0,0,0],type='sphere'}:{p:number[];s:number[];c:string;r?:number[];type?:string}){return <mesh position={p as [number,number,number]} scale={s as [number,number,number]} rotation={r as [number,number,number]} castShadow>{type==='box'?<boxGeometry/>:type==='cone'?<coneGeometry args={[1,2,7]}/>:<sphereGeometry args={[1,32,24]}/>}<meshStandardMaterial color={c} roughness={.55}/></mesh>}
function Explorer({motion}:{motion:boolean}){const group=useRef<THREE.Group>(null);const head=useRef<THREE.Group>(null);useFrame(({clock,pointer})=>{if(!group.current||!head.current)return; if(motion){group.current.position.y=Math.sin(clock.elapsedTime*1.5)*.045-Math.min(window.scrollY/1800,.3);head.current.rotation.y=THREE.MathUtils.lerp(head.current.rotation.y,pointer.x*.25,.04);group.current.rotation.y=THREE.MathUtils.lerp(group.current.rotation.y,-.22+pointer.x*.15,.03);}});return <group ref={group} rotation={[0,-.22,0]}>
<Part p={[-.25,-.67,0]} s={[.19,.46,.22]} c="#242c2c"/><Part p={[.25,-.67,0]} s={[.19,.46,.22]} c="#242c2c"/>
<Part p={[-.25,-1.06,.1]} s={[.23,.15,.35]} c="#282322"/><Part p={[.25,-1.06,.1]} s={[.23,.15,.35]} c="#282322"/>
<Part p={[0,.05,0]} s={[.52,.68,.29]} c="#244f49"/><Part p={[0,-.18,.02]} s={[.64,.38,.35]} c="#295a50" type="cone"/>
<Part p={[0,.04,.3]} s={[.13,.6,.045]} c="#d88b55" type="box" r={[0,0,-.12]}/><Part p={[0,-.3,.04]} s={[.55,.065,.33]} c="#362b25"/><Part p={[0,-.3,.37]} s={[.09,.075,.04]} c="#cfa575" type="box"/>
<Part p={[-.59,.12,0]} s={[.19,.43,.24]} c="#2d5d53" r={[0,0,-.17]}/><Part p={[.59,.12,0]} s={[.19,.43,.24]} c="#2d5d53" r={[0,0,.17]}/>
<Part p={[-.67,-.26,.02]} s={[.13,.15,.14]} c="#dab28b"/><Part p={[.67,-.26,.02]} s={[.13,.15,.14]} c="#dab28b"/>
<group ref={head} position={[0,.93,0]}><Part p={[0,0,0]} s={[.53,.57,.44]} c="#e2bd97"/><Part p={[-.51,0,0]} s={[.09,.15,.1]} c="#d3a580"/><Part p={[.51,0,0]} s={[.09,.15,.1]} c="#d3a580"/>
<Part p={[0,.24,-.09]} s={[.56,.45,.45]} c="#252329"/>
{[-.38,-.18,.05,.28,.43].map((x,i)=><Part key={x} p={[x,.27,.31]} s={[.17,.25+(i%2)*.07,.15]} r={[0,0,Math.PI+.2-x]} c="#252329" type="cone"/>)}
{[-.22,.22].map(x=><group key={x}><Part p={[x,-.035,.407]} s={[.11,.145,.04]} c="#fff5df"/><Part p={[x,-.045,.443]} s={[.062,.105,.018]} c="#75513b"/><Part p={[x,-.045,.46]} s={[.031,.074,.01]} c="#191d20"/><Part p={[x-.02,-.012,.474]} s={[.019,.027,.008]} c="#ffffff"/><Part p={[x,.135,.42]} s={[.13,.025,.02]} r={[0,0,x>0?.12:-.12]} c="#302824"/></group>)}
<Part p={[0,-.12,.435]} s={[.045,.052,.06]} c="#d0a47d"/><Part p={[0,-.29,.385]} s={[.09,.015,.02]} c="#976b52"/></group>
<Part p={[0,.49,.03]} s={[.45,.15,.34]} c="#cb734a"/>
<Part p={[-.44,.27,-.12]} s={[.13,.48,.09]} r={[.12,0,-.35]} c="#b45c3c" type="box"/>
<group position={[.61,-.02,-.18]} rotation={[0,0,-.35]}><Part p={[0,-.32,0]} s={[.065,.7,.055]} c="#433832" type="box"/><Part p={[0,.4,0]} s={[.065,.19,.06]} c="#9e6748" type="box"/><Part p={[0,.21,0]} s={[.19,.04,.09]} c="#bd9c62" type="box"/></group>
</group>}
export default function Scene({motion,dark}:{motion:boolean;dark:boolean}){return <Canvas shadows dpr={[1,1.5]} camera={{position:[0,1,6.5],fov:35}} frameloop={motion?'always':'demand'}><ambientLight intensity={dark?1.7:2}/><directionalLight position={[3,5,4]} intensity={3.5} castShadow/><directionalLight position={[-3,2,-2]} color="#dba276" intensity={3}/><Explorer motion={motion}/><mesh position={[0,-1.25,0]}><cylinderGeometry args={[1.35,1.5,.18,64]}/><meshStandardMaterial color={dark?'#353633':'#c9c4b8'} roughness={.8}/></mesh><ContactShadows position={[0,-1.36,0]} opacity={.5} scale={8} blur={2.5} far={4}/><OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.8} minAzimuthAngle={-.8} maxAzimuthAngle={.8}/></Canvas>}
