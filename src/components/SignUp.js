import React, { useState } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  return (
    <form>
      <h3>Sign Up</h3>

      <div>
        <label>UserName</label>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(event) =>
            useState({ username: event.target.value })
          }></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(event) =>
            useState({ password: event.target.value })
          }></input>
      </div>
      <div>
        <label>Email adress</label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(event) => useState({ email: event.target.value })}></input>
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
      <p>
        Already registered <a href="/sign-in">sign in!</a>
      </p>
    </form>
  );
};

export default SignUp;
