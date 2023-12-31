"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Button from "../components/Button";
import Input from "../components/Input";
import { loginValidationSchema } from "../lib/auth/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginValidationSchema) });

  const handleLogin  = async (data:any) => {
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
    <div className="max-w-[2000px] gap-x-10 lg:gap-x-20 mx-auto px-7 lg:pr-20">
      <section className="w-full md:w-2/5 mx-auto">
        <h1 className="pt-12 font-bold text-2xl text-center lg:text-3xl">
          Sign In
        </h1>

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
      </section>
    </div>
  );
}
