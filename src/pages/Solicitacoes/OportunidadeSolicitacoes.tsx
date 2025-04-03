import axios from 'axios';
import Table from '../../components/Table/OportunidadeTable.tsx'
import { useEffect, useState } from "react";
import { Oportunidade } from  '../../values/oportunidade.tsx'
import SolicitacaoButtons from '../../components/Buttons/SolicitacaoButtons.tsx';
import VerMaisButton from '../../components/Buttons/VerMaisButton.tsx';
import Loading from '../../components/Loading/index.tsx';
import OportunidadeFilter from '../../components/Filters/OportunidadeFilter.tsx';

const OportunidadeSolicitacoes = () => {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);
  const [selected, setSelected] = useState<number[]>([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ titulo: '', data: '', tipo: '' });
  const [page, setPage] = useState(1);
  const solicByPage = 10;

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
        const response = await axios.get(`http://44.205.22.49:8080/api/oportunidade/pendentes`, {
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

  const oportunidadesFiltradas = oportunidades.filter(oportunidade => {
    const tituloMatch = oportunidade.titulo.toLowerCase().includes(filters.titulo.toLowerCase());
    const tipoMatch = filters.tipo === '' || oportunidade.tipo === filters.tipo;
    const dataMatch = filters.data === '' || 
      new Date(oportunidade.dataExpiracao) > new Date(filters.data);
    return tituloMatch && tipoMatch && dataMatch;
  });

  const handleFiltrar = (filters:  { titulo: string; data: string; tipo: string }) => {
    setFilters(filters);
    setPage(1);
  };

  const handleLimpar = () => {
    setFilters({ titulo: '', data: '', tipo: '' });
    setPage(1);
  };

  const paginatedOportunidades = oportunidadesFiltradas.slice(0, page * solicByPage);

  return (
    <div className="w-full mb-10">

      <div className="mx-40 mb-5 max-[900px]:mx-5">
        {loading ? (
          <Loading/>
        ) : oportunidadesFiltradas.length === 0 ? (
          <>
            <OportunidadeFilter
              onFiltrar={handleFiltrar}
              onLimpar={handleLimpar}
            />
            <div className="text-center text-xl">Sem dados.</div>
          </>
        ) : (
          <>
            <OportunidadeFilter
              onFiltrar={handleFiltrar}
              onLimpar={handleLimpar}
            />
            <Table
              solicitacoes={paginatedOportunidades}
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
        length_solicitacoes={oportunidadesFiltradas.length} 
        length_visible_solicitacoes={paginatedOportunidades.length}
        setPage={setPage}
      />
        
      {!loading && oportunidades.length > 0 && (
        <SolicitacaoButtons 
          isButtonDisabled={isButtonDisabled}
          selected={getSelectedIds()}
          urlApprove='http://44.205.22.49:8080/api/oportunidade/aprovar'
          urlDisapprove='http://44.205.22.49:8080/api/oportunidade/reprovar'
          type_solicitacao='oportunidade'
          onSuccess={carregarSolicitacoes}
        />)}
    </div>
  );
}

export default OportunidadeSolicitacoes;