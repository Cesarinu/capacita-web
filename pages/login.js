
import { useState } from 'react'
import Cookies from 'js-cookie'
import { API_URL } from '../lib/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function Login({ setAuth }){
  const router = useRouter(); const [email,setEmail]=useState('demo@cap.ci'); const [password,setPassword]=useState('123456'); const [loading,setLoading]=useState(false);
  async function onLogin(e){ e.preventDefault(); setLoading(true); try{ const r=await fetch(API_URL+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); const j=await r.json(); if(!r.ok) throw new Error(j.error||'Erro'); Cookies.set('token',j.token); Cookies.set('user',JSON.stringify(j.user)); setAuth({token:j.token,user:j.user}); router.push('/courses'); }catch(e){ alert(e.message);} finally{ setLoading(false); } }
  return(<form onSubmit={onLogin} className="card max-w-md"><h3 className="text-xl font-semibold mb-2">Entrar</h3><label>Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /><label>Senha</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><button className="btn mt-3" disabled={loading}>{loading?'Entrando...':'Entrar'}</button><p className="text-slate-600 mt-2">Não tem conta? <Link href="/register" className="text-brand">Cadastrar</Link></p></form>)
}
