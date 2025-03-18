import { MonthlyPower } from "@/model/power";

export const getMonthlyPower = async (): Promise<MonthlyPower[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/power`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch monthly power data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
