import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import Loading from '../../components/Loading/index.tsx';
import { EstatisticasService } from '../../services/estatisticasService';

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
  const [loading, setLoading] = useState(true);
  const [totalEgressos, setTotalEgressos] = useState(0);
  const [porCurso, setPorCurso] = useState<{ [nivel: string]: number }>({});
  const [cargos, setCargos] = useState<{ [descricao: string]: number }>({});
  const [empregados, setEmpregados] = useState(0);
  const [desempregados, setDesempregados] = useState(0);

  useEffect(() => {
    async function carregarDados() {
      const egressos = await EstatisticasService.getEgressosAprovados();
      setTotalEgressos(egressos.length);
      setLoading(false);

      const cursoMap: { [nivel: string]: number } = {};
      const cargoMap: { [descricao: string]: number } = {};
      let empregadosTemp = 0;

      for (const egresso of egressos) {
        const nivel = egresso.curso;
        cursoMap[nivel] = (cursoMap[nivel] || 0) + 1;

        const cargosEgresso = await EstatisticasService.getCargosPorEgresso(egresso.id);
        if (cargosEgresso.length > 0) {
          empregadosTemp++;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cargosEgresso.forEach((c: any) => {
            const key = c.descricao;
            cargoMap[key] = (cargoMap[key] || 0) + 1;
          });
        }
      }

      setPorCurso(cursoMap);
      setCargos(cargoMap);
      setEmpregados(empregadosTemp);
      setDesempregados(egressos.length - empregadosTemp);
    }

    carregarDados();
  }, []);

  const totalEgressosPorCursoData = {
    labels: Object.keys(porCurso),
    datasets: [
      {
        data: Object.values(porCurso),
        backgroundColor: ['#2E8CE8', '#14D520', '#B7243E', '#FFCC00', '#AF52DE'],
        hoverBackgroundColor: ['#2E8CE8', '#14D520', '#B7243E', '#FFCC00', '#AF52DE'],
      },
    ],
  };

  const cargosPorEgressosData = {
    labels: Object.keys(cargos),
    datasets: [
      {
        label: 'Quantidade de Egressos',
        data: Object.values(cargos),
        backgroundColor: Object.keys(cargos).map(() => '#4CB4FF')
      }
    ],
  };

  const taxaDeEmpregabilidadeData = {
    labels: ['Empregado', 'Desempregado'],
    datasets: [
      {
        data: [empregados, desempregados],
        backgroundColor: ['#34C759', '#B7243E'],
        hoverBackgroundColor: ['#34C759', '#B7243E'],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 flex gap-20 flex-col itens-center justify-center">
      <h1 className="text-2xl font-bold text-center">Estatísticas Importantes dos Egressos</h1>

      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Total de Egressos */}
          <div className="flex flex-wrap gap-12 justify-center">
            <div className='flex flex-col gap-[50px]'>
              <div className="w-[300px] h-[150px] bg-white p-4 rounded-lg shadow-md text-center ">
                <h3 className="w-full text-xl font-semibold text-center mb-4">TOTAL DE EGRESSOS </h3>
                <p className="text-4xl font-bold text-orange-600">{totalEgressos}</p>
              </div>
            </div>

            {/* Total de Egressos por Curso */}
            <div className="w-[700px] h-[350px] bg-white p-0 rounded-lg shadow-md text-center flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold text-center mb-0">TOTAL DE EGRESSOS POR CURSO</h3>
                <div className="w-[350px] h-[350px] flex items-center justify-center">
                  <Pie data={totalEgressosPorCursoData} options={{
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          boxWidth: 15,
                          padding: 10,
                        },
                      },
                    },
                  }} />
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap flex flex-row justify-center gap-20 mb-8'>
            {/* Cargos por Egressos */}
            <div className="w-full max-w-[490px] bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-center mb-4">CARGOS POR EGRESSOS</h3>
              <div className="w-full h-auto max-h-[410px] overflow-auto">
                <Bar
                  data={cargosPorEgressosData}
                  options={{
                    responsive: true,
                    plugins: {
                      tooltip: {
                        mode: 'index',
                        intersect: false,
                      },
                      legend: {
                        display: false
                      }
                    },
                    indexAxis: 'y',
                    maintainAspectRatio: false,
                    scales: {
                      x: { stacked: true,
                        beginAtZero: true,
                        suggestedMin: 0,
                        suggestedMax: Math.max(...Object.values(cargos)) <= 4 ? 4 : Math.ceil(Math.max(...Object.values(cargos)) + 1),
                        ticks: {
                          stepSize:2,
                          maxTicksLimit: 20,
                          padding: 0

                        },
                        grid: {
                          drawTicks: false
                        }
                      },
                
                      y: {
                        stacked: true,
                        beginAtZero: true,
                        ticks: {
                          autoSkip: false
                        }
                      },
                    },
                  }}
                  height={Math.max(Object.keys(cargos).length * 30, 500)}
                />
              </div>
            </div>
  
            <div className="w-[480px] h-[490px] bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">TAXA DE EMPREGABILIDADE</h3>
              <div className="w-full h-auto">
                <Pie data={taxaDeEmpregabilidadeData} options={{
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        boxWidth: 15,
                        padding: 10,
                      },
                    },
                  },
                }} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>        
  );
};

export default Estatisticas;
