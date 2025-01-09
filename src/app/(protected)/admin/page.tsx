import AnalyticsTable from "@/components/AnalyticsTable";
import SheetsTable from "@/components/SheetsTable";

const AdminPage = async () => {
  return (
    <div className="flex flex-col p-12 gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Overview</h2>
        <AnalyticsTable />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">All sheets</h2>
        <SheetsTable shouldShowAll={true} />
      </div>

      <div className="">
        <h2 className="text-3xl font-bold">All tutors</h2>
      </div>
    </div>
  );
};

export default AdminPage;
