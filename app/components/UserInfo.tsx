"use client";

import { Dialog } from "@headlessui/react";
import Modal from "@/app/components/modal";
import { UserModalProps } from "@/app/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


const UserInfo: React.FC<UserModalProps> = ({ isOpen, onClose, id }) => {
    const { data: session } = useSession();
  const [user, setUser] = useState({
    name: "",
    email: "",
    categories: [],
    createdAt: "",
  });


  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <div className="">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-base text-center font-bold leading-6 text-gray-900"
            >
              User Details
            </Dialog.Title>
            <div className="mt-2 space-y-2 ">
              <div className="flex items-center justify-center ">
                <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 sm:mx-0">
                  <p className="text-2xl">
                    {session?.user?.name &&
                      session?.user?.name.charAt(0).toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col  items-center justify-center">
                <div>
                  <p className="text-center font-semibold">
                    {session?.user?.name}
                  </p>
                </div>
                <div>
                  <p className="text-center text-gray-600">
                    {session?.user?.email}
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 w-full my-8"></div>
              <div className="mt-4">
                <h3 className="font-semibold text-center ">Access to:</h3>
                <div className="mt-3 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-12">
                  {
                    //@ts-ignore
                    session?.user?.categories &&
                      //@ts-ignore
                      session.user?.categories.map((category: any) => (
                        <p
                          key={category.id}
                          className="text-base text-gray-500"
                        >
                          {category.name}
                        </p>
                      ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between items-centr  gap-x-6">
        </div>
      </Modal>
    </>
  );
};

export default UserInfo;
