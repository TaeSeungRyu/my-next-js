import AuthContext from "@/app/context/AuthContext";
import QueryProviders from "./QueryProvider";
import ModeThemProvider from "./ModeThemProvider";

export default async function AttributeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      <QueryProviders>
        <ModeThemProvider>{children}</ModeThemProvider>
      </QueryProviders>
    </AuthContext>
  );
}
