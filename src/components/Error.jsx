import React from 'react';

export const Error = ({ message }) => {
  return (
    <div className="alert alert-dismissible alert-primary">
      <h4 className="alert-heading">Espera!</h4>
      <p className="mb-0">{message}</p>
    </div>
  );
};
