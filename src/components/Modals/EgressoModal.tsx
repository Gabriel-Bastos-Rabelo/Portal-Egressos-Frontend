import { Egresso } from '../../values/egresso.tsx';
import egressoImg from '../../assets/egresso-img.png';

type EgressoModalProps = {
  onClose: () => void;
  egresso: Egresso;
};
  
const EgressoModal = ({ onClose, egresso }: EgressoModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] max-w-[90%] p-8 relative">
        {/* Botão de fechar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shadow-md hover:bg-gray-200 transition"
          onClick={onClose}
          aria-label="Fechar modal"
        >
                    &times;
        </button>

        {/* Conteúdo do egresso */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <img
              src={egresso.foto ? `http://localhost:8080/uploads/${egresso.foto}` : egressoImg}
              alt="Foto do egresso"
              className="w-40 h-40 rounded object-cover shadow"
            />

            <div className="flex flex-col items-center">
              <div className="flex flex-col items-start">
                <div className="flex flex-col items-start">
                  <h2 className="text-xl">{egresso.nomeEgresso}</h2>
                  <p className="text-gray-600">{egresso.cargo}</p>
                  <p className="text-gray-500">{egresso.curso}</p>
                </div>
              </div>
              {/* Redes Sociais */}
              <div className="flex gap-4 mt-4">
                <a href={egresso.linkedin} target="_blank" rel="noopener noreferrer">
                  <div className="bg-white rounded-full shadow-lg p-2 cursor-pointer">
                    <i className="fa-brands fa-linkedin-in text-2xl text-[#000000]"></i>
                  </div>
                </a>
                <a href={egresso.instagram} target="_blank" rel="noopener noreferrer">
                  <div className="bg-white rounded-full shadow-lg p-2 cursor-pointer">
                    <i className="fa-brands fa-instagram text-2xl text-[#000000]"></i>
                  </div>
                </a>
                <a href={`mailto:${egresso.emailUsuario}`} className="cursor-pointer">
                  <div className="bg-white rounded-full shadow-lg p-2 cursor-pointer">
                    <i className="fa-regular fa-envelope text-2xl text-[#000000]"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <p className="text-gray-700 text-justify mt-4">{egresso.descricao}</p>
        </div>
      </div>
    </div>
  );
};

export default EgressoModal;
  