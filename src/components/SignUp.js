import React, { useState } from "react";
import { Button } from "reactstrap";
// import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    userType: "",
    // ipAdress: "",
  });
  // const [ip, setIp] = useState("");
  const userTypeKey = process.env.REACT_APP_API_KEY;
  const [secretKey, setSecretKey] = useState("");

  const isEmpty = Object.values(form).some((el) => {
    return !el;
  });

  console.log(form);
  console.log("A", secretKey !== userTypeKey);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.userType === "Admin" && secretKey !== userTypeKey) {
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
        console.log(res);
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

  // useEffect(() => {
  //   console.log("a");
  //   for (var key in form) {
  //     console.log("b", form[key] !== null, form[key] !== "", key, form[key]);
  //     if (form[key] !== null && form[key] !== "") {
  //       setFormEmpty(true);
  //     } else {
  //       setFormEmpty(false);
  //     }
  //   }
  // }, [form]);

  // const getData = async () => {
  //   const res = await axios.get("https://api.ipify.org/?format=json");
  //   console.log(res.data);
  //   updateForm({ ipAdress: res.data.ip });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

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
            name="UserType"
            value="User"
            onChange={(event) => updateForm({ userType: event.target.value })}
          />{" "}
          User{" "}
          <input
            type="radio"
            name="UserType"
            value="Admin"
            onChange={(event) => updateForm({ userType: event.target.value })}
          />{" "}
          Admin
        </div>
        {form.userType === "Admin" && (
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
