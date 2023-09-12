"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import {  CreateUserInputs } from "@/app/types";
import Button from "../components/Button";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { toast } from "react-hot-toast";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});


export default function RegisterAdmin() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, control, reset } = useForm<CreateUserInputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const createAdmin: SubmitHandler<CreateUserInputs> = async (data) => {
    setIsLoading(true)
    const { name, email, password } = data;
    const isAdmin = true
    const categoryValue = ["Administration "];
    
      try {
        const response = await axios.post("/api/user", {
          name,
          email,
          password,
          isAdmin,
          categoryValue
        });
        if ((response.status = 201)) {
          setIsLoading(false);
          toast.success("admin created. Proceed to login");
          reset(); 
          router.push('/')  
        }
      } catch (error: any) {
        setIsLoading(false);
       
        toast.error("something went wrong");
      }
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
      <h1 className="text-center font-semibold">Create New Admin</h1>
      <form onSubmit={handleSubmit(createAdmin)}>
        <div className="mt-6 ">
          <div className="flex flex-col mt-5">
            <input
              type="text"
              className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
              {...register("name")}
              placeholder="name"
            />
          </div>
          <div className="flex flex-col mt-5">
            <input
              type="text"
              className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
              {...register("email")}
              placeholder="email"
            />
          </div>
          <div className="flex flex-col mt-5">
            <input
              type="text"
              className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
              {...register("password")}
              placeholder="password"
            />
          </div>
          
          <div className="flex flex-col mt-5">
            <Button primary fullWidth type="submit">
              {isLoading ? <BeatLoader color="#ffffff" /> : "Create"}
            </Button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}
