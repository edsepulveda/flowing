import { Button } from "@/components/atoms/ui/button";
import { FormControl } from "@/components/atoms/ui/form/form-control";
import { Input } from "@/components/atoms/ui/input";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useLoginMutation } from "@/services/auth/mutations";

const loginSchema = z.object({
  email: z.string().min(1).email().trim(),
  password: z.string().min(6, "Invalid Password").trim(),
});

type LoginInput = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { mutateAsync, isPending } = useLoginMutation()

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    console.log(data);
    await mutateAsync(data)

  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-4">
      <div className="flex flex-col gap-4">
        <Controller
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormControl
              label="Email"
              isRequired
              isError={Boolean(methods.formState.errors.email)}
              errorText={methods.formState.errors.email?.message}
            >
              <Input {...field} placeholder="example@gmail.com" />
            </FormControl>
          )}
        />

        <div className="relative">
          <Controller
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormControl
                label="Password"
                isRequired
                isError={Boolean(methods.formState.errors.password)}
                errorText={methods.formState.errors.password?.message}
              >
                <Input {...field} type="password" placeholder="***********" size="lg"/>
              </FormControl>
            )}
          />

          <Link
            to="/auth/login"
            className="absolute top-0 right-0 text-sm text-foreground hover:text-primary hover:underline underline-offset-2"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" size="lg" loading={isPending}>
          Sign in
        </Button>
      </div>

      <div
        className="text-center my-8 text-sm"
      >
        <div>
          <span
            className="text-neutral-900 dark:text-white"
          >
            Don't have an account?
          </span>{" "}
          <Link to="/auth/login" className="underline text-metallic-blue-400 transition underline-offset-2">
            Sign up now
          </Link>
        </div>
      </div>
    </form>
  );
};
