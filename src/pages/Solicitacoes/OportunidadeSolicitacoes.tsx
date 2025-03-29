import axios from 'axios';
import Table from '../../components/Table/OportunidadeTable.tsx'
import { useEffect, useState } from "react";
import { Oportunidade } from  '../../values/oportunidade.tsx'
import SolicitacaoButtons from '../../components/Buttons/SolicitacaoButtons.tsx';
import VerMaisButton from '../../components/Buttons/VerMaisButton.tsx';

const OportunidadeSolicitacoes = () => {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);
  const [selected, setSelected] = useState<number[]>([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const solicByPage = 10;

  const visibleOportunidades = oportunidades.slice(0, page * solicByPage);

  const getSelectedIds = (): number[] => {
    return selected.map((index) => oportunidades[index].id);
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(oportunidades.map((_, index) => index));
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
    setOportunidades([]);
    setSelected([]);
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await axios.get(`http://localhost:8080/api/oportunidade/pendentes`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        setOportunidades(response.data);
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
        ) : oportunidades.length === 0 ? (
          <div className="text-center text-xl">Sem dados.</div>
        ) : (
          <Table
            solicitacoes={visibleOportunidades}
            selected={selected}
            onCheckboxChange={handleCheckboxChange}
            onSelectAllChange={handleSelectAllChange}
            selectAll={selectAll}
            onSuccess={carregarSolicitacoes}
          />
        )}
      </div>

      <VerMaisButton 
        length_solicitacoes={oportunidades.length} 
        length_visible_solicitacoes={visibleOportunidades.length}
        page={page}
        setPage={setPage}
      />
        
      {!loading && oportunidades.length > 0 && (
        <SolicitacaoButtons 
          isButtonDisabled={isButtonDisabled}
          selected={getSelectedIds()}
          urlApprove='http://localhost:8080/api/oportunidade/aprovar'
          urlDisapprove='http://localhost:8080/api/oportunidade/reprovar'
          onSuccess={carregarSolicitacoes}
        />)}
    </div>
  );
}

export default OportunidadeSolicitacoes;