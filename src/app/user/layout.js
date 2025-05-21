import WebLayout from "@/components/common/web-layout/WebLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { appRouteList } from "@/lib/utils/PageRouteUtils";

export default async function UserLayout({ children }) {
  const session = await getServerSession(authOptions());
  if (!session) {
    redirect(appRouteList.login);
  }
  return <WebLayout>{children}</WebLayout>;
}
