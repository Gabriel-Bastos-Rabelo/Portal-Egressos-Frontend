import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import banner from '../../assets/coordenador.png';
import Module from '../../components/Module/index.tsx';

function CoordHome() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className=" ">
      <div className="flex bg-[#0E3986] justify-center items-center h-[500px] gap-10">
        <img src={banner} alt="Banner Home" className="h-[250px]" />
        <h2 className="text-4xl font-bold text-[#fff]">Olá, Coordenador(a)!</h2>
      </div>

      <p className="text-center my-5 text-xl text-[#5B5B5B]">Acesse uma das áreas disponíveis</p>

      <div className="flex flex-col justify-center items-center gap-10 mb-20">
        <ul className="flex gap-50">
          <Module link={"/solicitacoes"} texto={"Solicitacoes"} icon={"fa-solid fa-users text-6xl text-[#08276F] mb-2"}/>
          <Module link={"/"} texto={"Estatística de Egressos"} icon={"fa-solid fa-square-poll-vertical text-6xl text-[#08276F] mb-2"}/>
          <Module link={"/egressos"} texto={"Egressos"} icon={"fa-solid fa-graduation-cap text-6xl text-[#08276F] mb-2"}/>
        </ul>

        <ul className="flex gap-50">
          <Module link={"/oportunidades"} texto={"Oportunidades"} icon={"fa-solid fa-briefcase text-6xl text-[#08276F] mb-2"}/>
          <Module link={"/depoimentos"} texto={"Depoimentos"} icon={"fa-solid fa-message text-6xl text-[#08276F] mb-2"}/>
          <Module link={"/noticias"} texto={"Notícias"} icon={"fa-solid fa-newspaper text-6xl text-[#08276F] mb-2"}/>
        </ul>
      </div>
    </div>
  );
}

export default CoordHome;