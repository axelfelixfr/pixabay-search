import { Form } from './components/Form';

function App() {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1 class="display-4">Buscador de imágenes Pixabay</h1>
        <p className="lead">
          Puedes encontrar una variedad de imágenes de uso libre
        </p>
        <hr class="my-2" />
        <Form />
      </div>
    </div>
  );
}

export default App;
