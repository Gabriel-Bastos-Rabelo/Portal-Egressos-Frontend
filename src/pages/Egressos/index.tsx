import EgressoCard from '../../components/Cards/EgressoCard.tsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Egresso } from '../../values/egresso.tsx';
import Loading from '../../components/Loading/index.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import { useLocation } from 'react-router-dom';

function Egressos() {
  const location = useLocation();
  const [egressos, setEgressos] = useState<Egresso[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomeInput, setNomeInput] = useState('');
  const [cursoInput, setCursoInput] = useState('');
  const [anoInput, setAnoInput] = useState('');
  const [filters, setFilters] = useState({ nome: '', curso: '', ano: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const paginate = (data: Egresso[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const egressosFiltrados = egressos.filter((egresso) => {
    const nomeMatch = egresso.nomeEgresso.toLowerCase().includes(filters.nome.toLowerCase());
    const cursoMatch = filters.curso === '' || egresso.curso === filters.curso;
    const anoMatch = filters.ano === '' || egresso.anoConclusao?.toString() === filters.ano;
    return nomeMatch && cursoMatch && anoMatch;
  });

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/egresso/buscarAprovados')
      .then((response) => {
        setEgressos(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar egressos:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(egressosFiltrados.length / itemsPerPage));
  }, [egressosFiltrados]);

  const handleFiltrar = () => {
    setFilters({
      nome: nomeInput,
      curso: cursoInput,
      ano: anoInput,
    });
  };

  const handleLimpar = () => {
    setNomeInput('');
    setCursoInput('');
    setAnoInput('');
    setFilters({ nome: '', curso: '', ano: '' });
  };

  const paginatedEgressos = paginate(egressosFiltrados, page, itemsPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex min-h-screen w-screen justify-center my-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center">Conheça nossos egressos</h1>

        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-wrap gap-4 items-end justify-center mb-10">
              <div className="flex flex-col">
                <label htmlFor="nome" className="block text-sm font-bold text-gray-700 mb-1">
                  Nome do Egresso
                </label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Digite o nome do egresso"
                  value={nomeInput}
                  onChange={(e) => setNomeInput(e.target.value)}
                  className="w-64 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="curso" className="block text-sm font-bold text-gray-700 mb-1">
                  Curso
                </label>
                <select
                  id="curso"
                  value={cursoInput}
                  onChange={(e) => setCursoInput(e.target.value)}
                  className="w-52 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-no-repeat bg-right-2 bg-[length:20px]"
                >
                  <option value="" disabled>
                    Selecione o curso
                  </option>
                  <option value="Graduação">Graduação</option>
                  <option value="Mestrado">Mestrado</option>
                  <option value="Doutorado">Doutorado</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="ano" className="block text-sm font-bold text-gray-700 mb-1">
                  Ano de Conclusão
                </label>
                <select
                  id="ano"
                  value={anoInput}
                  onChange={(e) => setAnoInput(e.target.value)}
                  className="w-48 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-no-repeat bg-right-2 bg-[length:20px]"
                >
                  <option value="" disabled>
                    Selecione o ano
                  </option>
                  {Array.from({ length: 2026 - 2000 }, (_, i) => {
                    const year = 2000 + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
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
                  Limpar Filtro
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {paginatedEgressos.map((egresso) => (
                <EgressoCard key={egresso.id} egresso={egresso} />
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
}

export default Egressos;
