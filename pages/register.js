
import { useState } from 'react'
import { API_URL } from '../lib/api'
import { useRouter } from 'next/router'
export default function Register(){
  const router=useRouter(); const [name,setName]=useState('Novo Usuário'); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [loading,setLoading]=useState(false);
  async function onRegister(e){ e.preventDefault(); setLoading(true); try{ const r=await fetch(API_URL+'/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password})}); const j=await r.json(); if(!r.ok) throw new Error(j.error||'Erro'); alert('Conta criada! Faça login.'); router.push('/login'); }catch(e){ alert(e.message);} finally{ setLoading(false);} }
  return(<form onSubmit={onRegister} className="card max-w-md"><h3 className="text-xl font-semibold mb-2">Criar conta</h3><label>Nome</label><input className="input" value={name} onChange={e=>setName(e.target.value)} /><label>Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /><label>Senha</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><button className="btn mt-3" disabled={loading}>Cadastrar</button></form>)
}
