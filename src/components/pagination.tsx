"use client";

import LinkIcon from "./linkIcon";
import style from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div aria-label="pagination" className={style.box}>
      <button
        className={style.btn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <LinkIcon className={style.leftBtn} />
      </button>
      <div className={`${style.page} font-md`}>
        {currentPage} of {totalPages}
      </div>
      <button
        className={style.btn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <LinkIcon />
      </button>
    </div>
  );
}
