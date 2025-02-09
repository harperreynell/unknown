import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../backend/server"; 

const Login = ({ onLogin }) => { 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      onLogin(true); 
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(error.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>Login Form</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="input"
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

        <button type="submit" className="button input">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
