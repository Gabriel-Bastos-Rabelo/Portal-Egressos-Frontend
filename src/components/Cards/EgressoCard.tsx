import { useState } from 'react';
import egressoImg from '../../assets/user.png';
import EgressoModal from '../../components/Modals/EgressoModal.tsx';
import { Egresso } from '../../values/egresso.tsx'

const EgressoCard = ({ egresso }: { egresso: Egresso }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-[250px] h-[300px] bg-white rounded-lg shadow-xl flex flex-col items-center justify-center text-center">
      <img
        src={egresso.foto ? `http://localhost:8080/uploads/${egresso.foto}` : egressoImg}
        alt="Foto do egresso"
        className="w-24 h-24 rounded-full object-cover mb-2"
      />
      <h3 className="text-xl font-bold">{egresso.nomeEgresso}</h3>
      <p className="text-gray-600">{egresso.cargo}</p>
      <p className="text-gray-600">{egresso.curso}</p>

      <div className="flex gap-2">
        <a
          href={egresso.linkedin ? egresso.linkedin : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-white rounded-full shadow-xl p-2 cursor-pointer transition hover:bg-gray-100 ${
            !egresso.linkedin && 'opacity-50 pointer-events-none cursor-not-allowed'
          }`}
        >
          <i className="fa-brands fa-linkedin-in text-2xl text-[#000000]"></i>
        </a>

        <a
          href={egresso.instagram ? egresso.instagram : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-white rounded-full shadow-xl p-2 cursor-pointer transition hover:bg-gray-100 ${
            !egresso.instagram && 'opacity-50 pointer-events-none cursor-not-allowed'
          }`}
        >
          <i className="fa-brands fa-instagram text-2xl text-[#000000]"></i>
        </a>

        <a
          href={
            egresso.emailUsuario
              ? `https://mail.google.com/mail/?view=cm&fs=1&to=${egresso.emailUsuario}`
              : '#'
          }
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-white rounded-full shadow-xl p-2 cursor-pointer transition hover:bg-gray-100 ${
            !egresso.emailUsuario && 'opacity-50 pointer-events-none cursor-not-allowed'
          }`}
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