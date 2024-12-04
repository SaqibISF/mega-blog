import React from "react";

const HeroContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className="hero bg-base-200 min-h-screen lg:pt-[4.5rem]">
      <div className={`hero-content ${className}`}>{children}</div>
    </div>
  );
};

export default HeroContainer;
