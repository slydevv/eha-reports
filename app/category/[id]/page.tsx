"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ClinicLogo from "@/public/images/Clinic_Logo.png";
import dynamic from "next/dynamic";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {  BiDotsHorizontalRounded } from "@/app/assets/index";
import Image from "next/image";

const TableauEmbed = dynamic(
  () => {
    return import("../../components/tableau");
  },
  { ssr: false }
);
type props = {
  params: {
    id: string | number;
  };
};
export default function Category({ params }: props) {
  const { id } = params;
  const router = useRouter();
  const [categories, setCategories] = useState<any>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [reports, setReports] = useState([]);
  const [tableauUrl, setTableauUrl] = useState("");

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const query = useQuery({
    queryKey: ["getcategory"],
    queryFn: () => axios.get(`/api/category/${id}`),
    onSuccess: ({ data }) => {
      setCategories(data.getOne);
      setReports(data.getOne.reports);
    },
  });
  return (
    <div className="flex flex-row max-w-[2000px] mx-auto px-6 lg:px-0">
      {/* <!-- Navigation bar --> */}
      <nav className="fixed bottom-0 w-full px-5 py-7 left-0 md:fixed md:bottom-0 lg:sticky lg:left-0 lg:top-0 lg:w-1/5 lg:h-screen bg-[#FAFAFA]">
        <Image
          src={ClinicLogo}
          width={200}
          height={250}
          alt="eha clinics"
          className="hidden rounded-md lg:block mt-3"
        />

        <div className="flex flex-row justify-between lg:flex-col lg:mt-10">
          {reports.map((report: any) => (
            <div
              key={report.id}
              className="flex flex-col underline underline-offset-4  justify-center items-center lg:items-start lg:flex-row lg:gap-3  lg:py-5 lg:px-4 rounded-md"
            >
              <p
                onClick={() => setTableauUrl(report.url)}
                className=" font-normal lg:text-center text-xs md:text-base hover:cursor-pointer"
              >
                {report.label}
              </p>
            </div>
          ))}
        </div>
        <div className="flex absolute bottom-4 p-2">
          <div className="bg-neutral-900 mx-auto flex flex-shrink-0 items-center justify-center rounded-full w-7 h-7">
            <span className="text-white text-sm">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-around mx-2">
            <div>
              <p className="text-black text-xs "> {session?.user?.email}</p>
            </div>
            <div
              className="ml-4 cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu && (
                <div className="w-20 rounded-md text-center transition absolute bottom-12 p-1 bg-gray-300 hover:bg-gray-200 ">
                  <button
                    className="text-sm font-semibold text-center"
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                  >
                    Logout
                  </button>
                </div>
              )}
              <BiDotsHorizontalRounded />
            </div>
          </div>
        </div>
      </nav>

      <section className="w-full mt-8 lg:w-4/5 lg:px-14">
        <div className="flex flex-row justify-between items-center mt-5">
          <div className="flex flex-col">
            <div className="  lg:pt-6  lg:px-1 ">
              <p className="text-center text-gray-700 font-bold text-base md:text-2xl ">
                {categories?.name}
              </p>
            </div>
          </div>
          {/* <!-- Right header content --> */}
          <div className="flex flex-row justify-center items-center gap-8">
            <div className="hidden md:block">
              <Link
                href="/user"
                className="bg-blue-500 hover:bg-blue-300 text-white p-3 rounded-lg"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
        {!tableauUrl ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400 text-2xl text-center ">
              Report Dashboard will display here
            </p>
          </div>
        ) : (
          <div className="my-8">
            <TableauEmbed viewUrl={tableauUrl} />
          </div>
        )}
      </section>
    </div>
  );
}
