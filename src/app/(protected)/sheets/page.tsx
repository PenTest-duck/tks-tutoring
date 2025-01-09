"use client";

import AddSheetModal from "@/components/modals/AddSheetModal";
import SheetsTable from "@/components/tables/SheetsTable";
import { getRole } from "@/utils/supabase/authHelpers";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Sheets = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    getRole().then((role) => setUserRole(role));
  }, []);

  return (
    <div className="flex flex-col p-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h2 className="text-3xl font-bold">My sheets</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {userRole === "admin" && (
            <Link href="/admin">
              <button className="w-full sm:w-auto px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-center rounded">
                <p className="flex items-center justify-center gap-2">
                  Admin view <SquareArrowOutUpRight width={16} height={16} />
                </p>
              </button>
            </Link>
          )}
          <div className="w-full sm:w-auto">
            <AddSheetModal />
          </div>
        </div>
      </div>

      <SheetsTable />
    </div>
  );
};

export default Sheets;
