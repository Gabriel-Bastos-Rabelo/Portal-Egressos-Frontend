import EgressoCard from '../../components/Cards/EgressoCard.tsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Egressos() {
  const [egressos, setEgressos] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8080/api/egresso/buscarAprovados')
      .then(response => {
        console.log(response.data);  
        setEgressos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar egressos:', error);
      });
  }, []);

  return (
    <div className="flex min-h-screen w-screen justify-center my-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center">Conheça nossos egressos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {egressos.map((egresso) => (
            <EgressoCard key={egresso.id} egresso={egresso} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Egressos;
