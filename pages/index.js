
import Link from 'next/link'
export default function Home(){
  return (
    <div className="card">
      <h2 className="text-3xl font-bold mb-2">Aprenda com IA, do seu jeito</h2>
      <p className="text-slate-600">Cursos gerados por IA, mentor inteligente e certificados digitais.</p>
      <div className="mt-4 flex gap-3">
        <Link className="btn" href="/courses">Começar</Link>
        <Link className="btn" href="/subscribe">Assinar</Link>
      </div>
      <p className="text-slate-500 text-sm mt-2">Instale no celular: Adicionar à tela inicial (PWA).</p>
    </div>
  )
}
