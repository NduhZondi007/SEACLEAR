import axios from 'axios';
import React from 'react';

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
      </div>
    );
  }
}

export default App;
