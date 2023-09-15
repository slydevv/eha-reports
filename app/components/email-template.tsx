import Image from "next/image";
import * as React from "react";
import ClinicLogo from "@/public/images/Clinic_Logo.png";

interface EmailTemplateProps {
    firstName: string;
    email: string
    password: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  email,
  password,
}) => (
  <div>
    <p>
      Hello, {firstName}
      You have been added to the EHA Reports application. This application gives
      you visibility on all the Business Intelligence (BI) Data Reports you have
      requested for.
      <br />
      Kindly login to the platform using the following details
      <br />
      URL: <a href="https://master--ehareports.netlify.app/">Reports App</a>
      Email :{email} <br />
      Password:{password} <br />
      Note that you are required to change your password upon first login. For
      any assistance on the platform, kindly reach out to the Informatics Team.
      Thank you
    </p>
    <Image
      src={ClinicLogo}
      width={200}
      height={500}
      alt="eha clinics"
      className="mx-auto "
    />
    <p className=" font-semibold">EHA Clinics Informatics Team</p> 
  </div>
);
