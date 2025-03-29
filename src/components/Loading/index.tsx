const Loading = () => {
  return (
    <div className="flex justify-center mt-40 min-h-[200px] gap-10 items-center">
      <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      <p>Carregando...</p>
    </div>
  );
}

export default Loading;