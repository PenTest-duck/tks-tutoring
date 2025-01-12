import DownloadAllRecordsButton from "@/components/DownloadAllRecordsButton";
import AnalyticsCharts from "@/components/tables/AnalyticsCharts";
import SheetsTable from "@/components/tables/SheetsTable";
import TutorsTable from "@/components/tables/TutorsTable";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

const AdminPage = async () => {
  return (
    <div className="flex flex-col p-12 gap-8">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-3xl font-bold">Overview</h2>
          <Link href="/sheets">
            <button className="w-full sm:w-auto px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-center rounded">
              <p className="flex items-center justify-center gap-2">
                User view <SquareArrowOutUpRight width={16} height={16} />
              </p>
            </button>
          </Link>
        </div>
        <AnalyticsCharts />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">All sheets</h2>
        <SheetsTable isAdmin={true} />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">All tutors</h2>
        <TutorsTable />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Exports</h2>
        <DownloadAllRecordsButton />
      </div>
    </div>
  );
};

export default AdminPage;
