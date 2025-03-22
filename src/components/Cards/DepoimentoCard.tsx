import egressoImg from '../../assets/egresso-img.png';

export type Depoimento = {
  nomeEgresso: string;
  nomeCurso: string;
  imagemEgresso: string;
  texto: string;
};

const DepoimentoCard = ({ depoimento }: { depoimento: Depoimento }) => {
  return (
    <div className="rounded-lg shadow-xl flex items-center gap-4 py-5 px-10 my-5">
      <img className= "rounded-full w-32 h-32" src={egressoImg} alt="Foto do egresso" />
      <div className="flex flex-col">
        <h3 className="text-xl">{depoimento.nomeEgresso}</h3>
        <p className="text-gray-600">{depoimento.nomeCurso}</p>
        <p className="text-gray-600 text-justify">{depoimento.texto}</p>
      </div>
    </div>
  );
};

export default DepoimentoCard;