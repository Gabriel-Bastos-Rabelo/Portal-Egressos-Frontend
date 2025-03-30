import OportunidadeCard from '../../components/Cards/OportunidadeCard.tsx';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/index.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import { Oportunidade } from '../../values/oportunidade.tsx';

function Oportunidades() {
  const [oportunidades, setOportunidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9; 

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

  const paginatedOportunidades = paginate(oportunidades, page, itemsPerPage);

  return (
    <div className="flex min-h-screen w-screen justify-center my-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center mb-6">Oportunidades</h1>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {paginatedOportunidades.map((oportunidade) => (
                <OportunidadeCard key={oportunidade.id} oportunidade={oportunidade} />
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
  
export default Oportunidades;