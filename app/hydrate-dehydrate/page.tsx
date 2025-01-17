import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { HydrateExample } from "../components/HydrateExample";

export default async function HydrateAndDehydrate() {
  const queryClient = new QueryClient(); //서버 사이드 렌더링을 위한 쿼리 클라이언트 생성
  await queryClient.prefetchQuery({
    //쿼리 클라이언트에 데이터를 미리 가져오기
    queryKey: ["someKey"], //쿼리 키(클라이언트 측에서 캐시를 식별하는 데 사용)
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.json();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid items-center justify-items-center">
        <div>Hydration</div>
        <HydrateExample></HydrateExample>
      </div>
    </HydrationBoundary>
  );
}
