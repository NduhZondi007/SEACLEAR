import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="home">
      <h1>Welcome to SeaClear</h1>
      <Link to="/educational-content">
        <button>About Us</button>
      </Link>
    </div>
  );
}

export default App;
