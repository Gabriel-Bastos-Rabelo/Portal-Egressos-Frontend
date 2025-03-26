import { FileText, Save, User } from "lucide-react";
import egressoImg from '../../assets/egresso-img.png'; // Default image case (se não houver foto)
import { useState, useEffect } from "react";
import axios from "axios";

type Curso = {
  id: number;
  nivel: string;
};

type FormData = {
  nome: string;
  descricao: string;
  linkedin: string;
  lattes: string;
  instagram: string;
  depoimento: string;
  idCurso: string;
  anoInicio: number;
  anoFim: number;
  foto: string; 
  idDepoimento?: number;
};

const formFields: { id: keyof FormData; label: string; type: string }[] = [
  { id: "nome", label: "Nome", type: "text" },
  { id: "descricao", label: "Descrição", type: "textarea" },
  { id: "linkedin", label: "Linkedin", type: "text" },
  { id: "lattes", label: "Currículo Lattes", type: "text" },
  { id: "instagram", label: "Instagram", type: "text" },
];

const EditarPerfil = () => {
  const [activeSection, setActiveSection] = useState<"dadosPessoais" | "depoimento">("dadosPessoais");

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: '',
    linkedin: '',
    lattes: '',
    instagram: '',
    depoimento: '',
    idCurso: '',
    anoInicio: 0,
    anoFim: 0,
    foto: '', 
  });

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [imagem, setImagem] = useState<File | null>(null);

  const egressoId = localStorage.getItem('egressoId');
  const token = localStorage.getItem('accessToken');

  const [nomeExibido, setNomeExibido] = useState<string>('');

  useEffect(() => {
    const fetchEgressoData = async () => {
      if (!egressoId || !token) return;

      try {
        const response = await axios.get(`http://localhost:8080/api/egresso/buscar/${egressoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = response.data;

        setFormData({
          nome: data.nome || '',
          descricao: data.descricao || '',
          linkedin: data.linkedin || '',
          lattes: data.curriculo || '',
          instagram: data.instagram || '',
          depoimento: data.depoimento || '',
          idCurso: data.idCurso?.toString() || '',
          anoInicio: data.anoInicio || 0,
          anoFim: data.anoFim || 0,
          foto: data.foto || '',  // Adicionando a foto
          idDepoimento: data.idDepoimento,
        });

        setNomeExibido(data.nome || ''); // Atualizar o nome exibido ao lado da foto
      } catch (error) {
        console.error("Erro ao buscar dados do egresso:", error);
      }
    };

    fetchEgressoData();
  }, [egressoId, token]);

  useEffect(() => {
    const fetchCursos = async () => {
      if (!token) return;

      try {
        const response = await axios.get('http://localhost:8080/api/cursos/listarCursos', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setCursos(response.data);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    };

    fetchCursos();
  }, [token]);

  const handleSectionChange = (section: "dadosPessoais" | "depoimento") => {
    setActiveSection(section);

    if (section === "depoimento") {
      fetchDepoimento();
    }
  };

  const fetchDepoimento = async () => {
    if (!egressoId || !token) {
      console.error("Egresso ID ou token não encontrado.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/depoimento/buscar/${egressoId}`,  
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;

      setFormData((prevData) => ({
        ...prevData,
        depoimento: data.texto || '',
        idDepoimento: data.id,  
      }));

      console.log("Depoimento carregado:", data);
    } catch (error) {
      console.error("Erro ao buscar depoimento:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    fieldId: keyof FormData
  ) => {
    setFormData({ ...formData, [fieldId]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagem(file);
    }
  };

  const handleSave = async () => {
    if (!egressoId || !token) return;
  
    const formDataToSend = new FormData();
  
    // Enviar os dados do formulário como JSON
    formDataToSend.append('dto', new Blob([JSON.stringify({
      nome: formData.nome,
      descricao: formData.descricao,
      linkedin: formData.linkedin,
      lattes: formData.lattes,
      instagram: formData.instagram,
      idCurso: formData.idCurso,
      anoInicio: formData.anoInicio,
      anoFim: formData.anoFim,
    })], { type: 'application/json' }));
  
    // Se uma nova imagem foi escolhida, envia a nova imagem
    if (imagem) {
      formDataToSend.append('imagem', imagem);
    }
    // Não adicionar o campo "imagem" se não houver uma nova imagem
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/egresso/atualizar/${egressoId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Dados atualizados:', response.data);
      window.location.reload(); // Recarregar a página após sucesso
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar os dados!");
    }
  };
  
  const handleSaveDepoimento = async () => {
    if (!formData.idDepoimento || !formData.depoimento) return; 
  
    const dataAtual = new Date().toISOString();
  
    const payload = {
      idEgresso: egressoId,
      texto: formData.depoimento,  
      data: dataAtual,  
    };
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/depoimento/atualizar/${formData.idDepoimento}`,  
        payload, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
        }
      );

      console.log('Depoimento atualizado:', response.data);
      alert("Depoimento atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar depoimento:", error);
      alert("Erro ao salvar o depoimento!");
    }
  };

  return (
    <main className="container mx-auto py-12 flex justify-center gap-8">
      {/* Sidebar */}
      <div className="w-120 flex flex-col gap-6">
        <div className="flex flex-row items-center mb-8">
          {/* Exibir imagem ou foto do egresso */}
          <img className="w-[120px] h-[120px] rounded-full object-cover mb-4" alt="Foto do Egresso" 
               src={formData.foto ? `http://localhost:8080/uploads/${formData.foto}` : egressoImg} />
            {/* Exibir o nome do egresso ao lado da foto */}
          <h2 className="font-normal text-2xl p-8">{nomeExibido || "Nome Egresso"}</h2>
        </div>

        <div
          onClick={() => handleSectionChange("dadosPessoais")}
          className={`w-70 p-4 cursor-pointer hover:bg-gray-200 ${activeSection === "dadosPessoais" ? 'bg-gray-200' : ''}`}
        >
          <User className="w-7 h-7 mr-3 inline" /> Dados Pessoais
        </div>

        <div
          onClick={() => handleSectionChange("depoimento")}
          className={`w-70 p-4 cursor-pointer hover:bg-gray-200 ${activeSection === "depoimento" ? 'bg-gray-200' : ''}`}
        >
          <FileText className="w-7 h-7 mr-3 inline" /> Depoimento
        </div>
      </div>

      {/* Formulário principal */}
      <div className="w-120">
        {activeSection === "dadosPessoais" && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-center">Editar Dados</h1>

            <div className="flex flex-col gap-4">
              {formFields.map((field) => (
                <div key={field.id} className="flex flex-col">
                  <label className="font-semibold text-lg mb-2">{field.label}</label>

                  {field.type === "textarea" ? (
                    <textarea
                      className="p-4 border border-stone-500 rounded-lg w-full"
                      value={formData[field.id]}
                      onChange={(e) => handleChange(e, field.id)}
                    />
                  ) : (
                    <input
                      type={field.type}
                      className="p-4 border border-stone-500 rounded-lg w-full"
                      value={formData[field.id]}
                      onChange={(e) => handleChange(e, field.id)}
                    />
                  )}
                </div>
              ))}

              {/* Curso */}
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2">Curso</label>
                <select
                  className="p-4 border border-stone-500 rounded-lg w-full"
                  value={formData.idCurso}
                  onChange={(e) => handleChange(e, "idCurso")}
                >
                  <option value="">Selecione um curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.id} value={curso.id.toString()}>
                      {curso.nivel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Anos de Início e Fim */}
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label className="font-semibold text-lg mb-2">Ano de Início</label>
                  <input
                    type="number"
                    className="p-4 border border-stone-500 rounded-lg w-full"
                    value={formData.anoInicio}
                    onChange={(e) => handleChange(e, "anoInicio")}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="font-semibold text-lg mb-2">Ano de Fim</label>
                  <input
                    type="number"
                    className="p-4 border border-stone-500 rounded-lg w-full"
                    value={formData.anoFim}
                    onChange={(e) => handleChange(e, "anoFim")}
                  />
                </div>
              </div>

              {/* Foto */}
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2">Foto</label>

                <div className="flex items-center justify-center border border-stone-500 rounded-lg w-full p-4 bg-black-100">
                  <label 
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-900 flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" /> {/* Ícone de upload */}
                    Selecione uma foto
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                {/* Exibição do nome do arquivo */}
                {formData.foto && (
                  <div className="mt-2 text-sm text-gray-600">Arquivo: {formData.foto}</div>
                )}
              </div>

              {/* Botão salvar */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSave}
                  className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 text-xl flex items-center gap-2 rounded-lg"
                >
                  <span>Salvar</span>
                  <Save className="w-6 h-6" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Depoimento */}
        {activeSection === "depoimento" && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-center">Editar Depoimento</h1>
            <textarea
              className="p-4 border h-50 border-stone-500 rounded-lg w-full"
              placeholder="Digite seu depoimento"
              value={formData.depoimento}
              onChange={(e) => handleChange(e, "depoimento")}
            />
            <div className="flex justify-center mt-12 mb-80">
              <button
                type="button" 
                onClick={handleSaveDepoimento}                
                className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 text-xl flex items-center gap-2 rounded-lg"
              >
                <span>Salvar</span>
                <Save className="w-6 h-6" />
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default EditarPerfil;
