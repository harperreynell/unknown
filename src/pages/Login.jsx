import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <h1>Registration Form</h1>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <input type="email" {...register("email", { required: true })} className="input" />
                {errors.email && <span style={{ color: "red" }}>
                    *Email* is mandatory </span>}
                <input type="password" {...register("password")} className="input" />
                <input type={"submit"} className="input"/>
            </form>
        </div>
  );
};

export default Login;
