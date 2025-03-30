import { Noticia } from '../../values/noticia.tsx';
import logoUfma from '../../assets/logoUfma.png';

type NoticiaModalProps = {
  onClose: () => void;
  noticia: Noticia;
};
  
const NoticiaModal = ({ onClose, noticia }: NoticiaModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[700px] min-w-[60%] p-8 relative">
        {/* Botão de fechar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shadow-md hover:bg-gray-200 transition"
          onClick={onClose}
          aria-label="Fechar modal"
        >
                    &times;
        </button>

        {/* Conteúdo da notícia */}
        <h2 className="flex justify-center mb-3">{noticia.autor}</h2>
        <div className="flex gap-5 text-gray-600">
          <div className="flex flex-col gap-1">
            <p>{noticia.data}</p>
            <p>{noticia.linkNoticia}</p>
            <div>
              <p>Descrição da notícia: </p>
              <p className="text-justify">{noticia.descricao}</p>
            </div>
          </div>
          <div className="flex justify-center items-center min-w-[20%]">
            <img src={noticia.imagemUrl || logoUfma} alt="Foto do egresso" />
          </div>
        </div>  
      </div>
    </div>
  );
};

export default NoticiaModal;
  