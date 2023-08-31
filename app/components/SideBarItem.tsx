import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  label: string;
  icon: IconType;
  active?: boolean;
  href: string;
}

const SideBarItem: React.FC<SidebarItemProps> = ({
  label, 
  active,
  href,
  icon: Icon,
}) => {
  return (
    <Link
      key={label}
      href={href}
      className={twMerge(
        `
          flex flex-row w-full h-auto rounded-md px-3 gap-x-4 py-1 text-md font-medium cursor-white hover:text-gray-600 transition text-black  items-center`,
        active && "text-gray-400"
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SideBarItem;
