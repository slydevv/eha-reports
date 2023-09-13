"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "../../components/modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Button from "@/app/components/Button";
import { BeatLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface inputProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Inputs {
  name: string;
}

const Create: React.FC<inputProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleCreate: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const { name } = data;
    try {
      const response = await axios.post("/api/category", {
        name,
      });
      if ((response.status = 201)) {
        setIsLoading(false);
        reset();
        onClose();
        toast.success("Category created");
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };
  // @ts-ignore
  const { mutate } = useMutation(handleCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
    },
  });

  const onsubmit = async (data: any) => {
    mutate(data);
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create new category
            </h2>
            <div className="mt-10 flex flex-col gap-y-8">
              <input
                type="text"
                className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                {...register("name")}
                placeholder="name"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-centr justify-end gap-x-6">
          <button
            className="bg-gray-400 hover:bg-gray-200 flex justify-center rounded-md px-3 py-2 text-sm text-white"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <Button primary type="submit" disabled={isLoading}>
            {isLoading ? <BeatLoader color="#ffffff" /> : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Create;
