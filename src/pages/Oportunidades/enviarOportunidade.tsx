import OportunidadeForm from '../../components/Forms/OportunidadeForm';

export default function EnviarOportunidade() {
  return (
    <div className="flex flex-col min-h-screen px-4 py-8 bg-white">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Oportunidades</h1>
        <p className="font-normal text-base text-black font-sans text-center mb-4">
          Preencha as informações da oportunidade.
        </p>

        <OportunidadeForm />
      </div>
    </div>
  );
}