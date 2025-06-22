import GoogleButton from "@/features/auth/components/GoogleButton";
import LoginForm from "@/features/auth/components/LoginForm";
import AuthForm from "@/features/auth/components/AuthForm";

export default function Login() {
  return (
    <AuthForm>
      <LoginForm />
      {/* Social Login */}
      <div className="space-y-4">
        <p className="mb-5 text-center text-sm text-gray-700">Or Login with</p>
        <GoogleButton />
      </div>

      {/* Sign Up Link */}

      <section className="my-4">
        <div className="my-1 text-center">
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-[#2f4369] font-semibold hover:underline">
              Register Now
            </a>
          </p>
        </div>

        <div className="my-1 text-center">
            <a
              href="/auth/forgotPassword"
              className="text-red-500 font-semibold text-sm hover:underline"
            >
              Forgot your password?
            </a>
        </div>
      </section>
    </AuthForm>
  );
}
