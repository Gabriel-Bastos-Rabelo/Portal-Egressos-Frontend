import { useEffect, useState } from 'react';
import logo from '../../assets/logoUfma.png'
import './navBar.css'
import JobIcon from '../../assets/jobIcon.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import Profile from '../Modals/Profile';

const Navbar = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(!clicked);
  }
  
  useEffect(() => {
    if (clicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [clicked]);
  
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);
  
  const homeLink = role === "COORDENADOR" ? "/coordenador" : "/";

  const handleLogout = () => {
    // Remover dados de login do localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role'); // Remover o role do localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('egressoId')
    setRole(""); // Limpe o role
    navigate('/');
  };

  return (
    <>
      <nav className='flex items-center justify-center bg-blue7 py-5 px-10 md:px-0'>
        <div className='container flex items-center justify-between bg-blue7 mx-8'>
          <div className='flex flex-row items-center gap-10'>
            <div className="mobile hidden" onClick={handleClick}>
              <i id="bar"
                className='fas fa-bars items-center cursor-pointer text-[30px] md:text-[40px]'
              />
            </div>
            <a href="/">
              <img src={logo} alt="Logo UFMA" className="w-15 md:w-20" />
            </a>
            <div className="flex-column text-white text-sm md:text-xl font-bold font-lato">
              <p>Portal de Egressos</p>
              <p>UFMA</p>
            </div>
          </div>

          <div className='flex flex-row'>
            <ul id="navbar" className="flex flex-row items-center justify-center relative">
              <li>
                <NavLink
                  to={homeLink}
                  end
                  className={({ isActive }) => 
                    `text-xl mr-4 ${
                      isActive 
                        ? 'text-white font-bold' 
                        : 'text-white font-medium hover:font-bold transition-all'
                    }`
                  }
                >
                Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/egressos"
                  className={({ isActive }) => 
                    `text-xl mr-4 ${
                      isActive 
                        ? 'text-white font-bold' 
                        : 'text-white font-medium hover:font-bold transition-all'
                    }`
                  }
                >
                Egressos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/noticias"
                  className={({ isActive }) => 
                    `text-xl mr-4 ${
                      isActive 
                        ? 'text-white font-bold' 
                        : 'text-white font-medium hover:font-bold transition-all'
                    }`
                  }
                >
                Noticias
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/depoimentos"
                  className={({ isActive }) => 
                    `text-xl mr-4 ${
                      isActive 
                        ? 'text-white font-bold' 
                        : 'text-white font-medium hover:font-bold transition-all'
                    }`
                  }
                >
                Depoimentos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/oportunidades"
                  className={({ isActive }) => 
                    `text-xl mr-4 ${
                      isActive 
                        ? 'text-white font-bold' 
                        : 'text-white font-medium hover:font-bold transition-all'
                    }`
                  }
                >
                Oportunidades
                </NavLink>
              </li>
              {role === 'COORDENADOR' && (  
                <li>
                  <NavLink
                    to="/solicitacoes"
                    className={({ isActive }) => 
                      `text-xl mr-4 ${
                        isActive 
                          ? 'text-white font-bold' 
                          : 'text-white font-medium hover:font-bold transition-all'
                      }`
                    }
                  >
              Solicitações
                  </NavLink>
                </li>
              )}
            </ul>
            {role !== "EGRESSO" && role !== "COORDENADOR" && (  
              <NavLink to="/login">
                <button className='hidden md:inline w-35 h-10 bg-[#931737] text-white rounded gap-2 text-xl font-bold ml-4 hover:bg-[#B7243E] transition-all'>
                  <i className="fa-solid fa-lock mr-2"></i>
            Acessar
                </button>
              </NavLink>
            )}
            {(role === "EGRESSO" || role === "COORDENADOR") && <Profile onLogout={handleLogout} />}
          </div>

          <div id="navbarMenu" className={clicked ? "#navbar-menu active hidden" : "navbar-menu hidden"}>
            <div className="mobile" onClick={handleClick}>
              <i id="bar" className='fas fa-times items-center cursor-pointer text-[30px] md:text-[40px] pl-4'/>
            </div>
            <ul className='w-4/5'>
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? 'flex flex-row items-center gap-3 bg-blue1 w-full pl-4 py-1 rounded' : 'flex flex-row items-center gap-3 w-full pl-4'
                  }
                >
                  <i className="fa-solid fa-house w-6 h-6"></i>
              Início
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/egressos"
                  end
                  className={({ isActive }) =>
                    isActive ? 'flex flex-row items-center gap-3 bg-blue1 w-full pl-4 py-1 rounded' : 'flex flex-row items-center gap-3 w-full pl-4'
                  }
                >
                  <i className="fa-solid fa-users w-6 h-6"></i>
              Egressos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/noticias"
                  end
                  className={({ isActive }) =>
                    isActive ? 'flex flex-row items-center gap-3 bg-blue1 w-full pl-4 py-1 rounded' : 'flex flex-row items-center gap-3 w-full pl-4'
                  }
                >
                  <i className="fa-solid fa-newspaper w-6 h-6"></i>
              Notícias
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/depoimentos"
                  end
                  className={({ isActive }) =>
                    isActive ? 'flex flex-row items-center gap-3 bg-blue1 w-full pl-4 py-1 rounded' : 'flex flex-row items-center gap-3 w-full pl-4'
                  }
                >
                  <i className="fa-brands fa-rocketchat w-6 h-6"></i>
              Depoimentos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/oportunidades"
                  end
                  className={({ isActive }) =>
                    isActive ? 'flex flex-row items-center gap-3 bg-blue1 w-full pl-4 py-1 rounded' : 'flex flex-row items-center gap-3 w-full pl-4'
                  }
                >
                  <img src={JobIcon} alt="Job Icon" className="w-6 h-6" />
              Oportunidades
                </NavLink>
              </li>
              {role === 'COORDENADOR' && (  
                <li>
                  <NavLink
                    to="/solicitacoes"
                    className={({ isActive }) => 
                      `text-xl mr-4 ${
                        isActive 
                          ? 'flex flex-row items-center gap-3 bg-blue1 w-full pl-4 py-1 rounded' : 'flex flex-row items-center gap-3 w-full pl-4'
                      }`
                    }
                  >
                    <i className="fa-solid fa-users w-6 h-6 text-[#08276F]"></i>
                  Solicitações
                  </NavLink>
                </li>
              )}
              {role !== 'COORDENADOR' &&  role !== 'EGRESSO' && (  
                <li className='inline md:hidden '>
                  <NavLink
                    to="/login"
                    end
                    className={({ isActive }) =>
                      isActive ? 'flex flex-row items-center gap-3 bg-blue1 w-full pl-4 py-1 rounded text-[#931737] font-bold' : 'flex flex-row items-center gap-3 w-full pl-4 text-[#931737] font-bold'
                    }
                  >
                    <i className="fa-solid fa-lock w-6 h-6 text-[#931737]"></i>
              Entrar
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {clicked && (
        <div 
          className="overlay"
          onClick={handleClick}
        />
      )}
    </>
  );
};

export default Navbar;
