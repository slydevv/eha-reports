
import { getAllReports } from "../actions/getReports";
import SideBar from "../components/SideBar";
import Report from "./components/report";

export default async function ReportLayout({ children }: { children: React.ReactNode }) {
  const reports = await getAllReports();
  return (
    //@ts-ignore Server Component
    <SideBar>
      <div className="h-full">
        {children}
        <Report reports={reports} />
      </div>
    </SideBar>
  );
}
