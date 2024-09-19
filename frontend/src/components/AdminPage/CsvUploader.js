import React, { useState } from 'react';
import Papa from 'papaparse';

function CsvUploader() {
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [beachInfo, setBeachInfo] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data;
          console.log('Parsed CSV Data:', parsedData);

          // Convert each row (object) into a comma-separated string
          const newFormattedData = parsedData.map(row =>
            Object.values(row).join(',')
          );

          console.log('Formatted Data:', newFormattedData);

          // Collect all beach names and values
          const allBeachInfo = parsedData
            .map(row => {
              const firstElementValue = Object.values(row)[0]; // Get the value of the first element in the row

              // Check if the first element starts with a number and a dot
              const nameMatch = /^(\d+\.)/.exec(firstElementValue);
              
              if (nameMatch) {
                const name = nameMatch[0]; // Extract the matching part
                const value = firstElementValue.slice(name.length); // Extract the remaining value after the name
                return { name, value }; // Return the object with name and value
              }
              return null; // Return null if no match
            })
            .filter(info => info !== null); // Remove null entries

          console.log('All Beach Info:', allBeachInfo);

          setData(parsedData);
          setFormattedData(newFormattedData);
          setBeachInfo(allBeachInfo);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      <h2>Original Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <h2>Formatted Data:</h2>
      <pre>{JSON.stringify(formattedData, null, 2)}</pre>
      <h2>Beach Info:</h2>
      <pre>{JSON.stringify(beachInfo, null, 2)}</pre>
    </div>
  );
}

export default CsvUploader;
