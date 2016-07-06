import React from 'react';
import PaginationButton from './components/PaginationButton';

function Pagination(props) {
  const { total, page } = props;
  const hasPrevious = page > 1;
  const hasNext = page < total;

  return (
    <nav>
      <ul className="pagination pagination-sm">
        <PaginationButton
          disabled={!hasPrevious}
          label="Previous"
          icon="&laquo;"
        />
        <li className="page-item active">
          <a className="page-link" href="#">1 <span className="sr-only">(current)</span></a>
        </li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item"><a className="page-link" href="#">4</a></li>
        <li className="page-item"><a className="page-link" href="#">5</a></li>
        <PaginationButton
          disabled={!hasNext}
          label="Next"
          icon="&raquo;"
        />
      </ul>
    </nav>
  );
}

export default Pagination;
