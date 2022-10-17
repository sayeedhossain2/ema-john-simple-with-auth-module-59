import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Authcontext } from "../../context/UserContext";
import "./SignUp.css";

const SignUp = () => {
  const [error, setError] = useState(null);
  const { creatUser } = useContext(Authcontext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    setError("");
    if (password.length < 6) {
      setError("Password should be 6 character or more");
      return;
    }
    if (password !== confirm) {
      setError("Your password did not match");
      return;
    }
    creatUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="Confirm">Confirm Password </label>
          <input
            type="password"
            name="confirm"
            placeholder="Enter your password"
            required
          />
        </div>
        <input className="btn-submit" type="submit" value="Sign Up" />
      </form>
      <p>
        Already Have an Account ? <Link to="/login">Login</Link>{" "}
      </p>
      <p className="text-error"> {error}</p>
    </div>
  );
};

export default SignUp;
