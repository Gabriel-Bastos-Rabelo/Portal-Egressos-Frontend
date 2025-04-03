import axios from 'axios';
import { useState, useEffect } from "react";
import { Egresso } from  '../../values/egresso.tsx';
import SolicitacaoButtons from '../../components/Buttons/SolicitacaoButtons.tsx';
import VerMaisButton from '../../components/Buttons/VerMaisButton.tsx';
import Loading from '../../components/Loading/index.tsx';
import Table from '../../components/Table/EgressoTable.tsx';
import EgressoFilter from '../../components/Filters/EgressoFilter.tsx';

const EgressoSolicitacoes = () => {
  const [egressos, setEgressos] = useState<Egresso[]>([]);
  const [selected, setSelected] = useState<number[]>([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ nome: '', curso: '', ano: '' });
  const [page, setPage] = useState(1);
  const solicByPage = 10;

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
        const response = await axios.get(`http://44.205.22.49:8080/api/egresso/pendentes`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        const sortedEgressos = response.data.sort((a: Egresso, b: Egresso) =>
          a.nomeEgresso.localeCompare(b.nomeEgresso)
        );
        setEgressos(sortedEgressos);
      } catch (error) {
        console.error("Erro ao carregar as solicitações:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const egressosFiltrados = egressos.filter((egresso) => {
    const nomeMatch = egresso.nomeEgresso.toLowerCase().includes(filters.nome.toLowerCase());
    const cursoMatch = filters.curso === '' || egresso.curso === filters.curso;
    const anoMatch = filters.ano === '' || egresso.anoConclusao?.toString() === filters.ano;
    return nomeMatch && cursoMatch && anoMatch;
  });

  const handleFiltrar = (filters: { nome: string; curso: string; ano: string }) => {
    setFilters(filters);
    setPage(1);
  };

  const handleLimpar = () => {
    setFilters({ nome: '', curso: '', ano: '' });
    setPage(1);
  };

  const paginatedEgressos = egressosFiltrados.slice(0, page * solicByPage);

  return (
    <div className="w-full mb-10">
      <div className="mx-40 mb-5 max-[900px]:mx-5">
        {loading ? (
          <Loading />
        ) : egressosFiltrados.length === 0 ? (
          <>
            <EgressoFilter
              onFiltrar={handleFiltrar}
              onLimpar={handleLimpar}
            />
            <div className="text-center text-xl">Sem dados.</div>
          </>
        ) : (
          <>
            <EgressoFilter
              onFiltrar={handleFiltrar}
              onLimpar={handleLimpar}
            />

            <Table
              solicitacoes={paginatedEgressos}
              selected={selected}
              onCheckboxChange={handleCheckboxChange}
              onSelectAllChange={handleSelectAllChange}
              selectAll={selectAll}
              onSuccess={carregarSolicitacoes}
            />
          </>
        )}
      </div>
        
      <VerMaisButton 
        length_solicitacoes={egressosFiltrados.length} 
        length_visible_solicitacoes={paginatedEgressos.length}
        setPage={setPage}
      />
        
      {!loading && egressos.length > 0 && (
        <SolicitacaoButtons 
          isButtonDisabled={isButtonDisabled}
          selected={getSelectedIds()}
          urlApprove='http://44.205.22.49:8080/api/egresso/aprovar'
          urlDisapprove='http://44.205.22.49:8080/api/egresso/reprovar'
          type_solicitacao='egresso'
          onSuccess={carregarSolicitacoes}
        />)}
    </div>
  );
};

export default EgressoSolicitacoes;