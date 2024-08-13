import React from 'react';

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={i + 1 === currentPage ? 'active' : ''}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
