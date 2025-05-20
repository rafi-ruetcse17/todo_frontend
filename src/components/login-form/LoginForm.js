"use client";

import React, { useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader } from "../common/loader/Loader";
import { appRouteList } from "@/lib/utils/PageRouteUtils";

const LoginForm = () => {
  const [error, setError] = useState();
  const [pageLoader, setPageLoader] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    // try {
    //   const { data } = await loginUser({
    //     variables: { email, password },
    //   });
    //   if (data) {
    //     localStorage.setItem("token", data.loginUser.token);
    //     router.push(appRouteList.user);
    //   }
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  const handleSignUp = () => {
    router.push(appRouteList.signup);
  };

  //if (pageLoader) return <Loader />;

  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className={styles["input"]}
            {...register("email", { required: "Email is required" })}
          />

          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className={styles["input"]}
            {...register("password", { required: "Password is required" })}
          />
          {error && <div className={styles["error"]}>{error}</div>}

          <button
            type="submit"
            disabled={!isValid}
            className={styles[!isValid && "disabled"]}
          >
            Log in
          </button>
          <div className={styles["or"]}>or</div>
        </form>
        <div className={styles["bottom"]}>
          <div className={styles["line"]}></div>
          <button className={styles["button"]} onClick={handleSignUp}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
