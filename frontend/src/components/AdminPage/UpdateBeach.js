import React from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

class UpdateBeach extends React.Component {
    // Define the initial state with fields for beach details, including amenities, weather, and water quality
    state = {
        id: 0, // Stores the ID of the beach being updated
        name: '', // Name of the beach (read-only)
        location: '', // Location of the beach
        amenities: { // Amenities available at the beach
            Restaurants: false,
            Parking: false,
            Lifeguard: false,
            BeachChairs: false
        },
        weather: { // Weather details at the beach
            temperature: '',
            windSpeed: '',
            humidity: '',
            forecast: 'Sunny'
        },
        waterQuality: { // Water quality details at the beach
            phLevel: '',
            pollutionLevel: '',
            isSafe: ''
        }
    };

    // Component lifecycle method that runs when the component mounts
    componentDidMount() {
        // Fetch beach details by making an API request
        axios
            .get('http://localhost:8000/beaches') // Replace with your actual API endpoint
            .then((res) => {
                let data = res.data;
                // Find the specific beach by name (e.g., "Camps Bay")
                data = data.find(beach => beach.name === "Camps Bay");
                // Update the component's state with the fetched beach data
                this.setState({
                    id: data.id, // Set the ID of the beach
                    name: data.name, // Set the name of the beach
                    location: data.location, // Set the location of the beach
                    weather: data.weather, // Set the weather details
                    waterQuality: data.waterQuality // Set the water quality details
                });
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err); // Log any errors encountered during the API request
            });
    }

    // Handle input changes in the form fields
    handleInputChange = (event) => {
        const { id, value, type, checked } = event.target;
        
        // Handle checkbox input (for amenities)
        if (type === 'checkbox') {
            this.setState(prevState => ({
                amenities: {
                    ...prevState.amenities,
                    [id]: checked // Update the specific amenity based on its ID
                }
            }));
        } 
        // Handle inputs related to water quality
        else if (id in this.state.waterQuality) {
            this.setState(prevState => ({
                waterQuality: {
                    ...prevState.waterQuality,
                    [id]: value // Update the specific water quality field based on its ID
                }
            }));
        } 
        // Handle inputs related to weather
        else if (id in this.state.weather) {
            this.setState(prevState => ({
                weather: {
                    ...prevState.weather,
                    [id]: value // Update the specific weather field based on its ID
                }
            }));
        } 
        // Handle other fields (e.g., location)
        else {
            this.setState({ [id]: value });
        }
    }

    // Handle form submission to update the beach data
    handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const { id, name, location, amenities, weather, waterQuality } = this.state;

        // Filter out the selected amenities (those that are checked)
        const selectedAmenities = Object.keys(amenities).filter(amenity => amenities[amenity]);

        // Send an HTTP PUT request to update the beach details
        axios.put(`http://127.0.0.1:8000/beaches/${id}/`, { // Replace with your actual API endpoint
            name,
            location,
            amenities: selectedAmenities, // Send only the selected amenities
            weather: {
                temperature: weather.temperature,
                windSpeed: weather.windSpeed,
                humidity: weather.humidity,
                forecast: weather.forecast
            },
            waterQuality: {
                phLevel: waterQuality.phLevel,
                pollutionLevel: waterQuality.pollutionLevel,
                isSafe: waterQuality.isSafe
            }
        })
            .catch(error => {
                console.error("There was an error updating the beach!", error); // Log any errors during the update process
            });
    }

    render() {
        const { name, location, amenities, weather, waterQuality } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Beach Details</h3>
                    {/* Display the beach name as a read-only field */}
                    <label>
                        Name
                        <input id="name" type="text" value={name} readOnly />
                    </label>
                    {/* Input field for updating the location */}
                    <label>
                        Location
                        <input id="location" type="text" value={location} onChange={this.handleInputChange} />
                    </label>

                    <h3>Amenities</h3>
                    {/* Display checkboxes for amenities */}
                    {Object.keys(amenities).map(amenity => (
                        <label key={amenity}>
                            <input
                                type="checkbox"
                                id={amenity}
                                checked={amenities[amenity]}
                                onChange={this.handleInputChange}
                            />
                            {amenity}
                        </label>
                    ))}

                    <h3>Weather</h3>
                    {/* Input fields for weather details */}
                    <label>
                        Temp
                        <input id="temperature" type="number" value={weather.temperature} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Wind Speed
                        <input id="windSpeed" type="number" value={weather.windSpeed} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Humidity
                        <input id="humidity" type="number" value={weather.humidity} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Forecast
                        <select id="forecast" value={weather.forecast} onChange={this.handleInputChange}>
                            {/* Dropdown menu for selecting weather forecast */}
                            <option value="Sunny">Sunny</option>
                            <option value="Cloudy">Cloudy</option>
                            <option value="Overcast">Overcast</option>
                            <option value="Rainy">Rainy</option>
                            <option value="Thunderstorms">Thunderstorms</option>
                            <option value="Snow">Snow</option>
                            <option value="Hail">Hail</option>
                        </select>
                    </label>

                    <h3>Water Quality</h3>
                    {/* Input fields for water quality details */}
                    <label>
                        pH Level
                        <input id="phLevel" type="number" value={waterQuality.phLevel} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Pollution
                        <select id="pollutionLevel" value={waterQuality.pollutionLevel} onChange={this.handleInputChange}>
                            {/* Dropdown menu for selecting pollution level */}
                            <option value="High">High</option>
                            <option value="medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>
                    <label>
                        Risk
                        <select id="isSafe" value={waterQuality.isSafe} onChange={this.handleInputChange}>
                            {/* Dropdown menu for selecting safety status */}
                            <option value="Safe">Safe</option>
                            <option value="medium">Medium</option>
                            <option value="Not Safe">Not Safe</option>
                        </select>
                    </label>

                    {/* Submit button to update the beach */}
                    <button type="submit">Update Beach</button>
                </form>
            </div>
        );
    }
}

export default UpdateBeach;
