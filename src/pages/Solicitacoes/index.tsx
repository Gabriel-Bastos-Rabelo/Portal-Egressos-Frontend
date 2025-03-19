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
    { nomeEgresso: "Gabriel Bastos", texto: "Descrição aqui", tipo: "Descrição" }
  ]);
  
  return (
    <div>
      <div className="flex justify-around text-2xl my-8">
        <h2>Egressos</h2>
        <h2>Depoimentos</h2>
        <h2>Oportunidades</h2>
        <h2>Notícias</h2>
      </div>
      <div className="mx-40 mb-20">
        <Table solicitacoes={solicitacoes}/>
      </div>
    </div>
  );
}

export default Solicitacoes;