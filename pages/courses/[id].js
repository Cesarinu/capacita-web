
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { API_URL } from '../../lib/api'
export default function Course(){
  const router = useRouter(); const { id } = router.query; const token = Cookies.get('token'); const [data,setData]=useState(null);
  useEffect(()=>{ if(id&&token){ fetch(`${API_URL}/courses/${id}`,{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.json()).then(setData);} },[id,token]);
  if(!token) return <p className="card">Faça login.</p>;
  if(!data) return <p className="card">Carregando...</p>;
  const content = data.course.content ? JSON.parse(data.course.content) : {modules:[]};
  async function advance(){ const p=Math.min(100,(data?.progress||0)+10); await fetch(`${API_URL}/courses/${id}/progress`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({progress:p})}); const j=await (await fetch(`${API_URL}/courses/${id}`,{headers:{Authorization:`Bearer ${token}`}})).json(); setData(j); }
  async function mint(){ const j=await (await fetch(`${API_URL}/certificates/mint`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({courseId:id})})).json(); alert('Certificado (demo): '+j.txHash.slice(0,10)+'...'); }
  return (<div className="card"><h2>{data.course.title}</h2><p>{data.course.description}</p><p>Progresso: {data.progress}%</p><div style={{display:'flex',gap:8,flexWrap:'wrap'}}><button className="btn" onClick={advance}>+10% progresso</button><button className="btn" onClick={mint}>Emitir Certificado</button></div><hr/>{content.modules?.map((m,i)=>(<div key={i} className="card"><h3 style={{margin:'4px 0'}}>{m.title}</h3><p>{m.text}</p></div>))}</div>)
}
