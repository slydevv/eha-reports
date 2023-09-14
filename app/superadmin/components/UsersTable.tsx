"use client";

import React, { useState } from "react";
import { FetchedUser } from "@/app/types";
import { PiDotsThreeVertical } from "@/app/assets/index";
import dynamic from "next/dynamic";
import moment from 'moment'
import UserModal from "./userModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

interface UsersTableProps {
  initialUsers: FetchedUser[];
}

const UsersTable: React.FC<UsersTableProps> = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [data, setData] = useState<FetchedUser[]>(users);
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState("")
  
  const onClose = () => {
    setIsOpen(false)
  }

  
 const query = useQuery({
   queryKey: ["getUser"],
   queryFn: () => axios("/api/user"),
   onSuccess: ({ data }) => {
     setUsers(data);
     
   },
 });

 const convertDate = (date: any) => {
  const d = new Date(date)
  return d
 }

  return (
    <div className="mt-8 mb-12 lg:mb-0">
      <div className="relative overflow-x-auto rounded-md border">
        <table className="w-full text-sm text-left">
          <thead className="text-xs bg-[#F6F6F6]">
            <tr>
              <th scope="col" className="px-6 py-3 text-md font-semibold">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-md font-semibold">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-md font-semibold">
                Date Created
              </th>
              <th scope="col" className="px-6 py-3 font-normal"></th>
              <th scope="col" className="px-6 py-3 font-normal"></th>
              <th scope="col" className="px-6 py-3 font-normal"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>

          {/* <!-- table body --> */}
          <tbody className="rounded-md">
            {users &&
              users?.map((user: any) => (
                <tr key={user.id} className="bg-white border-t text-black">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {moment(
                      convertDate(user?.createdAt),
                      "MMM DD, YYYY, A"
                    ).format("DD MMM, YYYY")}
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <PiDotsThreeVertical
                      className="text-xl font-bold mt-3 cursor-pointer"
                      onClick={() => {
                        setIsOpen(true), setId(user.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <UserModal isOpen={isOpen} onClose={() => onClose()} id={id} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(UsersTable), { ssr: false });
