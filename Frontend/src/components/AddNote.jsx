import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../index.css";

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

    axios
      .post(`http://localhost:8080/students/${id}/notes`, newNote)
      .then(() => {
        navigate(`/student/${id}`);
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });
  };

  return (
    <div className="add-note-container">
      <h1 className="title">Add Note</h1>
      <form
        className="note-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddNote();
        }}
      >
        <div className="form-group">
          <label htmlFor="course">Course Name:</label>
          <input
            type="text"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input
            type="number"
            id="grade"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Add Note
        </button>
      </form>
      <div className="navigation-links">
        <Link to="/" className="btn-secondary">
          Home
        </Link>
      </div>
    </div>
  );
};

export default AddNote;
