import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigationbar from "./components/Navigationbar";
import Exercises from "./components/Exercises";
import History from "./components/History";
import Profile from "./components/Profile";
import StartWorkout from "./components/StartWorkout";
import Exercise from "./components/Exercise";
import AddNewTemplate from "./components/AddNewTemplate";
import TemplatesList from "./components/TemplatesList";

function App() {
  return (
    <Router>
      <div>
        <Navigationbar />
        <Routes>
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/history" element={<History />} />
          <Route path="/startworkout" element={<StartWorkout />} />
          <Route path="/" element={<Profile />} />
          <Route path="/exercise/:id" element={<Exercise />} />
          <Route path="/addnewtemplate" element={<AddNewTemplate />} />
          <Route path="/templatelist" element={<TemplatesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
