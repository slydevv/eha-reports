import { getAllCategories } from "../actions/getCategories";
import NavBar from "../components/NavBar";
import UserSideBar from "../components/UserSideBar";
import Categories from "./components/categories";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const categories = await getAllCategories();
  return (
    //@ts-ignore Server Component
    <UserSideBar>
      <div className="h-full">
        {children}
        <Categories Categories={categories} />
      </div>
    </UserSideBar>
  );
}
