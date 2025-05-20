import LoginForm from "@/components/login-form/LoginForm";
import SignupForm from "@/components/signup-form/SignupForm";

export default async function Page({ searchParams }) {
  const { authState } = await searchParams;
  return authState === "login" ? <LoginForm /> : <SignupForm />;
}
