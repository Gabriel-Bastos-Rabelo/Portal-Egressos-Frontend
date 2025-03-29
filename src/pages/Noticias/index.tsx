import { useEffect, useState } from 'react';
import NoticiaCard from '../../components/Cards/NoticiaCard.tsx';
import axios from 'axios';
import Loading from '../../components/Loading/index.tsx';
import { Noticia } from '../../values/noticia.tsx';

function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    axios.get('http://localhost:8080/api/noticia/aprovadas')
      .then(response => {
        setNoticias(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar noticias:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen w-screen justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mt-12">Notícias</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col max-w-5xl mx-auto px-4 w-full">
            {noticias.map((noticia) => (
              <NoticiaCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
  
export default Noticias;