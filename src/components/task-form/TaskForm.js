"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTask, updateTask } from "@/api-routes/ApiRoutes";
import styles from "./TaskForm.module.css";
import { resolveResponse } from "@/lib/utils/CommonUtils";
import { appRouteList } from "@/lib/utils/PageRouteUtils";

const TaskForm = ({ appId, taskId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const router = useRouter();
  const [existingTask, setExistingTask] = useState({});

  useEffect(() => {
    if (taskId) {
      const getTask = async () => {
        const task = await resolveResponse(updateTask({}, taskId, appId));
        setExistingTask(task);
      };
      getTask();
    }
  }, []);

  useEffect(() => {
    if (existingTask) {
      reset({
        title: existingTask.title,
        description: existingTask.description,
      });
    }
  }, [existingTask, reset]);

  const onSubmit = async (data) => {
    if (taskId) {
      await updateTask(data, existingTask._id, appId);
    } else {
      await createTask(data, appId);
    }
    router.push(appRouteList.tasks(appId));
  };

  return (
    <div className={styles["task-form-container"]}>
      <h2 className={styles["task-form-title"]}>
        {taskId ? "Edit Task" : "Create Task"}
      </h2>
      <form className={styles["task-form"]} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles["task-input"]}
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <textarea
          className={styles["task-textarea"]}
          placeholder="Description"
          rows="4"
          {...register("description", { required: true })}
        />
        <button
          className={styles["task-submit-btn"]}
          type="submit"
          disabled={isSubmitting}
        >
          {taskId ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
