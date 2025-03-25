import { Check } from "lucide-react";

export default function StepIndicator({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Steps , Labels , Linha  */}
      <div className="relative flex justify-between w-[300px]">
        {/* Linha de fundo cinza */}
        <div className="absolute top-[12px] left-[12%] right-[10%] h-[2px] bg-gray-300 z-0" />

        {/* Linha de progresso azul */}
        <div
          className={`absolute top-[12px] left-[12%] right-[10%] h-[2px] bg-blue-900 z-10 transition-all duration-500`}
          style={{
            width: currentStep === 1
              ? "0%"
              : currentStep === 2
                ? "75%" 
                : "100%",
          }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={index}
              className="relative z-20 flex flex-col items-center"
            >
              {/* Bolinha */}
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full text-white text-sm transition-all duration-300
                  ${isCompleted ? 'bg-blue-900' : ''}
                  ${isActive ? 'bg-blue-900' : ''}
                  ${!isCompleted && !isActive ? 'bg-gray-400' : ''}
                `}
              >
                {isCompleted ? (
                  <Check size={16} className="text-white" />
                ) : (
                  stepNumber
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-sm text-center
                  ${isActive ? 'text-black font-semibold' : 'text-gray-500'}
                `}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}