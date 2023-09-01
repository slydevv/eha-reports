"use client"
import { FaEdit, FaTrash } from "react-icons/fa";
import Update from "./update";
import { useState } from "react";
import ConfirmModal from "@/app/components/confirmModal";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios'

interface CategoryProp {
  category: any;
 
}

export default function Category({category}: CategoryProp) {
  const [categories, setCategories] = useState(category)
  const [update, setUpdate] = useState(false)
  const [del, setDel] = useState(false)
  const [id, setId] = useState("")
  const onClose = () => {
    setUpdate(false);
    setDel(false);
   
  };

  
 const query = useQuery({
   queryKey: ["getCategories"],
   queryFn: () => axios("/api/category"),
   onSuccess: ({ data }) => {
     setCategories(data);
   },
 });

  return (
    <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-12">
      {categories &&
        categories.map((category: any) => (
          <div
            key={category.id}
            className="flex flex-col my-4 px-5 shadow-lg border border-[#ececec] rounded-md h-160px] justify-between pb-5"
          >
            <div className="mt-8">
              <p className="text-4xl text-center font-bold">{category.name}</p>
            </div>

            <div className="my-10 flex justify-around ">
              <button
                onClick={() => {
                  setUpdate(true), setId(category.id);
                }}
                className="hover:text-gray-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => {
                  setDel(true), setId(category.id);
                }}
                className="hover:text-gray-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      <Update isOpen={update} onClose={onClose} id={id} />
      <ConfirmModal api="category" isOpen={del} onClose={onClose} id={id} />
    </div>
  );
}
