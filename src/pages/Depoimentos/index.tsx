import DepoimentoCard from '../../components/Cards/DepoimentoCard.tsx';
import { useState, useEffect} from 'react';
import axios from 'axios';

function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/depoimento/aprovados')
      .then(response => {
        setDepoimentos(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Erro ao buscar depoimentos:', error);
      });
  }, []);

  return (
    <div className="flex min-h-screen w-screen justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mt-12">Depoimentos</h1>
    
        <div className="flex flex-col max-w-5xl mx-auto px-4 w-full">
          {depoimentos.map((depoimento) => (
            <DepoimentoCard key={depoimento.id} depoimento={depoimento} />
          ))}
        </div>
      </div>
    </div>
  );
}
  
export default Depoimentos;