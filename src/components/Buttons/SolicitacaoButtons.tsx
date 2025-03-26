type SolicitacaoButtonsProps = {
    isButtonDisabled: boolean;
}

const SolicitacaoButtons = ({ isButtonDisabled }: SolicitacaoButtonsProps ) => {
  return (
    <div className="flex justify-start gap-5 mx-40">
      <button className={`flex gap-3 justify-center justify-items-center px-4 py-2 rounded text-[#fff] transition-all
                ${isButtonDisabled ? "bg-[#5B5B5B] cursor-not-allowed hover:bg-[#5B5B5B]" : "cursor-pointer bg-[#106F1F] border-[#106F1F] hover:bg-[#10661d]"}
                `}>
        <div className="text-xl">Aprovar</div>
        <i className="fa-solid fa-check text-[#fff] text-xl"></i>
      </button>
      <button className={`flex gap-3 justify-center justify-items-center px-4 py-2 rounded text-[#fff] transition-all
                ${isButtonDisabled ? "bg-[#5B5B5B] cursor-not-allowed hover:bg-[#5B5B5B]" : "cursor-pointer bg-[#DB3543] border-[#DB3543] hover:bg-[#bb222f]"}
                `}
      disabled={isButtonDisabled} 
      >
        <div className="text-xl">Recusar</div>
        <i className="fa-solid fa-xmark text-[#fff] text-xl"></i>
      </button>
    </div>
  );
};
  
export default SolicitacaoButtons;