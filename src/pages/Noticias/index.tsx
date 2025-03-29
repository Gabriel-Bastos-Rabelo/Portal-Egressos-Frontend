import { useEffect, useState } from 'react';
import NoticiaCard from '../../components/Cards/NoticiaCard.tsx';
import axios from 'axios';

function Noticia() {
  const [noticias, setNoticias] = useState([]);
    
  useEffect(() => {
    axios.get('http://localhost:8080/api/noticia/aprovadas')
      .then(response => {
        setNoticias(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar noticias:', error);
      });
  }, []);

  return (
    <div className="flex min-h-screen w-screen justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mt-12">Notícias</h1>
        <div className="flex flex-col max-w-5xl mx-auto px-4 w-full">
          {noticias.map((noticia) => (
            <NoticiaCard key={noticia.id} noticia={noticia} />
          ))}
        </div>
      </div>
    </div>
  );
}
  
export default Noticia;