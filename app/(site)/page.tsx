"use client";

import Image from "next/image";
import ClinicLogo from "../../public/images/Clinic_Logo.png";
import AuthForm from "./component/AuthForm";

const Home = () => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={ClinicLogo}
          width={200}
          height={500}
          alt="eha clinics"
          className="mx-auto "
        />
        <h2 className="mt-8 text-center text-xl md:text-2xl lg:text-2xl font-bold tracking-tight text-neutral-800">
          Sign in to your reports account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default Home;
