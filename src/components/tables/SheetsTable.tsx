"use client";

import { useEffect, useState } from "react";
import TableSkeleton from "@/components/preline/TableSkeleton";
import SheetRow from "./SheetRow";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/utils/types/supabase";
import { useInfiniteOffsetPaginationQuery } from "@supabase-cache-helpers/postgrest-swr";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 10;

interface SheetsTableProps {
  shouldShowAll?: boolean;
}

type SheetType = (Pick<
  Tables<"sheets">,
  "id" | "date" | "start_time" | "end_time" | "location" | "finished"
> & {
  profiles?: {
    first_name: string;
    last_name: string;
  } | null;
})[];

const SheetsTable = ({ shouldShowAll }: SheetsTableProps) => {
  const supabase = createClient();
  const [userId, setUserId] = useState("");

  const {
    currentPage: sheets,
    previousPage,
    nextPage,
    pageIndex,
    isLoading,
    isValidating,
    error,
  } = useInfiniteOffsetPaginationQuery(
    userId
      ? shouldShowAll
        ? supabase
            .from("sheets")
            .select(
              "id, profiles (first_name, last_name), date, start_time, end_time, location, finished"
            )
            .order("date", { ascending: false })
            .order("start_time", { ascending: false })
            .order("end_time", { ascending: false })
            .returns<SheetType>()
        : supabase
            .from("sheets")
            .select("id, date, start_time, end_time, location, finished")
            .eq("user_id", userId)
            .order("date", { ascending: false })
            .order("start_time", { ascending: false })
            .order("end_time", { ascending: false })
            .returns<SheetType>()
      : null,
    { revalidateOnFocus: false, pageSize: PAGE_SIZE }
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? "");
    });
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
                  {shouldShowAll && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Tutor
                    </th>
                  )}
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {isLoading || isValidating ? (
                  <TableSkeleton colSpan={shouldShowAll ? 6 : 5} />
                ) : error ? (
                  <tr>
                    <td colSpan={shouldShowAll ? 6 : 5}>
                      <p className="text-center p-4 text-error">
                        {error.message}
                      </p>
                    </td>
                  </tr>
                ) : (
                  sheets?.map((sheet) => (
                    <SheetRow
                      key={sheet.id}
                      id={sheet.id}
                      finished={sheet.finished}
                      date={sheet.date}
                      startTime={sheet.start_time}
                      endTime={sheet.end_time}
                      location={sheet.location}
                      tutorName={
                        shouldShowAll
                          ? `${sheet.profiles?.first_name} ${sheet.profiles?.last_name}`
                          : undefined
                      }
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {(previousPage || nextPage) && (
        <div className="flex flex-row justify-center mt-2 gap-2">
          <div className="w-6">
            {previousPage && (
              <button onClick={() => previousPage?.()}>
                <ChevronLeft />
              </button>
            )}
          </div>
          <p>{pageIndex + 1}</p>
          <div className="w-6">
            {nextPage && (
              <button onClick={() => nextPage?.()}>
                <ChevronRight />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SheetsTable;
