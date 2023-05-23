import React, { useState } from "react";
import { Button } from "reactstrap";

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
      alert("login successful");
      window.localStorage.setItem("token", myToken);
      window.localStorage.setItem("loggedIn", true);
      window.location.href = "./";
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
    <div className="signin">
      <form className="mb-3 py-5">
        <h3>Sign In</h3>

        <div className="mb-3 pt-3">
          <label>Email adress</label>
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            onChange={(event) =>
              updateForm({ email: event.target.value })
            }></input>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control"
            onChange={(event) =>
              updateForm({ password: event.target.value })
            }></input>
        </div>

        <div className="mb-3">
          <Button
            color="primary"
            className="add-new-template-cancel-button center-block"
            onClick={(e) => onSubmit(e, form)}>
            Log in!
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
