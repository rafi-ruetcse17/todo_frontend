import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles["loader"]}>
      <img src="loader blue.avif" alt="loader" className={styles["icon"]} />
    </div>
  );
};
