"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createApp } from "@/api-routes/ApiRoutes";
import styles from "./AppForm.module.css";
import { isErrorResponse, resolveResponse } from "@/lib/utils/CommonUtils";
import { appRouteList } from "@/lib/utils/PageRouteUtils";

const AppForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await resolveResponse(createApp(data));
    if (!isErrorResponse(res)) {
      router.push(appRouteList.user);
    }
  };

  return (
    <div className={styles["task-form-container"]}>
      <h2 className={styles["task-form-title"]}>Create New App</h2>
      <form className={styles["task-form"]} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles["task-input"]}
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <button
          className={styles["task-submit-btn"]}
          type="submit"
          disabled={isSubmitting}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AppForm;
