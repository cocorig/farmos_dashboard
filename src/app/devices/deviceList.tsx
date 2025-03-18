"use client";

import { useState, useEffect } from "react";
import { useDevices } from "@/hook/useDevices";
import { DeviceItem } from "./deviceItem";
import { useQueryClient } from "@tanstack/react-query";
import { getDevices } from "@/lib/getDevices";
import Pagination from "@/components/pagination";
import { queryKeys } from "@/react-query/constants";
import style from "./deviceList.module.css";

export default function DeviceList() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const queryClient = useQueryClient();

  const { devices, totalPages, isFetching } = useDevices(currentPage, pageSize);

  useEffect(() => {
    if (currentPage < totalPages) {
      queryClient.prefetchQuery({
        queryKey: [queryKeys.devices, currentPage + 1],
        queryFn: () => getDevices(currentPage + 1, pageSize),
      });
    }
  }, [currentPage, totalPages, queryClient]);

  return (
    <div className={style.listSection}>
      {isFetching && <p>Loading...</p>}
      <div className={style.paginationBox}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <ul className={style.list}>
        {devices.map((device, index) => (
          <DeviceItem key={index} device={device} />
        ))}
      </ul>
    </div>
  );
}
