
import { useState } from 'react'
import Cookies from 'js-cookie'
import { API_URL } from '../lib/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function Login({ setAuth }){
  const router = useRouter(); const [email,setEmail]=useState('demo@cap.ci'); const [password,setPassword]=useState('123456');
  async function onLogin(e){ e.preventDefault(); const r=await fetch(API_URL+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); const j=await r.json(); if(!r.ok) return alert(j.error||'Erro'); Cookies.set('token',j.token); Cookies.set('user',JSON.stringify(j.user)); setAuth({token:j.token,user:j.user}); router.push('/courses'); }
  return(<form onSubmit={onLogin} className="card" style={{maxWidth:420}}><h3>Entrar</h3><label>Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /><label>Senha</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><button className="btn">Entrar</button><p>Não tem conta? <Link href="/register">Cadastrar</Link></p></form>)
}
