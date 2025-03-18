"use client";

import { getDevices } from "@/lib/getDevices";
import { DeviceProps } from "@/model/devices";
import { queryKeys } from "@/react-query/constants";
import { useQuery } from "@tanstack/react-query";

export function useDevices(page: number, pageSize: number) {
  const fallback: DeviceProps[] = [];

  const { data = { data: fallback, totalPages: 1 }, isFetching } = useQuery({
    queryKey: [queryKeys.devices, page],
    queryFn: () => getDevices(page, pageSize),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return { devices: data.data, totalPages: data.totalPages, isFetching };
}
