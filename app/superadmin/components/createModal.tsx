"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useState } from "react";
import Select from "react-select";
import Button from "@/app/components/Button";
import { BeatLoader } from "react-spinners";
import { ModalProps, CreateUserInputs } from "@/app/types";
import { schema } from "@/app/lib/auth/yupSchema";
import Modal from "@/app/components/modal";
import { useQueryClient } from "@tanstack/react-query";


const CreateModal: React.FC<ModalProps> = ({ isOpen, onClose, categories }) => { 
 const queryClient = useQueryClient();
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
      defaultValues: { category: [] },
    });

    
    
  const handleCreate: SubmitHandler<CreateUserInputs> = async (data) => {
      setIsLoading(true);
    const { name, email, password, category } = data;
    const categoryValue = category.map((values:any) => values.value )
   
       
       try {
         const response = await axios.post("/api/user", {
           name,
           email,
           password,
           categoryValue,
         });
         if ((response.status = 201)) {
           setIsLoading(false);
           toast.success("User created")
           reset();
           onClose();
            queryClient.invalidateQueries({ queryKey: ["getUser"] });
         }
       } catch (error: any) {
          setIsLoading(false);
         toast.error(error.response.data.error);
       }
     };

     return (
       <Modal onClose={onClose} isOpen={isOpen}>
         <div className="overflow-y-auto">
           <h2 className="text-center text-xl font-semibold">Create User</h2>
           <form onSubmit={handleSubmit(handleCreate)}>
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
                       options={categories?.map((category: any) => ({
                         value: category.name,
                         label: category.name,
                       }))}
                     />
                   )}
                 />

                 {errors.category && (
                   <span className="text-red-500">
                     {errors.category.message}
                   </span>
                 )}
               </div>
               <div className="flex flex-col mt-5">
                 <Button primary fullWidth type="submit" disabled={isLoading}>
                   {isLoading ? <BeatLoader color="#ffffff" /> : "Create"}
                 </Button>
               </div>
             </div>
           </form>
         </div>
       </Modal>
     );
}

export default CreateModal;