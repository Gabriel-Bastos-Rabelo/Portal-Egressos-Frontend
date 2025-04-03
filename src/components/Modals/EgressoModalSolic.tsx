import { Egresso } from '../../values/egresso.tsx';
import egressoImg from '../../assets/user.png';

type EgressoModalProps = {
  onClose: () => void;
  egresso: Egresso;
};
  
const EgressoModalSolic = ({ onClose, egresso }: EgressoModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[700px] max-w-[90%] p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shadow-md hover:bg-gray-200 transition"
          onClick={onClose}
          aria-label="Fechar modal"
        >
                    &times;
        </button>

        <h2 className="flex justify-center mb-3">Egresso</h2>
        <div className="flex items-center justify-between gap-2 mr-5 text-gray-600">
          <div className="flex flex-col gap-1">
            <p>Nome: {egresso.nomeEgresso}</p>
            <p>Descrição: {egresso.descricao}</p>
            <p>Currículo Lattes: {egresso.curriculo}</p>
            <p>Linkedin: {egresso.linkedin}</p>
            <p>Instagram: {egresso.instagram}</p>
            <p>Email: {egresso.emailUsuario}</p>
          </div>
          <div className="flex justify-center items-center min-w-[30%]">
            <img
              src={egresso.foto ? `http://44.205.22.49:8080/uploads/${egresso.foto}` : egressoImg}
              alt="Foto do egresso"
              className="w-40 h-40 rounded object-cover shadow"
            />
          </div>
        </div>  
      </div>
    </div>
  );
};

export default EgressoModalSolic;
  