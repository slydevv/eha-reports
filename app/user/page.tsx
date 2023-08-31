"use client"

import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query";

export default function User() {
  const router = useRouter();
  const [categories, setCategories] = useState([])

  const { data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        } 
  })
   const query = useQuery({
     queryKey: ["getcategory"],
     queryFn: () => axios.get("/api/category"),
     onSuccess: ({ data }) => { setCategories(data) },
   });
  
    return (
      <div className="flex flex-row max-w-[2000px] mx-auto px-6 lg:px-0">

        <section className="w-full lg:w-4/5 lg:px-14">
          {/* <!-- Header content --> */}
          <div className="flex flex-row justify-between items-center mt-5">
            <div className="flex flex-col">
              <h3 className="text-xl lg:text-2xl">
                Hello there,
                <span className="inline-block font-bold">
                  {session?.user?.name}
                </span>
              </h3>
            </div>
            {/* <!-- Right header content --> */}
            <div className="flex flex-row justify-center items-center ">
              <div className="hidden md:block">
                <div className="relative md:w-[200px] lg:w-80">
                  <input
                    type="text"
                    className="py-5 pl-8 pr-4 bg-[#F5F4F7] w-full rounded-md md:mr-5 truncate"
                    placeholder="Search for reports"
                  />
                </div>
              </div>
            </div>
          </div>

        
        </section>
      </div>
    );
}