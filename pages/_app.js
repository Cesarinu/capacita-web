
import '../styles/globals.css'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function MyApp({ Component, pageProps }){
  const router = useRouter();
  const [auth,setAuth] = useState({token:null,user:null});
  useEffect(()=>{
    const token = Cookies.get('token') || null;
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    setAuth({ token, user });
  },[]);
  function logout(){ Cookies.remove('token'); Cookies.remove('user'); setAuth({token:null,user:null}); router.push('/login'); }
  return (
    <>
      <header className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/"><h1 className="text-2xl font-bold">Capacita</h1></Link>
          <nav className="nav">
            <Link href="/courses">Cursos</Link>
            <Link href="/mentor">Mentor IA</Link>
            <Link href="/subscribe">Assinar</Link>
            {auth.token ? <a onClick={logout} className="cursor-pointer">Sair</a> : <Link href="/login">Entrar</Link>}
          </nav>
        </div>
      </header>
      <main className="container pb-10">
        <Component {...pageProps} auth={auth} setAuth={setAuth} />
      </main>
      <link rel="manifest" href="/manifest.json" />
    </>
  )
}
