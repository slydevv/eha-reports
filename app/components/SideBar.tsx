'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ClinicLogo from "../../public/images/Clinic_Logo.png";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaUsers, IoCreate, IoOptionsSharp, HiDocument, BiDotsHorizontalRounded } from "../assets";
import Box from "./Box";
import SideBarItem from "./SideBarItem";
import { signOut } from "next-auth/react";
import getSession from "../actions/getSession";

interface SidebarProps {
  children: React.ReactNode;
}

const SideBar: React.FC<SidebarProps> = ({ children }) => {
  const pathName = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  


  

  const bottomRoute = useMemo(
    () => [
      {
        label: "All Users",
        active: pathName === "/superadmin",
        href: "/superadmin",
        icon: FaUsers,
        className:"text-black"
      },
      {
        label: "Categories",
        active: pathName === "/categories",
        href: "/categories",
        icon: IoOptionsSharp,
      },
      {
        label: "Report",
        active: pathName === "/report",
        href: "/report",
        icon: HiDocument,
      },
    ],
    [pathName]
  );

  return (
    <div className="flex relative h-full ">
      <div className="w-[300px] p-2 h-full hidden md:flex gap-y-4 bg-gray-100 flex-col">
        <div className="flex items-center justify-center">
          <Image
            src={ClinicLogo}
            width={200}
            height={250}
            alt="eha clinics"
            className="hidden rounded-md lg:block mt-3"
          />
        </div>

        <Box className="justify-between my-8 px-3 py-2  space-y-8 h-full ">
          {bottomRoute.map((route) => (
            <SideBarItem key={route.label} {...route} />
          ))}
        </Box>
        <div className="flex  p-2">
          <button className="bg-neutral-900 rounded-full w-16 h-16">
            <span className="text-white">PN</span>
          </button>
          <div className="flex justify-around my-4 mx-2">
            <div>
              <p className="text-black text-sm ">admin@eha.ng</p>
            </div>
            <div
              className="ml-12 cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu && (
                <div className="w-20 rounded-md text-center transition absolute bottom-16 p-1 bg-gray-300 hover:bg-gray-200 ">
                  <button
                    className="text-sm font-semibold text-center"
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                  >
                    Logout
                  </button>
                </div>
              )}
              <BiDotsHorizontalRounded />
            </div>
          </div>
        </div>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default SideBar;
