import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const imageContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "400px",
  height: "400px",
};

const imageStyle: React.CSSProperties = {
  objectFit: "cover",
};

// Mock Data for CO2OffsetProjects
const mockProjects = Array.from({ length: 10 }, (_, i) => ({
  projectOwner: `0xProjectOwner${i}`,
  co2OffsetPlanned: 1000 * (i + 1),
  tokenAmountRequired: 500 * (i + 1),
  co2ActuallyOffset: 800 * (i + 1),
  prizePerTon: "10$",
  projectRegisteredDateTimestamp: Date.now(),
  projectId: i + 1,
  regionalCode: i % 5,
  category: i % 3,
  isProjectOpen: i % 2 === 0,
  metadataProject: `This is a description of project ${i + 1}.`,
}));

const ProjectOverview: NextPage = () => {
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

  const toggleCard = (projectId: number) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  return (
    <>
      <MetaHeader title="Project Overview | WorldBoat Protocol" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl text-center mb-6">Climate Change Projects Overview</h1>
        <div className="flex overflow-x-auto gap-4">
          {mockProjects.map(project => (
            <div
              key={project.projectId}
              className={`feature-bo-x card ${expandedProjectId === project.projectId ? "expanded" : ""}`}
              onClick={() => toggleCard(project.projectId)}
            >
              <div style={imageContainerStyle}>
                <Image
                  src={`/images/project_${project.projectId}.png`}
                  alt={`Project ${project.projectId}`}
                  layout="fill"
                  style={imageStyle}
                />
              </div>
              <div className="p-4">
                <h2>Project #{project.projectId}</h2>
                <p>{project.metadataProject}</p>
                {expandedProjectId === project.projectId && (
                  <div>
                    <p>CO2 Offset Planned: {project.co2OffsetPlanned}</p>
                    <p>CO2 Actually Offset: {project.co2ActuallyOffset}</p>
                    <p>Cost Per Ton: {project.prizePerTon}</p>
                    <button className="btn btn-primary mt-2">Contribute</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectOverview;
