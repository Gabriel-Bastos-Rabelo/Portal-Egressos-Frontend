import axios from 'axios';
import Table from '../../components/Table'
import { useEffect, useState } from "react";

export type Solicitacoes = {
  nomeEgresso: string;
  texto: string;
  tipo: string
};

function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacoes[]>([]); // Estado para armazenar as solicitações
  const [pagina, setPagina] = useState(0); // Página atual
  const [selected, setSelected] = useState<number[]>([]); // Estado para armazenar as checkboxes selecionadas
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (index: number) => {
    const newSelected = [...selected];
    if (newSelected.includes(index)) {
      newSelected.splice(newSelected.indexOf(index), 1);
    } else {
      newSelected.push(index);
    }
    setSelected(newSelected);
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(solicitacoes.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const isButtonDisabled = selected.length === 0;

  const carregarSolicitacoes = async (pagina: number) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await axios.get(`http://localhost:8080/api/egresso/listar?pagina=${pagina}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        setSolicitacoes(prevSolicitacoes => [...prevSolicitacoes, ...response.data]);
      } catch (error) {
        console.error("Erro ao carregar as solicitações:", error);
      }
    }
  };
  
  useEffect(() => {
    carregarSolicitacoes(pagina);
  }, [pagina]);

  const handleVerMaisClick = () => {
    setPagina(prevPagina => prevPagina + 1); // Incrementa a página para carregar as próximas solicitações
  };

  return (
    <div className="w-full h-screen mb-10">
      <div className="flex justify-around text-2xl my-8">
        <h2>Egressos</h2>
        <h2>Depoimentos</h2>
        <h2>Oportunidades</h2>
        <h2>Notícias</h2>
      </div>
      <div className="mx-40 mb-5">
        <Table
          solicitacoes={solicitacoes}
          selected={selected}
          onCheckboxChange={handleCheckboxChange}
          onSelectAllChange={handleSelectAllChange}
          selectAll={selectAll}
        />
      </div>

      <div className="w-full flex justify-center items-center">
        <button
          className="text-xl px-4 py-2 rounded text-[#fff] border-[#216DC7] bg-[#216DC7] hover:bg-[#174a9d] transition-all"
          onClick={handleVerMaisClick}
        >
          Ver mais
        </button>
      </div>

      <div className="flex justify-start gap-5 mx-40">
        <button className={`flex gap-3 justify-center justify-items-center cursor-pointer px-4 py-2 rounded text-[#fff] border-[#106F1F] bg-[#106F1F] hover:bg-[#10661d] transition-all ${isButtonDisabled ? "bg-[#5B5B5B] cursor-not-allowed hover:bg-[#5B5B5B]" : ""}`}
          disabled={isButtonDisabled}
        >
          <div className="text-xl">Aprovar</div>
          <i className="fa-solid fa-check text-[#fff] text-xl"></i>
        </button>
        <button className={`flex gap-3 justify-center justify-items-center cursor-pointer px-4 py-2 rounded text-[#fff] border-[#DB3543] bg-[#DB3543] hover:bg-[#bb222f] transition-all ${isButtonDisabled ? "bg-[#5B5B5B] cursor-not-allowed hover:bg-[#5B5B5B]" : ""}`}
          disabled={isButtonDisabled} 
        >
          <div className="text-xl">Recusar</div>
          <i className="fa-solid fa-xmark text-[#fff] text-xl"></i>
        </button>
      </div>
    </div>
  );
}

export default Solicitacoes;