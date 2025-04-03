import { useState } from "react";

type DepoimentoFilterProps = {
  onFiltrar: (filters: { nome: string; curso: string; ano: string }) => void;
  onLimpar: () => void;
};

const DepoimentoFilter = ({ onFiltrar, onLimpar }: DepoimentoFilterProps) => {
  const [nomeInput, setNomeInput] = useState('');
  const [cursoInput, setCursoInput] = useState('');
  const [anoInput, setAnoInput] = useState('');

  const handleFiltrar = () => {
    onFiltrar({
      nome: nomeInput,
      curso: cursoInput,
      ano: anoInput,
    });
  };

  const handleLimpar = () => {
    setNomeInput('');
    setCursoInput('');
    setAnoInput('');
    onLimpar();
  };

  return (
    <div className="flex flex-wrap gap-4 items-end justify-center mb-10 max-[900px]:flex-col max-[900px]:items-center">
      <div className="flex flex-col">
        <label htmlFor="nome" className="block text-sm font-bold text-gray-700 mb-1">
          Nome do Egresso
        </label>
        <input
          id="nome"
          type="text"
          placeholder="Digite o nome do egresso"
          value={nomeInput}
          onChange={(e) => setNomeInput(e.target.value)}
          className="w-52 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="curso" className="block text-sm font-bold text-gray-700 mb-1">
          Curso
        </label>
        <select
          id="curso"
          value={cursoInput}
          onChange={(e) => setCursoInput(e.target.value)}
          className="w-52 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-no-repeat bg-right-2 bg-[length:20px]"
        >
          <option value="" disabled>
            Selecione o curso
          </option>
          <option value="Graduação">Graduação</option>
          <option value="Mestrado">Mestrado</option>
          <option value="Doutorado">Doutorado</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="ano" className="block text-sm font-bold text-gray-700 mb-1">
          Ano de Conclusão
        </label>
        <select
          id="ano"
          value={anoInput}
          onChange={(e) => setAnoInput(e.target.value)}
          className="w-52 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-no-repeat bg-right-2 bg-[length:20px]"
        >
          <option value="" disabled>
            Selecione o ano
          </option>
          {Array.from({ length: 2026 - 2000 }, (_, i) => {
            const year = 2000 + i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex gap-2 h-12">
        <button
          onClick={handleFiltrar}
          className="h-12 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm transition-colors"
        >
          Filtrar
        </button>
        <button
          onClick={handleLimpar}
          className="h-12 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm transition-colors"
        >
          Limpar Filtro
        </button>
      </div>
    </div>
  );
};

export default DepoimentoFilter;
