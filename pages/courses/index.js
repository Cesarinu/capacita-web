
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { API_URL } from '../../lib/api'
import Link from 'next/link'
export default function Courses(){
  const token = Cookies.get('token'); const [q,setQ]=useState(''); const [list,setList]=useState([]);
  async function load(){ const r=await fetch(`${API_URL}/courses?q=${encodeURIComponent(q)}`,{headers:{Authorization:`Bearer ${token}`}}); setList(await r.json()); }
  useEffect(()=>{ if(token) load(); },[q,token]);
  if(!token) return <p className="card">Faça login.</p>;
  return (<div className="card"><div style={{display:'flex',gap:8,flexWrap:'wrap'}}><input className="input" placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
    <button className="btn" onClick={()=>load()}>Buscar</button>
    <button className="btn" onClick={async()=>{ const topic=prompt('Tema do curso por IA'); if(!topic) return; const r=await fetch(`${API_URL}/courses/generate`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({topic})}); const j=await r.json(); alert('Curso criado: '+j.id); load(); }}>Gerar por IA</button></div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12}}>
      {list.map(c=>(<div key={c.id} className="card"><h3 style={{margin:'6px 0'}}>{c.title}</h3><p>{c.description}</p><p style={{opacity:.7,fontSize:12}}>Nível: {c.level} • {c.duration}h</p><Link className="btn" href={`/courses/${c.id}`}>Acessar</Link></div>))}
    </div></div>)
}
