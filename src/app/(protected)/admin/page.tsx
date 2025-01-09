import AnalyticsTable from "@/components/AnalyticsTable";
import SheetsTable from "@/components/SheetsTable";

const AdminPage = async () => {
  return (
    <div className="flex flex-col p-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h2 className="text-3xl font-bold">Analytics</h2>
      </div>
      <AnalyticsTable />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h2 className="text-3xl font-bold">All sheets</h2>
      </div>
      <SheetsTable shouldShowAll={true} />
    </div>
  );
};

export default AdminPage;
