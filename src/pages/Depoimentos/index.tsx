import DepoimentoCard from '../../components/Cards/DepoimentoCard.tsx';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/index.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import { Depoimento } from '../../values/depoimento.tsx';

function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomeInput, setNomeInput] = useState('');
  const [cursoInput, setCursoInput] = useState('');
  const [anoInput, setAnoInput] = useState('');
  const [filters, setFilters] = useState({ nome: '', curso: '', ano: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; 

  const paginate = (data: Depoimento[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }
    
  const handleFiltrar = () => {
    console.log(anoInput)
    setFilters({
      nome: nomeInput,
      curso: cursoInput,
      ano: anoInput
    });
  };

  const handleLimpar = () => {
    setNomeInput('');
    setCursoInput('');
    setAnoInput('');
    setFilters({ nome: '', curso: '', ano: '' });
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/depoimento/aprovados')
      .then(response => {
        setDepoimentos(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar depoimentos:', error);
        setLoading(false);
      });
  }, []);
  
  const depoimentosFiltrados = depoimentos.filter(depoimento => {
    const nomeMatch = depoimento.nomeEgresso.toLowerCase().includes(filters.nome.toLowerCase());
    const cursoMatch = filters.curso === '' || depoimento.curso === filters.curso;
    const anoMatch = filters.ano === '' || depoimento.anoConclusao?.toString() === filters.ano;
    return nomeMatch && cursoMatch && anoMatch;
  });
  
  useEffect(() => {
    setTotalPages(Math.ceil(depoimentosFiltrados.length / itemsPerPage));
  }, [depoimentosFiltrados]);
  
  const padinatedDepoimentos = paginate(depoimentosFiltrados, page, itemsPerPage);

  return (
    <div className="flex min-h-screen w-screen justify-center my-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center">Depoimentos</h1>
        
        {loading ? (
          <Loading />
        ) : (
          <>
            
            <div>
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
                    <option value="" disabled>Selecione o curso</option>
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
                    <option value="" disabled>Selecione o ano</option>
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
              <div className="flex flex-col max-w-5xl mx-auto px-4 w-full">
                {padinatedDepoimentos.map((depoimento) => (
                  <DepoimentoCard key={depoimento.id} depoimento={depoimento} />
                ))}
              </div>
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
  
export default Depoimentos;