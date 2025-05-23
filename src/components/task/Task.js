"use client";

import { useEffect, useState } from "react";
import styles from "./Task.module.css";
import {
  isEmptyArray,
  isErrorResponse,
  resolveResponse,
} from "@/lib/utils/CommonUtils";
import {
  getAllTasks,
  getUserByEmail,
  inviteUser,
} from "@/api-routes/ApiRoutes";
import { useParams, useRouter } from "next/navigation";
import { PAGINATION_MAX_SIZE } from "@/lib/enum/ApplicationConstants";
import SingleTaskCard from "../single-task-card/SingleTaskCard";
import { Button } from "../common/button/Button";
import { FaPlus } from "react-icons/fa";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import InviteModal from "../invite-modal/InviteModal";

const Task = () => {
  const params = useParams();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [role, setRoll] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      const result = await resolveResponse(
        getAllTasks(1, PAGINATION_MAX_SIZE, params.appId)
      );
      if (!isErrorResponse(result)) {
        setTasks(result?.tasks);
        setRoll(result?.role);
      }
    };
    getTasks();
  }, []);

  const handleCreateTask = () => {
    router.push(appRouteList.createTask(params.appId));
  };

  const handleInviteUser = async (data) => {
    setError("");
    const { email, role } = data;
    const result = await resolveResponse(getUserByEmail(email));
    if (result?.error) {
      setError(result.message);
    } else {
      const payload = {
        userId: result._id,
        role,
      };
      const res = await resolveResponse(inviteUser(params.appId, payload));
      setError(res.message);
    }
  };

  return (
    <>
      <div className={styles["header"]}>
        <h2 className={styles["title"]}>TASKS</h2>
        <div className={styles["top-buttons"]}>
          <Button className={styles["create-app"]} onClick={handleCreateTask}>
            <FaPlus /> Add Task
          </Button>
          <Button
            className={styles["invite"]}
            onClick={() => {
              setModalOpen(true);
              setError("");
            }}
          >
            <FaPlus /> Invite
          </Button>
        </div>
      </div>
      <div className={styles["wrapper"]}>
        {isEmptyArray(tasks) ? (
          <div>No Task Available</div>
        ) : (
          <div className={styles["app-list"]}>
            {tasks?.map((task) => (
              <SingleTaskCard
                key={task._id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
                appId={params?.appId}
                role={role}
              />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <InviteModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleInviteUser}
          error={error}
        />
      )}
    </>
  );
};

export default Task;
