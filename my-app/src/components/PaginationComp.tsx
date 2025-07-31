// src/components/PaginationComp.tsx
import React from 'react';

interface PaginationCompProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComp: React.FC<PaginationCompProps> = ({ total, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(total / pageSize);

  // Determine button disabled states
  const isFirstOrPrevDisabled = currentPage === 1 || pageCount === 0;
  const isNextOrLastDisabled = currentPage === pageCount || pageCount === 0;

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {/* Page X of Y text */}
        <li className="page-item disabled">
          <span className="page-link">
            Page {pageCount > 0 ? currentPage : 0} of {pageCount}
          </span>
        </li>

        {/* First Page button */}
        <li className={`page-item ${isFirstOrPrevDisabled ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(1)}
            disabled={isFirstOrPrevDisabled}
          >
            <i className="bi bi-skip-start-fill"></i>
          </button>
        </li>

        {/* Previous button */}
        <li className={`page-item ${isFirstOrPrevDisabled ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isFirstOrPrevDisabled}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>

        {/* Next button */}
        <li className={`page-item ${isNextOrLastDisabled ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isNextOrLastDisabled}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>

        {/* Last Page button */}
        <li className={`page-item ${isNextOrLastDisabled ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(pageCount)}
            disabled={isNextOrLastDisabled}
          >
            <i className="bi bi-skip-end-fill"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComp;