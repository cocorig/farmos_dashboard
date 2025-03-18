import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getDailyPower } from "@/lib/getDailyPower";
import { queryKeys } from "@/react-query/constants";
import PowerDetailSection from "../../power-detail";
import style from "../page.module.css";
import DescSection from "@/components/descSection";
type Props = {
  params: Promise<{ month: string; dgname: string }>;
};

export default async function PowerDetailPage({ params }: Props) {
  const { month, dgname } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.dailyPower, month, dgname],
    queryFn: () => getDailyPower(month, dgname),
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={style.engSection}>
      <DescSection
        title={`${dgname} 일별 전력 사용량 상세 데이터`}
        desc={`${month}월의 상세 데이터 입니다.`}
      />

      <HydrationBoundary state={dehydrateState}>
        <PowerDetailSection month={month} dgname={dgname} />
      </HydrationBoundary>
    </div>
  );
}
