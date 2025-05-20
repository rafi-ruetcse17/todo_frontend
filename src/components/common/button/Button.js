import { getClassNames } from "@/lib/utils/CommonUtils";
import style from "./Button.module.css";
import { forwardRef } from "react";
const classNames = getClassNames(style);

export const Button = forwardRef(
  (
    {
      children,
      onClick,
      className,
      loading,
      variant = "primary",
      disabled = false,
      isRounded,
    },
    ref
  ) => {
    return (
      <button
        disabled={disabled || loading}
        onClick={onClick}
        ref={ref}
        className={classNames(
          "button",
          variant,
          className,
          isRounded && "rounded"
        )}
      >
        {loading ? <div className={classNames("loading")} /> : children}
      </button>
    );
  }
);
