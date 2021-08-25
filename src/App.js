import { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { ListImages } from './components/ListImages';

function App() {
  // State de la app
  const [searchImages, setSearchImages] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const consultAPI = async () => {
      if (searchImages === '') return;
      const imagesForPage = 30;
      const apiKey = process.env.REACT_APP_PIXABAY_KEY;
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchImages}&per_page=${imagesForPage}`;

      const respuesta = await fetch(url);
      const { hits } = await respuesta.json();

      setImages(hits);
    };

    consultAPI();
  }, [searchImages]);

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
      </div>
    </div>
  );
}

export default App;
