import React, { PropTypes } from 'react';
import classNames from 'classnames';

function PaginationItem({ active, onClick, page }) {
  const classesWrapItem = classNames('page-item', { active });
  const validateOnClick = active
    ? null
    : onClick;

  return (
    <li className={classesWrapItem} onClick={validateOnClick}>
      <a className="page-link" style={{ cursor: 'pointer' }}>
        {page}{active && <span className="sr-only">(current)</span>}
      </a>
    </li>
  );
}

PaginationItem.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default PaginationItem;
