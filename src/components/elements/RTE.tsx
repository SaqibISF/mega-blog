import React, { useId } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import config from "@/config";

type RTEType<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
  label: string;
  initialValue?: string;
  error?: string;
  className?: string;
};

const RTE = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  initialValue,
  error,
  className,
  ...props
}: RTEType<TFieldValues>) => {
  const id = useId();
  return (
    <label className={`form-control ${className}`}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {error && (
        <div className="label transition-transform duration-200">
          <span className="label-text-alt text-red-600">
            <pre>{error}</pre>
          </span>
        </div>
      )}
      <Controller
        name={name}
        {...props}
        render={({ field: { onChange } }) => (
          <Editor
            id={id}
            apiKey={config.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
            initialValue={initialValue}
            init={{
              initialValue: initialValue,
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic " +
                "forecolor | alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </label>
  );
};

export default RTE;
