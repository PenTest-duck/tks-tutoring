"use client";

import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const AnalyticsCharts = () => {
  const supabase = createClient();
  const { data: records_per_year, error: year_error } = useQuery(
    supabase.from("records_per_year").select("student_year, records_count")
  );
  const { data: records_per_location, error: location_error } = useQuery(
    supabase.from("records_per_location").select("location, records_count")
  );
  const { data: records_per_subject, error: subject_error } = useQuery(
    supabase
      .from("records_per_subject")
      .select("subject_area, records_count")
      .limit(5)
  );

  const displayBarChart = (
    data: object[],
    xKey: string,
    yKey: string,
    xLabel: string,
    yLabel: string
  ) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 30, // Increased to accommodate title
            right: 0,
            left: 0,
            bottom: 30,
          }}
        >
          <text
            x="50%"
            y={20}
            textAnchor="middle"
            style={{ fontWeight: "bold" }}
          >
            {`${yLabel} per ${xLabel} (past 90 days)`}
          </text>
          <XAxis
            dataKey={xKey}
            label={{ value: xLabel, dy: 20 }}
            tick={{ display: "block" }}
            interval={0}
          />
          <YAxis allowDecimals={false} label={{ value: yLabel, angle: -90 }} />
          <Bar dataKey={yKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="flex flex-col p-4">
      {year_error
        ? "Failed to fetch year chart data."
        : records_per_year &&
          displayBarChart(
            records_per_year,
            "student_year",
            "records_count",
            "Year",
            "Records"
          )}
      {location_error
        ? "Failed to fetch location chart data"
        : records_per_location &&
          displayBarChart(
            records_per_location,
            "location",
            "records_count",
            "House",
            "Records"
          )}
      {subject_error
        ? "Failed to fetch subject chart data"
        : records_per_subject &&
          displayBarChart(
            records_per_subject,
            "subject_area",
            "records_count",
            "Subject",
            "Records"
          )}
    </div>
  );
};

export default AnalyticsCharts;
