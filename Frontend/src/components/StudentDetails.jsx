import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);  
    setLoading(true);  

     
    axios
      .get(`http://localhost:8080/students/${id}`)
      .then((response) => {
        const studentData = response.data;
        setStudent(studentData);  
        return axios.get(`http://localhost:8080/students/${id}/notes`);
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
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>{error}</div>;
  }

 
  if (!student) {
    return <div>No student data found.</div>;
  }

  return (
    <div>
      <h1>{student?.name}'s Grades</h1>
      {grades.length === 0 && <p>No grades available for this student.</p>}

      {grades.length > 0 && (
        <table border="1" cellPadding="10">
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
                style={{
                  backgroundColor:
                    note.grade > 10 ? "lightgreen" : "lightcoral",
                }}
              >
                <td>{note.courseName}</td>
                <td>{note.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
 
      {student && <Link to={`/student/${student.id}/add-note`}>Add Note</Link>}
    </div>
  );
};

export default StudentDetails;
