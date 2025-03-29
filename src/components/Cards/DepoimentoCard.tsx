import egressoImg from '../../assets/egresso-img.png';
import { Depoimento } from '../../values/depoimento.tsx'

const DepoimentoCard = ({ depoimento }: { depoimento: Depoimento }) => {
  return (
    <div className="rounded-lg shadow-xl flex items-center gap-4 py-5 px-10 my-5">
      <img className= "rounded-full w-32 h-32" src={egressoImg} alt="Foto do egresso" />
      <div className="flex flex-col">
        <h3 className="text-xl">{depoimento.nomeEgresso}</h3>
        <p className="text-gray-600">{depoimento.curso}</p>
        <p className="text-gray-600 text-justify">{depoimento.descricao}</p>
      </div>
    </div>
  );
};

export default DepoimentoCard;