"use client"
import { useRouter } from "next/navigation";
interface CategoryProp {
  Categories: any;
}
const Categories = ({ Categories }: CategoryProp) => {
  const router = useRouter();
  return (
    <div className="mx-6">
      <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* <!-- card 1 --> */}
        {Categories &&
          Categories.map((category: any) => (
            <div
              onClick={() => router.push(`/category/${category.id}`)}
              key={category.id}
              className=" hover:cursor-pointer flex flex-col p-5 border border-[#ececec] rounded-md h-[160px] justify-between"
            >
              {/* <!-- time and questions--> */}
              <div className="flex flex-row gap-3">
                <p className="text-4xl font-bold">{category?.name}</p>
              </div>

              <div className="mt-5"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories