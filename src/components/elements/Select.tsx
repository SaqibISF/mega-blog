import React, { forwardRef, useId } from "react";

type SelectType = React.SelectHTMLAttributes<HTMLSelectElement> & {
  children?: React.ReactNode;
  label?: string;
  error?: string;
};

const Select: React.ForwardRefRenderFunction<HTMLSelectElement, SelectType> = (
  { children, label, error, className, ...props },
  ref
) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        id={useId()}
        ref={ref}
        {...props}
        className={`select select-bordered w-full max-w-xs ${className}`}
      >
        {children}
      </select>
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

Select.displayName = "ReactSelectElement";

export default forwardRef<HTMLSelectElement, SelectType>(Select);
