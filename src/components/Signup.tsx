"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "@/store";
import { authService } from "@/appwrite";
import Link from "next/link";
import { Button, ProgressDialog, TextInput } from "./elements";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "@/validations";
import pathNames from "@/pathNames";
import { HeroContainer } from "./index";
import { SignupData } from "@/types";

const Signup: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const progressDialog = useRef<HTMLDialogElement>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<SignupData>();

  const signup: SubmitHandler<SignupData> = async (data) => {
    progressDialog.current?.showModal();
    clearErrors();
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(authLogin(currentUser));
        router.push(pathNames.homePath);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message ===
          "A user with the same id, email, or phone already exists in this project."
        ) {
          setError("email", {
            type: "manual",
            message: emailValidation.isAlreadyExist,
          });
        } else {
          setError("root", {
            type: "manual", // Type is 'manual' because this error isn't from form validation
            message: error.message,
          });
        }
      } else {
        setError("root", {
          type: "manual", // Type is 'manual' because this error isn't from form validation
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
        <h1 className="text-5xl font-bold">Register now!</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(signup)} className="card-body">
          <h2 className="text-center text-2xl font-bold leading-tight mb-4">
            Sign in to your account
          </h2>

          <TextInput
            label="What is you name?"
            type="text"
            placeholder="Type Full Name here"
            error={errors.name?.message}
            {...register("name", {
              required: nameValidation.requiredError,
              minLength: {
                value: nameValidation.minLengthValue,
                message: nameValidation.minLengthError,
              },
              pattern: {
                value: nameValidation.pattern,
                message: nameValidation.validationError,
              },
            })}
          />

          <TextInput
            label="Email address"
            type="email"
            placeholder="Type email address here"
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
            label="Create Password"
            type="password"
            placeholder="Type new password"
            error={errors.password?.message}
            {...register("password", {
              required: passwordValidation.chooseRequiredError,
              minLength: {
                value: passwordValidation.minLengthValue,
                message: passwordValidation.minLengthError,
              },
              pattern: {
                value: passwordValidation.pattern,
                message: passwordValidation.validationError,
              },
            })}
          />

          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            error={errors.confirm_password?.message}
            {...register("confirm_password", {
              required: passwordValidation.confirmPasswordRequiredError,
              validate: (value) => {
                const password = getValues("password");
                if (value !== password)
                  return passwordValidation.confirmPasswordNotMatchError;
                return true;
              },
            })}
          />

          <Button type="submit" btnStyle="positive" className="mt-6">
            Create Account
          </Button>

          <ProgressDialog
            ref={progressDialog}
            message="Creating new account..."
          />

          {errors.root && (
            <div className="label transition-transform duration-200">
              <span className="label-text-alt text-red-600">
                <pre>{errors.root.message}</pre>
              </span>
            </div>
          )}

          <p className="mt-2 text-center text-base ">
            Already have an account?&nbsp;
            <Link
              href={pathNames.loginPath}
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
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

export default Signup;
