import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { loginValidationSchema } from "@/app/lib/auth/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { getSession } from "next-auth/react";

const AuthForm = () => {
  const router = useRouter();
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginValidationSchema) });

const handleLogin = async (data: any) => {
  setIsLoading(true);

  signIn("credentials", { ...data, redirect: false })
    .then((res) => {
      if (res?.error) {
        toast.error(res.error);
      }
      if (res?.ok && !res?.error) {
        redirect();
        toast.success("Logged in!");
      }
    })
    .finally(() => setIsLoading(false));
};
const redirect = async () => {
  const session = await getSession();
  const status = session?.user?.isAdmin;
  status ? router.push("/admin") : router.push("/user");
};

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mt-12">
            <Input
              placeholder="Janedoe@eha.ng"
              errors={errors}
              label="Email Address"
              id="email"
              type="email"
              register={register}
              disabled={isLoading}
            />
            <p className="mt-1 text-red-500 text-xs">{errors.email?.message}</p>

            <Input
              placeholder="Min. 6 characters"
              errors={errors}
              label="Password"
              id="password"
              type="password"
              register={register}
              disabled={isLoading}
            />
            <p className="mt-1 text-red-500 text-xs">
              {errors.password?.message}
            </p>

            <div className="flex flex-col mt-14 items-center space-y-4">
              <Button primary fullWidth type="submit">
                {isLoading ? <BeatLoader color="#ffffff" /> : "Login"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
