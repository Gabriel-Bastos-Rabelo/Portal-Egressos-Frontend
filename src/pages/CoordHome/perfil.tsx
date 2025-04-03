import { useEffect, useState } from "react";
import axios from "axios";
import { Save } from "lucide-react";
import editIcon from "../../assets/editIcon.png";
import Loading from "../../components/Loading";
import { EditMessage } from "../../components/Messages/EditMessage";

type CoordenadorData = {
  nome: string;
  emailUsuario: string;
  nomeCurso: string;
  idCurso: number;
  dataCriacao: string;
  ativo: boolean;
};

const EditarPerfilCoordenador = () => {
  const [coordenadorData, setCoordenadorData] = useState<CoordenadorData>({
    nome: '',
    emailUsuario: '',
    nomeCurso: '',
    idCurso: 0,
    dataCriacao: '',
    ativo: true,
  });

  const [cursos, setCursos] = useState<{ id: number; nivel: string }[]>([]);
  const [editando, setEditando] = useState<{ [key: string]: boolean }>({
    nome: false,
    emailUsuario: false,
    idCurso: false,
    ativo: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showEditMessage, setShowEditMessage] = useState(false);

  const coordenadorId = localStorage.getItem('coordId');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchCoordenadorData = async () => {
      if (!coordenadorId || !token) return;

      try {
        const response = await axios.get(
          `/api/coordenador/buscar/${coordenadorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCoordenadorData({
          ...response.data,
          dataCriacao: response.data.dataCriacao,
          ativo: response.data.ativo,
        });
      } catch (error) {
        console.error("Erro ao buscar coordenador:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordenadorData();
  }, [coordenadorId, token]);

  useEffect(() => {
    const fetchCursos = async () => {
      if (!token) return;

      try {
        const response = await axios.get('/api/cursos/listarCursos', {
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

  const handleCursoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCoordenadorData({
      ...coordenadorData,
      idCurso: Number(e.target.value),
    });
  };

  const handleEditClick = (field: keyof CoordenadorData) => {
    setEditando((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleAtivoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCoordenadorData({
      ...coordenadorData,
      ativo: e.target.value === 'Ativo',
    });
  };

  const handleSave = async () => {
    if (!coordenadorId || !token) return;

    setSaving(true);

    try {
      const response = await axios.put(
        `/api/coordenador/atualizar/${coordenadorId}`,
        coordenadorData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Dados atualizados com sucesso!", response.data);
      setEditando({ nome: false, emailUsuario: false, idCurso: false, ativo: false });

      setShowEditMessage(true);
      setTimeout(() => setShowEditMessage(false), 4000);
    } catch (error) {
      console.error("Erro ao salvar coordenador:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading || saving) return <Loading />;

  return (
    <main className="flex justify-center px-4 py-12 w-full">
      <div className="w-full max-w-[480px] flex flex-col items-center gap-6">
        {showEditMessage && <EditMessage />}

        <h2 className="font-bold text-center text-2xl">Editar Dados</h2>
        <div className="flex flex-col gap-4 w-full">

          {/* Nome */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="font-semibold text-lg">Nome</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className={`p-4 border border-stone-500 rounded-lg w-full ${editando.nome ? 'bg-white' : 'bg-gray-100'}`}
                value={coordenadorData.nome}
                disabled={!editando.nome}
                onChange={(e) => setCoordenadorData({ ...coordenadorData, nome: e.target.value })}
              />
              <img
                src={editIcon}
                alt="Editar"
                className="w-5 h-5 cursor-pointer"
                onClick={() => handleEditClick("nome")}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="font-semibold text-lg">Email</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className={`p-4 border border-stone-500 rounded-lg w-full ${editando.emailUsuario ? 'bg-white' : 'bg-gray-100'}`}
                value={coordenadorData.emailUsuario}
                disabled={!editando.emailUsuario}
                onChange={(e) => setCoordenadorData({ ...coordenadorData, emailUsuario: e.target.value })}
              />
              <img
                src={editIcon}
                alt="Editar"
                className="w-5 h-5 cursor-pointer"
                onClick={() => handleEditClick("emailUsuario")}
              />
            </div>
          </div>

          {/* Curso */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="font-semibold text-lg">Curso</label>
            <div className="flex items-center gap-2">
              <select
                className={`p-4 border border-stone-500 rounded-lg w-full ${editando.idCurso ? 'bg-white' : 'bg-gray-100'}`}
                value={coordenadorData.idCurso}
                onChange={handleCursoChange}
                disabled={!editando.idCurso}
              >
                <option value="">Selecione um curso</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nivel}
                  </option>
                ))}
              </select>
              <img
                src={editIcon}
                alt="Editar"
                className="w-5 h-5 cursor-pointer"
                onClick={() => handleEditClick("idCurso")}
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="font-semibold text-lg">Status</label>
            <div className="flex items-center gap-2">
              <select
                className={`p-4 border border-stone-500 rounded-lg w-full ${editando.ativo ? 'bg-white' : 'bg-gray-100'}`}
                value={coordenadorData.ativo ? 'Ativo' : 'Inativo'}
                onChange={handleAtivoChange}
                disabled={!editando.ativo}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
              <img
                src={editIcon}
                alt="Editar"
                className="w-5 h-5 cursor-pointer"
                onClick={() => handleEditClick("ativo")}
              />
            </div>
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
      </div>
    </main>
  );
};

export default EditarPerfilCoordenador;
