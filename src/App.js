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
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

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
              element={isLoggedIn === "true" ? <Profile /> : <SignIn />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/exercises"
              element={isLoggedIn === "true" ? <Exercises /> : <SignIn />}
            />
            <Route
              path="/history"
              element={isLoggedIn === "true" ? <History /> : <SignIn />}
            />
            <Route
              path="/results/:id"
              element={isLoggedIn === "true" ? <Result /> : <SignIn />}
            />
            <Route
              path="/startworkout"
              element={isLoggedIn === "true" ? <StartWorkout /> : <SignIn />}
            />
            <Route
              path="/exercise/:id"
              element={isLoggedIn === "true" ? <Exercise /> : <SignIn />}
            />
            <Route
              path="/addnewtemplate"
              element={isLoggedIn === "true" ? <AddNewTemplate /> : <SignIn />}
            />
            <Route
              path="/templatelist"
              element={isLoggedIn === "true" ? <TemplatesList /> : <SignIn />}
            />
            <Route
              path="/template/:id"
              element={isLoggedIn === "true" ? <Template /> : <SignIn />}
            />
            <Route
              path="/choosetemplate"
              element={
                isLoggedIn === "true" ? (
                  <TemplatesList training={true} />
                ) : (
                  <SignIn />
                )
              }
            />
            <Route
              path="/templateworkout"
              element={
                isLoggedIn === "true" ? <Workout template={true} /> : <SignIn />
              }
            />
            <Route
              path="/emptyworkout"
              element={
                isLoggedIn === "true" ? (
                  <Workout template={false} />
                ) : (
                  <SignIn />
                )
              }
            />

            <Route path="/*" element={<NoPage />} />
            <Route
              path="/"
              element={isLoggedIn === "false" ? <SignIn /> : <Profile />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
