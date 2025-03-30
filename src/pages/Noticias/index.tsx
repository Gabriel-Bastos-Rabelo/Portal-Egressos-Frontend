import { useEffect, useState } from 'react';
import NoticiaCard from '../../components/Cards/NoticiaCard.tsx';
import axios from 'axios';
import Loading from '../../components/Loading/index.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import { Noticia } from '../../values/noticia.tsx';

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; 

  const paginate = (data: Noticia[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/noticia/aprovadas')
      .then(response => {
        setNoticias(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar noticias:', error);
        setLoading(false);
      });
  }, []);

  const paginatedNoticias = paginate(noticias, page, itemsPerPage);

  return (
    <div className="flex min-h-screen w-screen justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mt-12">Notícias</h1>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col max-w-5xl mx-auto px-4 w-full">
              {paginatedNoticias.map((noticia) => (
                <NoticiaCard key={noticia.id} noticia={noticia} />
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
  
export default Noticias;