import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

class ViewReport extends React.Component {
    state = {
        id: 0,
        user: '',
        reportType: '',
        beach: '',
        problemType: '',
        status: '',
        additionalInfo: '',
        urgency: ''
    };

    componentDidMount() {
        const { reportId } = this.props.params;

        axios
            .get('http://localhost:8000/reports')
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

        axios.put(`http://127.0.0.1:8000/reports/${id}/`, {
            user,
            reportType,
            beach,
            problemType,
            status,
            additionalInfo,
            urgency
        })
        .catch(error => {
            console.error("There was an error updating the report!", error);
        });
    }

    handleInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    render() {
        const { user, reportType, beach, problemType, status, additionalInfo, urgency } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Report Details</h3>
                    <label>
                        User
                        <input id="user" type="text" value={user} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Beach Name
                        <input id="beach" type="text" value={beach} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Report Type
                        <input id="reportType" type="text" value={reportType} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Urgency
                        <select id="urgency" value={urgency} onChange={this.handleInputChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                    <label>
                        Status
                        <select id="status" value={status} onChange={this.handleInputChange}>
                            <option value="Pending">Pending</option>
                            <option value="Viewed">Viewed</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </label>
                    <label>
                        Problem Type
                        <select id="problemType" value={problemType} onChange={this.handleInputChange}>
                            <option value="Pollution">Pollution</option>
                            <option value="Safety">Safety</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <label>
                        Additional Info
                        <textarea id="additionalInfo" value={additionalInfo} onChange={this.handleInputChange} />
                    </label>
                    <button type="submit">Update Report</button>
                </form>
            </div>
        );
    }
}

// Functional Component Wrapper to use useParams hook
function ReportWithParams() {
    const params = useParams();  // Hook to access URL parameters
    return <ViewReport params={params}/>;  // Pass params as prop to ViewReport
}

export default ReportWithParams;
