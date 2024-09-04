import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Newpage from './Newpage';
import Adminpage from './Adminpage';

class App extends React.Component {
  state = {
    details: [],
  };

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
      <Router>
        <div>
          <Routes>
            <Route path="/" element={(
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
              </div>
            )} />
            <Route path="/newpage" element={<Newpage />} />
            <Route path="/adminpage" element={<Adminpage />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;