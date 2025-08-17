
import Link from 'next/link'
export default function Home(){
  return(<div className="card"><h2>Capacita Web (PWA)</h2><p>Aprenda com cursos gerados por IA, mentor e certificados.</p>
    <div><Link className="btn" href="/courses">Começar agora</Link></div>
    <p style={{opacity:.7}}>Dica: instale como app via "Adicionar à tela inicial".</p></div>)
}
