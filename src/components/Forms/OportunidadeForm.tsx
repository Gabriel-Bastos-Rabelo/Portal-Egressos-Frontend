import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CadastroForm.css'; // Pode ser um CSS separado pra oportunidades também!

type OportunidadeData = {
  titulo: string;
  descricao: string;
  local: string;
  tipo: string;
  dataPublicacao: string; // string no formato "YYYY-MM-DD"
  dataExpiracao: string; // string no formato "YYYY-MM-DD"
  salario?: number; // Opcional
  link: string;
};

export default function OportunidadeForm() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<OportunidadeData>({
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = async (data: OportunidadeData) => {
    try {
      // Recuperando infos do localStorage
      const idEgresso = localStorage.getItem('egressoId');
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('accessToken');

      if (!idEgresso || !email || !token) {
        console.error("Informações de autenticação não encontradas.");
        return;
      }

      const oportunidadeData = {
        ...data,
        email: email,
        idEgresso: parseInt(idEgresso),
      };

      const response = await axios.post(
        'http://localhost:8080/api/oportunidade/salvar',
        oportunidadeData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        console.log('Oportunidade cadastrada com sucesso!', response.data);
        navigate('/oportunidades');
      } else {
        console.error('Erro ao cadastrar oportunidade:', response.data);
      }
    } catch (error) {
      console.error('Erro ao enviar a oportunidade:', error);
    }
  };

  const handleVoltar = () => {
    navigate('/oportunidades');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form-container">
      <h2 className="text-xl font-bold mb-4">Cadastrar Oportunidade</h2>

      {/* Título */}
      <div>
        <label htmlFor="titulo" className="oportunidade-label">Título</label>
        <input
          {...register('titulo', { required: 'Título é obrigatório' })}
          id="titulo"
          placeholder="Título da vaga"
          className="oportunidade-input"
        />
        {errors.titulo && <p className="error-message">{errors.titulo.message}</p>}
      </div>

      {/* Descrição */}
      <div>
        <label htmlFor="descricao" className="oportunidade-label">Descrição</label>
        <textarea
          {...register('descricao', { required: 'Descrição é obrigatória' })}
          id="descricao"
          placeholder="Descrição da vaga"
          className="oportunidade-textarea"
        />
        {errors.descricao && <p className="error-message">{errors.descricao.message}</p>}
      </div>

      {/* Local */}
      <div>
        <label htmlFor="local" className="oportunidade-label">Local</label>
        <input
          {...register('local', { required: 'Local é obrigatório' })}
          id="local"
          placeholder="Local da vaga"
          className="oportunidade-input"
        />
        {errors.local && <p className="error-message">{errors.local.message}</p>}
      </div>

      {/* Tipo */}
      <div>
        <label htmlFor="tipo" className="oportunidade-label">Tipo</label>
        <select
          {...register('tipo', { required: 'Tipo é obrigatório' })}
          id="tipo"
          className="oportunidade-input"
        >
          <option value="">Selecione o tipo</option>
          <option value="Estágio">Estágio</option>
          <option value="Emprego">Emprego</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Temporário">Temporário</option>
        </select>
        {errors.tipo && <p className="error-message">{errors.tipo.message}</p>}
      </div>

      {/* Datas */}
      <div className="datas-container">
        <div className="data-field">
          <label htmlFor="dataPublicacao" className="oportunidade-label">Data de Publicação</label>
          <input
            {...register('dataPublicacao', { required: 'Data de publicação é obrigatória' })}
            type="date"
            id="dataPublicacao"
            className="oportunidade-input"
          />
          {errors.dataPublicacao && <p className="error-message">{errors.dataPublicacao.message}</p>}
        </div>

        <div className="data-field">
          <label htmlFor="dataExpiracao" className="oportunidade-label">Data de Expiração</label>
          <input
            {...register('dataExpiracao', { required: 'Data de expiração é obrigatória' })}
            type="date"
            id="dataExpiracao"
            className="oportunidade-input"
          />
          {errors.dataExpiracao && <p className="error-message">{errors.dataExpiracao.message}</p>}
        </div>
      </div>

      {/* Salário */}
      <div>
        <label htmlFor="salario" className="oportunidade-label">Salário (Opcional)</label>
        <input
          {...register('salario', { valueAsNumber: true })}
          id="salario"
          placeholder="R$ 1.500,00"
          type="number"
          className="oportunidade-input"
        />
      </div>

      {/* Link */}
      <div>
        <label htmlFor="link" className="oportunidade-label">Link para a vaga</label>
        <input
          {...register('link', { required: 'Link é obrigatório' })}
          id="link"
          placeholder="https://"
          type="url"
          className="oportunidade-input"
        />
        {errors.link && <p className="error-message">{errors.link.message}</p>}
      </div>

      {/* Botões */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={handleVoltar}
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
