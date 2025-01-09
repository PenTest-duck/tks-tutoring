"use client";

import { SUBJECTS } from "@/constants";
import { dateTo24HrTime } from "@/utils/helpers/time";
import { createClient } from "@/utils/supabase/client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface AddRecordModalProps {
  sheetId: string;
}

const AddRecordModal = ({ sheetId }: AddRecordModalProps) => {
  const supabase = createClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState(dateTo24HrTime(new Date()));
  const [endTime, setEndTime] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentYear, setStudentYear] = useState("");
  const [subject, setSubject] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const resetState = () => {
    setStartTime(dateTo24HrTime(new Date()));
    setEndTime("");
    setStudentName("");
    setStudentYear("");
    setSubject("");
  };

  const openModal = () => {
    resetState();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetState();
  };

  const handleAdd = () => {
    setIsLoading(true);
    supabase
      .from("records")
      .insert([
        {
          sheet_id: sheetId,
          start_time: startTime,
          end_time: endTime || null,
          student_name: studentName,
          student_year: parseInt(studentYear),
          subject_area: subject,
          signature: "",
        },
      ])
      .then(({ error }) => {
        setIsLoading(false);
        if (error) {
          setError(error.message);
          return;
        }

        closeModal();
      });
  };

  useEffect(() => {
    if (startTime && studentName && studentYear && subject) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  }, [startTime, studentName, studentYear, subject]);

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded"
      >
        Add record
      </button>

      {isModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white dark:bg-gray-800 p-6 border rounded-lg w-full md:w-auto md:min-w-[500px]">
            <h2 className="text-center text-lg font-bold mb-4">
              Add new record
            </h2>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-row space-x-4">
                <div className="w-full">
                  <label
                    htmlFor="start-time-input"
                    className="block text-sm font-medium mb-2 dark:text-white"
                  >
                    Start time
                  </label>
                  <input
                    type="time"
                    id="start-time-input"
                    className="w-full p-2 rounded-lg border border-gray-200 dark:border-neutral-700"
                    placeholder="Start time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                {/* <div className="w-1/2">
                  <label
                    htmlFor="end-time-input"
                    className="block text-sm font-medium mb-2 dark:text-white"
                  >
                    End time
                  </label>
                  <input
                    type="time"
                    id="end-time-input"
                    className="w-full p-2 rounded-lg border border-gray-200 dark:border-neutral-700"
                    placeholder="End time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div> */}
              </div>

              <div className="flex flex-row justify-between space-x-4">
                <div className="w-full">
                  <label
                    htmlFor="name-input"
                    className="block text-sm font-medium mb-2 dark:text-white"
                  >
                    Student&apos;s name
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label
                    htmlFor="year-input"
                    className="block text-sm font-medium mb-2 dark:text-white"
                  >
                    Year
                  </label>
                  <select
                    id="year-input"
                    className="py-3 px-4 pe-9 block w-18 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    value={studentYear}
                    onChange={(e) => setStudentYear(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject-input"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Subject / area
                </label>
                <select
                  id="subject-input"
                  className="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                >
                  <option value=""></option>
                  {SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center mt-4">
              <p className="text-xs text-gray-400">
                End time will be filled when the student signs off.
              </p>
              <div>
                <button onClick={closeModal} className="px-4 py-2">
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-primary-600 disabled:bg-primary-300 text-white rounded"
                  disabled={!isValidated}
                >
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            </div>
            {error && <p className="mt-2 text-center text-error">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default AddRecordModal;
