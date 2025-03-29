import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from '../../assets/login-icon.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (accessToken && role) {
      if (role === "COORDENADOR") {
        navigate("/coordenador");
      } else if (role === "EGRESSO") {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/signin',
        {
          email,
          password,
        }
      );

      const {
        accessToken,
        role,
        // userId,
        email: userEmail,
        egressoId,
        coordId,
      } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('role', role);
      // localStorage.setItem('userId', userId);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('coordId', coordId );

      if (egressoId !== null && egressoId !== undefined) {
        localStorage.setItem('egressoId', egressoId);
      } else {
        localStorage.removeItem('egressoId'); 
      }

      // Redireciona de acordo com o perfil do usuário
      if (role === 'COORDENADOR') {
        navigate('/coordenador');
      } else if (role === 'EGRESSO') {
        navigate('/');
      }

    } catch (error) {
      console.log(error);
      setError('Credenciais inválidas, tente novamente.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo - Banner e descrição */}
      <div className="w-1/2 bg-[#08276F] flex flex-col justify-center items-center p-12">
        <h2 className="text-4xl font-bold mb-4 text-[#ffffff]">Portal do Egresso</h2>
        <p className="text-lg text-[#ffffff] mb-8">Um ambiente exclusivo para você!</p>
        <img src={login} alt="Login Banner" className="max-w-xs" />
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <div>
          <div className="flex flex-col items-center mb-6">
            <i className="fa-regular fa-circle-user text-6xl text-[#08276F] mb-4"></i>
            <h2 className="text-2xl font-bold text-[#08276F]">ENTRAR</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-[600px] flex flex-col gap-4 border border-gray-300 rounded-2xl p-4 w-full max-w-md"
          >
            {/* Campo de E-mail */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-sm font-medium text-[#08276F]">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="Insira seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Campo de Senha */}
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-sm font-medium text-[#08276F]">
                Senha
              </label>
              <input
                type="password"
                id="password"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Botão de login */}
            <button
              type="submit"
              className="bg-[#08276F] text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
