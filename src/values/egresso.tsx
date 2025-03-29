export interface Egresso {
  id: number;
  nomeEgresso: string;
  descricao: string;
  foto: string;
  linkedin: string;
  instagram: string;
  curriculo: string | null;
  status: string;
  emailUsuario: string;
  curso: string;
  anoConclusao: number | null;
  idCurso: number;
  cargo: string | null;
}
