type OportunidadeModalProps = {
    onClose: () => void;
  };
  
const OportunidadeModal = ({ onClose }: OportunidadeModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] max-w-[90%] p-8 relative">
        {/* Botão de fechar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shadow-md hover:bg-gray-200 transition"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Fechar modal"
        >
            &times;
        </button>
  
        <h2 className="text-2xl font-bold text-center mb-3">Título da Oportunidade</h2>
  
        <div className="flex flex-col gap-4 text-gray-600">
          <div className="flex justify-between w-full gap-x-8">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-briefcase"></i>
              <p>Tipo: Integral</p>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-building-user"></i>
              <p>Local: Remoto</p>
            </div>
          </div>
  
          <div className="flex justify-between w-full gap-x-8">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-clock"></i>
              <p>Data da Publicação: dd/mm/aaaa</p>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-sack-dollar"></i>
              <p>Salário: R$5.000</p>
            </div>
          </div>
        </div>
  
        <p className="text-gray-600 text-justify mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc,
            facilisis vel luctus sed, venenatis sed quam. Phasellus ut hendrerit diam.
            Aliquam egestas mauris ac arcu accumsan scelerisque.
        </p>
  
        <p className="mt-2 text-blue-600 underline cursor-pointer">
            Link da oportunidade
        </p>
      </div>
    </div>
  );
};
  
export default OportunidadeModal;
  