import { useState } from 'react';
import CadastroForm from '../../components/Forms/CadastroForm';
import DepoimentoForm from '../../components/Forms/DepoimentoForm';
import CargoForm from '../../components/Forms/CargoForm';
import StepIndicator from '../../components/Steps/StepIndicator';

interface FormData {
  nome: string;
  descricao: string;
  linkedin: string;
  lattes: string;
  instagram: string;
  email: string;
  senha: string;
  curso: string;
  anoInicio: number;
  anoFim: number;
  foto: FileList | null;
}

export default function Cadastro() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [idEgresso, setEgressoId] = useState<number | null>(null);

  const handleNextStep = (data: FormData, id: number) => {
    setFormData(data);
    setEgressoId(id);
    setCurrentStep(2);
  };

  const handleNextStepDepoimento = () => {
    setCurrentStep(3);  // Passa para a 3ª etapa após salvar o depoimento
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handlePrevStepCargo = () => {
    setCurrentStep(2);
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
            initialData={formData}
          />
        )}

        {/* Step 2 - Depoimento */}
        {currentStep === 2 && idEgresso && (
          <DepoimentoForm
            onBack={handlePrevStep}
            onNextStep={handleNextStepDepoimento}  // Passando a função para a etapa 3
            idEgresso={idEgresso}
          />
        )}

        {/* Step 3 - Cargo */}
        {currentStep === 3 && idEgresso && (
          <CargoForm
            onBack={handlePrevStepCargo}
            idEgresso={idEgresso}
          />
        )}
      </div>
    </div>
  );
}
