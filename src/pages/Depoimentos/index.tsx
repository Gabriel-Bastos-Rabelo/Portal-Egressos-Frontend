import DepoimentoCard from '../../components/Cards/DepoimentoCard.tsx';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/index.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import { Depoimento } from '../../values/depoimento.tsx';

function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; 

  const paginate = (data: Depoimento[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
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

  const padinatedDepoimentos = paginate(depoimentos, page, itemsPerPage);

  return (
    <div className="flex min-h-screen w-screen justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mt-12">Depoimentos</h1>
        
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col max-w-5xl mx-auto px-4 w-full">
              {padinatedDepoimentos.map((depoimento) => (
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