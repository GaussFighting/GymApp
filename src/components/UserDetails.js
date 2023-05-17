import React, { useState, useEffect } from "react";

const UserDetails = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const asdf = async () => {
      const res = await fetch("/.netlify/functions/userDataCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: window.localStorage.getItem("token") }),
      });
      const asdf = await res.json();
      console.log("RES", asdf);
      setUserData(asdf);
    };
    asdf();
  }, []);

  return (
    <div>
      Name<h1>{userData.firstname}</h1>
      Last Name <h1>{userData.lastname}</h1>
    </div>
  );
};

export default UserDetails;
