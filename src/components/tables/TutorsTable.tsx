"use server";

import { Suspense } from "react";
import TableSkeleton from "../preline/TableSkeleton";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/utils/types/supabase";

const TutorsTable = async () => {
  const supabase = await createClient();
  const { data: tutors, error } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, role")
    .order("role")
    .order("first_name")
    .order("last_name")
    .limit(10);

  const tutorRow = (tutor: Tables<"profiles">) => {
    return (
      <tr key={tutor.id}>
        <td className="font-bold px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
          {tutor.first_name} {tutor.last_name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
          BLA
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <Suspense
                fallback={
                  <tbody>
                    <TableSkeleton colSpan={4} />
                  </tbody>
                }
              >
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {error ? (
                    <tr>
                      <td colSpan={4}>
                        <p className="text-center p-4 text-error">
                          {error.message}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    tutors.map((tutor) => tutorRow(tutor))
                  )}
                </tbody>
              </Suspense>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorsTable;
