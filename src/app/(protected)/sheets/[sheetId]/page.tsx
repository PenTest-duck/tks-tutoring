"use client";

import AddRecordModal from "@/components/AddRecordModal";
import Sheet from "@/components/Sheet";
import { formatDateString, formatTimeString } from "@/utils/helpers/time";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/utils/types/supabase";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NewSheet = ({ params }: { params: Promise<{ sheetId: string }> }) => {
  const supabase = createClient();
  const router = useRouter();
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

  const handleFinish = async () => {
    if (!sheet) return;
    supabase
      .from("sheets")
      .update({ finished: true })
      .eq("id", sheet.id)
      .then(({ error }) => {
        router.push("/sheets");
      });
  };

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
    <div className="flex flex-col items-center p-12">
      <div className="self-start">
        <Link
          href="/sheets"
          className="flex flex-row text-primary-600 hover:text-primary-700"
        >
          <ChevronLeft />
          Back to all sheets
        </Link>
      </div>
      <h2 className="text-4xl">New Sheet</h2>
      <p className="mb-12">
        {!isLoading && (
          <span>
            {sheet?.location} · {formatDateString(sheet?.date)} ·{" "}
            {formatTimeString(sheet?.start_time)} -{" "}
            {formatTimeString(sheet?.end_time)}
          </span>
        )}
      </p>

      <Sheet records={records} isLoading={isLoading} />

      <div className="mt-8 flex flex-row w-full justify-between">
        <button
          onClick={handleFinish}
          className="bg-pink-500 text-white px-4 py-2 rounded-md"
        >
          Finish shift
        </button>
        <AddRecordModal sheetId={sheet?.id ?? ""} />
      </div>
    </div>
  );
};

export default NewSheet;
