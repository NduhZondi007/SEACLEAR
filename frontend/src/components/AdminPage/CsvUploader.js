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

          // Initialize variables
          const allBeachInfo = [];
          let skippedCount = 0;
          let storedCount = 0;
          let storing = false;

          for (let i = 0; i < parsedData.length; i++) {
            const row = parsedData[i];
            const firstElementValue = Object.values(row)[0]; // Get the value of the first element in the row

            // Check if the first element starts with a number and a dot
            const nameMatch = /^(\d+\.)/.exec(firstElementValue);

            if (nameMatch) {
              const count = parseInt(nameMatch[1].slice(0, -1), 10); // Extract the count number

              if (skippedCount < 11) {
                // Skip the first 11 entries
                skippedCount++;
                continue;
              }

              // Start storing after skipping the first 11 entries
              if (storedCount < 25) {
                if (!storing) {
                  storing = true; // Begin storing
                }

                const beachName = firstElementValue.slice(nameMatch[0].length).trim(); // Extract the beach name

                // Extract the count from the last index of the current row
                let enterococciCount = row[Object.keys(row).pop()]; 

                if (!enterococciCount || enterococciCount.trim() === '') {
                  // If the last index is empty, look at the next row
                  if (i + 1 < parsedData.length) {
                    const nextRow = parsedData[i + 1];
                    enterococciCount = nextRow[Object.keys(nextRow).pop()];
                  }
                }

                enterococciCount = enterococciCount ? parseInt(enterococciCount, 10) : 0;

                allBeachInfo.push({ name: beachName, enterococciCount });
                storedCount++;
              } else {
                // Stop storing once 25 entries are collected
                break;
              }
            }
          }

          console.log('Beach Info After Processing CSV:', allBeachInfo);

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
