import React from 'react';

export default function verifyKey(arr) {
  return arr.map(component => {
    let componentUpdated = component;
    if (!componentUpdated.key) {
      componentUpdated = React.cloneElement(
        componentUpdated, { key: Date.now() * Math.random() }
      );
    }
    return componentUpdated;
  });
}
