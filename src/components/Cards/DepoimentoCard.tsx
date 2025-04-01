import egressoImg from '../../assets/egresso-img.png';
import { Depoimento } from '../../values/depoimento.tsx'

const DepoimentoCard = ({ depoimento }: { depoimento: Depoimento }) => {
  return (
    <div className="rounded-lg shadow-xl flex items-center gap-4 py-5 px-10 my-5">
      <img
        src={depoimento.foto ? `http://localhost:8080/uploads/${depoimento.foto}` : egressoImg}
        alt="Foto do egresso"
        className="w-[128px] h-[128px] object-cover rounded-full shrink-0"
      />
      <div className="flex flex-col">
        <h3 className="text-xl">{depoimento.nomeEgresso}</h3>
        <p className="text-gray-600">{depoimento.curso}</p>
        <p className="text-gray-600 text-justify">{depoimento.descricao}</p>
      </div>
    </div>
  );
};

export default DepoimentoCard;