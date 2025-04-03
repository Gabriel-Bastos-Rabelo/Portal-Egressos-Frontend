export type Depoimento = {
    id: number;
    nomeEgresso: string;
    curso: string;
    data: string;
    imagemEgresso: string;
    descricao: string;
    anoConclusao: number | null;
    status: string;
    foto: string | null;
  };