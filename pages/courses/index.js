
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { API_URL } from '../../lib/api'
import Link from 'next/link'
export default function Courses(){
  const token = Cookies.get('token'); const [q,setQ]=useState(''); const [list,setList]=useState([]); const [loading,setLoading]=useState(true);
  async function load(){ setLoading(true); const r=await fetch(`${API_URL}/courses?q=${encodeURIComponent(q)}`,{headers:{Authorization:`Bearer ${token}`}}); const data = await r.json(); setList(data); setLoading(false); }
  useEffect(()=>{ if(token) load(); },[q,token]);
  if(!token) return <p className="card">Faça login.</p>;
  return (<div className="space-y-3">
    <div className="card"><div className="flex flex-wrap gap-3 items-center">
      <input className="input flex-1 min-w-[220px]" placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
      <button className="btn" onClick={()=>load()}>Buscar</button>
      <button className="btn" onClick={async()=>{ const topic=prompt('Tema do curso por IA'); if(!topic) return;
        const r=await fetch(`${API_URL}/courses/generate`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({topic})});
        const j=await r.json(); if(!r.ok) return alert(j.error||'Erro');
        alert('Curso criado: '+j.id); load(); }}>Gerar por IA</button>
    </div></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading? <div className="card">Carregando...</div> : list.map(c=>(
        <div key={c.id} className="card">
          <h3 className="text-lg font-semibold mb-1">{c.title}</h3>
          <p className="text-slate-600">{c.description}</p>
          <p className="text-xs text-slate-500 mt-1">Nível: {c.level} • {c.duration}h</p>
          <Link className="btn mt-3" href={`/courses/${c.id}`}>Acessar</Link>
        </div>
      ))}
    </div>
  </div>)
}
