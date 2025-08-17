
import { useState } from 'react'
import Cookies from 'js-cookie'
import { API_URL } from '../lib/api'
export default function Mentor(){
  const token=Cookies.get('token'); const [msg,setMsg]=useState('Quero aprender Excel para relatórios'); const [resp,setResp]=useState(''); const [loading,setLoading]=useState(false);
  async function ask(){ setLoading(true); try{ const r=await fetch(`${API_URL}/mentor/ask`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({message:msg})}); const j=await r.json(); setResp(j.reply||''); }catch(e){ alert('Erro: '+e.message);} finally{ setLoading(false);} }
  if(!token) return <p className="card">Faça login.</p>;
  return (<div className="card">
    <h2 className="text-2xl font-bold mb-2">Mentor IA</h2>
    <div className="flex gap-2 flex-wrap">
      <input className="input flex-1 min-w-[220px]" value={msg} onChange={e=>setMsg(e.target.value)} />
      <button className="btn" onClick={ask} disabled={loading}>{loading?'Perguntando...':'Perguntar'}</button>
    </div>
    <pre className="mt-3 whitespace-pre-wrap text-slate-800">{resp}</pre>
    <p className="text-xs text-slate-500">Dica: defina OPENAI_API_KEY no backend para respostas avançadas.</p>
  </div>)
}
