import logoUfma from '../../assets/logoUfma.png';

const NoticiaCard = () => {
  return (
    <div className="rounded-lg shadow-xl flex items-center gap-4 py-5 px-10 my-5">
      <div className="flex flex-col">
        <h3 className="text-xl">Título da Notícia</h3>
        <p className="text-gray-600">dd/mm/aaaa</p>
        <p className="text-gray-600 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, facilisis vel luctus sed, venenatis sed quam. Phasellus ut hendrerit diam. Aliquam egestas mauris ac arcu accumsan scelerisque.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, facilisis vel luctus sed, venenatis sed quam. Phasellus ut hendrerit diam. Aliquam egestas mauris ac arcu accumsan scelerisque.
        </p>
      </div>
      <img className= "rounded-full w-32 h-32" src={logoUfma} alt="Logo da UFMA" />
    </div>
  );
};

export default NoticiaCard;