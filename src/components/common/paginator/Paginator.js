"use client";

import { useEffect, useState } from "react";
import styles from "./Paginator.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getClassNames } from "@/lib/utils/CommonUtils";

const classNames = getClassNames(styles);

export const Paginator = ({
  totalPages,
  currentPage = 1,
  onPageChange = () => null,
  className,
}) => {
  const [pages, setPages] = useState([]);

  const paginationStyle = {
    "--paginationColor": "#0866ff",
    display: totalPages > 1 ? "flex" : "none",
  };

  useEffect(() => {
    if (totalPages <= 6) {
      if (!pages.length) {
        setPages(Array.from({ length: totalPages }, (_, index) => index + 1));
      }
      return;
    }

    if (currentPage >= 5 && currentPage <= totalPages - 4) {
      setPages([
        1,
        "...",
        +currentPage - 1,
        +currentPage,
        +currentPage + 1,
        "...",
        totalPages,
      ]);
      return;
    }

    if (currentPage > totalPages - 4) {
      setPages([
        1,
        "...",
        +totalPages - 4,
        +totalPages - 3,
        +totalPages - 2,
        +totalPages - 1,
        totalPages,
      ]);
      return;
    }

    setPages([1, 2, 3, 4, 5, "...", totalPages]);
  }, [currentPage, totalPages]);

  return (
    <div className={classNames("wrapper", className)} style={paginationStyle}>
      <button
        onClick={() => onPageChange(+currentPage - 1)}
        className={classNames("prev")}
        disabled={currentPage === 1}
      >
        <FiChevronLeft size={20} />
      </button>
      {pages.map((page, index) => (
        <button
          key={page + index}
          onClick={() => {
            if (page !== "...") onPageChange(+page);
          }}
          disabled={page === "..."}
          className={classNames("page", currentPage === page && "selected")}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(+currentPage + 1)}
        className={classNames("next")}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
};
