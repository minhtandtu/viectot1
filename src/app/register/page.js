"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Register from "../components/Register";
export default function Home({ params }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    setLoading(false);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between py-8 bg-white">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-4xl font-bold ">Loading...</p>
        </div>
      ) : (
        <Register></Register>
      )}
    </main>
  );
}
