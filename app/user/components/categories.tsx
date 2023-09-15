"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

interface CategoryProp {
  Categories: any;
}
const Categories = ({ Categories }: CategoryProp) => {
  const { data: session } = useSession({
    required: true,
  });

  const handleClick = (id: string | number, name: string) => {
    // @ts-ignore
    const accessAvailable = session?.user?.categories;
    const userAccess = accessAvailable.map((access: any) => {
      return access.name;
    });
    const hasAccess = userAccess.includes(name);
    !hasAccess
      ? toast.error("You do not have access to this report")
      : router.push(`/category/${id}`);
  };
  const router = useRouter();
  return (
    <div className="mx-6">
      <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Categories &&
          Categories.map((category: any) => (
            <div
              onClick={() => handleClick(category.id, category.name)}
              key={category.id}
              className=" hover:cursor-pointer overflow-y-auto flex flex-col p-5 bg-[#FAFAFA] hover:bg-white border border-[#ececec] rounded-md h-[160px] "
            >
              <div className=" text-center">
                <p className="text-3xl font-bold">{category?.name}</p>
              </div>
              {category.reports.map((report: any) => (
                <ul key={report.id} className=" text-sm  pt-4">
                  <li className="list-disc ml-4"> {report.label} </li>
                </ul>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
