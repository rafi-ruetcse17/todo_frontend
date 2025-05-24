"use client";

import { useForm } from "react-hook-form";
import styles from "./InviteModal.module.css";
import { InviteRoles } from "@/lib/enum/Role";

const InviteModal = ({ isOpen, onClose, onSubmit, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    setTimeout(() => {
      if (!error) {
        reset();
        onClose();
      }
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal"]}>
        <h2 className={styles["modal-title"]}>Invite Collaborator</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              className={styles["input"]}
            />
            {errors.email && (
              <p className={styles["error"]}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className={styles["input"]}
            >
              <option value="">Select Role</option>
              {Object.keys(InviteRoles).map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className={styles["error"]}>{errors.role.message}</p>
            )}
          </div>
          {error && <p className={styles["error"]}>{error}</p>}

          <div className={styles["actions"]}>
            <button type="submit" className={styles["submit"]}>
              Send Invite
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles["cancel"]}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;
