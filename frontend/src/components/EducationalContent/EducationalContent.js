import React from 'react';
import './EducationalContent.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

export default function EducationalContent() {
  return (
    <>
      <Navbar />
      <div className="education-container">
        <div className="educational-content">
          <h1 className="educational-header">Learn more about SeaClear</h1>
          <section className="section">
            <hr></hr>
            <h2>SEACLEAR BEACH WATER QUALITY</h2><hr></hr>
            <p>
          SeaClear is a community-driven project designed to raise awareness about coastal water quality in Cape Town, offering real-time updates on the safety and cleanliness of our beaches. Using official data from the City of Cape Town's Coastal Water Quality Monitoring Programme, we provide an accessible platform for beachgoers, environmentalists, and the general public to make informed decisions before heading to the beach.
          </p>
          <br />
          <p>
          The City of Cape Town regularly monitors water quality at designated coastal sites by collecting samples and testing for indicators such as E. coli and Enterococci bacteria, which are key markers of fecal contamination and general water pollution. These samples are analyzed in accredited laboratories and compared against internationally accepted safety standards for recreational waters. Results are categorized into five safety ratings: extremely unsafe, unsafe, okay, safe, and extremely safe.
          </p>
          <br />
          <p>
          SeaClear takes this data and presents it in a mobile-friendly format, allowing users to easily check the water quality at various beaches across Cape Town. Our goal is to ensure that everyone can enjoy Cape Town's beautiful coastline while staying informed about potential health risks and encouraging environmental stewardship for cleaner, safer beaches.
          </p>
          <p>
            Remember to practice safe swimming!
            </p>
          </section>
          <section className="section">
            <hr/>
            <h2>Data Collection</h2>
            <h3>Water Quality Indicators</h3>
            <hr/>
            <ul>
              <li><strong>E. coli Levels:</strong> Indicating the presence of harmful bacteria.</li>
              <li><strong>Chemical Pollutants:</strong> Measuring the concentration of hazardous chemicals.</li>
              <li><strong>pH Levels:</strong> Reflecting the acidity or alkalinity of the water.</li>
              <li><strong>Temperature:</strong> Water temperature which can affect bacterial growth.</li>
              <li><strong>Turbidity:</strong> Cloudiness of the water, indicating the presence of sediments or pollutants.</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}