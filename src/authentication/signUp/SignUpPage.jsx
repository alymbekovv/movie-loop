import React from "react";
import scss from "./signUp.module.scss";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const { register, handleSubmit, formState, watch } = useForm({
    mode: "onChange",
  });

  function onSubmit(inputValues) {
    console.log(inputValues);
  }

  const password = watch("password");
  return (
    <div className={scss.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>

        <div className={scss.inputBox}>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="text"
            placeholder="Email"
            required
          />
          <i className="bx bxs-user"></i>
          {formState.errors.email && (
            <p className={scss.error}>{formState.errors.email.message}</p>
          )}
        </div>

        <div className={scss.inputBox}>
          <input
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
                message: "Password must include letters and numbers",
              },
            })}
            type="password"
            placeholder="Password"
            required
          />

          <i className="bx bxs-lock-alt"></i>
          {formState.errors.password && (
            <p className={scss.error}>{formState.errors.password.message}</p>
          )}
        </div>

        <div className={scss.inputBox}>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
            placeholder="Confirm Password"
          />
          <i className="bx bxs-lock-alt"></i>
          {formState.errors.confirmPassword && (
            <p className={scss.error}>
              {formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className={scss.rememberForgot}>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit" className={scss.btn}>
          Login
        </button>

        <div className={scss.registerLink}>
          <p>
            Already have an account?
            <a href="#"> Sign in</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
