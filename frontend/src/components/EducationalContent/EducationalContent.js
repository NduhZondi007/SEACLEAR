import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EducationalContent() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios.get('/api/educational-content/')
      .then(response => {
        setContent(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the content!', error);
      });
  }, []);

  return (
    <div>
      <h1>Educational Content</h1>
      <ul>
        {content.map(item => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
