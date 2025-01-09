"use client";

import AddSheetModal from "@/components/modals/AddSheetModal";
import SheetsTable from "@/components/SheetsTable";

const Sheets = () => {
  return (
    <div className="flex flex-col p-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h2 className="text-3xl font-bold">All sheets</h2>
        <div className="w-full sm:w-auto">
          <AddSheetModal />
        </div>
      </div>

      <SheetsTable />
    </div>
  );
};

export default Sheets;
