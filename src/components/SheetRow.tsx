"use client";

import { formatDateString, formatTimeString } from "@/utils/helpers/time";
import { CircleCheck, CirclePause } from "lucide-react";
import { useRouter } from "next/navigation";

interface SheetRowProps {
  id: string;
  finished: boolean;
  tutorName?: string;
  date: string;
  startTime: string;
  endTime: string | null;
  location: string;
}

const SheetRow = ({
  id,
  finished,
  tutorName,
  date,
  startTime,
  endTime,
  location,
}: SheetRowProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/sheets/${id}`);
  };

  return (
    <tr onClick={handleClick} className="cursor-pointer">
      <td className="pl-4 text-center">
        {finished ? (
          <CircleCheck color="white" fill="green" />
        ) : (
          <CirclePause color="white" fill="gray" />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-neutral-200">
        {formatDateString(date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
        {formatTimeString(startTime)} - {formatTimeString(endTime)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
        {location}
      </td>
      {tutorName && (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
          {tutorName}
        </td>
      )}
      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-bold">
        <button
          type="button"
          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SheetRow;
