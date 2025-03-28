import axios from "axios";

type SolicitacaoButtonsProps = {
    isButtonDisabled: boolean;
    selected: number[];
    urlApprove: string;
    urlDisapprove: string;
    onSuccess?: () => void;
}

const SolicitacaoButtons = ({ isButtonDisabled, selected, urlApprove, urlDisapprove, onSuccess }: SolicitacaoButtonsProps ) => {
  const handleApprove = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(urlApprove, selected, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      alert("Solicitações aprovadas!");
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
      alert("Solicitações reprovadas!");
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
    } catch (error) {
      console.error("Erro ao reprovar as solicitações:", error);
    }
  };

  return (
    <div className="flex justify-start gap-5 mx-40">
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