import axios from 'axios';
import Table from '../../components/Table/DepoimentoTable.tsx'
import { useEffect, useState } from "react";
import { Depoimento } from  '../../values/depoimento.tsx'
import SolicitacaoButtons from '../../components/Buttons/SolicitacaoButtons.tsx';

const DepoimentoSolicitacoes = () => {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);
  const [selected, setSelected] = useState<number[]>([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(depoimentos.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (index: number) => {
    const newSelected = [...selected];
    if (newSelected.includes(index)) {
      newSelected.splice(newSelected.indexOf(index), 1);
    } else {
      newSelected.push(index);
    }
    setSelected(newSelected);
  };

  const isButtonDisabled = selected.length === 0;

  const carregarSolicitacoes = async () => {
    setDepoimentos([]);
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await axios.get(`http://localhost:8080/api/depoimento/pendentes`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        setDepoimentos(response.data);
      } catch (error) {
        console.error("Erro ao carregar as solicitações:", error);
      }finally {
        setLoading(false);
      }
    };
  }
  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  return (
    <div className="w-full mb-10">

      <div className="mx-40 mb-5">
        {loading ? (
          <div className="flex justify-center mt-40 min-h-screen">
            <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
          </div>
        ) : depoimentos.length === 0 ? (
          <div className="text-center text-xl">Sem dados.</div>
        ) : (
          <Table
            solicitacoes={depoimentos}
            selected={selected}
            onCheckboxChange={handleCheckboxChange}
            onSelectAllChange={handleSelectAllChange}
            selectAll={selectAll}
          />
        )}
      </div>

      <div className="w-full flex justify-center items-center">
        <button
          className="text-xl px-4 py-2 rounded text-[#fff] border-[#216DC7] bg-[#216DC7] hover:bg-[#174a9d] transition-all"
        >
          Ver mais
        </button>
      </div> 
        
      <SolicitacaoButtons isButtonDisabled={isButtonDisabled}/>
    </div>
  );
}

export default DepoimentoSolicitacoes;