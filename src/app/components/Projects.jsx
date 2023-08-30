"use client";
import React from "react";
import ProjectCard from "./ProjectCard";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
const Projects = () => {
  const { projectList } = useContext(AppContext);
  return (
    <div className="p-8">
      {projectList?.map((item, index) => (
        <ProjectCard project={item} key={item.name} />
      ))}
    </div>
  );
};

export default Projects;
