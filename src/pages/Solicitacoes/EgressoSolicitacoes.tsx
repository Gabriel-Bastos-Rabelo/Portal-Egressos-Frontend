import axios from 'axios';
import Table from '../../components/Table/EgressoTable.tsx'
import { useEffect, useState } from "react";
import { Egresso } from  '../../values/egresso.tsx'
import SolicitacaoButtons from '../../components/Buttons/SolicitacaoButtons.tsx';
import VerMaisButton from '../../components/Buttons/VerMaisButton.tsx';
import Loading from '../../components/Loading/index.tsx';

const EgressoSolicitacoes = () => {
  const [egressos, setEgressos] = useState<Egresso[]>([]);
  const [selected, setSelected] = useState<number[]>([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const solicByPage = 10;

  const visibleEgressos = egressos.slice(0, page * solicByPage);

  const getSelectedIds = (): number[] => {
    return selected.map((index) => egressos[index].id);
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(egressos.map((_, index) => index));
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
    setEgressos([]);
    setSelected([]);
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await axios.get(`http://localhost:8080/api/egresso/pendentes`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        setEgressos(response.data);
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
          <Loading/>
        ) : egressos.length === 0 ? (
          <div className="text-center text-xl">Sem dados.</div>
        ) : (
          <Table
            solicitacoes={visibleEgressos}
            selected={selected}
            onCheckboxChange={handleCheckboxChange}
            onSelectAllChange={handleSelectAllChange}
            selectAll={selectAll}
            onSuccess={carregarSolicitacoes}
          />
        )}
      </div>

      <VerMaisButton 
        length_solicitacoes={egressos.length} 
        length_visible_solicitacoes={visibleEgressos.length}
        setPage={setPage}
      />
        
      {!loading && egressos.length > 0 && (
        <SolicitacaoButtons 
          isButtonDisabled={isButtonDisabled}
          selected={getSelectedIds()}
          urlApprove='http://localhost:8080/api/egresso/aprovar'
          urlDisapprove='http://localhost:8080/api/egresso/reprovar'
          type_solicitacao='egresso'
          onSuccess={carregarSolicitacoes}
        />)}

    </div>
  );
}

export default EgressoSolicitacoes;