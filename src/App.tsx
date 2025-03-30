import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Egressos from './pages/Egressos';
import Noticias from './pages/Noticias';
import Depoimentos from './pages/Depoimentos';
import Oportunidades from './pages/Oportunidades';
import Login from './pages/Login';
import CoordHome from './pages/CoordHome';
import Solicitacoes from './pages/Solicitacoes';
import Cadastro from './pages/Egressos/cadastro';
import EnviarOportunidade from './pages/Oportunidades/enviarOportunidade';
import EditarPerfil from './pages/EgressoHome/perfil';
import EditarPerfilCoordenador from './pages/CoordHome/perfil';

function RotaProtegidaEgresso({ children }: { children: JSX.Element }) {
  const role = localStorage.getItem("role");
  if (role !== "EGRESSO") {
    return <Navigate to="/coordenador/perfil" />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout isCoordenador={false} />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/Egressos" element={<Layout isCoordenador={false} />}>
          <Route index element={<Egressos />} />
        </Route>
        <Route path="/Egressos/cadastro" element={<Layout isCoordenador={false} />} >
          <Route index element={<Cadastro />} />
        </Route>
        <Route path="/noticias" element={<Layout isCoordenador={false} />}>
          <Route index element={<Noticias />} />
        </Route>
        <Route path="/depoimentos" element={<Layout isCoordenador={false} />}>
          <Route index element={<Depoimentos />} />
        </Route>
        <Route path="/oportunidades" element={<Layout isCoordenador={false} />}>
          <Route index element={<Oportunidades />} />
        </Route>
        <Route path="/login">
          <Route index element={<Login />} />
        </Route>
        <Route path="/coordenador" element={<Layout isCoordenador={true} />}>
          <Route index element={<CoordHome />} />
        </Route>
        <Route path="/solicitacoes" element={<Layout isCoordenador={true} />}>
          <Route index element={<Solicitacoes />} />
        </Route>
        <Route path="/oportunidades/enviarOportunidade" element={<Layout isCoordenador={true} />}>
          <Route index element={<EnviarOportunidade />} />
        </Route>
        <Route path="/Egressos/perfil" element={<Layout isCoordenador={false} />}>
          <Route index element={
            <RotaProtegidaEgresso>
              <EditarPerfil />
            </RotaProtegidaEgresso>
          } />
        </Route>
        <Route path="/coordenador/perfil" element={<Layout isCoordenador={true} />}>
          <Route index element={<EditarPerfilCoordenador />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
