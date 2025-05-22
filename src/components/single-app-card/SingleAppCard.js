import {
  getFormattedDateParts,
  isErrorResponse,
  resolveResponse,
} from "@/lib/utils/CommonUtils";
import styles from "./SingleAppCard.module.css";
import { IoMdTime } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteApp } from "@/api-routes/ApiRoutes";

const SingleAppCard = ({ app, ownApps, setOwnApps }) => {
  const handleDelete = async () => {
    const res = await resolveResponse(deleteApp(app._id));
    if (!isErrorResponse(res)) {
      const apps = ownApps.filter((a) => a._id != app._id);
      setOwnApps(apps)
    }
  };

  return (
    <div className={styles["card-wrapper"]}>
      <div className={styles["title"]}>{app?.title}</div>
      <div className={styles["created"]}>
        <IoMdTime /> <p>{getFormattedDateParts(app?.createdAt)}</p>
      </div>
      <div className={styles["right"]}>
        {app?.role === "Owner" && (
          <div className={styles["delete"]} onClick={handleDelete}>
            <RiDeleteBin6Line />
          </div>
        )}
        <div className={styles["role"]}>{app.role}</div>
      </div>
    </div>
  );
};

export default SingleAppCard;
