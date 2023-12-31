"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "../../components/modal";
import { FormEvent, useEffect, useState } from "react";
import Button from "@/app/components/Button";
import { BeatLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface inputProps {
  isOpen: boolean;
  onClose: () => void;
  id: string
}
interface Inputs {
  name: string;
}

const Update: React.FC<inputProps> = ({ isOpen, onClose, id }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
 
  useEffect(() => {
  const getData = async () => {
    const res = await axios.get(`/api/category/${id}`);
    const data = await res.data.getOne;
   return setName(data?.name);
   
  };
  getData();
}, [id]);
  
  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.put(`/api/category/${id}`, {
        name
      });
      if ((response.status = 201)) {
      setIsLoading(false);
        onClose();
        toast.success("Category updated");
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };
  const { mutate } = useMutation(handleUpdate, {
    onSuccess: () => {
      console.log("update mutate")
      queryClient.invalidateQueries(["category"]);
     },
   });

 const onsubmit = async (data: any) => {
   mutate(data);
 };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={onsubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Update category
            </h2>
            <div className="mt-10 flex flex-col gap-y-8">
              <input
                type="text"
                className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="category"
                name="category"
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
            {isLoading ? <BeatLoader color="#ffffff" /> : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Update;
