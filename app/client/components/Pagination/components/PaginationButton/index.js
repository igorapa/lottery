import React from 'react';
import classNames from 'classnames';

function PaginationButton({ disabled, label, icon }) {
  const classesWrapButton = classNames(
    'page-item',
    { [disabled]: 'disabled' }
  );
  return (
    <li className={classesWrapButton}>
      <a className="page-link" href="#" aria-label={label}>
        <span aria-hidden="true">{icon}</span>
        <span className="sr-only">{label}</span>
      </a>
    </li>
  );
}

export default PaginationButton;
