import React, { PropTypes } from 'react';
import PaginationButton from './components/PaginationButton';
import PaginationItem from './components/PaginationItem';
import getItems from './utils/get-items';

function Pagination(props) {
  const { total, page, onChangePage } = props;
  const hasPrevious = page > 1;
  const hasNext = page < total;
  let itemsList = getItems(PaginationItem, page, total, onChangePage);

  const goToPage = p => onChangePage.bind(null, page + p);

  return (
    <nav>
      <ul className="pagination pagination-sm">
        <PaginationButton
          disabled={!hasPrevious}
          label="Previous"
          icon="&laquo;"
          onClick={goToPage(-1)}
        />
        {itemsList}
        <PaginationButton
          disabled={!hasNext}
          label="Next"
          icon="&raquo;"
          onClick={goToPage(1)}
        />
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default Pagination;
