"use client";

import { dateTo24HrTime } from "@/utils/helpers/time";
import { createClient } from "@/utils/supabase/client";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddSheetModal = () => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const getDefaultStartTime = () => dateTo24HrTime(new Date()); // getCurrentRoundedHour());
  // const getDefaultEndTime = () => {
  //   const roundedHour = getCurrentRoundedHour();
  //   roundedHour.setHours(roundedHour.getHours() + 3);
  //   return dateTo24HrTime(roundedHour);
  // };

  const router = useRouter();
  const supabase = createClient();
  const [date, setDate] = useState(getTodayDate());
  const [startTime, setStartTime] = useState(getDefaultStartTime());
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const resetState = () => {
    setDate(getTodayDate());
    setStartTime(getDefaultStartTime());
    setEndTime("");
    setLocation("");
    setIsValidated(false);
    setIsLoading(false);
    setError("");
  };

  const openModal = () => {
    resetState();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    resetState();
  };

  const handleCreate = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      setIsLoading(false);
      setError(error.message);
      return;
    }

    supabase
      .from("sheets")
      .insert([
        {
          date,
          start_time: startTime,
          end_time: endTime || null,
          location,
          user_id: data.session?.user.id,
        },
      ])
      .select("id")
      .then(({ data, error }) => {
        setIsLoading(false);
        if (error) {
          setError(error.message);
          return;
        }

        closeModal();
        router.push(`/sheets/${data[0].id}`);
      });
  };

  useEffect(() => {
    if (date && startTime && location) {
      // && endTime
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  }, [date, startTime, location]);

  return (
    <>
      <button
        onClick={openModal}
        className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded"
      >
        Create new sheet
      </button>

      {isOpen && (
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
                    required
                  />
                </div> */}
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
                  <option value="">Select location</option>
                  <option>Baker Hake</option>
                  <option>Bishop Barker Harris</option>
                  <option>Broughton Forrest</option>
                  <option>Macarthur Waddy</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center mt-4">
              <p className="text-xs text-gray-400">
                End time will be filled when you finish the shift.
              </p>
              <div>
                <button onClick={closeModal} className="px-4 py-2">
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-primary-600 disabled:bg-primary-300 text-white rounded"
                  disabled={!isValidated}
                >
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Create"
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

export default AddSheetModal;
