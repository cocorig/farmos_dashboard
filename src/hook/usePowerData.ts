import { getDailyPower } from "@/lib/getDailyPower";
import { getMonthlyPower } from "@/lib/getMonthlyPower";
import { DailyPower, MonthlyPower } from "@/model/power";
import { queryKeys } from "@/react-query/constants";
import { useQuery } from "@tanstack/react-query";

export function useMonthlyPower(): {
  data: MonthlyPower[];
  isLoading: boolean;
  isError: boolean;
} {
  const fallback: MonthlyPower[] = [];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.monthlyPower],
    queryFn: getMonthlyPower,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return { data, isLoading, isError };
}

export function useDailyPower(
  month: string,
  dgname: string
): {
  data: DailyPower[];
  isLoading: boolean;
  isError: boolean;
} {
  const fallback: DailyPower[] = [];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.dailyPower, month, dgname],
    queryFn: () => getDailyPower(month, dgname),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: !!month && !!dgname,
  });

  return { data, isLoading, isError };
}
