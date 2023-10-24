"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/store";
import { setIsLogged } from "@/lib/redux/auth/slice";
import { useSelector } from "react-redux";
import { authSelector } from "@/lib/redux/auth/selectors";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import axios from "@/lib/axios";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AlertError } from "@/components/ui/AlertError";
import { CheckCircle } from "lucide-react";

import { LoginValidator, type LoginSchema } from "@/lib/validators/login";
import { LoginErrorEnum, type LoginSuccessResponse } from "@/types/login";
import { cn } from "@/lib/utils";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(authSelector);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginValidator),
  });
  const router = useRouter();

  React.useEffect(() => {
    if (isLoggedIn) {
      router.push("/table");
    }
  }, []);

  const login = React.useCallback(async (payload: LoginSchema) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/login/", payload);

      if (data) {
        setIsLoading(false);
        setIsSuccess(true);

        dispatch(setIsLogged(true));

        router.push("/table");
        router.refresh();

        reset();
      }

      return data as LoginSuccessResponse;
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.data.error === LoginErrorEnum.InvalidCredentials) {
          setError("This username or password is incorrect.");

          return;
        }

        if (error.response?.data.error === LoginErrorEnum.InvalidData) {
          setError("This credentials is incorrect.");

          return;
        }

        setError("Something went wrong... but we are working on it!");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onSubmit: SubmitHandler<LoginSchema> = (data) => login(data);

  return (
    <div className="md:mt-28 mt-15 flex justify-center">
      <div className="bg-secondary text-primary px-4 sm:px-6 py-4 max-w-md w-full rounded-md flex flex-col">
        <h1 className="text-xl font-semibold text-center">Sign in to Table</h1>
        {error && <AlertError className="mb-0" description={error} />}
        <form
          className="mt-4 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              {...register("username")}
              disabled={isLoading || isLoggedIn}
            />
            {errors.username && (
              <span className="text-destructive text-xs">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              {...register("password")}
              disabled={isLoading || isLoggedIn}
            />
            {errors.password && (
              <span className="text-destructive text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            className={cn("mt-2 flex gap-2", {
              "bg-green-600 hover:bg-green-600": isSuccess,
            })}
            isLoading={isLoading || isLoggedIn}
            type="submit"
          >
            {isSuccess && <CheckCircle className="h-4 w-4" />}
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
