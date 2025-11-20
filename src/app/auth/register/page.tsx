import RegisterForm from "@/features/auth/components/RegisterForm";
import AuthForm from "@/features/auth/components/AuthForm";
import GoogleButton from "@/features/auth/components/GoogleButton";

export default function Register() {
  return (
    <AuthForm>
      <RegisterForm />
      <div className="space-y-4">
        <p className="mb-5 text-center text-sm text-gray-700">Or Register with</p>
        <GoogleButton />
      </div>
      <section className="my-4">
        <div className="my-1 text-center">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <a href="/auth/login" className="text-[#2f4369] font-semibold hover:underline">Login now</a>
          </p>
        </div>
      </section>
    </AuthForm>
  );
}
