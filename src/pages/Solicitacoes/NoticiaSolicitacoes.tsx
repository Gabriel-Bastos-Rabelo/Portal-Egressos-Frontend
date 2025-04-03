import axios from 'axios';
import Table from '../../components/Table/NoticiaTable.tsx'
import { useEffect, useState } from "react";
import { Noticia } from  '../../values/noticia.tsx'
import SolicitacaoButtons from '../../components/Buttons/SolicitacaoButtons.tsx';
import VerMaisButton from '../../components/Buttons/VerMaisButton.tsx';
import Loading from '../../components/Loading/index.tsx';

const NoticiaSolicitacoes = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [selected, setSelected] = useState<number[]>([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const solicByPage = 5;

  const visibleNoticias = noticias.slice(0, page * solicByPage);

  const getSelectedIds = (): number[] => {
    return selected.map((index) => noticias[index].id);
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(noticias.map((_, index) => index));
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
    setNoticias([]);
    setSelected([]);
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await axios.get(`/api/noticia/pendentes`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        setNoticias(response.data);
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

      <div className="mx-40 mb-5 max-[900px]:mx-5">
        {loading ? (
          <Loading/>
        ) : noticias.length === 0 ? (
          <div className="text-center text-xl">Sem dados.</div>
        ) : (
          <Table
            solicitacoes={visibleNoticias}
            selected={selected}
            onCheckboxChange={handleCheckboxChange}
            onSelectAllChange={handleSelectAllChange}
            selectAll={selectAll}
            onSuccess={carregarSolicitacoes}
          />
        )}
      </div>

      <VerMaisButton 
        length_solicitacoes={noticias.length} 
        length_visible_solicitacoes={visibleNoticias.length}
        setPage={setPage}
      />
        
      {!loading && noticias.length > 0 && (
        <SolicitacaoButtons 
          isButtonDisabled={isButtonDisabled}
          selected={getSelectedIds()}
          urlApprove='/api/noticia/aprovar'
          urlDisapprove='/api/noticia/reprovar'
          type_solicitacao='noticia'
          onSuccess={carregarSolicitacoes}
        />)}
    </div>
  );
}

export default NoticiaSolicitacoes;