import React, { useState } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
  });
  console.log(form);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/.netlify/functions/userCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  let updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  return (
    <form onSubmit={(e) => onSubmit(e, form)}>
      <h3>Sign Up</h3>

      <div>
        <label>First name</label>
        <input
          type="text"
          placeholder="Enter First Name"
          onChange={(event) =>
            updateForm({ firstname: event.target.value })
          }></input>
      </div>
      <div>
        <label>Last name</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          onChange={(event) =>
            updateForm({ lastname: event.target.value })
          }></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(event) =>
            updateForm({ password: event.target.value })
          }></input>
      </div>
      <div>
        <label>Email adress</label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(event) =>
            updateForm({ email: event.target.value })
          }></input>
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
      <p>
        Already registered? <a href="/signin">sign in!</a>
      </p>
    </form>
  );
};

export default SignUp;
