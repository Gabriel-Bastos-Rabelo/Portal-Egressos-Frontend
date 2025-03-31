import { useState, useEffect } from "react";

type RejectMessageProps = { 
  qtd_solicitacoes: number;
  tipo_solicitacao: string;
};

const RejectMessage = ({ qtd_solicitacoes, tipo_solicitacao }: RejectMessageProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="rounded-lg shadow-lg fixed top-5 left-30 right-30 bg-[#FFE7DA] text-[#B7243E] p-4 mb-4 z-50 flex items-center gap-2">
      <i className="fa-solid fa-circle-check text-2xl mr-2"></i>
      <p className="text-xl font-poppins">{qtd_solicitacoes} {tipo_solicitacao} recusado(s) com sucesso!</p>
    </div>
  );
};

export default RejectMessage;