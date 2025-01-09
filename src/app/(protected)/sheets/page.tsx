"use client";

import AddSheetModal from "@/components/modals/AddSheetModal";
import SheetsTable from "@/components/SheetsTable";

const Sheets = () => {
  return (
    <div className="flex flex-col p-12">
      <div className="flex flex-row items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">All sheets</h2>
        <AddSheetModal />
      </div>

      <SheetsTable />
    </div>
  );
};

export default Sheets;
