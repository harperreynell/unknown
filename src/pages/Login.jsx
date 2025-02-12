import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../backend/server"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Login = ({ onLogin }) => { 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User logged in:", user.uid, userData);

        onLogin(true, userData.first, userData.last);
        navigate("/");
      } else {
        console.error("User data not found in Firestore.");
      }
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
