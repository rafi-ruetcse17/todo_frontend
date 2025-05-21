"use client";

import React, { useState } from "react";
import styles from "./SignupForm.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { appRouteList } from "@/lib/utils/PageRouteUtils";

import { UserActions } from "@/lib/actions/user.action";

const SignupForm = () => {
  const [error, setError] = useState();
  const [pageLoader, setPageLoader] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = async (payload) => {
    setPageLoader(true);
    const result = await UserActions.USER_SIGNUP(payload);
    if (result?.data?.error) {
      setError(result?.data?.message);
    } else {
      router.push(appRouteList.user);
    }
    setPageLoader(false);
  };

  const handleLogin = () => {
    router.push(appRouteList.login);
  };

  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
          <input
            type="text"
            id="name"
            placeholder="Enter full name"
            className={styles["input"]}
            {...register("name", { required: "Name is required" })}
          />

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
            Create account
          </button>
          <div className={styles["or"]}>or</div>
        </form>
        <div className={styles["bottom"]}>
          <div className={styles["line"]}></div>
          <button className={styles["button"]} onClick={handleLogin}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
