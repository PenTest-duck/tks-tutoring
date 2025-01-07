"use client";

import { SUBJECTS } from "@/lib/constants";
import { dateTo24HrTime } from "@/utils/helpers/time";
import { useState } from "react";

const AddRecordModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [startTime, setStartTime] = useState(dateTo24HrTime(new Date()));
  const [endTime, setEndTime] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");

  const resetState = () => {
    setStartTime(dateTo24HrTime(new Date()));
    setEndTime("");
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
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded"
      >
        Add new record
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
                <div className="w-1/2">
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
                <div className="w-1/2">
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
                </div>
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
                    required
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
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  >
                    <option></option>
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
                  <option></option>
                  {SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-row justify-end mt-4">
              <button onClick={closeModal} className="px-4 py-2">
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-primary-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddRecordModal;
