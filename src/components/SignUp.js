import React, { useState } from "react";
import { Button } from "reactstrap";
// import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    role: "",
    // ipAdress: "",
  });
  // const [ip, setIp] = useState("");
  const roleKey = process.env.REACT_APP_API_KEY;
  const [secretKey, setSecretKey] = useState("");

  const isEmpty = Object.values(form).some((el) => {
    return !el;
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.role === "Admin" && secretKey !== roleKey) {
      alert("Invalid Admin");
    } else {
      try {
        const res = await fetch("/.netlify/functions/userCreate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        window.location.href = "./signin";
      } catch (error) {
        console.log(error);
      }
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
        <div>
          {" "}
          Register As{" "}
          <input
            type="radio"
            name="role"
            value="User"
            onChange={(event) => updateForm({ role: event.target.value })}
          />{" "}
          User{" "}
          <input
            type="radio"
            name="role"
            value="Admin"
            onChange={(event) => updateForm({ role: event.target.value })}
          />{" "}
          Admin
        </div>
        {form.role === "Admin" && (
          <div className="mb-3">
            <label>Secret Key</label>
            <input
              type="text"
              placeholder="Secret Key"
              className="form-control"
              onChange={(event) => setSecretKey(event.target.value)}></input>
          </div>
        )}

        <div className="mb-3 pb-3">
          <Button
            color="primary"
            disabled={!!isEmpty}
            className="add-new-template-cancel-button center-block"
            onClick={(e) => onSubmit(e, form)}>
            Submit
          </Button>
        </div>
        <p>Already registered? </p>
        <p>
          {" "}
          <strong>
            <a className="sign-in" href="/signin">
              Sign in!
            </a>
          </strong>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
