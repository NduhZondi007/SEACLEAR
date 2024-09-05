import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Newpage from './Newpage';
import Adminpage from './Adminpage';
import Beach from './Beach';

class App extends React.Component {
  state = {
    details: [],
  };
  
  handleBeachClick = (name) => {
    this.props.navigate(`/beach/${name}`);
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/beaches')
      .then((res) => {
        const data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {
        console.error('There was an error fetching the data!', err);
      });
  }

  render() {
    return (
      <div>
        <header>
          Data from backend
          <hr />
          {this.state.details.map((output, id) => (
            <div key={id}>
              <div>
                <p>Name: {output.name}</p>
                <p>Latitude: {output.location}</p>
                <hr />
              </div>
            </div>
          ))}
        </header>
        <button onClick={() => window.location.href = '/newpage'}>New page</button>
        <button onClick={() => window.location.href = '/adminpage'}>Admin</button>
        <button onClick={() => this.handleBeachClick("Camps Bay")}>Camps Bay</button>
        <button onClick={() => this.handleBeachClick("Strand Beach")}>Strand Beach</button>
      </div>
    );
  }
}

// Wrapper component to inject navigate prop
function AppWithNavigate(props) {
  const navigate = useNavigate();
  return <App {...props} navigate={navigate} />;
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppWithNavigate />} />
        <Route path="/newpage" element={<Newpage />} />
        <Route path="/adminpage" element={<Adminpage />} />
        <Route path="/beach/:name" element={<Beach />} />
      </Routes>
    </Router>
  );
}
