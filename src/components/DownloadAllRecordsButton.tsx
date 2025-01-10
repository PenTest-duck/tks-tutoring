"use client";

import { createClient } from "@/utils/supabase/client";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

type RecordType = {
  date: string;
  location: string;
  tutor_name: string;
  start_time: string;
  end_time: string;
  student_name: string;
  student_year: string;
  subject_area: string;
};

const DownloadAllRecordsButton = () => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const toCsv = (records: RecordType[]) => {
    return [
      [
        "Date",
        "Location",
        "Tutor name",
        "Start time",
        "End time",
        "Student name",
        "Student year",
        "Subject area",
      ],
      ...records.map((record) =>
        [
          record.date,
          record.location,
          record.tutor_name,
          record.start_time,
          record.end_time,
          record.student_name,
          record.student_year,
          record.subject_area,
        ].map((str) => `"${str.toString().replace(/"/g, '"')}"`)
      ),
    ]
      .map((e) => e.join(","))
      .join("\n");
  };

  const downloadAllRecords = () => {
    setIsLoading(true);
    supabase
      .from("records")
      .select(
        "sheets(date, location, profiles(full_name)), start_time, end_time, student_name, student_year, subject_area"
      )
      .then(async ({ data, error }) => {
        if (error || !data) {
          return;
        }

        // Flatten the nested data
        const flattenedData = data.map(
          (record) =>
            ({
              date: record.sheets?.date,
              location: record.sheets?.location,
              tutor_name: record.sheets?.profiles?.full_name ?? "",
              start_time: record.start_time,
              end_time: record.end_time ?? "",
              student_name: record.student_name,
              student_year: record.student_year ?? "",
              subject_area: record.subject_area,
            } as RecordType)
        );
        const csv = toCsv(flattenedData);

        // Download
        const currentTime = new Date().toISOString();
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `tks_tutoring_records_${currentTime}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    setIsLoading(false);
  };

  return (
    <div>
      <button
        onClick={downloadAllRecords}
        className="w-full sm:w-auto px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-center rounded inline-flex justify-center items-center min-w-[240px]"
      >
        {isLoading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Download all records as CSV"
        )}
      </button>
    </div>
  );
};

export default DownloadAllRecordsButton;
