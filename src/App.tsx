import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Egressos from './pages/Egressos';
import Noticias from './pages/Noticias';
import Depoimentos from './pages/Depoimentos';
import Oportunidades from './pages/Oportunidades';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/Egressos" element={<Layout />}>
          <Route index element={<Egressos />} />
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
      </Routes>
    </Router>
  )
}

export default App
