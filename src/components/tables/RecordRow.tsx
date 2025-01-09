"use client";

import { formatTimeString } from "@/utils/helpers/time";
import Image from "next/image";
import SignRecordModal from "../modals/SignRecordModal";
import { useState } from "react";

interface RecordRowProps {
  id: string;
  startTime: string;
  endTime: string | null;
  studentName: string;
  studentYear: number | null;
  subject: string;
  signature?: string;
}

const RecordRow = ({
  id,
  startTime,
  endTime,
  studentName,
  studentYear,
  subject,
  signature,
}: RecordRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {formatTimeString(startTime)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {formatTimeString(endTime)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {studentName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {studentYear}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {subject}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        <>
          {signature ? (
            <Image
              src={signature}
              alt={`${studentName}'s signature`}
              width={96}
              height={24}
              style={{ objectFit: "contain", height: "24px", width: "96px" }}
            />
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="font-bold text-primary-600 hover:text-indigo-400 transition-colors"
            >
              Sign off
            </button>
          )}

          {isModalOpen && (
            <SignRecordModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              recordId={id}
              startTime={startTime}
              endTime={endTime}
              studentName={studentName}
              subject={subject}
            />
          )}
        </>
      </td>
    </tr>
  );
};

export default RecordRow;
