import {
  getAllCategories,
  getCategoriesAndReports,
} from "../actions/getCategories";
import UserSideBar from "../components/UserSideBar";
import Categories from "./components/categories";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories();
  const categoriesAndReports = await getCategoriesAndReports();
  return (
    //@ts-ignore Server Component
    <UserSideBar categories={categoriesAndReports}>
      <div className="h-full">
        {children}
        <Categories Categories={categoriesAndReports} />
      </div>
    </UserSideBar>
  );
}
