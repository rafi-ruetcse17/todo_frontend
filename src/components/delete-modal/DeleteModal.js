import styles from "./DeleteModal.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "this item",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles["overlay"]}>
      <div className={styles["modal"]}>
        <div className={styles["header"]}>
          <h3>Confirm Deletion</h3>
          <IoClose className={styles["close-icon"]} onClick={onClose} />
        </div>
        <div className={styles["body"]}>
          <RiDeleteBin6Line className={styles["delete-icon"]} />
          <p>
            Are you sure you want to delete <strong>{itemName}</strong>?
          </p>
        </div>
        <div className={styles["footer"]}>
          <button className={styles["cancel-btn"]} onClick={onClose}>
            Cancel
          </button>
          <button className={styles["confirm-btn"]} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
