"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home({ params }) {
  const { push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      push("/admin");
    }, 2000);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between py-8 bg-white">
      <div>Login Successfully - will direct to home page..</div>
    </main>
  );
}
