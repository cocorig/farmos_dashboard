import { DeviceData } from "@/model/devices"; // 정의한 타입을 가져옵니다.

export const getDeviceData = async (
  deviceName: string,
  date: string,
  optionData: string
): Promise<DeviceData[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/devices/${deviceName}?date=${date}&optionData=${optionData}`,
      {
        method: "GET",
        next: {
          tags: ["deviceData"],
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch device data");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};
