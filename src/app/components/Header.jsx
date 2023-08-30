"use client";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
const navigation = [
  { name: "Trang Chủ", href: "/" },
  { name: "Gây Quỹ", href: "#" },
  { name: "Sách Nói", href: "#" },
  { name: "Cửa Hàng", href: "#" },

  { name: "Về tôi", href: "#" },
  { name: "Liên hệ", href: "#" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useContext(AppContext);

  function handleSignOut() {
    async function signOut() {
      try {
        const sigtout = await axios.get("http://localhost:8000/api/logout");
        setUser(null);
        localStorage.removeItem("user");
        console.log("sign out");
      } catch (error) {
        console.log("sign out error", error);
      }
    }
    signOut();
  }

  return (
    <header className="sticky top-0 shadow-md bg-white ">
      <nav
        className="mx-auto flex  items-center justify-between gap-x-6 p-4 lg:px-8 "
        aria-label="Global"
      >
        <div className="flex lg:flex-1 ">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        {user ? (
          <div className="flex flex-1 items-center justify-end gap-x-6">
            {/* desktop Profile & Sign out */}
            {user.role === "admin" ? (
              <Link
                href="/admin"
                className="hidden lg:block lg:text-base lg:font-semibold lg:leading-6 lg:text-gray-900"
              >
                Admin
              </Link>
            ) : (
              ""
            )}
            <Link
              href="/profile"
              className="hidden lg:block lg:text-base lg:font-semibold lg:leading-6 lg:text-gray-900"
            >
              {user.name}
            </Link>
            <p
              onClick={handleSignOut}
              className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Sign out
            </p>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-end gap-x-6">
            {/* desktop Login & Sign up */}
            <Link
              href="/login"
              className="hidden lg:block lg:text-base lg:font-semibold lg:leading-6 lg:text-gray-900"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </Link>
          </div>
        )}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <Link
              href="/register"
              className="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
