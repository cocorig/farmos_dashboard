import React from "react";
import style from "./descSection.module.css";
type Props = {
  title: string;
  desc: string;
};

export default function DescSection({ title, desc }: Props) {
  return (
    <div className={style.descBox}>
      <h1 className={`font-3xl ${style.title}`}>{title}</h1>
      <p className={`font-md ${style.desc}`}>{desc}</p>
    </div>
  );
}
