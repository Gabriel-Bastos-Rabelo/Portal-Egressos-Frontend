import { Check } from "lucide-react";

export default function StepIndicator({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  const progressPercent =
    steps.length <= 1
      ? "0%"
      : `${((currentStep - 1) / (steps.length - 1)) * 65}%`;

  return (
    <div className="w-full flex flex-col items-center gap-6 ">

      <div className="relative flex justify-between items-center w-full max-w-3xl px-4">
        {/* Linha de fundo — começa após a 1ª bolinha e termina antes da última */}
        <div className="absolute top-5 left-[17.5%] right-[17.5%] h-[2px] bg-gray-300 z-0" />

        {/* Linha de progresso */}
        <div
          className="absolute top-5 left-[17.5%] h-[2px] bg-blue-900 z-10 transition-all duration-500"
          style={{ width: progressPercent }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={index}
              className="relative z-20 flex flex-col items-center flex-1 min-w-[80px] mt-1"
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm transition-all duration-300
                  ${isCompleted || isActive ? "bg-blue-900" : "bg-gray-400"}
                `}
              >
                {isCompleted ? (
                  <Check size={16} className="text-white" />
                ) : (
                  stepNumber
                )}
              </div>

              <span
                className={`mt-2 text-sm text-center min-h-[40px] flex items-center justify-center
                  ${isActive ? "text-black font-semibold" : "text-gray-500"}
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