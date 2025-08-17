
import { useState } from 'react'
import { API_URL } from '../lib/api'
export default function Subscribe(){
  const [email,setEmail]=useState('aluno@cap.ci'); const [loading,setLoading]=useState(false);
  async function goStripe(){ setLoading(true); try{ const r=await fetch(API_URL+'/payments/stripe/create-checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,mode:'subscription'})}); const j=await r.json(); if(!r.ok) throw new Error(j.error||'Erro'); window.location.href=j.url; }catch(e){ alert(e.message);} finally{ setLoading(false);} }
  async function goMP(){ setLoading(true); try{ const r=await fetch(API_URL+'/payments/mp/create',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})}); const j=await r.json(); if(!r.ok) throw new Error(j.error||'Erro'); window.location.href=j.init_point; }catch(e){ alert(e.message);} finally{ setLoading(false);} }
  return (<div className="card"><h2 className="text-2xl font-bold mb-2">Assinar Capacita</h2><p className="text-slate-600">Acesso a todos os cursos gerados por IA, mentor e certificados.</p>
    <label className="mt-3 block">Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
    <div className="flex gap-3 mt-3 flex-wrap"><button className="btn" onClick={goStripe} disabled={loading}>Pix/Cartão (Stripe)</button><button className="btn" onClick={goMP} disabled={loading}>Mercado Pago</button></div>
    <p className="text-xs text-slate-500 mt-2">Configure as chaves no backend para liberar o checkout.</p></div>)
}
