
import { useForm } from 'react-hook-form';
import { ArrowRight } from "lucide-react";
import axios from 'axios';  // Importando o axios
import './CadastroForm.css';

type DepoimentoData = {
  texto: string;
};

type DepoimentoFormProps = {
  onNextStep: () => void;
  onCancel: () => void; 
  idEgresso: number | null;
};

export default function DepoimentoForm({
  onNextStep,
  onCancel,
  idEgresso,
}: DepoimentoFormProps) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<DepoimentoData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: DepoimentoData) => {
    if (!idEgresso) {
      console.error("ID do egresso não encontrado");
      return;
    }

    const dataAtual = new Date().toISOString();

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
        onNextStep(); 
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
          onClick={onCancel}  // Chamando a função onCancel para redirecionar para a home
          className="btn-voltar flex items-center gap-2"
        >
          Cancelar
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
