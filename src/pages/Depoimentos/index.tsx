import DepoimentoCard from '../../components/Cards/DepoimentoCard.tsx';

function Depoimentos() {
  const cards = Array.from({ length: 5 }, (_, index) => (
    <DepoimentoCard key={index} />
  ));

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <h1 className="text-3xl font-bold text-center mt-12">Depoimentos</h1>
  
      <div className="flex flex-col max-w-5xl mx-auto px-4 w-full">
        {cards}
      </div>
    </div>
  );
}
  
export default Depoimentos;