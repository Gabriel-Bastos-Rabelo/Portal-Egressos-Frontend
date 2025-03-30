type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo(0, 0);
    }};

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
    window.scrollTo(0, 0);
  };

  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(5, totalPages);
  }
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(totalPages - 4, 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center my-6">
      <button
        className="px-3 py-2 rounded-l-md text-[#5B5B5B] text-2xl"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>

      <div className="flex gap-2">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`shadow-xl px-3 py-2 border rounded-md ${currentPage === pageNumber ? 'bg-[#216DC7] text-white' : 'bg-white text-[#216DC7]'}`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        className="px-3 py-2 rounded-r-md text-[#5B5B5B] text-2xl"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
