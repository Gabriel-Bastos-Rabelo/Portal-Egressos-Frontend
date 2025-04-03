import axios from 'axios';
import { useState, useEffect } from "react";
import { Oportunidade } from '../../values/oportunidade.tsx';
import OportunidadeCard from '../../components/Cards/OportunidadeCard.tsx';
import OportunidadeFilter from '../../components/Filters/OportunidadeFilter.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import Loading from '../../components/Loading/index.tsx';
import { OportunidadeMessage } from '../../components/Messages/EditMessage.tsx';
import BotaoEnviarOportunidade from '../../components/Buttons/EnviarOportunidadeButton.tsx';

const Oportunidades = () => {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ titulo: '', data: '', tipo: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9; 
  const [showMessage, setShowMessage] = useState(false);

  const role = localStorage.getItem("role");

  useEffect(() => {
    // Exibe a mensagem se vier do cadastro de oportunidade
    const hasMessage = localStorage.getItem('showOportunidadeMessage');
    if (hasMessage === 'true') {
      setShowMessage(true);
      localStorage.removeItem('showOportunidadeMessage');
      setTimeout(() => setShowMessage(false), 4000);
    }
  }, []);

  const paginate = (data: Oportunidade[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    axios.get('http://44.205.22.49:8080/api/oportunidade/aprovadas')
      .then(response => {
        setOportunidades(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar oportunidades:', error);
        setLoading(false);
      });
  }, []);

  const handleFiltrar = (filters: { titulo: string; data: string; tipo: string }) => {
    setFilters(filters);
    setPage(1);
  };

  const handleLimpar = () => {
    setFilters({ titulo: '', data: '', tipo: '' });
    setPage(1);
  };

  const oportunidadesFiltradas = oportunidades.filter(oportunidade => {
    const tituloMatch = oportunidade.titulo.toLowerCase().includes(filters.titulo.toLowerCase());
    const tipoMatch = filters.tipo === '' || oportunidade.tipo === filters.tipo;
    const dataMatch = filters.data === '' || 
      new Date(oportunidade.dataExpiracao) > new Date(filters.data);

    return tituloMatch && tipoMatch && dataMatch;
  });

  useEffect(() => {
    setTotalPages(Math.ceil(oportunidadesFiltradas.length / itemsPerPage));
  }, [oportunidadesFiltradas]);

  const paginatedOportunidades = paginate(oportunidadesFiltradas, page, itemsPerPage);

  return (
    <div className="flex min-h-screen w-full justify-center my-12">
      <div className="flex flex-col items-center gap-8">
        {showMessage && <OportunidadeMessage />}

        <h1 className="text-3xl font-bold text-center">Oportunidades</h1>
        
        {loading ? (
          <Loading />
        ) : oportunidadesFiltradas.length === 0 ? (
          <>
            <OportunidadeFilter
              onFiltrar={handleFiltrar}
              onLimpar={handleLimpar}
            />
            <div className="text-center text-xl">Sem dados.</div>
          </>
        ) : (
          <>
            <OportunidadeFilter
              onFiltrar={handleFiltrar}
              onLimpar={handleLimpar}
            />

            {role === 'EGRESSO' && (
              <div className="w-full flex justify-end mb-8 max-[900px]:justify-center">
                <BotaoEnviarOportunidade />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {paginatedOportunidades.map((oportunidade) => (
                <OportunidadeCard 
                  key={oportunidade.id} 
                  oportunidade={oportunidade} 
                />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Oportunidades;
