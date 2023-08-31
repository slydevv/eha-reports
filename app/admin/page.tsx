"use client";

import React, { useState } from "react";
import Button from "../components/Button";
import CreateModal from "./components/createModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export default function Admin() {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState("")
  const onClose = () => {
    setIsOpen(false)
  }
  const query = useQuery({
    queryKey: ["getCategory"],
    queryFn: () => axios("/api/category"),
    onSuccess: ({ data }) => {
      setCategories(data);
    },
  });
  return (
    <div className="w-full">
      <div className="px-6 mt-10">
        <h1 className="text-3xl text-gray-900 font-bold">Users</h1>
        <p className="text-base">List of all users</p>
      </div>
      <div className="flex justify-between px-10 mt-12">
        <div className="flex flex-row-reverse lg:flex-row items-center gap-5">
          <div className="w-[1px] h-[60px] bg-[#ECECEC]"></div>

          <div className="flex">
            
            <input
              type="search"
              className="bg-[#fafafa] pl-4 py-3 rounded-md w-full lg:w-[300px]  outline-bluemedium border border-[#ececec]"
              placeholder="Search Users"
            />
          </div>
        </div>

        <div className=" p-1 rounded-md">
          <Button onClick={() => setIsOpen(true)}>Add Users</Button>
        </div>
      </div>
    
      <CreateModal isOpen={isOpen} onClose={onClose} categories={categories} />
    </div>
  );
}
