import { useState } from 'react';
import egressoImg from '../../assets/egresso-img.png';
import EgressoModal from '../../components/Modals/EgressoModal.tsx';

export type Egresso = {
  id: number;
  nome: string;
  cargo: string;
  curso: string;
  email: string;
  linkedin: string;
  instagram: string;
  descricao: string;
};

const EgressoCard = ({ egresso }: { egresso: Egresso }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-[250px] h-[300px] bg-white rounded-lg shadow-xl flex flex-col items-center justify-center text-center">
      <img src={egressoImg} alt="Foto do egresso" />
      <h3 className="text-xl font-bold">{egresso.nome}</h3>
      <p className="text-gray-600">{egresso.cargo}</p>
      <p className="text-gray-600">{egresso.curso}</p>

      <div className="flex">
        <a
          href={egresso.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-full shadow-xl p-2 cursor-pointer transition hover:bg-gray-100"
        >
          <i className="fa-brands fa-linkedin-in text-2xl text-[#000000]"></i>
        </a>

        <a
          href={egresso.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-full shadow-xl p-2 cursor-pointer transition hover:bg-gray-100"
        >
          <i className="fa-brands fa-instagram text-2xl text-[#000000]"></i>
        </a>

        <a
          href={egresso.email}
          className="bg-white rounded-full shadow-xl p-2 cursor-pointer transition hover:bg-gray-100"
        >
          <i className="fa-regular fa-envelope text-2xl text-[#000000]"></i>
        </a>
      </div>

      <button className="mt-3 bg-[#0E3986] text-white px-6 py-2 rounded hover:bg-blue-700 transition" onClick={openModal}>
            Ver mais
      </button>

      {isModalOpen && <EgressoModal onClose={closeModal} egresso={egresso} />}
    </div>
  );
};

export default EgressoCard;