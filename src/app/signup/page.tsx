"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import ButtonComponent from "~/components/ui/ButtonComponent";
import FormInput from "~/components/ui/TextInput";
import { signUpAction } from "~/utils/supabase/actions";
import { signupSchema, type SignupFormData } from "~/utils/validationSchemas";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      const result = await signUpAction(formData);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Account created! Please check your email.");
      if (result?.success) {
        router.push("/");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to sign up");
    }
  };

  return (
    <main className="SignupContainer bg-g4 flex h-full grow flex-col items-center justify-center">
      <div className="SignupCard bg-g5 flex w-full max-w-md flex-col items-center gap-8 rounded-2xl p-8 shadow-lg">
        <div className="SignupHeader flex flex-col items-center gap-2">
          <h1 className="text-p1 text-4xl font-bold">DigitalNova AI</h1>
          <p className="text-g1">Create your Nova Assistant account</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="SignupForm flex flex-col gap-5"
        >
          <FormInput
            label="Full Name*"
            type="text"
            placeholder="Your Name"
            error={errors.full_name}
            {...register("full_name")}
          />
          <FormInput
            label="Email*"
            type="email"
            placeholder="email@example.com"
            error={errors.email}
            {...register("email")}
          />
          <FormInput
            label="Password*"
            type="password"
            placeholder="********"
            error={errors.password}
            {...register("password")}
          />
          <FormInput
            label="Confirm Password*"
            type="password"
            placeholder="********"
            error={errors.confirm_password}
            {...register("confirm_password")}
          />
          <ButtonComponent
            className="mt-4 w-full self-center"
            type="submit"
            style="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </ButtonComponent>
          <div className="SignupFooter text-g2 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-p1 hover:text-p2">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
