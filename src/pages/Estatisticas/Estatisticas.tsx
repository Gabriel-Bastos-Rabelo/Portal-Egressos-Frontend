import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Registra os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Estatisticas: React.FC = () => {
  // Exemplo de dados de gráfico de empregabilidade ao longo do tempo
  const employabilityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Meses ou períodos
    datasets: [
      {
        label: 'Taxa de Empregabilidade (%)',
        data: [80, 85, 90, 92, 95, 97, 100], // Taxa de empregabilidade em cada mês
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Estatísticas dos Egressos</h1>

      {/* Exemplo de gráfico de linha */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Taxa de Empregabilidade</h2>
        <Line data={employabilityData} />
      </div>

      {/* Exemplo de outras estatísticas */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Outras Estatísticas</h2>
        <p><strong>Percentual de Egressos Empregados:</strong> 95%</p>
        <p><strong>Salário Médio:</strong> R$ 5.000</p>
        <p><strong>Porcentagem de Egressos com Pós-Graduação:</strong> 30%</p>
      </div>
    </div>
  );
};

export default Estatisticas;
