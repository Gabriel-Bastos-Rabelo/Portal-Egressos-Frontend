import axios from 'axios';
import { useState, useEffect } from "react";
import { Depoimento } from '../../values/depoimento.tsx';
import SolicitacaoButtons from '../../components/Buttons/SolicitacaoButtons.tsx';
import VerMaisButton from '../../components/Buttons/VerMaisButton.tsx';
import Loading from '../../components/Loading/index.tsx';
import Table from '../../components/Table/DepoimentoTable.tsx';
import DepoimentoFilter from '../../components/Filters/DepoimentoFilter.tsx';

const DepoimentoSolicitacoes = () => {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);
  const [selected, setSelected] = useState<number[]>([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ nome: '', curso: '', ano: '' });
  const [page, setPage] = useState(1);
  const solicByPage = 10;

  const getSelectedIds = (): number[] => {
    return selected.map((index) => depoimentos[index].id);
  };

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
    setSelected([]);
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await axios.get(`http://44.205.22.49:8080/api/depoimento/pendentes`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        const sortedDepoimentos = response.data.sort((a: Depoimento, b: Depoimento) =>
          a.nomeEgresso.localeCompare(b.nomeEgresso)
        );
        setDepoimentos(sortedDepoimentos);

      } catch (error) {
        console.error("Erro ao carregar as solicitações:", error);
      } finally {
        setLoading(false);
      }
    };
  };

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const depoimentosFiltrados = depoimentos.filter((depoimento) => {
    const nomeMatch = depoimento.nomeEgresso.toLowerCase().includes(filters.nome.toLowerCase());
    const cursoMatch = filters.curso === '' || depoimento.curso === filters.curso;
    const anoMatch = filters.ano === '' || depoimento.anoConclusao?.toString() === filters.ano;
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

  const paginatedDepoimentos = depoimentosFiltrados.slice(0, page * solicByPage);

  return (
    <div className="w-full mb-10">
      <div className="mx-40 mb-5 max-[900px]:mx-5">
        {loading ? (
          <Loading />
        ) : depoimentosFiltrados.length === 0 ? (
          <>
            <DepoimentoFilter
              onFiltrar={handleFiltrar}
              onLimpar={handleLimpar}
            />
            <div className="text-center text-xl">Sem dados.</div>
          </>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <DepoimentoFilter
              onFiltrar={handleFiltrar}
              onLimpar={handleLimpar}
            />

            <Table
              solicitacoes={paginatedDepoimentos}
              selected={selected}
              onCheckboxChange={handleCheckboxChange}
              onSelectAllChange={handleSelectAllChange}
              selectAll={selectAll}
              onSuccess={carregarSolicitacoes}
            />
          </div>
        )}
      </div>
      <VerMaisButton 
        length_solicitacoes={depoimentosFiltrados.length}
        length_visible_solicitacoes={paginatedDepoimentos.length}
        setPage={setPage}
      />

      {!loading && depoimentosFiltrados.length > 0 && (
        <SolicitacaoButtons 
          isButtonDisabled={isButtonDisabled}
          selected={getSelectedIds()}
          urlApprove='http://44.205.22.49:8080/api/depoimento/aprovar'
          urlDisapprove='http://44.205.22.49:8080/api/depoimento/reprovar'
          type_solicitacao='depoimento'
          onSuccess={carregarSolicitacoes}
        /> )}
    </div>
  );
};

export default DepoimentoSolicitacoes;
