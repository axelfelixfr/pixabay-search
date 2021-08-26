import { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { ListImages } from './components/ListImages';

function App() {
  // State para guardar el buscador de imagenes (pasarselo a la url de la API)
  const [searchImages, setSearchImages] = useState('');
  // State para mostrar las imagenes que se obtuvieron
  const [images, setImages] = useState([]);
  // State para saber la página actual
  const [page, setPage] = useState(1);
  // State para calcular la paginación de acuerdo al número de imagenes
  const [pagesTotal, setPagesTotal] = useState(1);

  useEffect(() => {
    const consultAPI = async () => {
      // Si no hay nada en el buscador que no pase al demás procesos
      if (searchImages === '') return;

      // En este ejemplo, se mostraran 30 imágenes por página
      const imagesForPage = 30;
      const apiKey = process.env.REACT_APP_PIXABAY_KEY;

      // Realizamos la consulta de acuerdo a la búsqueda, número de página y total de imágenes que queremos ver
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchImages}&per_page=${imagesForPage}&page=${page}`;
      const respuesta = await fetch(url);

      // Extraemos hits (Array de imagenes) y totalHits (Número de imagenes)
      const { hits, totalHits } = await respuesta.json();

      // Colocamos las imágenes en el state
      setImages(hits);

      // Calcular paginacion
      // La función ceil redondea hacia arriba
      const calculatedTotalPages = Math.ceil(totalHits / imagesForPage);

      // Colocamos la paginación total en el state
      setPagesTotal(calculatedTotalPages);

      // Mover pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      // La función scrollIntoView realiza la animación de moverse hacia el jumbotron
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    };

    consultAPI();
  }, [searchImages, page]);

  // useEffect para volver a la página 1 una vez que se realiza una nueva búsqueda
  useEffect(() => {
    setPage(1);
  }, [searchImages]);

  // Definir página anterior
  const pageAfter = () => {
    const pageNew = page - 1;
    // Si la página nueva es igual a 0, que no modifique el state porque se encuentra en la primera página
    if (pageNew === 0) return;
    // Actualiza el state
    setPage(pageNew);
  };

  // Definir página siguiente
  const pageBefore = () => {
    const pageNew = page + 1;
    // Si la página nueva es mayor al total, que no modifique el state porque no hay contenido
    if (pageNew > pagesTotal) return;
    // Actualiza el state
    setPage(pageNew);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">Buscador de imágenes Pixabay</h1>
        <p className="lead">
          Puedes encontrar una variedad de imágenes de uso libre
        </p>
        <hr className="my-2" />
        <Form setSearchImages={setSearchImages} />
      </div>

      <div className="row justify-content-center">
        <ListImages images={images} />

        <div className="mb-3">
          {page !== 1 && (
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={pageAfter}
            >
              &laquo; Anterior
            </button>
          )}

          {page !== pagesTotal && (
            <button type="button" className="btn btn-info" onClick={pageBefore}>
              Siguiente &raquo;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
