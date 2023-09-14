"use client";

import { Dialog } from "@headlessui/react";
import Modal from "@/app/components/modal";
import { UserModalProps } from "@/app/types";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import moment from "moment";
import Select from "react-select";
import { toast } from "react-hot-toast";
import ConfirmModal from "@/app/components/confirmModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/app/components/Button";
import { BeatLoader } from "react-spinners";
import { BiArrowBack } from "react-icons/bi";

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, id }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState({
    name: "",
    email: "",
    categories: [],
    createdAt: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [del, setDel] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [form, setForm] = useState(false);
  const [userCategory, setUserCategory] = useState([]);
  
  const query = useQuery({
    queryKey: ["getCategory"],
    queryFn: () => axios.get("/api/category"),
    onSuccess: ({ data }) => {
      setAllCategories(data);
    },
  });

  const getUser = async () => {
    await axios
      .get(`api/user/${id}`)
      .then((res) => {
        const data = res.data.getOne;
        setUser({
          name: data.name,
          email: data.email,
          categories: data.categories,
          createdAt: data.createdAt,
        });
        setUserCategory(data.categories.map((category: any) => category.name));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, [id]);

  const handleChange = (event: any) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    
    });
  };

   const handleSelect = (selectedOption:any) => {
     setUser({
     ...user,
     categories: selectedOption
   });
   };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
     setIsLoading(true);
     const { name, email, categories } = user;
     const categoryValue = categories.map((values: any) => values.value);

     try {
       const response = await axios.put(`/api/user/${id}`, {
         name,
         email, 
         categoryValue,
       });
       if ((response.status = 201)) {
         setIsLoading(false);
         toast.success("User updated");
         onClose();
       }
     } catch (error: any) {
       setIsLoading(false);
       toast.error("something went wrong. Try again ");
     }
  };
  // @ts-ignore
  const { mutate } = useMutation(handleUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const onsubmit = async (user: any) => {
    mutate(user);
  };

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
            <div className={form ? `hidden` : `mt-2 space-y-2 `}>
              <div className="flex items-center justify-center ">
                <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 sm:mx-0">
                  <p className="text-2xl">
                    {user && user.name.charAt(0).toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col  items-center justify-center">
                <div>
                  <p className="text-center font-semibold">
                    {user && user.name}
                  </p>
                </div>
                <div>
                  <p className="text-center text-gray-600">
                    {user && user.email}
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 w-full my-8"></div>
              <div className="mt-4">
                <h3 className="font-semibold text-center ">Categories</h3>
                <div className="mt-3 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-12">
                  {user.categories &&
                    user.categories.map((category: any) => (
                      <p key={category.id} className="text-base text-gray-500">
                        {category.name}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <form onSubmit={onsubmit} className={!form ? `hidden` : `block`}>
              <div className="space-y-3 overflow-y-auto">
                <div
                  className="flex cursor-pointer"
                  onClick={() => setForm(false)}
                >
                  <BiArrowBack className="mt-1 text-gray-600 mr-1" />{" "}
                  <span>Back</span>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 flex flex-col gap-y-8">
                    <input
                      type="text"
                      className="pl-4 py-2 bg-[#F3F3F3] rounded-md mt-2"
                      name="name"
                      value={user && user.name}
                      onChange={handleChange}
                      placeholder="name"
                    />
                  </div>

                  <div className="mt-5 flex flex-col gap-y-8">
                    <input
                      type="text"
                      className="pl-4 py-2 bg-[#F3F3F3] rounded-md mt-2"
                      onChange={handleChange}
                      value={user && user.email}
                      name="email"
                    />
                  </div>
                  <div className="flex flex-col mt-5">
                    <div className="form-control w-full max-w-xs">
                      <Select
                        name="categories"
                        closeMenuOnSelect={false}
                        placeholder={userCategory}
                        isSearchable={true}
                        // defaultValue={userCategory}
                        isMulti
                        onChange={handleSelect}
                        options={allCategories?.map((category: any) => ({
                          value: category.name,
                          label: category.name,
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10 flex justify-end items-centr  gap-x-6">
          {/* <div className="text-sm text-gray-600 ">Change user password</div> */}
          
            <button
              className={
                form
                  ? `hidden`
                  : `bg-gray-600 hover:bg-gray-400 flex justify-center rounded-md px-3 py-2 text-sm text-white`
              }
              onClick={() => {
                setForm(true);
              }}
            >
              Edit
            </button>
            <button
              disabled={isLoading}
              className={
                !form
                  ? `hidden`
                  : `bg-gray-600 hover:bg-gray-400 flex justify-center rounded-md px-3 py-2 text-sm text-white`
              }
              type="submit"
              onClick={onsubmit}
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
    </>
  );
};

export default UserModal;
