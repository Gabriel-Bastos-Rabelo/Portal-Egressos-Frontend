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
      {/* Steps, Labels, Line */}
      <div className="relative flex justify-evenly w-full max-w-[600px]">
        {/* Background line */}
        <div className="w-90 absolute top-[50%] left-30 right-0 h-[2px] bg-gray-300 z-0" />

        {/* Progress line */}
        <div
          className={`absolute top-[50%] left-30 right-0 h-[2px] bg-blue-900 z-10 transition-all duration-500`}
          style={{
            width: currentStep === 1
              ? "0%"
              : currentStep === 2
                ? "32%"
                : "62%",
          }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={index}
              className="relative z-20 flex flex-col items-center w-full max-w-[120px]"
            >
              {/* Circle */}
              <div
                className={`mt-7 flex items-center justify-center w-7 h-7 rounded-full text-white text-sm transition-all duration-300
                  ${isCompleted ? 'bg-blue-900' : ''} 
                  ${isActive ? 'bg-blue-900' : ''}
                  ${!isCompleted && !isActive ? 'bg-gray-400' : ''}`}
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
