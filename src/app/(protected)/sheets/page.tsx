"use client";

import TableSkeleton from "@/components/preline/TableSkeleton";
import SheetRow from "@/components/SheetRow";
import { dateTo24HrTime } from "@/utils/helpers/time";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/utils/types/supabase";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  const router = useRouter();
  const supabase = createClient();

  // All sheets
  const [sheets, setSheets] = useState<Tables<"sheets">[]>([]);
  const [sheetsIsLoading, setSheetsIsLoading] = useState(true);
  const [sheetsError, setSheetsError] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(getTodayDate());
  const [startTime, setStartTime] = useState(getDefaultStartTime());
  const [endTime, setEndTime] = useState(getDefaultEndTime());
  const [location, setLocation] = useState("");
  const [modalValidation, setModalValidation] = useState(false);
  const [modalIsLoading, setModalIsLoading] = useState(false);
  const [modalError, setModalError] = useState("");

  const resetState = () => {
    setDate(getTodayDate());
    setStartTime(getDefaultStartTime());
    setEndTime(getDefaultEndTime());
    setLocation("");
    setModalValidation(false);
    setModalIsLoading(false);
    setModalError("");
  };

  const openModal = () => {
    resetState();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetState();
  };

  const handleCreate = async () => {
    setModalIsLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      setModalIsLoading(false);
      setModalError(error.message);
      return;
    }

    supabase
      .from("sheets")
      .insert([
        {
          date,
          start_time: startTime,
          end_time: endTime,
          location,
          user_id: data.session?.user.id,
        },
      ])
      .select("id")
      .then(({ data, error }) => {
        setModalIsLoading(false);
        if (error) {
          setSheetsError(error.message);
          return;
        }

        closeModal();
        router.push(`/sheets/${data[0].id}`);
      });
  };

  useEffect(() => {
    const fetchSheets = async () => {
      setSheetsIsLoading(true);
      const { data, error } = await supabase
        .from("sheets")
        .select("*")
        .order("date", { ascending: false })
        .order("start_time", { ascending: false })
        .order("end_time", { ascending: false })
        .limit(10);
      setSheetsIsLoading(false);
      if (error) {
        setSheetsError(error.message);
        return;
      }

      setSheets(data);
    };

    fetchSheets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (date && startTime && endTime && location) {
      setModalValidation(true);
    } else {
      setModalValidation(false);
    }
  }, [date, startTime, endTime, location]);

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
                    className="px-4 py-2 bg-primary-600 disabled:bg-primary-500 text-white rounded"
                    disabled={!modalValidation}
                  >
                    {modalIsLoading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Create"
                    )}
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
                  {sheetsIsLoading ? (
                    <TableSkeleton colSpan={4} />
                  ) : sheetsError ? (
                    <tr>
                      <td colSpan={4}>
                        <p className="text-center p-4 text-error">
                          {sheetsError}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    sheets.map((sheet) => (
                      <SheetRow
                        key={sheet.id}
                        id={sheet.id}
                        date={sheet.date}
                        startTime={sheet.start_time}
                        endTime={sheet.end_time}
                        location={sheet.location}
                      />
                    ))
                  )}
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
