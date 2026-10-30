import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Ali Hossain — Full Stack Developer',description:'Ali Hossain’s portfolio: MERN stack development, selected projects, professional experience and education.',robots:{index:false,follow:false},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{document.documentElement.dataset.theme=localStorage.getItem('ali-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch{document.documentElement.dataset.theme='dark'}`}}/></head><body>{children}</body></html>}
