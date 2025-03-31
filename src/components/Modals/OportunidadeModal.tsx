import { format } from 'date-fns';
import { Oportunidade } from '../../values/oportunidade.tsx';

type OportunidadeModalProps = {
    onClose: () => void;
    oportunidade: Oportunidade;
  };
  
const OportunidadeModal = ({ onClose, oportunidade }: OportunidadeModalProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] max-w-[90%] p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shadow-md hover:bg-gray-200 transition"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Fechar modal"
        >
            &times;
        </button>
  
        <h2 className="text-2xl font-bold text-center mb-3">{oportunidade.titulo}</h2>
  
        <div className="flex flex-col gap-4 text-gray-600">
          <div className="flex justify-between w-full gap-x-8">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-briefcase"></i>
              <p>Tipo: {oportunidade.tipo}</p>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-building-user"></i>
              <p>Local: {oportunidade.local}</p>
            </div>
          </div>
  
          <div className="flex justify-between w-full gap-x-8">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-clock"></i>
              <p>Data da Expiração: {formatDate(oportunidade.dataExpiracao)}</p>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-sack-dollar"></i>
              <p>Salário: {oportunidade.salario}</p>
            </div>
          </div>
        </div>
  
        <p className="text-gray-600 text-justify mt-6 mb-3">
          {oportunidade.descricao}
        </p>
  
        <p className="mt-2">
          <a
            href={oportunidade.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors"
          >
            {oportunidade.link}
          </a>
        </p>
      </div>
    </div>
  );
};
  
export default OportunidadeModal;
