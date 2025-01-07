"use client";

import AddRecordModal from "@/components/AddRecordModal";
import Sheet from "@/components/Sheet";
import { formatDateString, formatTimeString } from "@/lib/utils/time";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const NewSheet = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sheetDate = formatDateString(searchParams.get("date"));
  const sheetStartTime = formatTimeString(searchParams.get("startTime"));
  const sheetEndTime = formatTimeString(searchParams.get("endTime"));
  const sheetLocation = searchParams.get("location");

  useEffect(() => {
    if (
      sheetDate === "N/A" ||
      sheetStartTime === "N/A" ||
      sheetEndTime === "N/A" ||
      !sheetLocation
    ) {
      router.push("/sheets");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetDate, sheetStartTime, sheetEndTime, sheetLocation]);

  if (
    sheetDate === "N/A" ||
    sheetStartTime === "N/A" ||
    sheetEndTime === "N/A" ||
    !sheetLocation
  ) {
    return null;
  }

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
        {sheetLocation} · {sheetDate} · {sheetStartTime} - {sheetEndTime}
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
