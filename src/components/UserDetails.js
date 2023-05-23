import React, { useState, useEffect } from "react";

const UserDetails = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const dataOfUser = async () => {
      const res = await fetch("/.netlify/functions/userDataCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: window.localStorage.getItem("token") }),
      });
      const dataOfUserResponse = await res.json();
      console.log("RES", dataOfUserResponse);
      setUserData(dataOfUserResponse);
      if (dataOfUserResponse === "token expired") {
        alert("Token expired login again");
        window.localStorage.clear();
        window.location.href = "/signin";
      }
    };
    dataOfUser();
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  return (
    <div>
      Name<h1>{userData.firstname}</h1>
      Last Name <h1>{userData.lastname}</h1>
      <button onClick={(e) => logOut(e)}>Log Out</button>
    </div>
  );
};

export default UserDetails;
