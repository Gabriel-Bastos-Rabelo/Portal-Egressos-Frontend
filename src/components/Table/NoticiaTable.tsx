import axios from 'axios';
import { Noticia } from '../../values/noticia.tsx'; 
import { useState } from 'react';
import NoticiaModal from '../Modals/NoticiaModal.tsx';
import SuccessMessage from '../Messages/SuccessMessage.tsx';
import RejectMessage from '../Messages/RejectMessage.tsx';

type TableProps = {
    solicitacoes: Noticia[];
    selected: number[];
    onCheckboxChange: (index: number) => void;
    onSelectAllChange: () => void;
    selectAll: boolean;
    onSuccess?: () => void;
};

function Table({ solicitacoes, selected, onCheckboxChange, onSelectAllChange, selectAll, onSuccess }: TableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<Noticia | null>(null);
  const [success, setSuccess] = useState(false);
  const [reject, setReject] = useState(false);
  
  const openModal = (solicitacao: Noticia) => {
    setSelectedSolicitacao(solicitacao);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleApprove = async (id: number) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      await axios.post(
        'http://44.205.22.49:8080/api/noticia/aprovar', 
        [id],
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
      }, 1500);
    } catch (error) {
      console.error("Erro ao aprovar a solicitação:", error);
    }
  };

  const handleReject = async (id: number) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      await axios.post(
        'http://44.205.22.49:8080/api/noticia/reprovar', 
        [id],
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setReject(true);
      setTimeout(() => {
        onSuccess?.();
      }, 1500);
    } catch (error) {
      console.error("Erro ao reprovar a solicitação:", error);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  
  return (
    <>
      {success && <SuccessMessage qtd_solicitacoes={1} tipo_solicitacao={"depoimento(s)"}/>}
      {reject && <RejectMessage qtd_solicitacoes={1} tipo_solicitacao={"depoimento(s)"}/>}
      
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-[#F1FBFF] text-xl">
            <th className="w-1/20 px-2 py-4 border border-[#000]">
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={selectAll}
                onChange={onSelectAllChange}
              />
            </th>
            <th className="w-6/20 px-2 py-4 border border-[#000]">Nome</th>
            <th className="w-10/20 px-2 py-4 border border-[#000] max-[900px]:hidden">Descrição</th>
            <th className="w-3/20 px-2 py-4 border border-[#000]">Ações</th>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.map((solicitacao, index) => (
            <tr key={index} className="border-b border-[#000] text-x1">
              <td className="px-2 py-4 flex justify-center text-2xl">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={selected.includes(index)}
                  onChange={() => onCheckboxChange(index)}
                />
              </td>
              <td className="px-2 py-4 font-bold text-center text-lg">{solicitacao.autor}</td>
              <td className="px-2 py-4 text-justify text-lg text-gray-600 max-[900px]:hidden">{truncateText(solicitacao.descricao, 100)}</td>
              <td className="px-2 py-4 flex justify-around gap-4">
                <i
                  className="fa-solid fa-magnifying-glass text-[#08276F] text-3xl cursor-pointer"
                  onClick={() => openModal(solicitacao)}
                ></i>
                <i
                  className="fa-solid fa-check text-[#106F1F] text-3xl cursor-pointer"
                  onClick={() => handleApprove(solicitacao.id)}
                ></i>
                <i
                  className="fa-solid fa-xmark text-[#DB3543] text-3xl cursor-pointer"
                  onClick={() => { 
                    handleReject(solicitacao.id);
                  }}
                  
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedSolicitacao && (
        <NoticiaModal
          noticia={selectedSolicitacao}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default Table;
