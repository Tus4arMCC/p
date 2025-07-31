// src/components/DataTable.tsx.tsx
import React, { useState } from 'react';
import PaginationComp from './PaginationComp.tsx';

interface DataTableColumn {
  header: string;
  accessor: string | ((row: any) => any);
}

interface DataTableProps {
  data: any[]; // You might want to define a more specific type for your data rows
  columns: DataTableColumn[];
  onEdit?: (row: any, index: number) => void; // Define a more specific type for row if possible
  onDelete?: (row: any, index: number) => void; // Define a more specific type for row if possible
  initialPageSize?: number;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, onEdit, onDelete, initialPageSize = 5 }) => {
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [currentPage, setCurrentPage] = useState<number>(1);

  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const total = data.length;
  const pageCount = Math.ceil(total / pageSize);
  const start = (currentPage - 1) * pageSize;
  const currentItems = data.slice(start, start + pageSize);

  const handlePageChange = (n: number) =>
    setCurrentPage(Math.max(1, Math.min(n, pageCount)));

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  return (
    <>
      {/* Added justify-content-between here */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        {/* Page size selector */}
        {/* <div> */}
          {/* Items per page: */}
          {/* <select className="form-select form-select-sm d-inline-block w-auto ms-2" onChange={handlePageSizeChange} value={pageSize}> */}
            {/* <option value="5">5</option> */}
            {/* <option value="10">10</option> */}
            {/* <option value="15">15</option> */}
            {/* <option value="20">20</option> */}
          {/* </select> */}
        {/* </div> */}
        {/* Display total items */}
        <PaginationComp
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {typeof column.accessor === 'function'
                    ? column.accessor(row)
                    : row[column.accessor]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td>
                  {onEdit && (
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => onEdit(row, start + rowIndex)}
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(row, start + rowIndex)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div>Total items: {total}</div>
    </>
  );
};

export default DataTable;