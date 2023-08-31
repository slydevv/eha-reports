
import SideBar from "../components/SideBar";
import { getAllCategories } from "../actions/getCategories";
import Category from "./components/category";

export default async function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const categories = await getAllCategories();
  
  return (
     //@ts-ignore Server Component
     <SideBar>
     <div className="h-full">
        {children}
        <Category category={categories}  />
     </div>
   </SideBar>
    
  );
}
