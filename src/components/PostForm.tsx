"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  TextInput,
  Select,
  RTE,
  FileInput,
  ProgressDialog,
} from "./elements";
import { useRouter } from "next/navigation";
import { Post } from "@/types";
import { databaseService, storageService } from "@/appwrite";
import pathNames from "@/pathNames";
import { useUserData } from "@/hooks";
import { addNewPost, updatePost } from "@/store";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { HeroContainer } from "./index";
import { slugValidation, titleValidation } from "@/validations";
import config from "@/config";

const PostForm: React.FC<{ post?: Post }> = ({ post }) => {
  type FormData = Post & { image: File[] };

  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useUserData();

  const progressDialog = useRef<HTMLDialogElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    setValue,
    control,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      featuredImage: post?.featuredImage || "",
      status: post?.status || "active",
      userId: post?.userId || "",
    },
  });

  const submit: SubmitHandler<FormData> = async (formData) => {
    progressDialog.current?.showModal();
    clearErrors();
    try {
      if (!post) {
        // Create new post
        const file = formData.image[0] // Upload File
          ? await storageService.uploadFile(formData.image[0])
          : null;

        if (file) {
          formData.featuredImage = file.$id;
          formData.userId = userData?.$id;

          const data = {
            title: formData.title,
            slug: formData.slug,
            content: formData.content,
            featuredImage: formData.featuredImage,
            status: formData.status,
            userId: formData.userId,
          };

          const dbPost = await databaseService.createPost({ ...data });
          if (dbPost) {
            dispatch(addNewPost({ ...data }));
            router.push(pathNames.postPath(dbPost.$id));
          }
        }
      } else {
        // Update new post
        const file = formData.image[0] // Upload File
          ? await storageService.uploadFile(formData.image[0])
          : null;
        if (file) {
          // Delete Previous Image
          formData.featuredImage = file.$id;
          storageService.deleteFile(post!.featuredImage);
        } else {
          formData.featuredImage = post!.featuredImage;
        }

        const data = {
          title: formData.title,
          content: formData.content,
          featuredImage: formData.featuredImage,
          status: formData.status,
        };

        const dbPost = await databaseService.updatePost(post!.slug, data);
        if (dbPost) {
          dispatch(updatePost({ ...post!, ...data }));
          router.push(pathNames.postPath(dbPost.$id));
        }
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

  const slugTransform = useCallback((value: string) => {
    return value && typeof value === "string"
      ? value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "") // Remove any character that's not a letter, number, space, or hyphen
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/-+/g, "-") // Replace consecutive hyphens with a single hyphen
          .replace(/^-+/, "") // Remove any leading hyphen
          .replace(/-+$/, "") // Remove any trailing hyphen
      : "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (!post && name === "title") {
        setValue("slug", slugTransform(value.title!), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue, post]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <HeroContainer className="flex-col lg:flex-row gap-16">
        <div className="max-w-sm shadow-lg rounded-lg card-body">
          <TextInput
            label="Write here title"
            type="text"
            placeholder="Enter a title"
            error={errors.title?.message}
            {...register("title", {
              required: titleValidation.requiredError,
              minLength: {
                value: titleValidation.minLengthValue,
                message: titleValidation.minLengthError,
              },
            })}
          />

          <TextInput
            label="Slug"
            type="text"
            placeholder="Slug"
            error={errors.slug?.message}
            disabled={post !== undefined}
            {...register("slug", {
              required: slugValidation.requiredError,
              minLength: {
                value: slugValidation.minLengthValue,
                message: slugValidation.minLengthError,
              },
              validate: {
                async alreadyTakenSlug(value) {
                  const url = `${config.env.NEXT_PUBLIC_APPWRITE_URL}/databases/${config.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}/collections/${config.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID}/documents/${value}`;
                  const response = await fetch(url, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "X-Appwrite-Project":
                        config.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
                      "X-Appwrite-Key": config.env.NEXT_PUBLIC_APPWRITE_API_KEY,
                    },
                  });
                  if (response.ok) {
                    return slugValidation.isAlreadyExist;
                  } else return true;
                },
              },
            })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          <FileInput
            label="Choose featured image"
            error={errors.image?.message}
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {
              // required: !post
              required: post ? false : "Required an image for article",
            })}
          />

          {post && (
            <div>
              <Image
                src={storageService.getFilePreview(post.featuredImage)}
                priority
                alt={post.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )}
          <Select
            label="Status"
            className="mb-4"
            defaultValue={undefined}
            {...register("status", { required: true })}
          >
            <option value={undefined} disabled>
              Choose status
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
          <Button
            type="submit"
            btnStyle={post ? "success" : "positive"}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>

          {errors.root && (
            <div className="label transition-transform duration-200">
              <span className="label-text-alt text-red-600">
                <pre>{errors.root.message}</pre>
              </span>
            </div>
          )}

          {errors.root && (
            <div className="toast toast-center toast-top">
              <div className="alert alert-error">
                <span>
                  <pre>{errors.root.message}</pre>
                </span>
              </div>
            </div>
          )}
        </div>

        <ProgressDialog
          ref={progressDialog}
          message={post ? "Updating post..." : "Creating new post..."}
        />

        <RTE
          label="Content"
          name="content"
          error={errors.content?.message}
          initialValue={post?.content}
          control={control}
          defaultValue={getValues("content")}
          className="max-w-3xl"
        />
      </HeroContainer>
    </form>
  );
};

export default PostForm;
