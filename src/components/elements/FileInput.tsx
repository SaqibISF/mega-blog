import React, { forwardRef, useId } from "react";

type InputType = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "placeholder"
> & {
  label: string;
  error?: string;
};

const FileInput: React.ForwardRefRenderFunction<HTMLInputElement, InputType> = (
  { label, error, className, ...props },
  ref
) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        id={useId()}
        ref={ref}
        type="file"
        {...props}
        className={`file-input file-input-bordered w-full max-w-xs ${className}`}
      />
      {error && (
        <div className="label transition-transform duration-200">
          <span className="label-text-alt text-red-600">
            <pre>{error}</pre>
          </span>
        </div>
      )}
    </label>
  );
};

FileInput.displayName = "ReactFileInputElement";

export default forwardRef<HTMLInputElement, InputType>(FileInput);
