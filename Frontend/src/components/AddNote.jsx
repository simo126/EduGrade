import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const AddNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState("");
  const [value, setValue] = useState("");

  const handleAddNote = () => {

    const newNote = {
      courseName: course,
      grade: parseFloat(value),
    };


    axios.post(`http://localhost:8080/students/${id}/notes`, newNote)
      .then((response) => {
        navigate(`/student/${id}`);
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });
  };

  return (
    <div>
      <h1>Add Note</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddNote();
        }}
      >
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Grade:</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
