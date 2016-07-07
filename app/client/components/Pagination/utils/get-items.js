import React from 'react';

export default function getItems(Component, page, total, onChangePage) {
  return Array.from({ length: total }).map((item, index) => {
    const indexUpdated = index + 1;

    return (
      <Component
        active={indexUpdated === page}
        key={indexUpdated}
        onClick={onChangePage.bind(null, indexUpdated)}
        label={String(indexUpdated)}
      />
    );
  });
}
