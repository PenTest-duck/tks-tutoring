"use client";

import AddRecordModal from "@/components/modals/AddRecordModal";
import FinishShiftModal from "@/components/modals/FinishShiftModal";
import Sheet from "@/components/Sheet";
import { formatDateString, formatTimeString } from "@/utils/helpers/time";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/utils/types/supabase";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NewSheet = ({ params }: { params: Promise<{ sheetId: string }> }) => {
  const supabase = createClient();
  const [sheet, setSheet] = useState<Tables<"sheets"> | null>(null);
  const [records, setRecords] = useState<
    Pick<
      Tables<"records">,
      | "id"
      | "start_time"
      | "end_time"
      | "student_name"
      | "student_year"
      | "subject_area"
      | "signature"
    >[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSheet = async () => {
      const sheetId = (await params).sheetId;
      const { data, error } = await supabase
        .from("sheets")
        .select("*")
        .eq("id", sheetId);
      if (error) {
        setError(error.message);
        return;
      }

      setSheet(data![0]);
    };

    const fetchRecords = async () => {
      setIsLoading(true);
      const sheetId = (await params).sheetId;
      const { data, error } = await supabase
        .from("records")
        .select(
          "id, start_time, end_time, student_name, student_year, subject_area, signature"
        )
        .eq("sheet_id", sheetId)
        .order("created_at", { ascending: true })
        .limit(10);
      setIsLoading(false);
      if (error) {
        setError(error.message);
        return;
      }

      setRecords(data!);
    };

    fetchSheet();
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  useEffect(() => {
    const setupRealtimeSubscription = async () => {
      const sheetId = (await params).sheetId;
      const channel = supabase
        .channel("realtime records")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "records",
            filter: `sheet_id=eq.${sheetId}`,
          },
          (payload) => {
            switch (payload.eventType) {
              case "INSERT":
                setRecords((prevRecords) => [
                  ...prevRecords,
                  {
                    id: payload.new.id,
                    start_time: payload.new.start_time,
                    end_time: payload.new.end_time,
                    student_name: payload.new.student_name,
                    student_year: payload.new.student_year,
                    subject_area: payload.new.subject_area,
                    signature: payload.new.signature,
                  },
                ]);
                break;
              case "UPDATE":
                setRecords((prevRecords) =>
                  prevRecords.map((record) =>
                    record.id === payload.old.id
                      ? {
                          id: payload.new.id,
                          start_time: payload.new.start_time,
                          end_time: payload.new.end_time,
                          student_name: payload.new.student_name,
                          student_year: payload.new.student_year,
                          subject_area: payload.new.subject_area,
                          signature: payload.new.signature,
                        }
                      : record
                  )
                );
                break;
              case "DELETE":
                setRecords((prevRecords) =>
                  prevRecords.filter((record) => record.id !== payload.old.id)
                );
                break;
            }
          }
        )
        .subscribe();

      return channel;
    };

    const channelPromise = setupRealtimeSubscription();

    return () => {
      channelPromise.then((channel) => {
        supabase.removeChannel(channel);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  return (
    <div className="flex flex-col p-12 space-y-4">
      <div className="self-start">
        <Link
          href="/sheets"
          className="flex flex-row items-center text-primary-600 hover:text-primary-500"
        >
          <ChevronLeft className="-ml-1" />
          My sheets
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-3xl font-bold">
          {sheet && (sheet.finished ? "Completed sheet" : "Draft sheet")}
        </h2>
        <p>
          {!isLoading && (
            <span>
              {sheet?.location} · {formatDateString(sheet?.date)} ·{" "}
              {formatTimeString(sheet?.start_time)} -{" "}
              {formatTimeString(sheet?.end_time)}
            </span>
          )}
        </p>
      </div>

      <Sheet records={records} isLoading={isLoading} error={error} />

      {sheet && !sheet?.finished && (
        <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row w-full justify-between">
          <FinishShiftModal
            sheetId={sheet?.id ?? ""}
            date={sheet?.date ?? ""}
            startTime={sheet?.start_time ?? ""}
            endTime={sheet?.end_time}
            location={sheet?.location ?? ""}
            numRecords={records.length}
          />
          <AddRecordModal sheetId={sheet?.id ?? ""} />
        </div>
      )}
    </div>
  );
};

export default NewSheet;
