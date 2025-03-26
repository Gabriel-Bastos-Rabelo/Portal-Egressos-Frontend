import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Registra os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Estatisticas: React.FC = () => {
  // Gráfico de Total de Egressos por Curso
  const totalEgressosPorCursoData = {
    labels: ['Graduação', 'Pós-Graduação', 'Mestrado', 'Doutorado', 'Pós-Doutorado'],
    datasets: [
      {
        data: [10, 11, 13, 20, 46],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
      },
    ],
  };

  // Gráfico de Cargos por Egressos
  const cargosPorEgressosData = {
    labels: ['Analista de Dados', 'Desenvolvedor de Jogos', 'Engenheiro de Machine Learning', 'Arquiteto de Software', 'Programador Junior'],
    datasets: [
      {
        label: 'Quantidade',
        data: [100, 80, 90, 70, 60],
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      },
    ],
  };

  // Gráfico de Salário por Cargo
  const salarioPorCargoData = {
    labels: ['Analista de Dados', 'Desenvolvedor de Jogos', 'Engenheiro de Machine Learning', 'Arquiteto de Software', 'Programador Junior'],
    datasets: [
      {
        label: 'Salário (R$)',
        data: [5000, 6000, 8000, 7000, 3000],
        backgroundColor: '#66BB6A',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
    ],
  };

  // Gráfico de Taxa de Empregabilidade
  const taxaDeEmpregabilidadeData = {
    labels: ['Empregado', 'Desempregado'],
    datasets: [
      {
        data: [67, 33],
        backgroundColor: ['#66BB6A', '#FF7043'],
        hoverBackgroundColor: ['#66BB6A', '#FF7043'],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Estatísticas Importantes dos Egressos</h1>

      {/* Total de Egressos */}
      <div className="flex flex-wrap gap-30 mb-20">
        <div className="w-120 h-40 sm:w-1/4 lg:w-1/4 bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-center mb-4">TOTAL DE EGRESSOS POR CURSO</h3>
          <p className="text-4xl font-bold text-center text-orange-600">120</p>
          
        </div>

        {/* Total de Egressos por Curso */}
        <div className="w-200 h-120 sm:w-1/4 lg:w-1/4 bg-white p-1 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-center mb-4">TOTAL DE EGRESSOS POR CURSO</h3>
          <Pie data={totalEgressosPorCursoData} />
        </div>
      </div>

      {/* Egressos por Ano */}
      <div className="flex justify-between mb-8">
        <div className="w-100 h-40 bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">EGRESSOS POR ANO</h3>
          <select className="border p-2 rounded-md">
            <option value="todos">TODOS</option>
            <option value="todos">2024</option>
            {/* Adicione aqui outras opções de ano */}
          </select>
          <p className="text-4xl font-bold text-orange-600">120</p>
        </div>

        {/* Cargos por Egressos */}
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">CARGOS POR EGRESSOS</h3>
          <Bar data={cargosPorEgressosData} />
        </div>
      </div>

      {/* Salário por Cargo */}
      <div className="flex justify-between mb-8">
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">SALÁRIO POR CARGO</h3>
          <Bar data={salarioPorCargoData} />
        </div>
      </div>

      {/* Taxa de Empregabilidade */}
      <div className="flex justify-between mb-8">
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">TAXA DE EMPREGABILIDADE</h3>
          <select className="border p-2 rounded-md">
            <option value="todos">TODOS</option>
            {/* Adicione aqui outras opções de ano */}
          </select>
        </div>

        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">TAXA DE EMPREGABILIDADE</h3>
          <Pie data={taxaDeEmpregabilidadeData} />
        </div>
      </div>
    </div>
  );
};

export default Estatisticas;
