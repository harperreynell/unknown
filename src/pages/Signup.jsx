import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../../backend/server"; 

const SignUp = ({ onLogin }) => { 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      onLogin(true); 
      navigate("/"); 
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>Sign Up Form</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className={`input ${errors.email ? 'input-error' : ''}`}
          placeholder="Email"
          autoComplete="off"
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}

        <input
          type="password"
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
          className="input"
          placeholder="Password"
          autoComplete="off"
        />
        {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}

        <button type="submit" className="button input">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
