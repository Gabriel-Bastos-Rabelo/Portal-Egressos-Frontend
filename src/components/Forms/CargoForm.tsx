import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight } from "lucide-react";
import './CadastroForm.css';
import axios from 'axios';

type CargoData = {
  cargo: string;
  local: string;
  anoInicio: number;
  anoFim: number;
};

const cargos = [
  'Desenvolvedor de Software',
  'Analista de Sistemas',
  'Engenheiro de Software',
  'Arquiteto de Software',
  'Cientista de Dados',
  'Especialista em IA',
  'Desenvolvedor Frontend',
  'Desenvolvedor Backend',
  'Outro',
];

export default function CargoForm({
  onBack,
  idEgresso,
}: {
  onBack: () => void;
  idEgresso: number;
}) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<CargoData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: CargoData) => {
    if (!idEgresso) {
      console.error("ID do egresso não encontrado");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/cargo', 
        {
          egresso: idEgresso,
          descricao: data.cargo,
          local: data.local,
          anoInicio: data.anoInicio,
          anoFim: data.anoFim,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        console.log('Cargo salvo com sucesso!', response.data);
      } else {
        console.error('Erro ao salvar o cargo', response.data);
      }
    } catch (error) {
      console.error('Erro ao enviar o cargo', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form-container">
      <div>
        <label htmlFor="cargo" className="cadastro-label">Cargo</label>
        <select
          {...register('cargo', { required: 'Cargo é obrigatório' })}
          id="cargo"
          className="cadastro-input"
        >
          <option value="">Selecione um cargo</option>
          {cargos.map((cargo, index) => (
            <option key={index} value={cargo}>{cargo}</option>
          ))}
        </select>
        {errors.cargo && <p className="error-message">{errors.cargo.message}</p>}
      </div>

      <div>
        <label htmlFor="local" className="cadastro-label">Local</label>
        <input
          {...register('local', { required: 'Local é obrigatório' })}
          id="local"
          placeholder="Local"
          className="cadastro-input"
        />
        {errors.local && <p className="error-message">{errors.local.message}</p>}
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="anoInicio" className="cadastro-label">Ano de Início</label>
          <input
            {...register('anoInicio', { required: 'Ano de início é obrigatório' })}
            id="anoInicio"
            placeholder="Ano de Início"
            type="number"
            className="cadastro-input"
          />
          {errors.anoInicio && <p className="error-message">{errors.anoInicio.message}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="anoFim" className="cadastro-label">Ano de Fim</label>
          <input
            {...register('anoFim', { required: 'Ano de fim é obrigatório' })}
            id="anoFim"
            placeholder="Ano de Fim"
            type="number"
            className="cadastro-input"
          />
          {errors.anoFim && <p className="error-message">{errors.anoFim.message}</p>}
        </div>
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
