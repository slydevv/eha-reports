"use client";

import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Create from "./components/create";
import ConfirmModal from "../components/confirmModal";
import { toast } from "react-hot-toast";
import Update from "./components/update";
import Category from "./components/category";

export default function Categories() {
  const [categories, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [confirm, setConfirm] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    setConfirm(false);
    setUpdate(false);
  };

  return (
    <div className=" max-w-[2000px] mx-auto px-6 lg:px-0">
      <div className="flex justify-between px-10 mt-12">
        <div className="flex flex-row-reverse lg:flex-row items-center gap-5">
          <div className="w-[1px] h-[60px] bg-[#ECECEC]"></div>

          <div>
            <input
              type="search"
              className="bg-[#fafafa] pl-4 py-3 rounded-md w-full lg:w-[300px] mt-2 outline-bluemedium border border-[#ececec]"
              placeholder="Search Categories"
            />
          </div>
        </div>

        <div className="hidden lg:flex  w-fit p-1 rounded-md">
          <button
            onClick={() => setIsOpen(true)}
            className="py-3 px-4 bg-blue-500 rounded-lg text-white"
          >
            Create
          </button>
        </div>
      </div>
      

      <Create isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
