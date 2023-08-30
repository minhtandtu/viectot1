"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
import { AppContext } from "../Context/AppContext";
export default function Home({ params }) {
  const [project, setProject] = useState({});
  const postId = params.id;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    async function getProjectDetail() {
      const url = "http://localhost:8000/api/project/" + postId;
      const response = await axios.get(url);
      setProject(response.data.data);
    }
    getProjectDetail();
    setLoading(false);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between py-8 bg-white">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-4xl font-bold ">Loading...</p>
        </div>
      ) : (
        <ProjectCard project={project}></ProjectCard>
      )}
    </main>
  );
}
