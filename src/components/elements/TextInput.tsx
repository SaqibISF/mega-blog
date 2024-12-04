import React, { forwardRef, useId } from "react";

type InputType = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  type?: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
  error?: string;
};

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputType> = (
  { label, placeholder = label, error, className, ...props },
  ref
) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        id={useId()}
        ref={ref}
        placeholder={placeholder}
        {...props}
        className={`input input-bordered ${className}`}
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

Input.displayName = "ReactTextInputElement";

export default forwardRef<HTMLInputElement, InputType>(Input);
