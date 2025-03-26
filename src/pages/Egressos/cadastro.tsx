import { useState } from 'react';
import CadastroForm from '../../components/Forms/CadastroForm';
import DepoimentoForm from '../../components/Forms/DepoimentoForm';
import CargoForm from '../../components/Forms/CargoForm';
import StepIndicator from '../../components/Steps/StepIndicator';
import { useNavigate } from 'react-router-dom';  // Importando useNavigate

export default function Cadastro() {
  const [currentStep, setCurrentStep] = useState(1);
  const [idEgresso, setEgressoId] = useState<number | null>(null);
  const navigate = useNavigate();  // Usando useNavigate para navegação

  const handleNextStep = (data: any, id: number) => {
    setEgressoId(id);
    setCurrentStep(2);
  };

  const handleNextStepDepoimento = () => {
    setCurrentStep(3);  
  };

  const handleCancel = () => {
    navigate('/');  // Redirecionando para a página inicial (home)
  };

  return (
    <div className="flex flex-col min-h-screen px-4 py-8 bg-white">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Cadastro</h1>

        <StepIndicator
          steps={['Dados Pessoais', 'Depoimento', 'Cargo']}
          currentStep={currentStep}
        />

        <div className="mt-10" />

        {/* Step 1 - Cadastro */}
        {currentStep === 1 && (
          <CadastroForm
            onNext={handleNextStep}
          />
        )}

        {/* Step 2 - Depoimento */}
        {currentStep === 2 && idEgresso && (
          <DepoimentoForm
            onNextStep={handleNextStepDepoimento}  // Passando a função para a etapa 3
            onCancel={handleCancel}  // Passando a função de cancelamento
            idEgresso={idEgresso}
          />
        )}

        {/* Step 3 - Cargo */}
        {currentStep === 3 && idEgresso && (
          <CargoForm
            idEgresso={idEgresso}
          />
        )}
      </div>
    </div>
  );
}
