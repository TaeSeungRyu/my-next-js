import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //세션에서 리다이렉트 하는 방법
  //세부 정보를 얻고 싶으면 getServerSession는 캐스캐이딩 이슈가 있으니 call api 하자
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/error");
  }
  return <>{children}</>;
}
