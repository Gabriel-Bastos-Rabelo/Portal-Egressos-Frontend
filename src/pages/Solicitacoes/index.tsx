import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import DepoimentoSolicitacoes from './DepoimentoSolicitacoes';
import EgressoSolicitacoes from './EgressoSolicitacoes';
import OportunidadeSolicitacoes from './OportunidadeSolicitacoes';
import NoticiaSolicitacoes from './NoticiaSolicitacoes';

function Solicitacoes() {
  const [abaSelecionada, setAbaSelecionada] = useState('egresso');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="w-full min-h-screen mb-10">

      <div className="flex justify-around text-2xl my-8 max-[900px]:text-x1 max-[700px]:text-base">
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