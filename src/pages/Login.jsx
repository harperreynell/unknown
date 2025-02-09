import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    onLogin(); 
    navigate("/"); 
  };

  const handleButtonClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>Login Form</h1>
      <form className="form">
        <input
          type="email"
          {...register("email", { 
            required: "Email is required", 
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address, including '@' and domain"
            }
          })}
          className={`input ${errors.email ? 'input-error' : ''}`} // Add 'input-error' class on error
          placeholder="Email"
          autoComplete="off"
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}

        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="input"
          placeholder="Password"
          autoComplete="off"
        />
        {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
        <button type="button" className="button input" onClick={handleButtonClick}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
