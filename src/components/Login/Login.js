import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Authcontext } from "../../context/UserContext";
import "./Login.css";

const Login = () => {
  const { signIn } = useContext(Authcontext);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        // navigate("/");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
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
        <input className="btn-submit" type="submit" value="login" />
      </form>
      <p>
        New to ema john <Link to="/signup">Create a New Account</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
