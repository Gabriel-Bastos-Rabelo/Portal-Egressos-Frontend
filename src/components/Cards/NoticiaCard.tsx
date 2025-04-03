import { useEffect, useState } from 'react';
import logoUfma from '../../assets/logoUfma.png';
import { Noticia } from '../../values/noticia.tsx'

const NoticiaCard = ({ noticia }: { noticia: Noticia }) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return width;
  }

  const width = useWindowWidth();
  
  return (
    <a 
      href={noticia.linkNoticia} 
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg shadow-xl flex items-center gap-4 py-5 px-10 my-5 mx-10 cursor-pointer hover:shadow-2xl transition-shadow duration-300 max-[900px]:flex-col"
    >
      <div className="flex flex-col">
        <h3 className="text-xl">{noticia.autor}</h3>
        <p className="text-gray-600">{noticia.data}</p>
        <p className="text-gray-600 text-justify">
          {truncateText(noticia.descricao, width > 900 ? 500 : 100)}
        </p>
      </div>
      <img 
        className="rounded-full max-[900px]:rounded w-32 h-32 flex-shrink-0 object-cover" 
        src={noticia.imagemUrl || logoUfma} 
        alt="Imagem da Notícia" 
      />
    </a>
  );
};

export default NoticiaCard;