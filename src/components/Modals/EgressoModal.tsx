import egressoImg from '../../assets/egresso-img.png';

type EgressoModalProps = {
    onClose: () => void;
  };
  
const EgressoModal = ({ onClose }: EgressoModalProps) => {
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
              src={egressoImg} // Imagem exemplo
              alt="Foto do Egresso"
              className="w-40 h-40 rounded object-cover shadow"
            />
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-start">
                <h2 className="text-xl">Nome do egresso</h2>
                <p className="text-gray-600">Cargo</p>
                <p className="text-gray-500">Curso</p>
              </div>
              {/* Redes Sociais */}
              <div className="flex gap-4 mt-4">
                <div className="bg-white rounded-full shadow-lg p-2 cursor-pointer">
                  <i className="fa-brands fa-linkedin-in text-2xl text-[#000000]"></i>
                </div>
                <div className="bg-white rounded-full shadow-lg p-2 cursor-pointer">
                  <i className="fa-brands fa-instagram text-2xl text-[#000000]"></i>
                </div>
                <div className="bg-white rounded-full shadow-lg p-2 cursor-pointer">
                  <i className="fa-regular fa-envelope text-2xl text-[#000000]"></i>
                </div>
              </div>
            </div>
          </div>
          {/* Descrição */}
          <p className="text-gray-700 text-justify mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, facilisis vel luctus sed, venenatis sed quam. Phasellus ut hendrerit diam. Aliquam egestas mauris ac arcu accumsan scelerisque.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EgressoModal;
  