import { useState } from 'react';
import OportunidadeModal from '../../components/Modals/OportunidadeModal.tsx';

const OportunidadeCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-[350px] h-[200px] bg-white rounded-lg shadow-xl flex flex-col px-4 gap-4 cursor-pointer" onClick={openModal}>
      <div>
        <h3 className="text-xl">Titulo da Oportunidade</h3>
        <p className="">Tipo</p>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, facilisis vel luctus sed, venenatis sed quam. Phasellus ut hendrerit diam...</p>
      </div>
      <div className="flex items-center gap-4 text-gray-600 justify-between">
        <div className="flex items-center gap-1">
          <i className="fa-solid fa-location-dot"></i>
          <p>Local</p>
        </div>
        <div className="flex items-center gap-1 ">
          <i className="fa-solid fa-clock"></i>
          <p>dd/mm/aaaa</p>
        </div>
      </div>

      {isModalOpen && <OportunidadeModal onClose={closeModal} />}
    </div>
  );
};

export default OportunidadeCard;