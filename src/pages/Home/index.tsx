import banner from '../../assets/home-banner.png';
import formatura from '../../assets/ictq-formatura.png';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="w-full text-center relative h-[500px]">
        <img src={banner} alt="Banner Home" className="w-full h-full object-cover" />
        
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Bem-vindo ao Portal de Egressos de Ciência da Computação
          </h1>
        </div>
      </div>

      <div className="absolute top-110 left-1/2 transform -translate-x-1/4 max-[1000px]:relative max-[1000px]:top-0 w-full mt-10 flex justify-center px-4 ">
        <ul className="flex flex-row max-[1000px]:flex-col items-center gap-20">
          <NavLink to="/estatisticas">
            <li className="w-[240px] h-[240px] bg-[#D5F1FD] rounded-lg shadow-lg flex flex-col items-center justify-center text-center text-xl font-bold hover:bg-[#ABE0FC] transition">
              <i className="fa-solid fa-square-poll-vertical text-6xl text-[#08276F] mb-2"></i>
              Estatísticas de Egressos
            </li>
          </NavLink>

          <NavLink to="/egressos/cadastro">
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

      <div className="flex flex-col items-center justify-center mt-40 mb-10 mx-10 px-4 md:px-40 gap-10 text-center md:text-left">
        <h1 className="text-3xl font-bold ">Nossa história continua após a formatura!</h1>

        <div className="flex gap-20 items-center max-[1000px]:flex-col">
          <img src={formatura} alt="Foto Formandos" className="w-[70%] md:w-auto max-w-[600px]" />
          <p className="text-justify text-xl">
          A jornada universitária é feita de descobertas, desafios e transformações. No curso de Ciência da Computação da UFMA, não formamos apenas profissionais altamente capacitados para o mercado — formamos pessoas que carregam consigo valores, experiências e conexões que perduram para além dos muros da universidade.
          A formatura representa o fechamento de um ciclo importante, mas também o ponto de partida para novos caminhos. Nossos egressos seguem trilhas diversas: alguns se tornam pesquisadores, outros se destacam na indústria, empreendem, lideram equipes ou contribuem com soluções tecnológicas que impactam diretamente a sociedade. E todos, de alguma forma, levam a UFMA consigo.
          Este portal foi criado para fortalecer esse elo. Aqui, celebramos as trajetórias dos nossos ex-alunos, compartilhamos conquistas, depoimentos e oportunidades, e mantemos viva a comunidade que nasceu nos corredores do curso.
          </p>
        </div>

        <p className="text-justify text-xl">
         Acreditamos que o vínculo entre universidade e egresso não termina com o diploma — ele apenas se transforma.
          Queremos continuar fazendo parte da sua história. Seja compartilhando suas conquistas, participando de eventos, reencontrando colegas ou ajudando os futuros profissionais que ainda estão trilhando o mesmo caminho que um dia foi o seu.
          A UFMA sempre será sua casa. E este espaço é seu.
        </p>
      </div>
    </div>
  );
}

export default Home;