import WebNavbar from "../web-navbar/WebNavbar";
import styles from "./WebLayout.module.css";

const WebLayout = ({ children }) => {
  return (
    <>
      <WebNavbar />
      <div className={styles["layout"]}>{children}</div>
    </>
  );
};

export default WebLayout;
