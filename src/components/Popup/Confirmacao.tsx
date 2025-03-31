type ConfirmDialogProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({ isOpen, onCancel, onConfirm }: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 bg-black bg-opacity-30 overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">CONFIRMAR DADOS</h2>
        <p className="text-center text-sm text-gray-700">
          Os dados informados estão corretos?
          <br />
          Deseja prosseguir com o envio?
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="flex items-center px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-900 transition"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
