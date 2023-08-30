"use client";
import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [projectList, setProjectList] = useState([{}]);
  const [audiobookList, setAudiobookList] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    setLoading(true);

    var userLocalStorage = localStorage.getItem("user");
    var userLocalStorageParsered = JSON.parse(userLocalStorage);
    setUser(userLocalStorageParsered);

    var accessTokenInStorage = localStorage.getItem("accessToken");
    var accessTokenParsered = JSON.parse(accessTokenInStorage);
    setAccessToken(accessTokenParsered);

    async function getAllProject() {
      const baseUrl = process.env.BASE_URL;
      const url = "http://localhost:8000/api/project";
      const response = await axios.get(url);
      setProjectList(response.data.data);
      setLoading(false);
    }
    async function getAllAudiobook() {
      const baseUrl = process.env.BASE_URL;
      const url = "http://localhost:8000/api/audiobook";
      const response = await axios.get(url);
      setAudiobookList(response.data.data);
    }
    getAllProject();
    getAllAudiobook();
  }, []);

  return (
    <AppContext.Provider
      value={{
        projectList,
        loading,
        setLoading,
        audiobookList,
        user,
        setUser,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
