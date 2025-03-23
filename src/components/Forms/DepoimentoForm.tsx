import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Importando o axios
import './CadastroForm.css';

type DepoimentoData = {
  texto: string;
};

export default function DepoimentoForm({
  onBack,
  idEgresso 
}: { 
  onBack: () => void;
  idEgresso: number | null; 
}) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<DepoimentoData>({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const onSubmit = async (data: DepoimentoData) => {
    if (!idEgresso) {
      console.error("ID do egresso não encontrado");
      return;
    }
  
    const dataAtual = new Date().toISOString();
  
    console.log("Enviando dados:", {
      idEgresso,
      texto: data.texto,
      data: dataAtual,
    });
  
    try {
      const response = await axios.post(
        'http://localhost:8080/api/depoimento/salvar',
        {
          idEgresso,
          texto: data.texto,
          data: dataAtual,  // Adicionando a data no corpo da requisição
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      if (response.status === 201) {
        console.log('Depoimento salvo com sucesso!', response.data);
        navigate('/');
      } else {
        console.error('Erro ao salvar o depoimento', response.data);
      }
    } catch (error) {
      console.error('Erro ao enviar o depoimento', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form-container">
      <div className="mb-2">
        <p className="font-semibold text-sm">
          Compartilhe sua experiência e trajetória acadêmica/profissional para inspirar outros!
        </p>
      </div>

      <div className="flex flex-col">
        <textarea
          {...register('texto', { required: 'Depoimento é obrigatório' })}
          placeholder="Depoimento"
          className="depoimento-textarea"
          rows={6}
        />
        {errors.texto && (
          <p className="text-red-500 text-sm">{errors.texto.message}</p>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={onBack}
          className="btn-voltar flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <button
          type="submit"
          disabled={!isValid}
          className={`btn-enviar flex items-center gap-2 ${isValid ? 'ativo' : ''}`}
        >
          Enviar
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}