import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function BotaoEnviarOportunidade() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/oportunidades/enviarOportunidade"); 
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-900 hover:bg-blue-800 text-white text-lg px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
    >
      <Plus className="w-5 h-5" />
      Enviar Oportunidade
    </button>
  );
}
