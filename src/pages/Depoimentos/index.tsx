import axios from 'axios';
import { useState, useEffect } from 'react';
import { Depoimento } from '../../values/depoimento.tsx';
import DepoimentoCard from '../../components/Cards/DepoimentoCard.tsx';
import Loading from '../../components/Loading/index.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import DepoimentoFilter from '../../components/Filters/DepoimentoFilter.tsx';

function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ nome: '', curso: '', ano: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const paginate = (data: Depoimento[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handleFiltrar = (filters: { nome: string; curso: string; ano: string }) => {
    setFilters(filters);
  };

  const handleLimpar = () => {
    setFilters({ nome: '', curso: '', ano: '' });
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/depoimento/aprovados')
      .then(response => {
        const sortedDepoimentos = response.data.sort((a: Depoimento, b: Depoimento) =>
          a.nomeEgresso.localeCompare(b.nomeEgresso)
        );
        setDepoimentos(sortedDepoimentos);
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

  const paginatedDepoimentos = paginate(depoimentosFiltrados, page, itemsPerPage);

  useEffect(() => {
    setTotalPages(Math.ceil(depoimentosFiltrados.length / itemsPerPage));
  }, [depoimentosFiltrados]);

  return (
    <div className="flex min-h-screen w-full justify-center my-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center">Depoimentos</h1>

        {loading ? (
          <Loading />
        ): depoimentosFiltrados.length === 0 ? (
          <>
            <DepoimentoFilter
              onFiltrar={handleFiltrar}
              onLimpar={handleLimpar}
            />
            <div className="text-center text-xl">Sem dados.</div>
          </>
        ): (
          <>
            <DepoimentoFilter onFiltrar={handleFiltrar} onLimpar={handleLimpar} />

            <div className="flex flex-col max-w-5xl mx-auto px-4 w-full">
              {paginatedDepoimentos.map((depoimento) => (
                <DepoimentoCard key={depoimento.id} depoimento={depoimento} />
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

export default Depoimentos;