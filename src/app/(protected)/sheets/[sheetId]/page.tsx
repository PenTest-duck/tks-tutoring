"use client";

import AddRecordModal from "@/components/AddRecordModal";
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSheet = async () => {
      setIsLoading(true);
      const sheetId = (await params).sheetId;
      const { data, error } = await supabase
        .from("sheets")
        .select("*")
        .eq("id", sheetId);
      setIsLoading(false);
      if (error) {
        setError(error.message);
        return;
      }

      setSheet(data![0]);
    };

    fetchSheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {sheet?.location} · {formatDateString(sheet?.date)} ·{" "}
        {formatTimeString(sheet?.start_time)} -{" "}
        {formatTimeString(sheet?.end_time)}
      </p>

      <Sheet />

      <div className="mt-8 flex flex-row w-full justify-between">
        <button className="bg-pink-500 text-white px-4 py-2 rounded-md">
          Finish shift
        </button>
        <AddRecordModal />
      </div>
    </div>
  );
};

export default NewSheet;
