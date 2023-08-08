import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./Logo";

const SignIn = () => {
  const [form, setForm] = useState({
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const toastId = React.useRef(null);

  useEffect(() => {
    if (loading) {
      toastId.current = toast("Logging!", {
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

  const isEmpty = Object.values(form).some((el) => {
    return !el;
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/.netlify/functions/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const logRes = await res.json();
      if (logRes.msg) {
        alert(`${logRes.msg}`);
        window.location.href = "./signin";
        setLoading(false);
      } else {
        window.localStorage.setItem("token", logRes.token);
        window.localStorage.setItem("loggedIn", true);
        window.localStorage.setItem("role", logRes.role);
        window.location.href = "./";
        setLoading(false);
      }
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
      <div className="signin">
        <form className="mb-3 py-5">
          <h3>Sign In</h3>

          <div className="mb-3 pt-3">
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

          <div className="mb-3">
            <Button
              color="primary"
              disabled={!!isEmpty}
              className="center-block"
              onClick={(e) => onSubmit(e, form)}>
              Log in!
            </Button>
          </div>
          <p>Do not have account? </p>
          <p>
            {" "}
            <strong>
              <a className="sign-in" href="/">
                Sign up!
              </a>
            </strong>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
