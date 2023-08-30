"use client";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useRouter } from "next/navigation";

import CreatePost from "../components/admin/CreatePost";

export default function Home() {
  // const { user } = useContext(AppContext);
  // const { push } = useRouter();

  // if (user?.role !== "admin") {
  //   push("/login");
  // }

  return (
    <main className="flex flex-col items-center justify-between py-8 bg-gradient-to-b from-white to-gray-300/50">
      <div className="min-h-[100vh] w-full ">
        <CreatePost></CreatePost>
      </div>
    </main>
  );
}
