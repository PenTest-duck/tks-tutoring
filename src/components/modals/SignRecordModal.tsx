"use client";

import { dateTo24HrTime, formatTimeString } from "@/utils/helpers/time";
import { createClient } from "@/utils/supabase/client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignRecordModal {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  recordId: string;
  studentName: string;
  startTime: string;
  endTime: string | null;
  subject: string;
}

const SignRecordModal = ({
  isOpen,
  setIsOpen,
  recordId,
  studentName,
  startTime,
  endTime,
  subject,
}: SignRecordModal) => {
  const supabase = createClient();
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [currentTime, setCurrentTime] = useState("");

  const handleSave = () => {
    if (!sigCanvas.current) return;
    const signatureDataUrl = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    supabase
      .from("records")
      .update({ signature: signatureDataUrl, end_time: currentTime })
      .eq("id", recordId)
      .then(() => {
        setIsOpen(false);
      });
  };

  useEffect(() => {
    setCurrentTime(dateTo24HrTime(new Date()));
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 border rounded-lg w-full md:w-auto md:min-w-[500px]">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold">Sign off - {studentName}</h2>
          <p>
            {formatTimeString(startTime)} -{" "}
            {endTime
              ? formatTimeString(endTime)
              : formatTimeString(currentTime)}
            , {subject}
          </p>
        </div>

        <div className="border rounded-lg">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{ width: 500, height: 200 }}
          />
        </div>
        <div className="flex flex-row justify-end mt-4">
          <button onClick={() => setIsOpen(false)} className="px-4 py-2">
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
  );
};

export default SignRecordModal;
