import React, { PropTypes } from 'react';
import classNames from 'classnames';

function PaginationButton({ disabled, label, icon, onClick }) {
  const classesWrapButton = classNames('page-item', { disabled });
  const validateOnClick = disabled ? null : onClick;

  return (
    <li
      className={classesWrapButton}
      onClick={validateOnClick}
      style={{ cursor: 'pointer' }}
    >
      <a className="page-link" aria-label={label} >
        <span aria-hidden="true">{icon}</span>
        <span className="sr-only">{label}</span>
      </a>
    </li>
  );
}

PaginationButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PaginationButton;
