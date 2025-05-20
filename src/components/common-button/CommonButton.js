"use client";

import { useState } from "react";
import styles from "./CommonButton.module.css";

const CommonButton = ({
  value,
  active,
  callBack,
  bgColor = "#000000",
  color = "#FFFFFF",
  border = "1px solid #000000",
}) => {
  const [click, setClick] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleMouseClick = (value) => {
    if (active) {
      setClick(value);
    }
  };

  return (
    <div className={styles["common-button-wrapper"]}>
      <button
        style={{
          background: active ? bgColor : "rgba(0, 0, 0, 0.2)",
          color: color,
          border: active ? border : "",
          width: "100%",
        }}
        className={`${styles["common-button"]} ${
          styles[active ? "active" : "inactive"]
        } ${styles[click && loader ? "click" : ""]}`}
        onClick={() => {
          if (active) {
            setLoader(true);
            callBack();
          }
        }}
        onTouchStart={() => handleMouseClick(true)}
        onTouchEnd={() => handleMouseClick(false)}
        onMouseDown={() => handleMouseClick(true)}
        onMouseLeave={() => handleMouseClick(false)}
      >
        {value}
      </button>
      {loader ? <div className={styles["loader"]} /> : null}
    </div>
  );
};

export default CommonButton;
