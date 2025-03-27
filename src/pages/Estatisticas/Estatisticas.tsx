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
  ArcElement
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
        backgroundColor: ['#2E8CE8', '#14D520', '#B7243E', '#FFCC00', '#AF52DE'],
        hoverBackgroundColor: ['#2E8CE8', '#14D520', '#B7243E', '#FFCC00', 'AF52DE'],
      },
    ],
  };

  // Gráfico de Cargos por Egressos
  const cargosPorEgressosData = {
    labels: ['Analista de Dados', 'Desenvolvedor de Jogos', 'Engenheiro de Machine Learning', 'Arquiteto de Software', 'Programador Junior'],
    datasets: [
      {
        label: 'Quantidade de Egressos',
        data: [46, 30, 23, 15, 10],
        backgroundColor: ['#4CB4FF']
      }
    ],
  };

  // Gráfico de Salário por Cargo
  const salarioPorCargoData = {
    labels: ['Analista de Dados', 'Desenvolvedor de Jogos', 'Engenheiro de Machine Learning', 'Arquiteto de Software', 'Programador Junior'],
    datasets: [
      {
        label: 'Salário (R$)',
        data: [5000, 6000, 8000, 7000, 3000],
        backgroundColor: '#40C134',
      },
    ],
  };

  // Gráfico de Taxa de Empregabilidade
  const taxaDeEmpregabilidadeData = {
    labels: ['Empregado', 'Desempregado'],
    datasets: [
      {
        data: [67, 33],
        backgroundColor: ['#34C759', '#B7243E'],
        hoverBackgroundColor: ['#34C759', '#B7243E'],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 flex gap-20 flex-col itens-center justify-center">
      <h1 className="text-2xl font-bold text-center">Estatísticas Importantes dos Egressos</h1>

      {/* Total de Egressos */}
      <div className="flex flex-wrap gap-20 justify-center">
        <div className='flex flex-col gap-[50px]'>
          <div className="w-[300px] h-[150px] bg-white p-4 rounded-lg shadow-md text-center ">
            <h3 className="w-full text-xl font-semibold text-center mb-4">TOTAL DE EGRESSOS </h3>
            <p className="text-4xl font-bold text-center text-orange-600">120</p>
          </div>

          <div className="w-[300px] h-[150px] bg-white p-4 rounded-lg shadow-md text-center ">
            <h3 className="text-xl font-semibold">EGRESSOS POR ANO</h3>
            <select className="border p-2 rounded-md">
              <option value="todos">TODOS</option>
              <option value="2024">2024</option>
              <option value="2024">2023</option>
              <option value="2024">2022</option>
            </select>
            <p className="text-4xl font-bold text-orange-600">120</p>
          </div>
        </div>

        {/* Total de Egressos por Curso */}
        <div className="w-[700px] h-[350px] bg-white p-0 rounded-lg shadow-md text-center flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-center mb-0">TOTAL DE EGRESSOS POR CURSO</h3>
            <div className="w-[350px] h-[350px] flex items-center justify-center"> {/* Ajustando o tamanho da div envolvente */}
              <Pie
                data={totalEgressosPorCursoData}
                options={{
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        boxWidth: 15,
                        padding: 10,
                      },
                    },

                  },
                }}
                height={250}
                width={250}
              />
            </div>
          </div>
        </div>

      </div>

      <div className=' flex flex-row justify-center gap-4'>
        {/* Egressos por Ano */}
        <div className="w-[590px] h-[300px] flex ">
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <h3 className="text-xl font-semibold text-center mb-4">CARGOS POR EGRESSOS</h3>
            <div className="w-[450px] h-[250px] flex items-center justify-center"> {/* Ajustando o tamanho da div envolvente */}
              <Bar
                data={cargosPorEgressosData}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                    },
                  },
                  indexAxis: 'y',  // Gráfico de barras horizontais
                  scales: {
                    x: {
                      stacked: true,  // Empilhamento no eixo X
                    },
                    y: {
                      stacked: true,  // Empilhamento no eixo Y
                      beginAtZero: true,  // Garante que o gráfico comece no zero
                    },
                  },
                }}
                height={150}  // Aumenta a altura do gráfico
                width={300}  // Aumenta a largura do gráfico
              />
            </div>
          </div>
        </div>

        {/* Salário por Cargo */}
        <div className="w-[500px] h-[300px] flex ">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-center mb-4">SALÁRIO POR CARGO</h3>
            <div className="w-[450px] h-[225px] flex items-center justify-center"> {/* Ajustando o tamanho da div envolvente */}
              <Bar
                data={salarioPorCargoData}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                    },
                  },
                  indexAxis: 'y',  // Gráfico de barras horizontais
                  scales: {
                    x: {
                      stacked: true,  // Empilhamento no eixo X
                    },
                    y: {
                      stacked: true,  // Empilhamento no eixo Y
                      beginAtZero: true,  // Garante que o gráfico comece no zero
                    },
                  },
                }}
                height={150}  // Aumenta a altura do gráfico
                width={300}  // Aumenta a largura do gráfico
              />
            </div>
          </div>
        </div>
      </div>

      {/* Taxa de Empregabilidade */}
      <div className="flex justify-center">
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">TAXA DE EMPREGABILIDADE</h3>
          <select className="border p-2 rounded-md">
            <option value="todos">TODOS</option>
            <option value="todos">2025</option>
            <option value="todos">2024</option>
          </select>
          <Pie data={taxaDeEmpregabilidadeData} />
        </div>
      </div>

    </div>
  );
};

export default Estatisticas;
