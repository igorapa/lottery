import React, { PropTypes } from 'react';
import classNames from 'classnames';

function PaginationItem({ active, onClick, label }) {
  const classesWrapItem = classNames('page-item', { active });
  const validateOnClick = active
    ? null
    : onClick;

  return (
    <li className={classesWrapItem} onClick={validateOnClick}>
      <a className="page-link" style={{ cursor: 'pointer' }}>
        {label}{active && <span className="sr-only">(current)</span>}
      </a>
    </li>
  );
}

PaginationItem.defaultProps = {
  active: false,
  onClick: () => null,
};

PaginationItem.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default PaginationItem;
