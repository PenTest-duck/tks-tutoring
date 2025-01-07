"use client";

import { SquarePen } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

interface SheetRowProps {
  startTime: string;
  endTime: string;
  studentName: string;
  studentYear: number;
  subject: string;
  signatureDataUrl?: string;
}

const SheetRow = ({
  startTime,
  endTime,
  studentName,
  studentYear,
  subject,
  signatureDataUrl: signatureDataUrl = "",
}: SheetRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signature, setSignature] = useState<string>(signatureDataUrl);
  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleSave = () => {
    if (!sigCanvas.current) return;
    setSignature(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    setIsModalOpen(false);
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {startTime}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {endTime}
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
              className="hover:text-blue-600 transition-colors"
            >
              <SquarePen />
            </button>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <h2 className="text-lg font-bold">
                    Sign off - {studentName}
                  </h2>
                  <p>
                    {startTime} - {endTime}, {subject}
                  </p>
                </div>

                <div className="border rounded-lg">
                  <SignatureCanvas
                    ref={sigCanvas}
                    canvasProps={{ width: 500, height: 200 }}
                  />
                </div>
                <div className="flex flex-row justify-end mt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      </td>
    </tr>
  );
};

export default SheetRow;
