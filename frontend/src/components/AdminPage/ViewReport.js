import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewReport.css'; // Import the CSS file

class ViewReport extends React.Component {
    state = {
        id: 0,
        user: '',
        reportType: '',
        beach: '',
        problemType: '',
        status: '',
        additionalInfo: '',
        urgency: '',
        error: null,
    };

    componentDidMount() {
        const { reportId } = this.props.params;

        axios
            .get('https://seaclear-8.cs.uct.ac.za/api/reports')
            .then((res) => {
                let data = res.data;
                data = data.find(report => report.id === parseInt(reportId));
                if (data) {
                    this.setState({
                        id: data.id,
                        user: data.user,
                        reportType: data.reportType,
                        beach: data.beach,
                        problemType: data.problemType,
                        status: data.status,
                        additionalInfo: data.additionalInfo,
                        urgency: data.urgency
                    });
                }
            })
            .catch((err) => {
                console.error('There was an error fetching the data!', err);
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { id, user, reportType, beach, problemType, status, additionalInfo, urgency } = this.state;

        axios.put(`https://seaclear-8.cs.uct.ac.za/api/reports/${id}/`, {
            user,
            reportType,
            beach,
            problemType,
            status,
            additionalInfo,
            urgency
        })
        .then(() => {
            // Handle successful update
        })
        .catch(error => {
            this.setState({ error: 'There was an error updating the report. Please try again.' });
            console.error("There was an error updating the report!", error);
        });
    }

    handleInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    render() {
        const { user, reportType, beach, problemType, status, additionalInfo, urgency, error } = this.state;
    
        return (
            <div className="formContainer">
                {error && <p className="errorMessage">{error}</p>}
                <form onSubmit={this.handleSubmit}>
                    <h3 className="sectionTitle">Report Details</h3>
    
                    <label className="label">
                        User
                        <input id="user" type="text" value={user} onChange={this.handleInputChange} className="input" />
                    </label>
                    <label className="label">
                        Beach Name
                        <input id="beach" type="text" value={beach} onChange={this.handleInputChange} className="input" />
                    </label>
                    <label className="label">
                        Report Type
                        <input id="reportType" type="text" value={reportType} onChange={this.handleInputChange} className="input" />
                    </label>
                    <label className="label">
                        Urgency
                        <select id="urgency" value={urgency} onChange={this.handleInputChange} className="select">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                    <label className="label">
                        Status
                        <select id="status" value={status} onChange={this.handleInputChange} className="select">
                            <option value="Pending">Pending</option>
                            <option value="Viewed">Viewed</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </label>
                    <label className="label">
                        Problem Type
                        <select id="problemType" value={problemType} onChange={this.handleInputChange} className="select">
                            <option value="Pollution">Pollution</option>
                            <option value="Safety">Safety</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <label className="label">
                        Additional Info
                        <textarea id="additionalInfo" value={additionalInfo} onChange={this.handleInputChange} className="textarea" />
                    </label>
    
                    <button type="submit" className="button">Update Report</button>
                </form>
            </div>
        );
    }
}

function ReportWithParams() {
    const params = useParams();
    return <ViewReport params={params} />;
}

export default ReportWithParams;
