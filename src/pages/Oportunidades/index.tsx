import OportunidadeCard from '../../components/Cards/OportunidadeCard.tsx';

function Oportunidades() {
  const cards = Array.from({ length: 12 }, (_, index) => (
    <OportunidadeCard key={index} />
  ));

  return (
    <div className="flex min-h-screen w-screen justify-center my-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center">Oportunidades</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cards}
        </div>
      </div>
    </div>
  );
}
  
export default Oportunidades;