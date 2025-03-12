import { useState } from 'react';
import egressoImg from '../../assets/egresso-img.png';
import EgressoModal from '../../components/Modals/EgressoModal.tsx';

const EgressoCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-[250px] h-[300px] bg-white rounded-lg shadow-xl flex flex-col items-center justify-center text-center">
      <img src={egressoImg} alt="Foto do egresso" />
      <h3 className="text-xl font-bold">Nome do aluno</h3>
      <p className="text-gray-600">Cargo</p>
      <p className="text-gray-600">Nome do curso</p>

      <div className="flex items-center gap-4">
        <div className="bg-white rounded-full shadow-xl p-2 cursor-pointer">
          <i className="fa-brands fa-linkedin-in text-2xl text-[#000000]"></i>
        </div>
        <div className="bg-white rounded-full shadow-xl p-2 cursor-pointer">
          <i className="fa-brands fa-instagram text-2xl text-[#000000]"></i>
        </div>
            
        <div className="bg-white rounded-full shadow-xl p-2 cursor-pointer">
          <i className="fa-regular fa-envelope text-2xl text-[#000000]"></i>
        </div>
      </div>

      <button className="mt-3 bg-[#0E3986] text-white px-6 py-2 rounded hover:bg-blue-700 transition" onClick={openModal}>
            Ver mais
      </button>

      {isModalOpen && <EgressoModal onClose={closeModal} />}
    </div>
  );
};

export default EgressoCard;