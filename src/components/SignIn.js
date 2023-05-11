import React from "react";

const SignIn = () => {
  return (
    <form>
      <h3>Sign In</h3>

      <div>
        <label>UserName</label>
        <input type="text" placeholder="Enter username"></input>
      </div>
      <div>
        <label>Password</label>
        <input type="password" placeholder="Enter password"></input>
      </div>
      <div>
        <label>Email adress</label>
        <input type="email" placeholder="Enter email"></input>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SignIn;
