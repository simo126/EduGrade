import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [student, setStudent] = useState(""); 
  const [students, setStudents] = useState([]); 
  const [averages, setAverages] = useState({}); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/students")
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
        `http://localhost:8080/students/${studentId}/notes`
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
        .post("http://localhost:8080/students", newStudent)
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
    <div>
      <h1>Student List</h1>

      <table border="1" cellPadding="10">
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
                style={{
                  backgroundColor: average > 10 ? "lightgreen" : "lightcoral",
                }}
              >
                <td>
                  <Link to={`/student/${student.id}`}>{student.name}</Link>
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
      <div>
        <input
          type="text"
          id="student"
          name="student"
          value={student}
          onChange={handleInputChange}
        />
        <button onClick={() => addStudent(student)}>Add Student</button>
      </div>
    </div>
  );
};

export default Home;
