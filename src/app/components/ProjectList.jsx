import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
const ProjectList = (props) => {
  const { projectList, audiobookList } = useContext(AppContext);
  return (
    <div className="w-full px-4 pt-16 flex flex-col space-y-4">
      <p className="text-xl font-bold">DỰ ÁN</p>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <p className="font-bold">Gây Quỹ</p>

                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              {projectList.map((item, index) => (
                <Disclosure.Panel className=" hover:bg-purple-50 border-b border-gray-300 px-4 pt-4 pb-2 text-sm text-gray-500">
                  <Link href={item._id}>{item.name}</Link>
                </Disclosure.Panel>
              ))}
            </>
          )}
        </Disclosure>
      </div>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <p className="font-bold">Sách Nói</p>

                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              {audiobookList.map((item, index) => (
                <Disclosure.Panel className=" hover:bg-purple-50 border-b border-gray-300 px-4 pt-4 pb-2 text-sm text-gray-500">
                  <Link href={item.bookUrl}>{item.name}</Link>
                </Disclosure.Panel>
              ))}
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default ProjectList;
