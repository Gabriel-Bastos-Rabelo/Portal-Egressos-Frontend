import { useEffect, useState } from "react";
import axios from "axios";
import { Save } from "lucide-react";
import editIcon from "../../assets/editIcon.png"; // Ícone de edição

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

  const coordenadorId = localStorage.getItem('coordId');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchCoordenadorData = async () => {
      if (!coordenadorId || !token) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/api/coordenador/buscar/${coordenadorId}`,
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
      }
    };

    fetchCoordenadorData();
  }, [coordenadorId, token]);

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
    try {
      const response = await axios.put(
        `http://localhost:8080/api/coordenador/atualizar/${coordenadorId}`,
        coordenadorData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditando({ nome: false, emailUsuario: false, idCurso: false, ativo: false }); 
      console.log("Dados atualizados com sucesso!", response.data);
    } catch (error) {
      console.error("Erro ao salvar coordenador:", error);
    }
  };

  return (
    <main className="container mx-auto py-12 flex justify-center gap-8">
      <div className="w-120 flex flex-col gap-6">
        <h2 className="font-normal text-center text-2xl p-8">Editar Dados</h2>

        <div className="flex flex-col gap-4">
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

          {/* Dropdown de Curso */}
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

          {/* Dropdown de Ativo/Inativo */}
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
