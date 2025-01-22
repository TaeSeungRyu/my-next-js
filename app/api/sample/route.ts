import { getServerSession } from "next-auth/next";
import { authOptions } from "../../utils/authOptions";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  return Response.json({ result: session });
}
