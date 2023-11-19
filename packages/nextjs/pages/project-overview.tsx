import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

// Define a TypeScript type for the project
interface Project {
  projectOwner: string;
  co2OffsetPlanned: number;
  tokenAmountRequired: number;
  co2ActuallyOffset: number;
  prizePerTon: string;
  projectRegisteredDateTimestamp: number;
  projectId: number;
  regionalCode: number;
  category: number;
  isProjectOpen: boolean;
  metadataProject: string;
}

// Define the CO2 offsets and their cost
const co2Offsets = [5, 10, 15, 20, 50, 100];
const costPerTon = 10; // Cost per ton in dollars

const ProjectOverview: NextPage = () => {
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [selectedOffsets, setSelectedOffsets] = useState<Record<number, number>>({}); // Holds the selected CO2 offsets for each project

  const mockProjects: Project[] = Array.from({ length: 10 }, (_, i) => ({
    projectOwner: `0xProjectOwner${i}`,
    co2OffsetPlanned: 1000 * (i + 1),
    tokenAmountRequired: 500 * (i + 1),
    co2ActuallyOffset: 800 * (i + 1),
    prizePerTon: `${costPerTon}$`,
    projectRegisteredDateTimestamp: Date.now(),
    projectId: i + 1,
    regionalCode: i % 5,
    category: i % 3,
    isProjectOpen: i % 2 === 0,
    metadataProject: `This is a description of project ${i + 1}.`,
  }));

  // Function to toggle the expanded card
  const toggleCard = (projectId: number) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  // Function to handle CO2 offset selection
  const handleSelectOffset = (projectId: number, offset: number) => {
    setSelectedOffsets({ ...selectedOffsets, [projectId]: offset });
  };

  // Function to calculate the cost for a selected offset
  const calculateCost = (projectId: number) => {
    const offset = selectedOffsets[projectId] || 0;
    return offset * costPerTon;
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
              <div style={{ position: "relative", width: "400px", height: "400px" }}>
                <Image
                  src={`/images/project_${project.projectId}.png`}
                  alt={`Project ${project.projectId}`}
                  layout="fill"
                  style={{ objectFit: "cover" }}
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
                    <div className="flex flex-wrap">
                      {co2Offsets.map(offset => (
                        <button
                          key={offset}
                          onClick={() => handleSelectOffset(project.projectId, offset)}
                          className={`btn btn-xs m-1 ${
                            selectedOffsets[project.projectId] === offset ? "btn-active" : ""
                          }`}
                        >
                          {offset}
                        </button>
                      ))}
                    </div>
                    <p>Selected Offset: {selectedOffsets[project.projectId] || 0} tons</p>
                    <p>Total Cost: ${calculateCost(project.projectId)}</p>
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
