import React, { useState } from 'react';
import { Error } from './Error';

export const Form = ({ setSearchImages }) => {
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // Validar
    if (searchInput.trim() === '') {
      setError(true);
      return;
    }

    // Paso validación
    setError(false);

    // Enviar el término al state principal de la app
    setSearchImages(searchInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            onChange={e => setSearchInput(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: naturaleza"
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error && <Error message="Agrega algún término de búsqueda" />}
    </form>
  );
};
