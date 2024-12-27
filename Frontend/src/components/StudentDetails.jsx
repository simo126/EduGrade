import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../index.css";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    setError(null);
    setLoading(true);

    axios
      .get(`${backendUrl}/students/${id}`)
      .then((response) => {
        const studentData = response.data;
        setStudent(studentData);
        return axios.get(`${backendUrl}/students/${id}/notes`);
      })
      .then((response) => {
        setGrades(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student details or grades:", error);
        setError("Student not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!student) {
    return <div className="no-data">No student data found.</div>;
  }

  return (
    <div className="student-details-container">
      <h1 className="title">{student?.name}'s Grades</h1>
      {grades.length === 0 && (
        <p className="no-grades">No grades available for this student.</p>
      )}

      {grades.length > 0 && (
        <table className="grades-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((note) => (
              <tr
                key={note.id}
                className={note.grade > 10 ? "high-grade" : "low-grade"}
              >
                <td>{note.courseName}</td>
                <td>{note.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="action-links">
        <Link to={`/student/${student.id}/add-note`} className="btn-primary">
          Add Note
        </Link>
        <Link to="/" className="btn-secondary">
          Home
        </Link>
      </div>
    </div>
  );
};

export default StudentDetails;
