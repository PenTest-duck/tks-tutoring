"use client";

import Sheet from "@/components/Sheet";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const NewSheet = () => {
  return (
    <div className="flex flex-col items-center p-12">
      <div className="self-start">
        <Link
          href="/sheets"
          className="flex flex-row text-primary-600 hover:text-primary-700"
        >
          <ChevronLeft />
          Back to all sheets
        </Link>
      </div>
      <h2 className="text-4xl">New Sheet</h2>
      <p className="mb-12">Macarthur Waddy · 20 Nov 2024 · 7:00pm - 10:00pm</p>

      <Sheet />

      <div className="mt-8 flex flex-row w-full justify-between">
        <button className="bg-pink-500 text-white px-4 py-2 rounded-md">
          Finish shift
        </button>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md">
          Add row
        </button>
      </div>
    </div>
  );
};

export default NewSheet;
