import { FileText, Save, User } from "lucide-react";
import egressoImg from '../../assets/user.png';
import editIcon from '../../assets/editIcon.png'; // Ícone de edição
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { DepoimentoMessage, EditMessage } from "../../components/Messages/EditMessage";

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
  const [activeSection, setActiveSection] = useState<"dadosPessoais" | "depoimento">(
    () => (localStorage.getItem('activeSection') as "dadosPessoais" | "depoimento") || "dadosPessoais"
  );
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

  const [editandoCampo, setEditandoCampo] = useState<keyof FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [imagem, setImagem] = useState<File | null>(null);
  const egressoId = localStorage.getItem('egressoId');
  const token = localStorage.getItem('accessToken');
  const [nomeExibido, setNomeExibido] = useState<string>('');
  const [showEditMessage, setShowEditMessage] = useState(false);
  const [showDepoimentoMessage, setShowDepoimentoMessage] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEgressoData = async () => {
      if (!egressoId || !token) return;
  
      try {
        const response = await axios.get(`http://44.205.22.49:8080/api/egresso/buscar/${egressoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        const data = response.data;
  
        setFormData({
          nome: data.nomeEgresso || '',
          descricao: data.descricao || '',
          linkedin: data.linkedin || '',
          lattes: data.curriculo || '',
          instagram: data.instagram || '',
          depoimento: data.depoimento || '',
          idCurso: data.idCurso?.toString() || '',
          anoInicio: data.anoInicio || 0,
          anoFim: data.anoFim || 0,
          foto: data.foto || '',
          idDepoimento: data.idDepoimento,
        });
  
        setNomeExibido(data.nomeEgresso || '');
      } catch (error) {
        console.error("Erro ao buscar dados do egresso:", error);
      } finally {
        setLoading(false); // <- AQUI
      }
    };
  
    fetchEgressoData();
  }, [egressoId, token]); 

  useEffect(() => {
    const fetchCursos = async () => {
      if (!token) return;

      try {
        const response = await axios.get('http://44.205.22.49:8080/api/cursos/listarCursos', {
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
    localStorage.setItem('activeSection', section); 
  
    if (section === "depoimento") {
      fetchDepoimento();
    }
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('activeSection');
    };
  }, []);
  
  useEffect(() => {
    if (activeSection === "depoimento") {
      fetchDepoimento();
    }
  }, [activeSection]);

  const fetchDepoimento = async () => {
    if (!egressoId || !token) return;
  
    setLoading(true); // <- AQUI
    try {
      const response = await axios.get(
        `http://44.205.22.49:8080/api/depoimento/buscar/${egressoId}`,
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
        depoimento: data.descricao || '',
        idDepoimento: data.id,
      }));
    } catch (error) {
      console.error("Erro ao buscar depoimento:", error);
    } finally {
      setLoading(false);
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
  
    setSaving(true);
  
    const formDataToSend = new FormData();
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
  
    if (imagem) {
      formDataToSend.append('imagem', imagem);
    }
  
    try {
      const response = await axios.put(
        `http://44.205.22.49:8080/api/egresso/atualizar/${egressoId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Dados atualizados:', response.data);
      setShowEditMessage(true);
      setEditandoCampo(null);
  
      setTimeout(() => {
        setShowEditMessage(false);
        window.location.reload(); 
      }, 2000);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar os dados!");
    } finally {
      setSaving(false);
    }
  };
   
  const handleSaveDepoimento = async () => {
    if (!formData.idDepoimento || !formData.depoimento) return;
  
    setSaving(true); 
  
    const dataAtual = new Date().toISOString();
    const payload = {
      idEgresso: egressoId,
      texto: formData.depoimento,
      data: dataAtual,
    };
  
    try {
      const response = await axios.put(
        `http://44.205.22.49:8080/api/depoimento/atualizar/${formData.idDepoimento}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Resposta do backend:", response.data);
      setShowDepoimentoMessage(true);
      setEditandoCampo(null); // aqui!
      setTimeout(() => setShowDepoimentoMessage(false), 4000);
    } catch (error) {
      console.error("Erro ao salvar depoimento:", error);
    } finally {
      setSaving(false); 
    }
  };
  
  if (loading || saving) return <Loading />;

  return (
    <main className="container mx-auto py-12 flex flex-wrap justify-center gap-16 sm:gap-32 p-5">
      {showEditMessage && <EditMessage />}
      {showDepoimentoMessage && <DepoimentoMessage />}

      <div className="w-full sm:w-60 flex flex-col gap-6 items-center sm:items-start">
        <div className="flex flex-col sm:flex-row items-center mb-8 text-center sm:text-left">
          <img
            className="w-[120px] h-[120px] rounded-full object-cover mb-4"
            alt="Foto do Egresso"
            src={formData.foto ? `http://44.205.22.49:8080/uploads/${formData.foto}` : egressoImg}
          />
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
  
      <div className="w-full max-w-2xl sm:px-0">
        {activeSection === "dadosPessoais" && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-center">Editar Dados</h1>
  
            <div className="flex flex-col gap-4">
              {formFields.map((field) => (
                <div key={field.id} className="flex flex-col gap-1 mb-4">
                  <label className="font-semibold text-lg">{field.label}</label>
                  <div className="flex items-center gap-2">
                    {field.type === "textarea" ? (
                      <textarea
                        className={`p-4 border border-stone-500 rounded-lg w-full ${editandoCampo !== field.id ? 'bg-gray-100' : ''}`}
                        value={formData[field.id]}
                        onChange={(e) => handleChange(e, field.id)}
                        disabled={editandoCampo !== field.id}
                      />
                    ) : (
                      <input
                        type={field.type}
                        className={`p-4 border border-stone-500 rounded-lg w-full ${editandoCampo !== field.id ? 'bg-gray-100' : ''}`}
                        value={formData[field.id]}
                        onChange={(e) => handleChange(e, field.id)}
                        disabled={editandoCampo !== field.id}
                      />
                    )}
                    <img
                      src={editIcon}
                      alt="Editar"
                      className="w-5 h-5 cursor-pointer shrink-0"
                      onClick={() => setEditandoCampo(field.id)}
                    />
                  </div>
                </div>
              ))}
  
              {/* Curso */}
              <div className="flex flex-col gap-1 mb-4">
                <label className="font-semibold text-lg">Curso</label>
                <div className="flex items-center gap-2">
                  <select
                    className={`p-4 border border-stone-500 rounded-lg w-full ${editandoCampo !== "idCurso" ? "bg-gray-100" : ""}`}
                    value={formData.idCurso}
                    onChange={(e) => handleChange(e, "idCurso")}
                    disabled={editandoCampo !== "idCurso"}
                  >
                    <option value="">Selecione um curso</option>
                    {cursos.map((curso) => (
                      <option key={curso.id} value={curso.id.toString()}>
                        {curso.nivel}
                      </option>
                    ))}
                  </select>
                  <img
                    src={editIcon}
                    alt="Editar"
                    className="w-5 h-5 cursor-pointer shrink-0"
                    onClick={() => setEditandoCampo("idCurso")}
                  />
                </div>
              </div>
  
              {/* Anos */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-1/2">
                  <label className="font-semibold text-lg">Ano de Início</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className={`p-4 border border-stone-500 rounded-lg w-full ${editandoCampo !== "anoInicio" ? "bg-gray-100" : ""}`}
                      value={formData.anoInicio}
                      onChange={(e) => handleChange(e, "anoInicio")}
                      disabled={editandoCampo !== "anoInicio"}
                    />
                    <img
                      src={editIcon}
                      alt="Editar"
                      className="w-5 h-5 cursor-pointer shrink-0"
                      onClick={() => setEditandoCampo("anoInicio")}
                    />
                  </div>
                </div>
  
                <div className="flex flex-col gap-1 w-1/2">
                  <label className="font-semibold text-lg">Ano de Fim</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className={`p-4 border border-stone-500 rounded-lg w-full ${editandoCampo !== "anoFim" ? "bg-gray-100" : ""}`}
                      value={formData.anoFim}
                      onChange={(e) => handleChange(e, "anoFim")}
                      disabled={editandoCampo !== "anoFim"}
                    />
                    <img
                      src={editIcon}
                      alt="Editar"
                      className="w-5 h-5 cursor-pointer shrink-0"
                      onClick={() => setEditandoCampo("anoFim")}
                    />
                  </div>
                </div>
              </div>
              {/* Foto */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-lg">Foto</label>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center justify-center border border-stone-500 rounded-lg w-full p-4 ${editandoCampo !== "foto" ? "bg-gray-100" : ""}`}
                  >
                    <label htmlFor="file-upload" className="cursor-pointer text-blue-900 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Selecione uma foto
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={editandoCampo !== "foto"}
                    />
                  </div>
                  <img
                    src={editIcon}
                    alt="Editar"
                    className="w-5 h-5 cursor-pointer shrink-0"
                    onClick={() => setEditandoCampo("foto")}
                  />
                </div>

                {/* Mostrar nome da imagem atual ou nova */}
                <div className="mt-2 text-sm text-gray-600">
                  {imagem
                    ? <>Arquivo selecionado: <span className="font-medium">{imagem.name}</span></>
                    : formData.foto && <>Arquivo atual: <span className="font-medium">{formData.foto}</span></>}
                </div>
              </div>
 
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
  
        {activeSection === "depoimento" && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-center">Editar Depoimento</h1>
  
            <div className="flex flex-col gap-1 mb-4">
              <label className="font-semibold text-lg">Depoimento</label>
              <div className="flex items-center gap-2">
                <textarea
                  className={`p-4 border h-40 border-stone-500 rounded-lg w-full ${editandoCampo !== "depoimento" ? "bg-gray-100" : ""}`}
                  placeholder="Digite seu depoimento"
                  value={formData.depoimento}
                  onChange={(e) => handleChange(e, "depoimento")}
                  disabled={editandoCampo !== "depoimento"}
                />
                <img
                  src={editIcon}
                  alt="Editar"
                  className="w-5 h-5 cursor-pointer shrink-0"
                  onClick={() => setEditandoCampo("depoimento")}
                />
              </div>
            </div>
  
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
