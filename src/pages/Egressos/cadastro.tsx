import { useState } from 'react';
import CadastroForm from '../../components/Forms/CadastroForm';
import DepoimentoForm from '../../components/Forms/DepoimentoForm';
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
  anoInicio: Int16Array;
  anoFim: Int16Array; 
  foto: FileList | null; // foto é um arquivo ou null
}

export default function Cadastro() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [idEgresso, setEgressoId] = useState<number | null>(null); // Adicionando estado para armazenar o ID do Egresso

  const handleNextStep = (data: FormData, id: number) => {
    setFormData(data); // Armazenar os dados no estado ao enviar o formulário
    setEgressoId(id); // Armazenar o ID do Egresso retornado
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  return (
    <div className="flex flex-col min-h-screen px-4 py-8 bg-white">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Cadastro</h1>

        <StepIndicator
          steps={['Dados Pessoais', 'Depoimento']}
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
          <DepoimentoForm onBack={handlePrevStep} idEgresso={idEgresso} />
        )}
      </div>
    </div>
  );
}