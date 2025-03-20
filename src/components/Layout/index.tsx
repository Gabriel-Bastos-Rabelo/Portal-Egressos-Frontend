import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer';

import './index.css'

type LayoutProps = {
  isCoordenador: boolean;
};

function Layout({ isCoordenador }: LayoutProps) {
  return (
    <div>
      <NavBar isCoordenador={isCoordenador}/>
      <main>
        <Outlet />
      </main>
      <Footer isCoordenador={isCoordenador}/>
    </div>
  );
}

export default Layout;