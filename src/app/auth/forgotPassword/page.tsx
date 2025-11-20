import AuthForm from "@/features/auth/components/AuthForm";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <AuthForm>
      <ForgotPasswordForm />
      <section className="my-4">
        <div className="my-1 text-center">
          <p className="text-sm text-gray-700">
            Remembered your password?{" "}
            <a href="/auth/login" className="text-[#2f4369] font-semibold hover:underline">Login here</a>
          </p>
        </div>
      </section>
    </AuthForm>
  );
}
