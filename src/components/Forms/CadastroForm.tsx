import './CadastroForm.css'; 
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Upload, ArrowRight } from "lucide-react";
import axios from 'axios';

interface FormData {
  nome: string;
  descricao: string;
  linkedin: string;
  curriculo: string;
  instagram: string;
  email: string;
  senha: string;
  curso: string;
  anoInicio: number;
  anoFim: number; 
  foto: FileList | null;
}

export default function CadastroForm({ onNext }: { onNext: (egressoId: number) => void }) {
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm<FormData>({
    mode: 'onChange',
  });

  interface Curso {
    id: number;
    nome: string;
    nivel: string;
  }

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [fotoNome, setFotoNome] = useState<string | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cursos/listarCursos');
        if (response.status === 200) {
          setCursos(response.data);
        } else {
          console.error('Erro ao buscar cursos', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar cursos', error);
      }
    };

    fetchCursos();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();

      formData.append('dto', new Blob([JSON.stringify({
        nome: data.nome,
        descricao: data.descricao,
        linkedin: data.linkedin || null,
        curriculo: data.curriculo || null,
        instagram: data.instagram || null,
        emailUsuario: data.email,
        senhaUsuario: data.senha,
        anoInicio: data.anoInicio,
        anoFim: data.anoFim,
        idCurso: data.curso,
      })], { type: 'application/json' }));

      if (data.foto && data.foto[0]) {
        formData.append('imagem', data.foto[0], data.foto[0].name);
      }

      const response = await axios.post('http://localhost:8080/api/egresso/salvar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status === 201) {
        const idEgresso = response.data.id; 
        onNext(idEgresso);
      } else {
        console.error('Erro ao salvar os dados', response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        const mensagem = typeof data === 'string' ? data : (data as { message?: string; mensagem?: string })?.message || (data as { mensagem?: string })?.mensagem;
    
        if (mensagem?.includes('email')) {
          setError('email', { message: mensagem });
        } else if (mensagem?.includes('Senha')) {
          setError('senha', { message: mensagem });
        } else if (mensagem?.includes('Nome')) {
          setError('nome', { message: mensagem });
        } else if (mensagem?.includes('Linkedin')) {
          setError('linkedin', { message: mensagem });
        } else if (mensagem?.includes('Instagram')) {
          setError('instagram', { message: mensagem });
        } else {
          alert(mensagem || 'Erro ao enviar os dados.');
        }
      } else {
        alert('Erro desconhecido ao enviar os dados.');
      }
    }    
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form-container">
      {/* Nome */}
      <div>
        <label htmlFor="nome" className="cadastro-label">Nome</label>
        <input {...register('nome', { required: 'Nome é obrigatório' })} id="nome" placeholder="Nome" className="cadastro-input" />
        {errors.nome && <p className="error-message">{errors.nome.message}</p>}
      </div>

      {/* Curso */}
      <div>
        <label htmlFor="curso" className="cadastro-label">Curso</label>
        <select {...register('curso', { required: 'Curso é obrigatório' })} id="curso" className="cadastro-input">
          <option value="">Selecione o curso</option>
          {cursos.length > 0 ? (
            cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>{curso.nivel}</option>
            ))
          ) : (
            <option value="" disabled>Carregando cursos...</option>
          )}
        </select>
        {errors.curso && <p className="error-message">{errors.curso.message}</p>}
      </div>

      {/* Ano de Início e Fim */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="anoInicio" className="cadastro-label">Ano de Início</label>
          <input {...register('anoInicio', { required: 'Ano de início é obrigatório' })} id="anoInicio" placeholder="Ano de Início" type="number" className="cadastro-input" />
          {errors.anoInicio && <p className="error-message">{errors.anoInicio.message}</p>}
        </div>
        <div className="flex-1">
          <label htmlFor="anoFim" className="cadastro-label">Ano de Fim</label>
          <input {...register('anoFim', { required: 'Ano de fim é obrigatório' })} id="anoFim" placeholder="Ano de Fim" type="number" className="cadastro-input" />
          {errors.anoFim && <p className="error-message">{errors.anoFim.message}</p>}
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label htmlFor="descricao" className="cadastro-label">Descrição</label>
        <textarea {...register('descricao', { required: 'Descrição é obrigatória' })} id="descricao" placeholder="Descrição" className="cadastro-textarea" />
        {errors.descricao && <p className="error-message">{errors.descricao.message}</p>}
      </div>

      {/* Linkedin */}
      <div>
        <label htmlFor="linkedin" className="cadastro-label">LinkedIn</label>
        <input {...register('linkedin')} id="linkedin" placeholder="Digite o link do seu perfil no LinkedIn" className="cadastro-input" type="url" />
        {errors.linkedin && <p className="error-message">{errors.linkedin.message}</p>}
      </div>

      {/* Currículo */}
      <div>
        <label htmlFor="curriculo" className="cadastro-label">Currículo Lattes</label>
        <input {...register('curriculo')} id="curriculo" placeholder="Digite o link do seu Lattes" className="cadastro-input" type="url" />
      </div>

      {/* Instagram */}
      <div>
        <label htmlFor="instagram" className="cadastro-label">Instagram</label>
        <input {...register('instagram')} id="instagram" placeholder="Digite o link do seu instagram" className="cadastro-input" type="text" />
        {errors.instagram && <p className="error-message">{errors.instagram.message}</p>}
      </div>

      {/* Foto */}
      <div>
        <label htmlFor="foto" className="cadastro-label">Foto</label>
        <div className="upload-container">
          <Upload className="upload-icon" />
          <span className="upload-text">Selecione uma foto</span>
          <input
            {...register('foto')}
            id="foto"
            type="file"
            accept="image/*"
            className="upload-input"
            onChange={(e) => {
              const fileList = e.target.files;
              if (fileList && fileList.length > 0) {
                setFotoNome(fileList[0].name);
              } else {
                setFotoNome(null);
              }
            }}
          />
        </div>
        {fotoNome && <p className="foto-nome">{fotoNome}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="cadastro-label">Email</label>
        <input {...register('email', { required: 'Email é obrigatório' })} id="email" type="email" placeholder="Digite seu email" className="cadastro-input" />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      {/* Senha */}
      <div>
        <label htmlFor="senha" className="cadastro-label flex items-center gap-2">
          Senha
          <div className="tooltip-container">
            <div className="tooltip-icon">?</div>
            <div className="tooltip-text">
              A senha deve conter:
              <ul>
                <li>- Pelo menos 1 caractere especial</li>
                <li>- Pelo menos uma letra maiúscula</li>
                <li>- No máximo 8 dígitos</li>
              </ul>
            </div>
          </div>
        </label>
        <input {...register('senha', { required: 'Senha é obrigatória' })} id="senha" type="password" placeholder="Digite sua senha" className="cadastro-input" />
        {errors.senha && <p className="error-message">{errors.senha.message}</p>}
      </div>

      {/* Botão */}
      <div className="flex justify-center mt-8">
        <button type="submit" disabled={!isValid} className={`btn-continuar ${isValid ? 'ativo' : ''}`}>
          <span className="mr-2">Continuar</span>
          <ArrowRight className="arrow-icon" />
        </button>
      </div>
    </form>
  );
}
