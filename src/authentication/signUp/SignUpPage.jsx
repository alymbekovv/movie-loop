import React from "react";
import scss from "./signUp.module.scss";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navivgate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      useAuthStore.getState().setUser(user);
      navivgate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  async function onSubmit({ email, password, name }) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    navivgate("/");

    await updateProfile(user, {
      displayName: name,
    });

    useAuthStore.getState().setUser({ ...user, displayName: name });
  }

  return (
    <div className={scss.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className={scss.inputBox}>
          <input
            {...register("name", {
              required: "Name is required",
            })}
            type="text"
            placeholder="Full Name"
            required
          />
          <i className="bx bxs-user"></i>
          {formState.errors.name && (
            <p className={scss.error}>{formState.errors.name.message}</p>
          )}
        </div>

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

        <div className={scss.rememberForgot}>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit" className={scss.btn}>
          Sign Up
        </button>
        <button className={scss.button} onClick={handleGoogleSignUp}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          Continue with Google
        </button>

        {/* <div className={scss.registerLink}>
          <p>
            Already have an account?
            <a href="#"> Sign in</a>
          </p>
        </div> */}
      </form>
    </div>
  );
};

export default SignUpPage;
