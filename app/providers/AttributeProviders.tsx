import AuthContext from "@/app/context/AuthContext";
import QueryProviders from "./QueryProvider";
import { Session } from "next-auth";

export default async function AttributeProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <AuthContext session={session}>
      <QueryProviders>{children}</QueryProviders>
    </AuthContext>
  );
}
