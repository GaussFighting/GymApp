import React, { useState } from "react";

const SignIn = () => {
  const [form, setForm] = useState({
    password: "",
    email: "",
  });
  console.log(form);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/.netlify/functions/loginCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const myToken = await res.json();
      console.log(myToken);
      window.localStorage.setItem("token", myToken);
      window.location.href = "./userDetails";
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
    <form>
      <h3>Sign In</h3>

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
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(event) =>
            updateForm({ password: event.target.value })
          }></input>
      </div>

      <div>
        <button type="submit" onClick={(e) => onSubmit(e, form)}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignIn;
