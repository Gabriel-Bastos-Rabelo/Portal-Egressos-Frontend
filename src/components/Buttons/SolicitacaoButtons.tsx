import axios from "axios";
import { useState } from "react";
import SuccessMessage from "../Messages/SuccessMessage";
import RejectMessage from "../Messages/RejectMessage";

type SolicitacaoButtonsProps = {
    isButtonDisabled: boolean;
    selected: number[];
    urlApprove: string;
    urlDisapprove: string;
    type_solicitacao: string;
    onSuccess?: () => void;
}

const SolicitacaoButtons = ({ isButtonDisabled, selected, urlApprove, urlDisapprove, type_solicitacao, onSuccess }: SolicitacaoButtonsProps ) => {
  const [success, setSuccess] = useState(false);
  const [reject, setReject] = useState(false);
  
  const handleApprove = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(urlApprove, selected, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
    } catch (error) {
      console.error("Erro ao aprovar as solicitações:", error);
    }
  };

  const handleReject = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(urlDisapprove, selected, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setReject(true);
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
    } catch (error) {
      console.error("Erro ao reprovar as solicitações:", error);
    }
  };

  return (
    <div className="flex justify-start gap-5 mx-40">
      {success && <SuccessMessage qtd_solicitacoes={selected.length} tipo_solicitacao={type_solicitacao + "(s)"}/>}
      {reject && <RejectMessage qtd_solicitacoes={selected.length} tipo_solicitacao={type_solicitacao + "(s)"}/>}
      
      <button
        className={`flex gap-3 justify-center justify-items-center px-4 py-2 rounded text-[#fff] transition-all
                ${isButtonDisabled ? "bg-[#5B5B5B] cursor-not-allowed hover:bg-[#5B5B5B]" : "cursor-pointer bg-[#106F1F] border-[#106F1F] hover:bg-[#10661d]"}
                `}
        onClick={handleApprove}
        disabled={isButtonDisabled}
      >
        <div className="text-xl">Aprovar</div>
        <i className="fa-solid fa-check text-[#fff] text-xl"></i>
      </button>

      <button
        className={`flex gap-3 justify-center justify-items-center px-4 py-2 rounded text-[#fff] transition-all
                ${isButtonDisabled ? "bg-[#5B5B5B] cursor-not-allowed hover:bg-[#5B5B5B]" : "cursor-pointer bg-[#DB3543] border-[#DB3543] hover:bg-[#bb222f]"}
                `}
        onClick={handleReject}
        disabled={isButtonDisabled}
      >
        <div className="text-xl">Recusar</div>
        <i className="fa-solid fa-xmark text-[#fff] text-xl"></i>
      </button>
    </div>
  );
};
  
export default SolicitacaoButtons;