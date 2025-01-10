"use client";

import TableSkeleton from "../preline/TableSkeleton";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/utils/types/supabase";
import { useInfiniteOffsetPaginationQuery } from "@supabase-cache-helpers/postgrest-swr";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 10;

const TutorsTable = () => {
  const supabase = createClient();
  const {
    currentPage: tutors,
    previousPage,
    nextPage,
    pageIndex,
    isLoading,
    isValidating,
    error,
  } = useInfiniteOffsetPaginationQuery(
    supabase
      .from("profiles")
      .select("id, full_name, email, role") // also return num_sheets
      .order("role")
      .order("first_name")
      .order("last_name"),
    { revalidateOnFocus: false, pageSize: PAGE_SIZE }
  );

  const tutorRow = (
    tutor: Pick<Tables<"profiles">, "id" | "full_name" | "email" | "role">
  ) => {
    return (
      <tr key={tutor.id}>
        <td className="font-bold px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
          {tutor.full_name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
          {tutor.email}
        </td>
        <td className="capitalize px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
          {tutor.role}
        </td>
      </tr>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border overflow-hidden dark:border-neutral-700 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead className="bg-gray-50 dark:bg-neutral-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Role
                  </th>
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
                  <TableSkeleton colSpan={4} />
                ) : error ? (
                  <tr>
                    <td colSpan={4}>
                      <p className="text-center p-4 text-error">
                        {error.message}
                      </p>
                    </td>
                  </tr>
                ) : (
                  tutors?.map((tutor) => tutorRow(tutor))
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

export default TutorsTable;
