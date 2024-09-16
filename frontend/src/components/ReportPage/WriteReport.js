import React from 'react';
import axios from 'axios';

class WriteReport extends React.Component {
    state = {
        user: '',
        reportType: '',
        beach: '',
        problemType: '',
        additionalInfo: '',
        urgency: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { user, reportType, beach, problemType, additionalInfo, urgency } = this.state;
        console.log(user, reportType, beach, problemType, additionalInfo, urgency);

        if (!user || !reportType || !beach || !problemType || !additionalInfo || !urgency) {
            alert("Please fill out all fields before submitting.");
            return;  // Stop form submission if any field is empty
        }

        axios.post(`http://127.0.0.1:8000/reports/`, {
            user,
            reportType,
            beach,
            problemType,
            additionalInfo,
            urgency
        })
        .catch(error => {
            console.error("There was an error updating the report!", error);
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`Field updated: ${name}, Value: ${value}`);  // Debugging
        this.setState({ [name]: value });
    }

    render() {
        const { user, reportType, beach, problemType, additionalInfo, urgency } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Report Details</h3>
                    <label>
                        User
                        <input name="user" type="text" value={user} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Beach Name
                        <input name="beach" type="text" value={beach} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Report Type
                        <input name="reportType" type="text" value={reportType} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Urgency
                        <select name="urgency" value={urgency || "Low"} onChange={this.handleInputChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                    <label>
                        Problem Type
                        <select name="problemType" value={problemType || "Pollution"} onChange={this.handleInputChange}>
                            <option value="Pollution">Pollution</option>
                            <option value="Safety">Safety</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <label>
                        Additional Info
                        <textarea name="additionalInfo" value={additionalInfo} onChange={this.handleInputChange} />
                    </label>
                    <button type="submit">Update Report</button>
                </form>
            </div>
        );
    }
}

export default WriteReport;
