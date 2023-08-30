"use client";
import Image from "next/image";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState, useEffect } from "react";
import fallbackImage from "../../../public/images/baounghiendoi.jpg";

const ProjectCard = (props) => {
  const { project } = props;
  // const percentage = (
  //   (project.currentMoney / project.totalMoney) *
  //   100
  // ).toFixed(2);
  const percentage = (project.currentMoney / project.totalMoney) * 100;

  const ImageWithFallback = ({
    fallback = fallbackImage,
    alt,
    src,
    ...props
  }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
      setError(null);
    }, [src]);

    return (
      <Image
        alt={alt}
        onError={setError}
        src={error ? fallbackImage : src}
        {...props}
      />
    );
  };

  return (
    <div className="bd shadow-md rounded-xl text-gray-900 my-8 bg-white">
      <div className="flex justify-center  rounded-t-xl overflow-hidden">
        <Image
          src={project.featureImage}
          width={600}
          height={360}
          alt={project.name}
          className="w-full object-cover h-80"
        ></Image>
      </div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="w-1/2 ">
            <p className="text-cyan-600 hover:underline font-semibold text-lg mb-4">
              {project.category}
            </p>
            <div className="flex pb-4">
              <ImageWithFallback
                src={project.author?.avatarUrl}
                width={55}
                height={55}
                alt={project.name}
                className="rounded-full mr-4"
              ></ImageWithFallback>
              <div>
                <p className="font-medium">
                  {project.author?.name || "Author"}
                </p>
                <p className="font-medium text-gray-500">{project.createdAt}</p>
              </div>
            </div>
          </div>
          {/* Money */}
          <div className=" w-1/2 h-full text-base font-semibold">
            <p className="text-cyan-600">Số tiền cần gây quỹ: </p>
            <p>{project.totalMoney} đồng</p>
            <p className="text-cyan-600">Đã quyên góp được: </p>
            <p className="mb-4">{project.currentMoney} đồng</p>

            {/* Percentage */}
            <div className="mb-4">
              <p>Hoàn thành</p>
              {/* percentage bars */}

              <div className="w-full">
                <ProgressBar
                  completed={percentage}
                  bgColor="#2896b2"
                  animateOnRender={true}
                ></ProgressBar>
              </div>
            </div>

            <button
              type="button"
              disabled={
                project.currentMoney === project.totalMoney ? true : false
              }
              className="disabled:bg-purple-300 rounded-full w-full bg-cyan-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {project.currentMoney === project.totalMoney
                ? "Đã hoàn tất!"
                : "Quyên góp"}
            </button>
          </div>
        </div>

        <p className="text-2xl mb-4 font-semibold">{project.name}</p>
        <p>{project.desc}</p>
        {/* Xem them ----> */}

        <div className="w-full">
          <div className="mx-auto w-full">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Panel className="pt-4 pb-2 ">
                    {project.content}
                  </Disclosure.Panel>
                  <Disclosure.Button className="flex mt-3">
                    <span className="font-medium text-cyan-500">
                      Xem chi tiết
                    </span>
                    <ChevronUpIcon
                      className={`${
                        open ? " " : " rotate-180 transform "
                      } h-5 w-5 text-cyan-500`}
                    />
                  </Disclosure.Button>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
