"use client";

import { IoMdTime } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "./SingleTaskCard.module.css";
import {
  getFormattedDateParts,
  isErrorResponse,
  resolveResponse,
} from "@/lib/utils/CommonUtils";
import TaskStatus from "@/lib/enum/TaskStatus";
import { deleteTask, updateTask } from "@/api-routes/ApiRoutes";
import { useRouter } from "next/navigation";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import Role from "@/lib/enum/Role";
import { useEffect, useState } from "react";
import DeleteModal from "../delete-modal/DeleteModal";
import { connectSocket } from "@/lib/utils/socketUtils";
import SocketEvents from "@/lib/enum/SocketEvents";

const SingleTaskCard = ({ task, tasks, setTasks, appId, role }) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const socket = connectSocket();
    socket.emit(SocketEvents.joinRoom, appId);

    socket.on(SocketEvents.updateTask, (updatedTask) => {
      updateNewTaskList(updatedTask);
    });

    return () => {
      socket.off(SocketEvents.updateTask);
    };
  }, [appId]);

  const handleStatusChange = async (e) => {
    const status = e.target.value;
    const payload = {
      status,
    };
    const updatedTask = await resolveResponse(
      updateTask(payload, task._id, appId)
    );
    updateNewTaskList(updatedTask);
  };

  const updateNewTaskList = (updatedTask) => {
    const updatedTaskList = tasks.map((t) => {
      if (t._id === task._id) {
        return updatedTask;
      }
      return t;
    });
    setTasks(updatedTaskList);
  };

  const handleEditTask = () => {
    router.push(appRouteList.editTask(appId, task._id));
  };

  const handleRemoveTask = async () => {
    const result = await resolveResponse(deleteTask(task._id, appId));
    if (!isErrorResponse(result)) {
      const updatedTaskList = tasks.filter((t) => t._id !== task._id);
      setTasks(updatedTaskList);
    }
  };

  return (
    <>
      <div className={styles["card-wrapper"]}>
        <div className={styles["top"]}>
          <h3 className={styles["title"]}>{task?.title}</h3>
          {role === Role.viewer ? (
            <div className={styles["status-text"]}>{task?.status}</div>
          ) : (
            <select
              value={task?.status}
              onChange={handleStatusChange}
              className={styles["status-dropdown"]}
            >
              {Object.values(TaskStatus).map((status) => (
                <option key={status} value={status}>
                  {status.replace("_", " ")}
                </option>
              ))}
            </select>
          )}
        </div>

        <p className={styles["description"]}>{task?.description}</p>

        <div className={styles["bottom"]}>
          <div className={styles["time"]}>
            <IoMdTime /> {getFormattedDateParts(task.createdAt)}
          </div>

          {role === Role.owner || role === Role.editor ? (
            <div className={styles["actions"]}>
              <FaEdit className={styles["icon"]} onClick={handleEditTask} />
              <RiDeleteBin6Line
                className={styles["icon"]}
                onClick={() => setShowDeleteModal(true)}
              />
            </div>
          ) : null}
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleRemoveTask()}
          itemName={task.title}
        />
      )}
    </>
  );
};

export default SingleTaskCard;
