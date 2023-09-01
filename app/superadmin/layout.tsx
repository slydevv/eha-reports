import { getAllUsers } from "../actions/getUsers";
import SideBar from "../components/SideBar";
import UsersTable from "./components/UsersTable";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getAllUsers();
  return (
    //@ts-ignore Server Component
    <SideBar>
      <div className="h-full">
        {children}
        <UsersTable initialUsers={users!} />
      </div>
    </SideBar>
  );
}
