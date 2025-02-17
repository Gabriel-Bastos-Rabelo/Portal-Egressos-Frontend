import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer';

import './index.css'

function Layout() {
  return (
    <div>
      <NavBar/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;