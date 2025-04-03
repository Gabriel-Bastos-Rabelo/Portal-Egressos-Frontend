// Egressos.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Egresso } from '../../values/egresso.tsx';
import Loading from '../../components/Loading/index.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import EgressoFilter from '../../components/Filters/EgressoFilter.tsx';
import EgressoCard from '../../components/Cards/EgressoCard.tsx';

function Egressos() {
  const [egressos, setEgressos] = useState<Egresso[]>([]);
  const [loading, setLoading] = useState(true);
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
      .get('http://44.205.22.49:8080/api/egresso/buscarAprovados')
      .then((response) => {
        const sortedEgressos = response.data.sort((a: Egresso, b: Egresso) =>
          a.nomeEgresso.localeCompare(b.nomeEgresso)
        );
        setEgressos(sortedEgressos);
        setTotalPages(Math.ceil(sortedEgressos.length / itemsPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar egressos:', error);
        setLoading(false);
      });
  }, []);

  const handleFiltrar = (filters: { nome: string; curso: string; ano: string }) => {
    setFilters(filters);
    setPage(1);
  };

  const handleLimpar = () => {
    setFilters({ nome: '', curso: '', ano: '' });
    setPage(1);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(egressosFiltrados.length / itemsPerPage));
  }, [egressosFiltrados]);

  const paginatedEgressos = paginate(egressosFiltrados, page, itemsPerPage);

  return (
    <div className="flex min-h-screen w-full justify-center my-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center">Conheça nossos egressos</h1>

        {loading ? (
          <Loading />
        ) : egressosFiltrados.length === 0 ? (
          <>
            <EgressoFilter
              onFiltrar={handleFiltrar}
              onLimpar={handleLimpar}
            />
            <div className="text-center text-xl">Sem dados.</div>
          </>
        ) : (
          <>
            <EgressoFilter
              onFiltrar={handleFiltrar}
              onLimpar={handleLimpar}
            />

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
