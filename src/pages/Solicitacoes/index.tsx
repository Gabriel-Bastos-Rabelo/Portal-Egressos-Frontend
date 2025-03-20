import Table from '../../components/Table'
import { useState } from "react";

export type Solicitacoes = {
  nomeEgresso: string;
  texto: string;
  tipo: string
};

function Solicitacoes() {
  const [solicitacoes] = useState<Solicitacoes[]>([
    { nomeEgresso: "Anderson Lopes", texto: "Descrição aqui fdasçkfnmadofdan afjadopifjad oajfadfad pjfpadfjpadifad jadpofjadpfjadf oiadpfjadf pfjpadjf pajdpfjadf ad-jkadfpjaf ", tipo: "Descrição" },
    { nomeEgresso: "Joana Kuelvia", texto: "Descrição aqui", tipo: "Descrição" },
    { nomeEgresso: "Sabryna Rodrigues", texto: "Descrição aqui", tipo: "Descrição" },
    { nomeEgresso: "Gabriel Bastos", texto: "Descrição aqui", tipo: "Descrição" },
    { nomeEgresso: "Anderson Lopes", texto: "Descrição aqui fdasçkfnmadofdan afjadopifjad oajfadfad pjfpadfjpadifad jadpofjadpfjadf oiadpfjadf pfjpadjf pajdpfjadf ad-jkadfpjaf ", tipo: "Descrição" },
    { nomeEgresso: "Joana Kuelvia", texto: "Descrição aqui", tipo: "Descrição" },
    { nomeEgresso: "Sabryna Rodrigues", texto: "Descrição aqui", tipo: "Descrição" },
    { nomeEgresso: "Gabriel Bastos", texto: "Descrição aqui", tipo: "Descrição" }
  ]);

  const [selected, setSelected] = useState<number[]>([]); // Estado para armazenar as checkboxes selecionadas
  const [selectAll, setSelectAll] = useState(false);
  
  const handleCheckboxChange = (index: number) => {
    const newSelected = [...selected];
    if (newSelected.includes(index)) {
      newSelected.splice(newSelected.indexOf(index), 1);
    } else {
      newSelected.push(index);
    }
    setSelected(newSelected);
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(solicitacoes.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const isButtonDisabled = selected.length === 0;

  return (
    <div className="w-full h-screen mb-10">
      <div className="flex justify-around text-2xl my-8">
        <h2>Egressos</h2>
        <h2>Depoimentos</h2>
        <h2>Oportunidades</h2>
        <h2>Notícias</h2>
      </div>
      <div className="mx-40 mb-5">
        <Table
          solicitacoes={solicitacoes}
          selected={selected}
          onCheckboxChange={handleCheckboxChange}
          onSelectAllChange={handleSelectAllChange}
          selectAll={selectAll}
        />
      </div>

      <div className="w-full flex justify-center items-center">
        <button className="text-xl px-4 py-2 rounded text-[#fff] border-[#216DC7] bg-[#216DC7] hover:bg-[#174a9d] transition-all"
          disabled={isButtonDisabled}
        >
          Ver mais
        </button>
      </div>

      <div className="flex justify-start gap-5 mx-40">
        <button className={`flex gap-3 justify-center justify-items-center cursor-pointer px-4 py-2 rounded text-[#fff] border-[#106F1F] bg-[#106F1F] hover:bg-[#10661d] transition-all ${isButtonDisabled ? "bg-[#5B5B5B] cursor-not-allowed hover:bg-[#5B5B5B]" : ""}`}
          disabled={isButtonDisabled}
        >
          <div className="text-xl">Aprovar</div>
          <i className="fa-solid fa-check text-[#fff] text-xl"></i>
        </button>
        <button className={`flex gap-3 justify-center justify-items-center cursor-pointer px-4 py-2 rounded text-[#fff] border-[#DB3543] bg-[#DB3543] hover:bg-[#bb222f] transition-all ${isButtonDisabled ? "bg-[#5B5B5B] cursor-not-allowed hover:bg-[#5B5B5B]" : ""}`}
          disabled={isButtonDisabled} 
        >
          <div className="text-xl">Recusar</div>
          <i className="fa-solid fa-xmark text-[#fff] text-xl"></i>
        </button>
      </div>
    </div>
  );
}

export default Solicitacoes;