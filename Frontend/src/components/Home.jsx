import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../index.css";

const Home = () => {
  const [student, setStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [averages, setAverages] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios
      .get(`${backendUrl}/students`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const calculateAverage = async (studentId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/students/${studentId}/notes`
      );
      const grades = response.data;

      if (grades.length === 0) return 0;

      const total = grades.reduce((sum, grade) => sum + grade.grade, 0);

      return total / grades.length;
    } catch (error) {
      console.error("Error fetching grades:", error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchAverages = async () => {
      const studentAverages = {};
      for (const student of students) {
        const avg = await calculateAverage(student.id);
        studentAverages[student.id] = avg;
      }
      setAverages(studentAverages);
    };

    if (students.length > 0) {
      fetchAverages();
    }
  }, [students]);

  const handleInputChange = (e) => {
    setStudent(e.target.value);
  };

  const addStudent = (name) => {
    if (name) {
      const newStudent = {
        name,
        creationDate: new Date().toISOString().split("T")[0],
      };

      axios
        .post(`${backendUrl}/students`, newStudent)
        .then((response) => {
          setStudents((prevStudents) => [...prevStudents, response.data]);
          setStudent("");
        })
        .catch((error) => {
          console.error("Error adding student:", error);
        });
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">Students</h1>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Creation Date</th>
            <th>Average Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const average = parseFloat(averages[student.id]).toFixed(2);
            return (
              <tr
                key={student.id}
                className={
                  average > 10
                    ? "student-row high-grade"
                    : "student-row low-grade"
                }
              >
                <td>
                  <Link to={`/student/${student.id}`} className="student-link">
                    {student.name}
                  </Link>
                </td>
                <td>
                  {student.creationDate[0]}/{student.creationDate[1]}/
                  {student.creationDate[2]}
                </td>
                <td>{average}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="add-student-container">
        <input
          type="text"
          id="student"
          name="student"
          value={student}
          onChange={handleInputChange}
          placeholder="Enter student name"
          className="student-input"
        />
        <button onClick={() => addStudent(student)} className="btn-primary">
          Add Student
        </button>
      </div>
    </div>
  );
};

export default Home;
