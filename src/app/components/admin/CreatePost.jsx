"use client";
import { useState, useEffect, useContext } from "react";
import React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Image from "next/image";
import { AppContext } from "@/app/Context/AppContext";
import jwtDecode from "jwt-decode";

const CreatePost = () => {
  const [name, setName] = useState("");
  const [totalMoney, setTotalMoney] = useState(0);
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [featureImage, setFeatureImage] = useState(null);
  const [imageReview, setImageReview] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const data = { name, totalMoney, category, desc, content };
  const { accessToken } = useContext(AppContext);
  console.log("accessToken in create post: ", accessToken);

  // let jwAxios = axios.create();

  // jwAxios.interceptors.request.use(
  //   async (config) => {
  //     const decodedToken = jwtDecode(accessToken);
  //     console.log("decoded Token: ", decodedToken);
  //     let date = new Date();

  //     const refreshingToken = await axios.post(
  //       "http://localhost:8000/api/refresh-token",
  //       { withCredentials: true }
  //     );
  //     console.log("refreshingToken: ", refreshingToken);

  //     config.headers["accessToken"] = refreshingToken.accessToken;
  //     // if (decodedToken.exp < date.getTime() / 1000) {
  //     //   const refreshingToken = await axios.post(
  //     //     "http://localhost:8000/api/refresh-token",
  //     //     { withCredentials: true }
  //     //   );
  //     //   console.log("refreshingToken: ", refreshingToken);
  //     // }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  function handleSubmit(e) {
    e.preventDefault();
    async function fetchData() {
      // try {
      const formData = new FormData();
      formData.append("featureImage", featureImage);
      formData.append("name", name);
      formData.append("totalMoney", totalMoney);
      formData.append("category", category);
      formData.append("desc", desc);
      formData.append("content", content);

      const response = await axios.post(
        "http://localhost:8000/api/createpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${accessToken}`,
          },
        }
      );
      console.log("response in fetching create post ", response);
      // } catch (error) {
      // setErrorMessage("Error in CreatePost: ", error);
      // }
    }
    fetchData();
  }
  function handleSubmit2(e) {
    e.preventDefault();

    async function refreshToken() {
      try {
        const refreshingToken = await axios.post(
          "http://localhost:8000/api/refresh-token",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${accessToken}`,
            },
          },
          { withCredentials: true }
        );
        console.log("accesstoken in refressing Token: ", refreshingToken);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(refreshingToken.data.accessToken)
        );
      } catch (error) {
        console.log("error: ", error);
      }
    }
    refreshToken();
  }
  function onChangeImage(e) {
    setFeatureImage(e.target.files[0]);
    setImageReview();

    const image = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageReview(reader.result);
      }
    };
    reader.readAsDataURL(image);
  }

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 px-4 ">
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit2}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Lưu
        </button>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
        {/* FORM */}

        <form
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          onSubmit={handleSubmit}
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl  grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="project-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên của hoạt động
                </label>
                <textarea
                  id="name"
                  name="name"
                  rows={2}
                  className="px-4 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="total amount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Số tiền cần quyên góp
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="totalMoney"
                    name="totalMoney"
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={0.0}
                    onChange={(e) => setTotalMoney(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thể loại
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option>-- Vui lòng chọn một thể loại --</option>

                    <option>Hoạt động gây quỹ</option>
                    <option>Hoạt động thiện nguyện</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mô tả
                </label>
                <div className="mt-2">
                  <textarea
                    id="desciption"
                    name="desciption"
                    rows={4}
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Thông tin ngắn gọn về dự án/hoạt động.
                </p>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thông tin chi tiết
                </label>
                <div className="mt-2">
                  <textarea
                    id="content"
                    name="content"
                    rows={10}
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Thông tin chi tiết về dự án.
                </p>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="feature-image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ảnh minh họa
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Tải ảnh lên</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={onChangeImage}
                        />
                        {imageReview && (
                          <Image
                            src={imageReview}
                            width={300}
                            height={300}
                            className="object-cover"
                            alt={imageReview}
                          ></Image>
                        )}
                      </label>
                      <p className="pl-1">hoặc kéo thả vào đây</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
      <div>
        {errorMessage && (
          <div className="text-3xl font-medium text-red-500">
            {errorMessage}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
