"use client";

import { useEffect, useState } from "react";
import TableSkeleton from "./preline/TableSkeleton";
import SheetRow from "./SheetRow";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/utils/types/supabase";

const SheetsTable = () => {
  const supabase = createClient();
  const [sheets, setSheets] = useState<
    Pick<
      Tables<"sheets">,
      "id" | "date" | "start_time" | "end_time" | "location" | "finished"
    >[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSheets = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("sheets")
        .select("id, date, start_time, end_time, location, finished")
        .order("date", { ascending: false })
        .order("start_time", { ascending: false })
        .order("end_time", { ascending: false })
        .limit(10);
      setIsLoading(false);
      if (error) {
        setError(error.message);
        return;
      }

      setSheets(data);
    };

    fetchSheets();
  }, [supabase]);

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border overflow-hidden dark:border-neutral-700 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead className="bg-gray-50 dark:bg-neutral-700">
                <tr>
                  <th scope="col"></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {isLoading ? (
                  <TableSkeleton colSpan={5} />
                ) : error ? (
                  <tr>
                    <td colSpan={5}>
                      <p className="text-center p-4 text-error">{error}</p>
                    </td>
                  </tr>
                ) : (
                  sheets.map((sheet) => (
                    <SheetRow
                      key={sheet.id}
                      id={sheet.id}
                      finished={sheet.finished}
                      date={sheet.date}
                      startTime={sheet.start_time}
                      endTime={sheet.end_time}
                      location={sheet.location}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheetsTable;
