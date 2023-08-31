"use client"
import ConfirmModal from "@/app/components/confirmModal";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Update from "./update";

interface ReportProp {
  reports: any;
 
}

export default function Report({ reports }: ReportProp) { 
  const [update, setUpdate] = useState(false);
  const [del, setDel] = useState(false);
  const [id, setId] = useState("");
  const onClose = () => {
    setUpdate(false);
    setDel(false);
  };

  return (
    <div className="mt-8 grid gap-4 grid-cols-1 lg:grid-cols-3  mx-10">
      {reports && reports.map((report: any) => (
          <div
            key={report.id}
            className="my-2  text-center px-10 text-black shadow-lg border border-[#ececec] rounded-lg  justify-between pb-5"
          >
            <div className="mt-4">
              <div className="">
                <p className="text-xl text-gray-800 font-bold">
                  {report.label}
                </p>
                <p className="truncate underline underline-offset-2 ">
                  {report.url}
                </p>
                <div className=" py-1 text-slate-600">
                  <small>{report.categoryId}</small>
                </div>
              </div>
              <div className=" "></div>
              <div className="my-2 flex justify-center">
                <button
                  onClick={() => {
                    setUpdate(true), setId(report.id);
                  }}
                  className="hover:text-gray-700 px-3"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    setDel(true), setId(report.id);
                  }}
                  className="hover:text-gray-700 px-3"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      <ConfirmModal api="report" isOpen={del} onClose={onClose} id={id} />
      <Update isOpen={update} onClose={onClose} id={id} />
    </div>
  );
}
