import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from '../../assets/login-icon.png';

function Login() {
  // State para armazenar email, senha e erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Função para lidar com o envio do formulário
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

      // Armazenando o token de acesso no localStorage ou em um contexto
      localStorage.setItem('accessToken', response.data.accessToken);

      // Redirecionando para a rota de coordenador após o sucesso
      navigate('/coordenador');
    } catch (error) {
      // Em caso de erro, exibe a mensagem de erro
      console.log(error);
      setError('Credenciais inválidas, tente novamente.');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-[#08276F] flex flex-col justify-center items-center p-12">
        <h2 className="text-4xl font-bold mb-4 text-[#ffffff]">Portal do Egresso</h2>
        <p className="text-lg text-[#ffffff] mb-8">Um ambiente exclusivo para você!</p>
        <img src={login} alt="Login Banner" className="max-w-xs" />
      </div>

      <div className="w-1/2 flex justify-center items-center bg-white">
        <div className="">
          <div className="flex flex-col items-center mb-6">
            <i className="fa-regular fa-circle-user text-6xl text-[#08276F] mb-4"></i>
            <h2 className="text-2xl font-bold text-[#08276F]">ENTRAR</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-[600px] flex flex-col gap-4 border border-gray-300 rounded-2xl p-4 w-full max-w-md"
          >
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
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

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
