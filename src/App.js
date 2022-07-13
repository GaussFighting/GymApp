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
import Template from "./components/Template";
// import StartWorkoutFromTemplate from "./components/StartWorkoutFromTemplate";
import StarAnEmptytWorkout from "./components/StartAnEmptyWorkout";
import Training from "./components/Training";

function App() {
  return (
    <Router>
      <div>
        <Navigationbar />
        <div className="container-fluid">
          <Routes>
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/history" element={<History />} />
            <Route path="/startworkout" element={<StartWorkout />} />
            <Route path="/" element={<Profile />} />
            <Route path="/exercise/:id" element={<Exercise />} />
            <Route path="/addnewtemplate" element={<AddNewTemplate />} />
            <Route path="/templatelist" element={<TemplatesList />} />
            <Route path="/template/:id" element={<Template />} />
            <Route path="/training" element={<Training />} />

            <Route
              path="/templateworkout"
              element={<TemplatesList training={true} />}
            />
            <Route path="/emptyworkout" element={<StarAnEmptytWorkout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
