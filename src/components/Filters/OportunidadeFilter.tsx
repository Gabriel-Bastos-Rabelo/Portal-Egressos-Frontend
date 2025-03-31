import { useState } from 'react';

type OportunidadeFilterProps = {
  onFiltrar: (filters: { titulo: string; data: string; tipo: string }) => void;
  onLimpar: () => void;
};

const OportunidadeFilter = ({
  onFiltrar,
  onLimpar
}: OportunidadeFilterProps) => {
  const [tituloInput, setTituloInput] = useState('');
  const [dataInput, setDataInput] = useState('');
  const [tipoInput, setTipoInput] = useState('');

  const handleFiltrar = () => {
    onFiltrar({
      titulo: tituloInput,
      data: dataInput,
      tipo: tipoInput
    });
  };

  const handleLimpar = () => {
    setTituloInput('');
    setDataInput('');
    setTipoInput('');
    onLimpar();
  };

  return (
    <div className="flex flex-wrap gap-4 items-end justify-center mb-10">
      <div className="flex flex-col">
        <label htmlFor="titulo" className="block text-sm font-bold text-gray-700 mb-1">
          Título
        </label>
        <input
          id="titulo"
          type="text"
          placeholder="Digite o título da oportunidade"
          value={tituloInput}
          onChange={(e) => setTituloInput(e.target.value)}
          className="w-64 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="data" className="block text-sm font-bold text-gray-700 mb-1">
          A partir de
        </label>
        <input
          id="data"
          type="date"
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value)}
          className="w-48 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="tipo" className="block text-sm font-bold text-gray-700 mb-1">
          Tipo
        </label>
        <select
          id="tipo"
          value={tipoInput}
          onChange={(e) => setTipoInput(e.target.value)}
          className="w-52 h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="" disabled>Selecione o tipo</option>
          <option value="Presencial">Presencial</option>
          <option value="Remoto">Remoto</option>
          <option value="Híbrido">Híbrido</option>
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
          Limpar
        </button>
      </div>
    </div>
  );
};

export default OportunidadeFilter;
