import OportunidadeCard from '../../components/Cards/OportunidadeCard.tsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/index.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import { Oportunidade } from '../../values/oportunidade.tsx';
import { useLocation } from 'react-router-dom';
import { OportunidadeMessage } from '../../components/Messages/EditMessage.tsx';
import BotaoEnviarOportunidade from '../../components/Buttons/EnviarOportunidadeButton.tsx';

function Oportunidades() {
  const location = useLocation();
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [tituloInput, setTituloInput] = useState('');
  const [dataInput, setDataInput] = useState('');
  const [tipoInput, setTipoInput] = useState('');
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
    axios.get('http://localhost:8080/api/oportunidade/aprovadas')
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

  const handleFiltrar = () => {
    setFilters({
      titulo: tituloInput,
      data: dataInput,
      tipo: tipoInput
    });
  };

  const handleLimpar = () => {
    setTituloInput('');
    setDataInput('');
    setTipoInput('');
    setFilters({ titulo: '', data: '', tipo: '' });
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <div className="flex min-h-screen w-screen justify-center my-12">
      <div className="flex flex-col items-center gap-8">
        {showMessage && <OportunidadeMessage />}

        <h1 className="text-3xl font-bold text-center">Oportunidades</h1>
        
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-wrap gap-4 items-end justify-center mb-10">
              {/* Filtros */}
              <div className="flex flex-col">
                <label htmlFor="titulo" className="block text-sm font-bold text-gray-700 mb-1">
                  Título
                </label>
                <input
                  id="titulo"
                  type="text"
                  placeholder="Digite o título da oportunidade"
                  value={tituloInput}
                  onChange={(e) => setTituloInput(e.target.value)}
                  className="w-64 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="data" className="block text-sm font-bold text-gray-700 mb-1">
                  A partir de
                </label>
                <input
                  id="data"
                  type="date"
                  value={dataInput}
                  onChange={(e) => setDataInput(e.target.value)}
                  className="w-48 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="tipo" className="block text-sm font-bold text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  id="tipo"
                  value={tipoInput}
                  onChange={(e) => setTipoInput(e.target.value)}
                  className="w-52 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="" disabled>Selecione o tipo</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Remoto">Remoto</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
             
              <div className="flex gap-2 h-12">
                <button
                  onClick={handleFiltrar}
                  className="h-12 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Filtrar
                </button>
                <button
                  onClick={handleLimpar}
                  className="h-12 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Limpar
                </button>
              </div>
            </div>

            {role === 'EGRESSO' && (
              <div className="w-full flex justify-end pr-8 mt-4 mb-8">
                <BotaoEnviarOportunidade />
              </div>
            )}

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {paginatedOportunidades.map((oportunidade) => (
                <OportunidadeCard 
                  key={oportunidade.id} 
                  oportunidade={oportunidade} 
                />
              ))}
            </div>
            
            {/* Paginação */}
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
}

export default Oportunidades;
