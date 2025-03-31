type VerMaisButtonProps = {
    length_solicitacoes: number;
    length_visible_solicitacoes: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const VerMaisButton = ({ length_solicitacoes, length_visible_solicitacoes, setPage }: VerMaisButtonProps ) => {
  const haveMorePages = length_visible_solicitacoes < length_solicitacoes;

  return (
    <div className="w-full flex justify-center items-center gap-4 mt-10">
      {haveMorePages && (
        <button
          className="text-xl px-4 py-2 rounded text-white border-[#216DC7] bg-[#216DC7] hover:bg-[#174a9d] transition-all"
          onClick={() => setPage(prev => prev + 1)}
        >
            Ver mais
        </button>
      )}
    </div>
  );
};
  
export default VerMaisButton;
