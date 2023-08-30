"use client";
import Image from "next/image";

export default function Home({ children }) {
  return (
    <main className="flex flex-col items-center justify-between py-8 bg-white">
      <div className="grid grid-cols-12  px-4 gap-4 w-full">
        {/* Project List */}
        <div className="hidden lg:block col-span-3  rounded shadow-md"></div>
        {/* Posts - projects*/}
        <div className="col-span-12 lg:col-span-6  rounded shadow-md">
          {children}
        </div>
        {/* Funding infor */}
        <div className="hidden lg:block col-span-3  rounded shadow-md"></div>
      </div>
    </main>
  );
}
