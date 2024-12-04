"use client"
import React, { useRef } from "react";
import Link from "next/link";
import pathNames from "@/pathNames";
import { storageService } from "@/appwrite";
import { Post } from "@/types";
import Image from "next/image";
import { ProgressDialog } from "./elements";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const progressDialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <Link href={pathNames.postPath(post.slug)} className="mx-auto lg:mx-0">
        <div
          className="card bg-base-100 w-96 shadow-xl"
          onClick={() => progressDialog.current?.showModal()}
        >
          <figure>
            <Image
              src={storageService.getFilePreview(post.featuredImage)}
              priority
              alt={post.title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {post.title}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
      </Link>
      <ProgressDialog ref={progressDialog} message="Wait..." />
    </>
  );
};

export default PostCard;
