import React from "react";

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  btnStyle:
    | "normal"
    | "neutral"
    | "positive"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "link";
};

const Button: React.FC<ButtonType> = ({
  btnStyle,
  className,
  children,
  ...props
}) => {
  const btnClasses = {
    normal: "btn",
    neutral: "btn-neutral",
    positive: "btn-primary",
    info: "btn-info",
    success: "btn-success",
    warning: "btn-warning",
    danger: "btn-error",
    link: "btn-link",
  };

  return (
    <button className={`btn ${btnClasses[btnStyle]} ${className}`} {...props}>
      {children}
    </button>
  );
};

Button.displayName = "ReactButtonElement";

export default Button;
