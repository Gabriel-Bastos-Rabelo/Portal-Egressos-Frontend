import { useState, useEffect } from "react";

export const EditMessage = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="rounded-lg font-poppins shadow-lg fixed top-5 left-30 right-30 bg-[#E6FBD7] text-[#095C1D] p-4 mb-4 z-50 flex items-center gap-2">
      <i className="fa-solid fa-circle-check text-2xl mr-2"></i>
      <p className="text-xl">Dados editados com sucesso!</p>
    </div>
  );
};

export const DepoimentoMessage = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="rounded-lg font-poppins shadow-lg fixed top-5 left-30 right-30 bg-[#E6FBD7] text-[#095C1D] p-4 mb-4 z-50 flex items-center gap-2">
      <i className="fa-solid fa-circle-check text-2xl mr-2"></i>
      <p className="text-xl">Depoimento editado com sucesso!</p>
    </div>
  );
};

export const OportunidadeMessage = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="rounded-lg font-poppins shadow-lg fixed top-5 left-30 right-30 bg-[#E6FBD7] text-[#095C1D] p-4 mb-4 z-50 flex items-center gap-2">
      <i className="fa-solid fa-circle-check text-2xl mr-2"></i>
      <p className="text-xl">Oportunidade enviada com sucesso!</p>
    </div>
  );
};
  