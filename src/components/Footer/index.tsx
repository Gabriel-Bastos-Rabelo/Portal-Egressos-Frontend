import { NavLink } from "react-router-dom";
import logo from '../../assets/logoUfma.png'

type FooterProps = {
  isCoordenador: boolean;  // Recebe a prop para verificar se é coordenador
};

const Footer = ({ isCoordenador }: FooterProps) => {
  return (
    <footer className="w-full bg-blue7 mt-auto">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 justify-between items-center">
          <div className="order-2 lg:order-1">
            <ul className="flex flex-col gap-3 text-center lg:text-left">
              {[
                { to: "/", text: "Home" },
                { to: "/egressos", text: "Egressos" },
                { to: "/noticias", text: "Notícias" },
                { to: "/depoimentos", text: "Depoimentos" },
                { to: "/oportunidades", text: "Oportunidades" }
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block text-sm lg:text-base ${
                        isActive 
                          ? 'text-white font-bold' 
                          : 'text-gray-200 hover:text-white transition-colors'
                      }`
                    }
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}
              {isCoordenador && (  // Se for coordenador, exibe o link de Solicitações no footer
                <li>
                  <NavLink
                    to="/solicitacoes"
                    className="block text-sm lg:text-base text-gray-200 hover:text-white transition-colors"
                  >
                    Solicitações
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src={logo} 
              alt="Logo UFMA" 
              className="w-[140px] md:w-[180px] lg:w-[206px] hover:scale-105 transition-transform" 
            />
          </div>

          <div className="order-3 text-center lg:text-right">
            <h3 className="font-medium text-lg lg:text-xl mb-3 lg:mb-4 text-white">
                            CONTATOS
            </h3>
            <div className="space-y-2">
              <p className="text-sm lg:text-base text-gray-200">
                                (98) 99999-9999
              </p>
              <p className="text-sm lg:text-base text-gray-200">
                                ufma@ufma.com
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 text-center">
          <p className="text-xs md:text-sm text-gray-300">
                        © {new Date().getFullYear()} Universidade Federal do Maranhão. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;