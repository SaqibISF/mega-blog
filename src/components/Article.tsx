"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { databaseService, storageService } from "@/appwrite";
import pathNames from "@/pathNames";
import { HeroContainer, Loading, PageNotFound404 } from "./index";
import Link from "next/link";
import { Button, ProgressDialog } from "./elements";
import parse from "html-react-parser";
import { usePost, useUserData } from "@/hooks";
import Image from "next/image";

const Article: React.FC<{ slug: string }> = ({ slug }) => {
  const { post, isPostLoading } = usePost(slug);
  const router = useRouter();

  const [error, setError] = useState<string>();

  const [progressMessage, setProgressMessage] = useState<string>("");
  const progressDialog = useRef<HTMLDialogElement>(null);

  const userData = useUserData();

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deleteDialog = useRef<HTMLDialogElement>(null);

  const deletePost = async () => {
    setProgressMessage("Deleting...");
    progressDialog.current?.showModal();
    try {
      const fileStatus = await storageService.deleteFile(post!.featuredImage);
      if (fileStatus) {
        const postStatus = await databaseService.deletePost(post!.slug);
        if (postStatus) router.push(pathNames.homePath);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Network error: Unable to deleting image\n Please try again later."
        );
      }
    } finally {
      progressDialog.current?.close();
    }
  };

  if (post) {
    return (
      <HeroContainer>
        <article className="prose max-w-5xl">
          <h1>{post.title}</h1>
          <Image
            src={storageService.getFilePreview(post.featuredImage)}
            priority
            alt={post.title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />

          {isAuthor && (
            <Link href={pathNames.editPostPath(post.slug)}>
              <Button
                btnStyle="info"
                className="mr-3"
                onClick={() => {
                  setProgressMessage("Preparing to edit post...");
                  progressDialog.current?.showModal();
                }}
              >
                Edit
              </Button>
            </Link>
          )}

          {isAuthor && (
            <Button
              btnStyle="danger"
              onClick={() => deleteDialog.current?.showModal()}
            >
              Delete
            </Button>
          )}

          {isAuthor && (
            <dialog ref={deleteDialog} className="modal">
              <div className="modal-box prose">
                <h3>Delete the article &quot;{post.slug}&quot;?</h3>
                <p>
                  Are you sure want to delete the article titled as &quot;
                  {post.title}&quot;?
                </p>
                <form method="dialog">
                  <div className="modal-action">
                    <Button
                      btnStyle="danger"
                      className="w-1/2"
                      onClick={deletePost}
                    >
                      Delete
                    </Button>
                    <Button btnStyle="normal" className="w-1/2">
                      Close
                    </Button>
                  </div>
                </form>
              </div>
            </dialog>
          )}

          {isAuthor && (
            <ProgressDialog ref={progressDialog} message={progressMessage} />
          )}

          {parse(post.content)}
        </article>
        {error && (
          <div className="toast toast-center toast-top">
            <div className="alert alert-error">
              <span>
                <pre>{error}</pre>
              </span>
            </div>
          </div>
        )}
      </HeroContainer>
    );
  } else if (!isPostLoading) {
    return <PageNotFound404 />;
  } else {
    return (
      <HeroContainer>
        <Loading />
      </HeroContainer>
    );
  }
};

export default Article;
