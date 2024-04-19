import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

const Form = () => {
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [recordingDate, setRecordingDate] = useState('');
  const [file, setFile] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [showFile, setShowFile] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('doctorName', doctorName);
    formData.append('patientName', patientName);
    formData.append('patientAge', patientAge);
    formData.append('recordingDate', recordingDate);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000/createUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Set submitted data state after successful submission
      setSubmittedData(response.data);
      // Reset form fields after submission
      setDoctorName('');
      setPatientName('');
      setPatientAge('');
      setRecordingDate('');
      setFile(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const toggleFileModal = () => {
    setShowFile(!showFile);
  };

  return (
    <div className="form-container">
      <h2>JeevaAI Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctorName">Doctor's Name:</label>
          <input type="text" id="doctorName" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="patientName">Patient's Name:</label>
          <input type="text" id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="patientAge">Patient's Age:</label>
          <input type="number" id="patientAge" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="recordingDate">Recording Date:</label>
          <input type="date" id="recordingDate" value={recordingDate} onChange={(e) => setRecordingDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="file">File:</label>
          {file && (
            <div className="file-preview">
              <span>{file.name}</span>
              <button type="button" onClick={handleFileRemove}>Remove</button>
            </div>
          )}
          {!file && <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />}
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <div className="submitted-data">
          <h3>Submitted Data</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Doctor's Name:</strong></td>
                <td>{submittedData.doctorName}</td>
              </tr>
              <tr>
                <td><strong>Patient's Name:</strong></td>
                <td>{submittedData.patientName}</td>
              </tr>
              <tr>
                <td><strong>Patient's Age:</strong></td>
                <td>{submittedData.patientAge}</td>
              </tr>
              <tr>
                <td><strong>Recording Date:</strong></td>
                <td>{submittedData.recordingDate}</td>
              </tr>
              <tr>
                <td><strong>File:</strong></td>
                <td>{submittedData.file.split('_').pop()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* File modal */}
      {showFile && (
        <div className="file-modal">
          <div className="file-content">
            <video controls>
              <source src={submittedData.file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button type="button" onClick={toggleFileModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
