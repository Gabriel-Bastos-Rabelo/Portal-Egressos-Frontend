import { useState } from "react";
import DepoimentoSolicitacoes from './DepoimentoSolicitacoes';
import EgressoSolicitacoes from './EgressoSolicitacoes';
import OportunidadeSolicitacoes from './OportunidadeSolicitacoes';
import NoticiaSolicitacoes from './NoticiaSolicitacoes';

function Solicitacoes() {
  const [abaSelecionada, setAbaSelecionada] = useState('egresso');

  return (
    <div className="w-full min-h-screen mb-10">

      <div className="flex justify-around text-2xl my-8">
        <h2 className={`cursor-pointer ${abaSelecionada === 'egresso' ? 'text-[#174a9d] border-b-2 border-[#174a9d]' : ''}`}
          onClick={() => setAbaSelecionada('egresso')}>
            Egressos
        </h2>
        <h2 className={`cursor-pointer ${abaSelecionada === 'depoimento' ? 'text-[#174a9d] border-b-2 border-[#174a9d]' : ''}`}
          onClick={() => setAbaSelecionada('depoimento')}>
            Depoimentos
        </h2>
        <h2 className={`cursor-pointer ${abaSelecionada === 'oportunidade' ? 'text-[#174a9d] border-b-2 border-[#174a9d]' : ''}`}
          onClick={() => setAbaSelecionada('oportunidade')}>
            Oportunidades
        </h2>
        <h2 className={`cursor-pointer ${abaSelecionada === 'noticia' ? 'text-[#174a9d] border-b-2 border-[#174a9d]' : ''}`}
          onClick={() => setAbaSelecionada('noticia')}>
            Notícias
        </h2>
      </div>

      {abaSelecionada === 'egresso' ? <EgressoSolicitacoes /> : <></>}
      {abaSelecionada === 'depoimento' ? <DepoimentoSolicitacoes /> : <></>}
      {abaSelecionada === 'oportunidade' ? <OportunidadeSolicitacoes /> : <></>}
      {abaSelecionada === 'noticia' ? <NoticiaSolicitacoes /> : <></>}
      
    </div>
  );
}

export default Solicitacoes;