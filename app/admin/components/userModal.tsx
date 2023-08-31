"use client";

import { Dialog } from "@headlessui/react";
import Modal from "@/app/components/modal";
import { UserModalProps} from "@/app/types";
import axios from 'axios'
import { useEffect, useState } from "react";
import moment from "moment";
import ConfirmModal from "@/app/components/confirmModal";
import Update from "./updateModal";


const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, id }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    categories: [],
    createdAt:""
  })
  const [del, setDel] = useState(false)
  const [edit, setEdit] = useState(false)
  const [categories, setCategories] = useState([])

  

  const getUser = async () => {
    await axios
      .get(`api/user/${id}`)
      .then((res) => {
        const data = res.data.getOne
        setUser({
          name: data.name,
          email: data.email,
          categories: data.categories,
          createdAt: data.createdAt,
        });
        setCategories(data.categories)
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser()
  }, [id])
  

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
                <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0">
                  <p className="text-2xl">
                    {user && user.name.charAt(0).toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col  items-center justify-center">
                <div>
                  <input
                    className="text-center "
                    defaultValue={user && user.name}
                  />
                </div>
                <div>
                  <input
                    className="text-center text-gray-600"
                    defaultValue={user && user.email}
                  />
                </div>
              </div>

              <div className="border border-gray-200 w-full my-8"></div>
              <div className="mt-4">
                <h3 className="font-semibold text-center ">Categories</h3>
                <div className="mt-3 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-12">
                  {categories &&
                    categories.map((category: any) => (
                      <p key={category.id} className="text-base text-gray-500">
                        {category.name}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end items-centr  gap-x-6">
          <button
            className=" bg-gray-600 hover:bg-gray-400 flex justify-center rounded-md px-3 py-2 text-sm text-white"
            onClick={() => {
              setEdit(true);
            }}
          >
            Update
          </button>
          <button
            className=" bg-rose-600 hover:bg-rose-400 flex justify-center rounded-md px-3 py-2 text-sm text-white"
            onClick={() => setDel(true)}
          >
            Delete
          </button>
        </div>
      </Modal>
      <ConfirmModal
        api="user"
        id={id}
        isOpen={del}
        onClose={() => {
          setDel(false);
        }}
      />
      <Update
        isOpen={edit}
        onClose={() => setEdit(false)}
        id={id}
        user={user}
      />
    </>
  );
};

export default UserModal;
