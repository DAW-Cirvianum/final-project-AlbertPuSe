import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Pàgina No Trobada</h1>
      <p>La pàgina que busques no existeix.</p>
      <Link to="/">Torna a la pàgina d'inici</Link>
    </div>
  );
}