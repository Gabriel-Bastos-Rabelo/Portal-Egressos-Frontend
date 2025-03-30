import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import EditarPerfil from './pages/EgressoPerfil/perfil';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/egressos" element={<Layout />}>
          <Route index element={<Egressos />} />
        </Route>
        <Route path="/egressos/cadastro" element={<Layout />} >
          <Route index element={<Cadastro />} />
        </Route>
        <Route path="/noticias" element={<Layout />}>
          <Route index element={<Noticias />} />
        </Route>
        <Route path="/depoimentos" element={<Layout />}>
          <Route index element={<Depoimentos />} />
        </Route>
        <Route path="/oportunidades" element={<Layout />}>
          <Route index element={<Oportunidades />} />
        </Route>
        <Route path="/login">
          <Route index element={<Login />} />
        </Route>
        <Route path="/coordenador" element={<Layout />}>
          <Route index element={<CoordHome />} />
        </Route>
        <Route path="/solicitacoes" element={<Layout />}>
          <Route index element={<Solicitacoes />} />
        </Route>
        <Route path="/oportunidades/enviarOportunidade" element={<Layout />}>
          <Route index element={<EnviarOportunidade />} />
        </Route>
        <Route path="/egressos/perfil" element={<Layout />}>
          <Route index element={<EditarPerfil />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App
