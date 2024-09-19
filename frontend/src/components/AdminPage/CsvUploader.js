import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

function CsvUploader() {
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [beachInfo, setBeachInfo] = useState([]);
  const [beaches, setBeaches] = useState([]);

  // Fetch existing beaches from the backend
  useEffect(() => {
    axios
      .get('http://localhost:8000/beaches/')
      .then((res) => {
        setBeaches(res.data);
      })
      .catch((err) => {
        console.error('Error fetching beaches:', err);
      });
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data;
          const newFormattedData = parsedData.map((row) =>
            Object.values(row).join(',')
          );
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
              if (storedCount < 59) {
                if (!storing) {
                  storing = true; // Begin storing
                }

                const beachName = firstElementValue.slice(nameMatch[0].length).trim(); // Extract the beach name

                // Extract the count from the last index of the current row
                let enterococciCount = row[Object.keys(row).pop()];

                // Remove > or < and set count to 0 if it contains *
                if (enterococciCount && enterococciCount.includes('*')) {
                  enterococciCount = 0;
                } else if (enterococciCount && (enterococciCount.includes('>') || enterococciCount.includes('<'))) {
                  enterococciCount = enterococciCount.replace(/>|</g, ''); // Remove > and < characters
                } else if (!enterococciCount || enterococciCount.trim() === '') {
                  // If the last index is empty, look at the next row
                  if (i + 1 < parsedData.length) {
                    const nextRow = parsedData[i + 1];
                    enterococciCount = nextRow[Object.keys(nextRow).pop()];

                    // Replace * with 0 and remove > or < characters in the next row as well
                    if (enterococciCount && enterococciCount.includes('*')) {
                      enterococciCount = 0;
                    } else if (enterococciCount && (enterococciCount.includes('>') || enterococciCount.includes('<'))) {
                      enterococciCount = enterococciCount.replace(/>|</g, ''); // Remove > and < characters
                    }
                  }
                }

                enterococciCount = enterococciCount ? parseInt(enterococciCount, 10) : 0;

                allBeachInfo.push({ name: beachName, enterococciCount });
                storedCount++;
              } else {
                // Stop storing once 59 entries are collected
                break;
              }
            }
          }

          console.log('Beach Info After Processing CSV:', allBeachInfo);

          // Update beaches with the new phLevel (enterococciCount)
          allBeachInfo.forEach((beachCsv) => {
            const matchingBeach = beaches.find(
              (beach) => beach.name === beachCsv.name
            );
            if (matchingBeach) {
              const updatedBeach = {
                ...matchingBeach,
                waterQuality: {
                  ...matchingBeach.waterQuality,
                  phLevel: beachCsv.enterococciCount,
                },
              };

              // Send PUT request to update the beach
              axios
                .put(`http://localhost:8000/beaches/${matchingBeach.id}/`, updatedBeach)
                .then((response) => {
                  console.log(`Updated ${matchingBeach.name} successfully!`, response.data);
                })
                .catch((error) => {
                  console.error(`Error updating ${matchingBeach.name}:`, error);
                });
            }
          });

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
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}

export default CsvUploader;
