import { Tables } from "@/utils/types/supabase";
import RecordRow from "./RecordRow";
import TableSkeleton from "@/components/preline/TableSkeleton";

interface RecordsTableProps {
  records?: Pick<
    Tables<"records">,
    | "id"
    | "start_time"
    | "end_time"
    | "student_name"
    | "student_year"
    | "subject_area"
    | "signature"
  >[];
  isLoading?: boolean;
  error?: string;
}

const RecordsTable = ({
  records: records = [],
  isLoading: isLoading = false,
  error,
}: RecordsTableProps) => {
  return (
    <div className="min-w-full flex flex-col">
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
                    Start
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    End
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Student name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Year
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Subject / area
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Student signature
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {isLoading ? (
                  <TableSkeleton colSpan={6} />
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="text-center text-error py-4">
                      {error}
                    </td>
                  </tr>
                ) : records.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-disabled py-4">
                      No records to show
                    </td>
                  </tr>
                ) : (
                  records.map((record) => (
                    <RecordRow
                      key={record.id}
                      id={record.id}
                      startTime={record.start_time}
                      endTime={record.end_time}
                      studentName={record.student_name}
                      studentYear={record.student_year}
                      subject={record.subject_area}
                      signature={record.signature ?? ""}
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

export default RecordsTable;
