"use client";

import { dateTo24HrTime } from "@/utils/helpers/time";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Sheets = () => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const getCurrentRoundedHour = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    now.setMinutes(0);
    return now;
  };
  const getDefaultStartTime = () => dateTo24HrTime(getCurrentRoundedHour());
  const getDefaultEndTime = () => {
    const roundedHour = getCurrentRoundedHour();
    roundedHour.setHours(roundedHour.getHours() + 3);
    return dateTo24HrTime(roundedHour);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(getTodayDate());
  const [startTime, setStartTime] = useState(getDefaultStartTime());
  const [endTime, setEndTime] = useState(getDefaultEndTime());
  const [location, setLocation] = useState("");
  const router = useRouter();

  const resetState = () => {
    setDate(getTodayDate());
    setStartTime(getDefaultStartTime());
    setEndTime(getDefaultEndTime());
    setLocation("");
  };

  const openModal = () => {
    resetState();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetState();
  };

  const handleCreate = () => {
    router.push(
      `/sheets/new?date=${date}&startTime=${startTime}&endTime=${endTime}&location=${encodeURIComponent(
        location
      )}`
    );
    closeModal();
  };

  return (
    <div className="flex flex-col p-12">
      <div className="flex flex-row items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">All sheets</h2>
        <>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded"
          >
            Create new sheet
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
                  Create new sheet
                </h2>

                <div className="flex flex-col space-y-4">
                  <div>
                    <label
                      htmlFor="date-input"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date-input"
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-neutral-700"
                      min="2024-01-01"
                      max={getTodayDate()}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
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
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="location-input"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      Location
                    </label>
                    <select
                      id="location-input"
                      className="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    >
                      <option>Select location</option>
                      <option>Baker Hake</option>
                      <option>Bishop Barker Harris</option>
                      <option>Broughton Forrest</option>
                      <option>Macarthur Waddy</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-row justify-end mt-4">
                  <button onClick={closeModal} className="px-4 py-2">
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-primary-600 text-white rounded"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      </div>

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border overflow-hidden dark:border-neutral-700 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-gray-50 dark:bg-neutral-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-neutral-200">
                      20 Nov 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                      7:00pm - 10:00pm
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                      Macarthur Waddy
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-bold">
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sheets;
