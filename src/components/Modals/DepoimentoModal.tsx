import { Depoimento } from '../../values/depoimento.tsx';

type DepoimentoModalProps = {
  onClose: () => void;
  depoimento: Depoimento;
};
  
const DepoimentoModal = ({ onClose, depoimento }: DepoimentoModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] max-w-[90%] p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shadow-md hover:bg-gray-200 transition"
          onClick={onClose}
          aria-label="Fechar modal"
        >
                    &times;
        </button>

        <h2 className="flex justify-center mb-3">Depoimento</h2>
        <div className="flex flex-col gap-2 text-gray-600">
          <p>Nome: {depoimento.nomeEgresso}</p>
          <div>
            <p>Depoimento: </p>
            <p className="text-justify">{depoimento.descricao}</p>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default DepoimentoModal;
  