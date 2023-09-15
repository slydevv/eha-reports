"use client";

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordSchema } from "@/app/lib/auth/yupSchema";
import { toast } from "react-hot-toast";
import Modal from "@/app/components/modal";
import { password } from "@/app/types";
import {  useState } from "react";
import { BeatLoader } from "react-spinners";
import Button from "@/app/components/Button";

interface inputProps {
  isOpen: boolean;
  onClose: () => void;
  id: string | number | undefined;
}

const PasswordChange: React.FC<inputProps> = ({ isOpen, onClose, id }: inputProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState } = useForm<password>({
    resolver: yupResolver(PasswordSchema),
  });
    const {errors} = formState

  const handleUpdate: SubmitHandler<password> = async (data) => {
    setIsLoading(true);
    const { password } = data;
    try {
      const response = await axios.put(`/api/changepassword/${id}`, {
        password,
      });
      if ((response.status = 200 | 201)) {
        setIsLoading(false);
        onClose();
        toast.success("Password Changed Successfully");
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Something went wrong. Try again");
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="space-y-12 overflow-y-auto">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Change Password
            </h2>
            <div className="mt-5 flex flex-col gap-y-8">
              <input
                type="password"
                {...register("password")}
                className="pl-4 py-2 bg-[#F3F3F3] rounded-md mt-2"
                placeholder="Enter new password"
              />
              <div className="text-xs text-red-400 italic">
                {errors.password?.message}
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-y-4">
              <input
                type="password"
                {...register("confirmPwd")}
                className="pl-4 py-2 bg-[#F3F3F3] rounded-md mt-2"
                placeholder="Confirm your password"
              />
              <div className="text-xs text-red-400 italic">
                {errors.confirmPwd?.message}
              </div>
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
            {isLoading ? <BeatLoader color="#ffffff" /> : "Change password"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordChange;
