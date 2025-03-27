import DepoimentoCard from '../../components/Cards/DepoimentoCard.tsx';
import { useState, useEffect} from 'react';
import axios from 'axios';

function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/depoimento/aprovados')
      .then(response => {
        setDepoimentos(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar depoimentos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen w-screen justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mt-12">Depoimentos</h1>
        
        {loading ? (
          // Tela de carregamento (Spinner)
          <div className="flex justify-center items-center w-full h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            <p className="ml-4 text-xl font-semibold text-gray-700">Carregando...</p>
          </div>
        ) : (
          <div className="flex flex-col max-w-5xl mx-auto px-4 w-full">
            {depoimentos.map((depoimento) => (
              <DepoimentoCard key={depoimento.id} depoimento={depoimento} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
  
export default Depoimentos;