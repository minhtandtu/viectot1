"use client";
import Image from "next/image";
import ProjectList from "./components/ProjectList";
import Projects from "./components/Projects";
import FundingInfo from "./components/FundingInfo";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";

const fundingInfor = [
  {
    projectName: "Gây quỹ thực hiện audio book - sách nói Báo Ứng Hiện Đời",
    contributor: {
      name: "19033722673017 - Techcombank",
    },
    amount: 500000,
    message: "Minh Tan ",
  },
  {
    projectName: "Gây quỹ thực hiện audio book - sách nói Báo Ứng Hiện Đời",
    contributor: {
      name: "0221613035 - Vietcombank",
    },
    amount: 500000,
    message: "A di đà phật ",
  },
  {
    projectName: "Gây quỹ thực hiện audio book - sách nói Báo Ứng Hiện Đời",
    contributor: {
      name: "0221613035 - Vietcombank",
    },
    amount: 500000,
    message: "A di đà phật ",
  },
];

export default function Home() {
  const { loading } = useContext(AppContext);
  return (
    <main className="flex flex-col items-center justify-between py-8 bg-white">
      <div className="grid grid-cols-12  px-4 gap-4 w-full">
        {/* Project List */}
        <div className="hidden lg:block col-span-3  rounded shadow-md">
          <ProjectList></ProjectList>
        </div>
        {/* Posts - projects*/}
        <div className="col-span-12 lg:col-span-6  rounded shadow-md">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-4xl font-bold ">Loading...</p>
            </div>
          ) : (
            <Projects></Projects>
          )}
          {/* <Projects></Projects> */}
        </div>
        {/* Funding infor */}
        <div className="hidden lg:block col-span-3  rounded shadow-md">
          <FundingInfo fundingInfor={fundingInfor}></FundingInfo>
        </div>
      </div>
    </main>
  );
}
