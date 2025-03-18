import { DailyPower } from "@/model/power";

export const getDailyPower = async (
  month: string,
  dgname: string
): Promise<DailyPower[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/power/day?month=${month}&dgname=${dgname}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch daily power data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
