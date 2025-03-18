"use client";

import { getDeviceData } from "@/lib/getDeviceData";
import { DeviceData } from "@/model/devices";
import { queryKeys } from "@/react-query/constants";
import { useQuery } from "@tanstack/react-query";

export function useDeviceData(
  deviceName: string,
  date: string,
  optionData: string
): { data: DeviceData[]; isLoading: boolean; isError: boolean } {
  const fallback: DeviceData[] = [];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.devices, deviceName, date, optionData],
    queryFn: () => getDeviceData(deviceName, date, optionData),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!deviceName && !!date && !!optionData,
  });

  return { data, isLoading, isError };
}
