import {
  getFormattedDateParts,
  isErrorResponse,
  resolveResponse,
} from "@/lib/utils/CommonUtils";
import styles from "./SingleAppCard.module.css";
import { IoMdTime } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteApp } from "@/api-routes/ApiRoutes";
import { useRouter } from "next/navigation";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import { useState } from "react";
import DeleteModal from "../delete-modal/DeleteModal";

const SingleAppCard = ({ app, ownApps, setOwnApps }) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    const res = await resolveResponse(deleteApp(app._id));
    if (!isErrorResponse(res)) {
      const apps = ownApps.filter((a) => a._id != app._id);
      setOwnApps(apps);
    }
  };

  const handleRedirectionToTasks = () => {
    router.push(appRouteList.tasks(app._id));
  };

  return (
    <>
      <div
        className={styles["card-wrapper"]}
        onClick={handleRedirectionToTasks}
      >
        <div className={styles["title"]}>{app?.title}</div>
        <div className={styles["created"]}>
          <IoMdTime /> <p>{getFormattedDateParts(app?.createdAt)}</p>
        </div>
        <div className={styles["right"]}>
          {app?.role === "owner" && (
            <div
              className={styles["delete"]}
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
            >
              <RiDeleteBin6Line />
            </div>
          )}
          <div className={styles["role"]}>{app.role}</div>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDelete()}
          itemName={app.title}
        />
      )}
    </>
  );
};

export default SingleAppCard;
