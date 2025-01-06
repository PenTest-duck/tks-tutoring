"use client";

// import SignaturePad from "react-signature-canvas";
import SheetRow from "@/components/SheetRow";

const NewSheet = () => {
  return (
    <div className="flex flex-col items-center mt-16 p-12">
      <h2 className="text-4xl">New Sheet</h2>
      <p>MAW · 20 Nov 2024 · 7:00 pm - 10:00 pm</p>
      <table className="mt-12 table-auto border-collapse border border-slate-500 w-full">
        <thead>
          <tr>
            <th className="border border-slate-500">Start</th>
            <th className="border border-slate-500">End</th>
            <th className="border border-slate-500">Student&apos;s Name</th>
            <th className="border border-slate-500">Year</th>
            <th className="border border-slate-500">Subject/Area</th>
            <th className="border border-slate-500">
              Student&apos;s Signature
            </th>
          </tr>
        </thead>
        <tbody>
          <SheetRow
            startTime="18:30"
            endTime="19:30"
            studentName="Chris Yoo"
            studentYear={12}
            subject="Maths"
          />
          <SheetRow
            startTime="18:30"
            endTime="20:15"
            studentName="Tommy Maurice"
            studentYear={12}
            subject="Business Studies"
          />
          <SheetRow
            startTime="19:20"
            endTime="22:00"
            studentName="Cooper Pullen"
            studentYear={8}
            subject="English"
          />
          <SheetRow
            startTime="19:30"
            endTime="20:30"
            studentName="Rich Estens"
            studentYear={11}
            subject="TAFE"
          />
        </tbody>
      </table>
      <div className="mt-8 flex flex-row w-full justify-between">
        <button className="bg-pink-500 text-white px-4 py-2 rounded-md">
          Finish shift
        </button>
        <button className="bg-sky-500 text-white px-4 py-2 rounded-md">
          Add Student
        </button>
      </div>
    </div>
  );
};

export default NewSheet;
