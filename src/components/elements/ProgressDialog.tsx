import React, { forwardRef } from "react";

type ProgressDialogType = React.HTMLAttributes<HTMLDialogElement> & {
  message: string;
};

const ProgressDialog: React.ForwardRefRenderFunction<
  HTMLDialogElement,
  ProgressDialogType
> = ({ message }, ref) => {
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box prose w-full">
        <h3 className="first-letter:uppercase">{message}</h3>
        <progress className="progress w-full" />
      </div>
    </dialog>
  );
};

ProgressDialog.displayName = "ReactProgressDialogElement";

export default forwardRef<HTMLDialogElement, ProgressDialogType>(
  ProgressDialog
);
