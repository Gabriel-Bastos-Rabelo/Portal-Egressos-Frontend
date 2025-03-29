import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegação
import { FaCog, FaPlus, FaSignOutAlt } from 'react-icons/fa'; // Ícones para as opções
import userImg from '../../assets/egresso-img.png'

type ProfileProps = {
    onLogout: () => void;
  };

const Profile = ( { onLogout }: ProfileProps ) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Para redirecionamento

  const handleToggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleGoToProfile = () => {
    navigate('/Egressos/perfil');
  };

  const handleGoToCreateOpportunity = () => {
    navigate('/oportunidades/enviarOportunidade');
  };

  return (
    <div className="relative">
      <div className="flex items-center cursor-pointer" onClick={handleToggleDropdown}>
        <img 
          src={userImg}
          alt="User Profile" 
          className="w-10 h-10 rounded-full mr-2"
        />
        <i className="fas fa-chevron-down text-white"></i>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-70 z-50">
          <ul className="flex flex-col gap-2">
            <li 
              className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={handleGoToProfile}
            >
              <FaCog className="mr-2" /> Gerenciar Perfil
            </li>
            <li 
              className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={handleGoToCreateOpportunity}
            >
              <FaPlus className="mr-2" /> Cadastrar Oportunidade
            </li>
            <li 
              className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={onLogout}
            >
              <FaSignOutAlt className="mr-2" /> Sair
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
