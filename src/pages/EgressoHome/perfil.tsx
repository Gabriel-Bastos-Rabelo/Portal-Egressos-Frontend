import { Save, User, FileText } from "lucide-react";
import egressoImg from '../../assets/egresso-img.png';
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
};

const formFields: { id: keyof FormData; label: string; type: string }[] = [
  { id: "nome", label: "Nome", type: "text" },
  { id: "idCurso", label: "Curso", type: "select" }, // Coloque onde quiser na ordem
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
  });

  const [cursos, setCursos] = useState<Curso[]>([]);

  const egressoId = localStorage.getItem('egressoId');
  const token = localStorage.getItem('accessToken');

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
        });

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

  const handleSave = async () => {
    if (!egressoId || !token) return;

    const payload = {
      ...formData,
      curriculo: formData.lattes,
    };

    try {
      const response = await axios.put(
        `rota deatualziar`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Dados atualizados:', response.data);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar os dados!");
    }
  };

  return (
    <main className="container mx-auto py-12 flex justify-center gap-8">
      {/* Sidebar */}
      <div className="w-120 flex flex-col gap-6">
        <div className="flex flex-row items-center mb-8">
          <img className="w-[120px] h-[120px] rounded-full object-cover mb-4" alt="Foto do Egresso" src={egressoImg} />
          <h2 className="font-normal text-2xl p-8">{formData.nome || "Nome Egresso"}</h2>
        </div>

        <div
          onClick={() => handleSectionChange("dadosPessoais")}
          className={` w-70 p-4 cursor-pointer hover:bg-gray-200 ${activeSection === "dadosPessoais" ? 'bg-gray-200' : ''}`}
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
                  ) : field.type === "select" ? (
                    <select
                      className="p-4 border border-stone-500 rounded-lg w-full"
                      value={formData[field.id]}
                      onChange={(e) => handleChange(e, field.id)}
                    >
                      <option value="">Selecione um curso</option>
                      {cursos.map((curso) => (
                        <option key={curso.id} value={curso.id.toString()}>
                          {curso.nivel}
                        </option>
                      ))}
                    </select>
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
            <textarea
              className="p-4 border h-50 border-stone-500 rounded-lg w-full"
              placeholder="Digite seu depoimento"
              value={formData.depoimento}
              onChange={(e) => handleChange(e, "depoimento")}
            />
            <div className="flex justify-center mt-12 mb-80">
              <button
                onClick={handleSave}
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
