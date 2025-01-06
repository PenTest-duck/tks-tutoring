"use client";

import { SquarePen } from "lucide-react";

interface SheetRowProps {
  startTime: string;
  endTime: string;
  studentName: string;
  studentYear: number;
  subject: string;
}

const SheetRow = ({
  startTime,
  endTime,
  studentName,
  studentYear,
  subject,
}: SheetRowProps) => {
  return (
    <tr>
      <td className="border border-slate-500">{startTime}</td>
      <td className="border border-slate-500">{endTime}</td>
      <td className="border border-slate-500">{studentName}</td>
      <td className="border border-slate-500">{studentYear}</td>
      <td className="border border-slate-500">{subject}</td>
      <td className="border border-slate-500">
        <div className="flex justify-center">
          <button>
            <SquarePen />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SheetRow;
