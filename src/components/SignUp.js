import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./Logo";
// import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    role: "",
    secretKey: "User",
    // ipAdress: "",
  });
  // const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toastId = React.useRef(null);

  useEffect(() => {
    if (loading) {
      toastId.current = toast("Creating new User!", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.dismiss(toastId.current);
    }
  }, [loading]);

  useEffect(() => {
    if (errorMsg) {
      toastId.current = toast(errorMsg, {
        position: "top-center",
        autoClose: 100000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setErrorMsg("");
  }, [errorMsg]);

  const isEmpty = Object.values(form).some((el) => {
    return !el;
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/.netlify/functions/userCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const record = await res.json();
      if (res.status < 200 || res.status > 299) {
        setErrorMsg(record.msg);
        return;
      }
      window.location.href = "./signin";
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  let updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  return (
    <div>
      {" "}
      <Logo />
      <div className="signup">
        <form className="mb-3 py-5">
          <h3>Sign Up</h3>
          <div className="mb-3 pt-3">
            <label>First name</label>
            <input
              type="text"
              minLength="3"
              maxLength="200"
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
              minLength="3"
              maxLength="200"
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
              minLength="3"
              maxLength="200"
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
              minLength="3"
              maxLength="200"
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
                type="password"
                minLength="3"
                maxLength="200"
                placeholder="Secret Key"
                className="form-control"
                onChange={(event) =>
                  updateForm({ secretKey: event.target.value })
                }></input>
            </div>
          )}

          <div className="mb-3 pb-3">
            <Button
              color="primary"
              disabled={!!isEmpty}
              className="center-block"
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
    </div>
  );
};

export default SignUp;
