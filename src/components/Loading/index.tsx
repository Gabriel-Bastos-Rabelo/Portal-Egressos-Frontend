const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-96">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="ml-4 text-xl font-semibold text-gray-700">Carregando...</p>
    </div>
  );
}

export default Loading;