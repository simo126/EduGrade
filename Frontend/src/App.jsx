import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import StudentDetails from "./components/StudentDetails";
import AddNote from "./components/AddNote";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/student/:id/add-note" element={<AddNote />} />
      </Routes>
    </Router>
  );
}

export default App;
