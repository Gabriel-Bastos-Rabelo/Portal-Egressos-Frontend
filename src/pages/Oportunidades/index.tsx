import OportunidadeCard from '../../components/Cards/OportunidadeCard.tsx';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/index.tsx';

function Oportunidades() {
  const [oportunidades, setOportunidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/oportunidade/aprovadas')
      .then(response => {
        setOportunidades(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar oportunidades:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen w-screen justify-center my-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center mb-6">Oportunidades</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {oportunidades.map((oportunidade) => (
              <OportunidadeCard key={oportunidade.id} oportunidade={oportunidade} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
  
export default Oportunidades;