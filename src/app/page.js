import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { appRouteList } from "@/lib/utils/PageRouteUtils";

export default async function Home() {
  const session = await getServerSession(authOptions());
  if (!session) {
    redirect(appRouteList.login);
  }
  redirect(appRouteList.user);
}
