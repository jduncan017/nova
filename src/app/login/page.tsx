"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import ButtonComponent from "~/components/ui/ButtonComponent";
import FormInput from "~/components/ui/TextInput";
import { signInAction } from "~/utils/supabase/actions";
import { signinSchema, type SigninFormData } from "~/utils/validationSchemas";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      const result = await signInAction(formData);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Signed in!");
      if (result?.success) {
        router.push("/chat");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to sign in");
    }
  };

  return (
    <main className="LoginContainer bg-g4 flex h-full grow flex-col items-center justify-center">
      <div className="LoginCard bg-g5 flex w-full max-w-md flex-col items-center gap-8 rounded-2xl p-8 shadow-lg">
        <div className="LoginHeader flex flex-col items-center gap-2">
          <h1 className="text-p1 text-4xl font-bold">DigitalNova AI</h1>
          <p className="text-g1">Welcome to Nova Assistant</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="LoginForm flex flex-col gap-5"
        >
          <FormInput
            label="Email*"
            type="email"
            placeholder="email@example.com"
            error={errors.email}
            {...register("email")}
          />
          <div className="PasswordSection flex flex-col gap-1">
            <FormInput
              label="Password*"
              type="password"
              placeholder="********"
              error={errors.password}
              {...register("password")}
            />
            <Link
              href="/auth/forgot-password"
              className="ForgotPassword text-g3 hover:text-p2 mt-1"
            >
              Forgot password?
            </Link>
          </div>
          <ButtonComponent
            className="mt-4 w-full self-center"
            type="submit"
            style="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </ButtonComponent>
        </form>
        <div className="LoginFooter text-g2 text-center text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-p1 hover:text-p2">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
