"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import ClinicLogo from "../../public/images/Clinic_Logo.png";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  FaUsers,
  IoCreate,
  IoOptionsSharp,
  HiDocument,
  BiDotsHorizontalRounded,
  CgProfile,
  RiLockPasswordLine,
  BiPowerOff,
} from "../assets";
import Box from "./Box";

import { signOut } from "next-auth/react";
import PasswordChange from "./PasswordModal";
import UserInfo from "./UserInfo";



interface SidebarProps {
  children: React.ReactNode;
}

const UserSideBar: React.FC<SidebarProps> = ({ children }) => { 
  const {data: session} = useSession()
 const pathName = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const onClose = () => {
    setConfirmPwd(false)
    setUserInfo(false)
  }
  
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

        <Box className="justify-between my-8 px-3 py-10 font-semibold  text-left space-y-8 h-full ">
          <div
            className=" cursor-pointer flex "
            onClick={() => setUserInfo(true)}
          >
            <CgProfile className="mx-3 mt-1" />
            Profile
          </div>
          <div
            className=" cursor-pointer flex"
            onClick={() => setConfirmPwd(true)}
          >
            <RiLockPasswordLine className="mx-3 mt-1" />
            Change Password
          </div>
          <div
            className=" cursor-pointer flex"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <BiPowerOff className="mx-3 mt-1" />
            Log out
          </div>
        </Box>
        <div className="flex  p-2">
          <div className="bg-neutral-900 mx-auto flex flex-shrink-0 items-center justify-center rounded-full w-10 h-10">
            <span className="text-white">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-around my-4 mx-2">
            <div>
              <p className="text-black text-sm "> {session?.user?.email}</p>
            </div>
            <div
              className="ml-4 cursor-pointer"
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
      <UserInfo isOpen={userInfo} onClose={onClose} id={"session?.user?.id"} />
      <PasswordChange
        isOpen={confirmPwd}
        onClose={onClose}
        id={session?.user?.id}
      />
    </div>
  );
}

export default UserSideBar