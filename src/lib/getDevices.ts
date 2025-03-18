import { DeviceProps } from "@/model/devices";

export const getDevices = async (
  page = 1,
  pageSize = 4
): Promise<{ data: DeviceProps[]; totalPages: number }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/devices?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        next: {
          tags: ["devices"],
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
