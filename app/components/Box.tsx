"use client";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-[#FAFAFA] text-black rounded-md w-full h-fit ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
