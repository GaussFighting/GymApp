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
import Workout from "./components/Workout";
import Result from "./components/Result";
import NoPage from "./components/NoPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserDetails from "./components/UserDetails";

const App = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div>
        <ToastContainer />
      </div>
      <div>
        {isLoggedIn && <Navigationbar />}
        <div className="container-sm">
          <Routes>
            <Route
              path="/"
              element={isLoggedIn === "true" ? <UserDetails /> : <SignIn />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/userdetails" element={<UserDetails />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/history" element={<History />} />
            <Route path="/results/:id" element={<Result />} />
            <Route path="/startworkout" element={<StartWorkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/exercise/:id" element={<Exercise />} />
            <Route path="/addnewtemplate" element={<AddNewTemplate />} />
            <Route path="/templatelist" element={<TemplatesList />} />
            <Route path="/template/:id" element={<Template />} />
            <Route
              path="/choosetemplate"
              element={<TemplatesList training={true} />}
            />
            <Route
              path="/templateworkout"
              element={<Workout template={true} />}
            />
            <Route
              path="/emptyworkout"
              element={<Workout template={false} />}
            />

            <Route path="/*" element={<NoPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
