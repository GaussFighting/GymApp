import React, { useState } from "react";
import { Button } from "reactstrap";

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
    <div className="signup">
      <form className="mb-3 py-5">
        <h3>Sign Up</h3>

        <div className="mb-3 pt-3">
          <label>First name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            className="form-control"
            onChange={(event) =>
              updateForm({ firstname: event.target.value })
            }></input>
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            className="form-control"
            onChange={(event) =>
              updateForm({ lastname: event.target.value })
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
          <label>Email adress</label>
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            onChange={(event) =>
              updateForm({ email: event.target.value })
            }></input>
        </div>
        <div className="mb-3 pb-3">
          <Button
            color="primary"
            className="add-new-template-cancel-button center-block"
            onClick={(e) => onSubmit(e, form)}>
            Submit
          </Button>
        </div>
        <p>Already registered? </p>
        <p>
          {" "}
          <a className="sign-in" href="/signin">
            Sign in!
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
