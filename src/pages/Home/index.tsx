import banner from '../../assets/home-banner.png';
import formatura from '../../assets/ictq-formatura.png';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className=" ">
      <div className="w-full text-center relative h-[500px]">
        <img src={banner} alt="Banner Home" className="w-full h-full object-cover" />
        
        {/* Película */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"/>

        {/* Conteúdo por cima */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
          <h1 className="text-4xl font-bold">Bem-vindo ao Portal de Egressos de Ciência da Computação</h1>
        </div>

        {/* Quadrados clicáveis */}
        <div className="absolute top-90 left-1/2 transform -translate-x-1/4">
          <ul className="flex justify-center gap-40">
            <NavLink to="/Estatisticas">
              <li className="w-[240px] h-[240px] bg-[#D5F1FD] rounded-lg shadow-lg flex flex-col items-center justify-center text-center text-xl font-bold hover:bg-[#ABE0FC] transition">
                <i className="fa-solid fa-square-poll-vertical text-6xl text-[#08276F] mb-2"></i>
                Estatísticas de Egressos
              </li>
            </NavLink>

            <NavLink to="/Egressos/cadastro">
              <li className="w-[240px] h-[240px] bg-[#D5F1FD] rounded-lg shadow-lg flex flex-col items-center justify-center text-center text-xl font-bold hover:bg-[#ABE0FC] transition">
                <i className="fa-solid fa-graduation-cap text-6xl text-[#08276F] mb-2"></i>
                Cadastre-se
              </li>
            </NavLink>

            <NavLink to="/oportunidades">
              <li className="w-[240px] h-[240px] bg-[#D5F1FD] rounded-lg shadow-lg flex flex-col items-center justify-center text-center text-xl font-bold hover:bg-[#ABE0FC] transition">
                <i className="fa-solid fa-briefcase text-6xl text-[#08276F] mb-2"></i>
                Oportunidades
              </li>
            </NavLink>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center mt-40 mb-10 mx-40 gap-10">
        <h1 className="text-3xl font-bold">Nossa história continua após a formatura!</h1>
        <div className="flex items-center gap-20">
          <img src={formatura} alt="Foto Formandos" className="" />
          <p className="text-justify text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, facilisis vel luctus sed, venenatis sed quam. Phasellus ut hendrerit diam. Aliquam egestas mauris ac arcu accumsan scelerisque. Aliquam lacus neque, lacinia et commodo sit amet, efficitur vitae diam. Sed non justo at mi mattis eleifend.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, facilisis vel luctus sed, venenatis sed quam. Phasellus ut hendrerit diam. Aliquam egestas mauris ac arcu accumsan scelerisque. Aliquam lacus neque, lacinia et commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, facilisis vel luctus sed, venenatis sed quam. Phasellus ut hendrerit diam. Aliquam egestas mauris ac arcu accumsan scelerisque. Aliquam lacus neque, lacinia et commodo sit amet, efficitur vitae diam. Sed non justo at mi mattis eleifend.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, facilisis vel luctus sed, venenatis sed quam. Phasellus ut hendrerit diam. Aliquam egestas mauris ac arcu accumsan scelerisque. Aliquam lacus</p>
        </div>
        <p className="text-justify text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, facilisis vel luctus sed, venenatis sed quam. Phasellus ut hendrerit diam. Aliquam egestas mauris ac arcu accumsan scelerisque. Aliquam lacus neque, lacinia et commodo sit amet, efficitur vitae diam. Sed non justo at mi mattis eleifend.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, facilisis vel luctus sed, venenatis sed quam. Phasellus ut hendrerit diam. Aliquam egestas mauris ac arcu accumsan scelerisque. Aliquam lacus neque, lacinia et commodo.</p>

      </div>
    </div>
  );
}

export default Home;