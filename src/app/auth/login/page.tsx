import GoogleButton from "@/features/auth/components/GoogleButton";
import LoginForm from "@/features/auth/components/LoginForm";
import AuthForm from "@/features/auth/components/AuthForm";
import Link from "next/link";

export default function Login() {
  return (
    <AuthForm>
      <LoginForm />
      <div className="space-y-4">
        <p className="mb-5 text-center text-sm text-gray-700">Or Login with</p>
        <GoogleButton />
      </div>
      <section className="my-4">
        <div className="my-1 text-center">
          <p className="text-sm text-gray-700">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-[#2f4369] font-semibold hover:underline">Register Now</Link>
          </p>
        </div>
        <div className="my-1 text-center">
          <Link
            href="/auth/forgotPassword"
            className="text-red-500 font-semibold text-sm hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </section>
    </AuthForm>
  );
}
