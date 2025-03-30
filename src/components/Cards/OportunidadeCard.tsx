import { useState } from 'react';
import OportunidadeModal from '../../components/Modals/OportunidadeModal.tsx';
import { Oportunidade } from '../../values/oportunidade.tsx'

const OportunidadeCard = ({ oportunidade }: { oportunidade: Oportunidade }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-[350px] h-[200px] bg-white rounded-lg shadow-xl flex flex-col justify-around px-4 gap-4 cursor-pointer hover:shadow-2xl transition-shadow duration-300" onClick={openModal}>
      <div>
        <h3 className="text-xl">{oportunidade.titulo}</h3>
        <p className="">{oportunidade.tipo}</p>
        <p className="text-gray-600">{oportunidade.descricao}</p>
      </div>
      <div className="flex items-center gap-4 text-gray-600 justify-between">
        <div className="flex items-center gap-1">
          <i className="fa-solid fa-location-dot"></i>
          <p>Local</p>
        </div>
        <div className="flex items-center gap-1 ">
          <i className="fa-solid fa-clock"></i>
          <p>{oportunidade.dataExpiracao}</p>
        </div>
      </div>

      {isModalOpen && <OportunidadeModal onClose={closeModal} oportunidade={oportunidade}/>}
    </div>
  );
};

export default OportunidadeCard;