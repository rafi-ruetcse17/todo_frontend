import LoginForm from "@/components/login-form/LoginForm";
import SignupForm from "@/components/signup-form/SignupForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }) {
  const session = await getServerSession(authOptions());
  if (session) {
    redirect(appRouteList.user);
  }
  const { authState } = await searchParams;
  return authState === "login" ? <LoginForm /> : <SignupForm />;
}
