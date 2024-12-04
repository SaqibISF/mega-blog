"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login as authLogin } from "@/store";
import { Button, ProgressDialog, TextInput } from "./elements";
import { useDispatch } from "react-redux";
import { authService } from "@/appwrite";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailValidation, passwordValidation } from "@/validations";
import pathNames from "@/pathNames";
import { HeroContainer } from "./index";
import { LoginData } from "@/types";

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const progressDialog = useRef<HTMLDialogElement>(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginData>();

  const login: SubmitHandler<LoginData> = async (data) => {
    progressDialog.current?.showModal();
    clearErrors();
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        router.push(pathNames.homePath);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          type: "manual",
          message: error.message,
        });
      } else {
        setError("root", {
          type: "manual",
          message:
            "Network error: Unable to submit the form\n Please try again later.",
        });
      }
    } finally {
      progressDialog.current?.close();
    }
  };

  return (
    <HeroContainer className="flex-col lg:flex-row-reverse lg:gap-20">
      <div className="text-center max-w-md lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(login)} className="card-body">
          <h2 className="text-center text-2xl font-bold leading-tight mb-4">
            Sign in to your account
          </h2>

          <TextInput
            label="Email address"
            type="email"
            placeholder="Enter email address"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email", {
              required: emailValidation.requiredError,
              pattern: {
                value: emailValidation.pattern,
                message: emailValidation.validationError,
              },
            })}
          />

          <TextInput
            label="Password"
            type="password"
            placeholder="Enter password"
            error={errors.password?.message}
            {...register("password", {
              required: passwordValidation.enterRequiredError,
              minLength: {
                value: passwordValidation.minLengthValue,
                message: passwordValidation.minLengthError,
              },
            })}
          />

          <span className="label">
            <Link
              href="/forgot-password"
              className="label-text-alt link link-hover"
            >
              Forgot password?
            </Link>
          </span>

          <Button type="submit" btnStyle="positive" className="mt-6">
            Sign in
          </Button>

          <ProgressDialog ref={progressDialog} message="Logging in..." />

          {errors.root && (
            <div className="label transition-transform duration-200">
              <span className="label-text-alt text-red-600">
                <pre>{errors.root.message}</pre>
              </span>
            </div>
          )}

          <p className="mt-2 text-center text-base ">
            Don&apos;t have any account?&nbsp;
            <Link
              href={pathNames.signupPath}
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {errors.root && (
            <div className="toast toast-center toast-top">
              <div className="alert alert-error">
                <span>
                  <pre>{errors.root.message}</pre>
                </span>
              </div>
            </div>
          )}
        </form>
      </div>
    </HeroContainer>
  );
};

export default Login;
