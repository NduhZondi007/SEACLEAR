import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EducationalContent.css';

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
    <div className="educational-content">
      <h1 className="educational-header">About SeaClear</h1>

      
      <section className="section">
        <h2>SEACLEAR BEACH WATER QUALITY</h2>
        <p>
          Sea Clear’s website and app provide the latest beach water quality information for popular beaches across Cape Town. Ocean water quality is a top concern for various reasons. People living near the Cape Peninsula who frequently visit the beach for swimming or surfing are at an increased risk of illness due to poor water quality. Vulnerable groups, such as young children, pregnant women, and older adults, should be especially cautious and limit exposure to contaminated ocean water.
        </p>
        <p>
          The economic implications of beach water quality are significant as well. Cape Town’s thriving tourism industry and local businesses depend on access to clean beaches, vibrant ecosystems, and healthy marine habitats. Monitoring beach water quality is crucial to understanding the impact of human activities and pollution on the marine environment and developing better solutions for the future.
        </p>
        <p>
          Before heading out to enjoy Cape Town’s beautiful beaches, make sure to check Sea Clear for the latest water quality updates. Always heed official advisories, warnings, and signs posted at the beach to ensure a safe and enjoyable experience.
        </p>
        <p>
          Remember to practice safe swimming!
        </p>
      </section>

      <section className="section">
        <h2>Data Collection</h2>
        <h3>Water Quality Indicators</h3>
        <ul>
          <li><strong>E. coli Levels:</strong> Indicating the presence of harmful bacteria.</li>
          <li><strong>Chemical Pollutants:</strong> Measuring the concentration of hazardous chemicals.</li>
          <li><strong>pH Levels:</strong> Reflecting the acidity or alkalinity of the water.</li>
          <li><strong>Temperature:</strong> Water temperature which can affect bacterial growth.</li>
          <li><strong>Turbidity:</strong> Cloudiness of the water, indicating the presence of sediments or pollutants.</li>
        </ul>
      </section>
    </div>
  );
}
