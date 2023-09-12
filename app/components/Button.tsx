"use client";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  primary?: boolean;
  danger?:boolean;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  primary,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
  flex
  justify-center
  rounded-md
  px-3
  py-2
  text-sm
  font-semibold
  focus-visible:outline
  focus-visible:outline-2
  focus-visible:outline-offset-2
  `,
        disabled && "opacity-50 cursor-not-allowed ",
        fullWidth && "w-full",
        primary && "bg-blue-500",
        secondary ? "secondary-button" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-blue-500  hover:bg-blue-700 focus-visible:outline-[#0719C4]"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
