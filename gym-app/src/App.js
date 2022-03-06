import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createMemoryHistory } from "history";
import Navigationbar from "./components/Navigationbar";
import Exercises from "./components/Exercises";
import History from "./components/History";
import Profile from "./components/Profile";
import StartWorkout from "./components/StartWorkout";

function App() {
  const history = createMemoryHistory();
  return (
    <Router location={history.location} navigator={history}>
      <div>
        <Navigationbar />
        <Routes>
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/history" element={<History />} />
          <Route path="/startworkout" element={<StartWorkout />} />
          <Route path="/" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
