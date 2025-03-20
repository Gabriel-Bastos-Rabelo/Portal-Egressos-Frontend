import { NavLink } from 'react-router-dom';

type ModuloProps = {
  link: string;
  texto: string;
  icon: string;
};

function Module({ link, texto, icon }: ModuloProps) {
  return (
    <NavLink to={link}>
      <li className="w-[240px] h-[240px] bg-[#D5F1FD] rounded-lg shadow-lg flex flex-col items-center justify-center text-center text-xl font-bold hover:bg-[#ABE0FC] transition">
        <i className={icon}></i>
        <NavLink to="/">{texto}</NavLink>
      </li>
    </NavLink>
  );
}

export default Module;
