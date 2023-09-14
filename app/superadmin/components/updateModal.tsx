"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "../../components/modal";
import { FormEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/app/lib/auth/yupSchema";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import Button from "@/app/components/Button";
import { BeatLoader } from "react-spinners";
import { CreateUserInputs } from "@/app/types";

interface inputProps {
  isOpen: boolean;
  onClose: () => void;
    id: string;
    user:any
}

const Update: React.FC<inputProps> = ({ isOpen, onClose, id, user  }: inputProps) => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   

    const {
      register,
      handleSubmit,
      reset,
      watch,
      control,
      setValue,
      formState: { errors },
    } = useForm<CreateUserInputs>({
      // @ts-ignore
      resolver: yupResolver(schema),
        defaultValues: {
            name: user.name,
            email:user.email,
            category: []
        },
    });


  const handleUpdate: SubmitHandler<CreateUserInputs> = async (data) => {

    const { name, email, category } = data;
    try {
      const response = await axios.put(`/api/report/${id}`, {
        name,
        email, 
        category,
      });
      if ((response.status = 201)) {
        onClose();
        toast.success("report updated");
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="overflow-y-auto">
        <h2 className="text-center text-xl font-semibold">Update User</h2>
        <form onSubmit={handleSubmit(handleUpdate)}>
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
            {/* <div className="flex flex-col mt-5">
              <input
                type="text"
                className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                {...register("password")}
                placeholder="password"
              />
            </div> */}
            <div className="flex flex-col mt-5">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  //@ts-ignore
                  <Select
                    {...field}
                    closeMenuOnSelect={false}
                    placeholder="Select Category"
                    isSearchable={true}
                        isMulti
                    //@ts-ignore
                    options={categories?.map((category: any) => ({
                      value: category.name,
                      label: category.name,
                    }))}
                  />
                )}
              />

              {errors.category && (
                <span className="text-red-500">{errors.category.message}</span>
              )}
            </div>
            <div className="flex flex-col mt-5">
              <Button primary fullWidth type="submit">
                {isLoading ? <BeatLoader color="#ffffff" /> : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Update;
