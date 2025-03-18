"use client";
import { MonthlyPower } from "@/model/power";
import style from "./table.module.css";
import { useRouter } from "next/navigation";

type Props = { data: MonthlyPower[] };

const DataCell = ({
  obsmonth,
  value,
  type,
}: {
  obsmonth: string;
  value: number | null;
  type: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (value !== null) {
      router.push(`/power/${obsmonth}/${type}`);
    }
  };

  return (
    <td
      className={`${style.td} ${style.activeTd}`}
      onClick={handleClick}
      aria-disabled={value === null}
    >
      {value !== null ? value : "-"}
    </td>
  );
};

export default function Table({ data }: Props) {
  return (
    <div className={style.tableBox}>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th className={style.th}>obsmonth</th>
            <th className={style.th}>fuel</th>
            <th className={style.th}>general</th>
            <th className={style.th}>heater</th>
            <th className={style.th}>nutsys</th>
            <th className={style.th}>storage</th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {data.map((row) => (
            <tr key={row.obsmonth} className={style.tr}>
              <td className={`${style.td} font-md`}>{row.obsmonth}</td>
              <DataCell obsmonth={row.obsmonth} value={row.fuel} type="fuel" />
              <DataCell
                obsmonth={row.obsmonth}
                value={row.general}
                type="general"
              />
              <DataCell
                obsmonth={row.obsmonth}
                value={row.heater}
                type="heater"
              />
              <DataCell
                obsmonth={row.obsmonth}
                value={row.nutsys}
                type="nutsys"
              />
              <DataCell
                obsmonth={row.obsmonth}
                value={row.storage}
                type="storage"
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
