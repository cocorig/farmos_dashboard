import React from "react";
import style from "./header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.headerBox}>
        <Link href={"/"} className="font-xl">
          DashBoard
        </Link>
      </div>
    </header>
  );
}
