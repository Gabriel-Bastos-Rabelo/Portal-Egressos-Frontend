import { Solicitacoes } from '../../pages/Solicitacoes'; 

type TabelaProps = {
    solicitacoes: Solicitacoes[]; // Definindo o tipo da prop como um array de objetos Solicitacoes
  };

function Table({ solicitacoes }: TabelaProps) {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-[#F1FBFF] text-xl">
          <th className="w-1/20 px-2 py-4 border border-[#000]">
            <input type="checkbox" className="w-5 h-5"/>
          </th>
          <th className="w-6/20 px-2 py-4 border border-[#000]">
                    Nome Egresso
          </th>
          <th className="w-10/20 px-2 py-4 border border-[#000]">
            {solicitacoes[0].tipo}
          </th>
          <th className="w-3/20 px-2 py-4 border border-[#000]">
                    Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {solicitacoes.map((solicitacao, index) => (
          <tr key={index} className="border-b border-[#000] text-x1">
            <td className="px-2 py-4 flex justify-center text-2xl">
              <input
                type="checkbox" className="w-5 h-5 flex items-center"
              />
            </td>
            <td className="px-2 py-4 font-bold text-center text-lg">{solicitacao.nomeEgresso}</td>
            <td className="px-2 py-4 text-justify text-lg text-gray-600">{solicitacao.texto}</td>
            <td className="px-2 py-4 flex justify-around gap-4">
              <i className="fa-solid fa-magnifying-glass text-[#08276F] text-3xl"></i>
              <i className="fa-solid fa-check text-[#106F1F] text-3xl"></i>
              <i className="fa-solid fa-xmark text-[#DB3543] text-3xl"></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
