import RecordRow from "./RecordRow";

const Sheet = () => {
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
                    Student&apos;s name
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
                    Student&apos;s signature
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                <RecordRow
                  startTime="18:30"
                  endTime="19:30"
                  studentName="Chris Yoo"
                  studentYear={12}
                  subject="Maths"
                />
                <RecordRow
                  startTime="18:30"
                  endTime="20:15"
                  studentName="Tommy Maurice"
                  studentYear={12}
                  subject="Business Studies"
                />
                <RecordRow
                  startTime="19:20"
                  endTime="22:00"
                  studentName="Cooper Pullen"
                  studentYear={8}
                  subject="English"
                />
                <RecordRow
                  startTime="19:30"
                  endTime="20:30"
                  studentName="Rich Estens"
                  studentYear={11}
                  subject="TAFE"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sheet;
