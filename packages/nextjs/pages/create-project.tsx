import { useState } from "react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CreateProject: NextPage = () => {
  // State for each field in the struct
  const [co2OffsetPlanned, setCo2OffsetPlanned] = useState(0);
  const [tokenAmountRequired, setTokenAmountRequired] = useState(0);
  const [regionalCode, setRegionalCode] = useState(0);
  const [category, setCategory] = useState(0);
  const [isProjectOpen, setIsProjectOpen] = useState(true);
  const [metadataProject, setMetadataProject] = useState("");

  const climateChangeCategories = [
    "General Fund Green Energy",
    "Renewable Energy Projects",
    "Reforestation and Afforestation",
    "Ocean Conservation",
    "Wildlife Protection and Biodiversity",
    "Sustainable Agriculture and Food Systems",
    "Urban Greening and Sustainable Cities",
    "Carbon Capture and Storage Technologies",
    "Environmental Education and Awareness",
    "Climate Resilience and Adaptation Projects",
    "Pollution Reduction and Waste Management",
  ];

  // Setup contract write hook
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "WorldBoatProtocol",
    functionName: "createProject",
    // eslint-disable-next-line prettier/prettier
     args: [
      // Assuming your contract expects the project data in this format
      BigInt(100),
      BigInt(100),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      "hello",
    ],
    value: 0n,
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const projectData = {
      co2OffsetPlanned,
      tokenAmountRequired,
      regionalCode,
      category,
      isProjectOpen,
      metadataProject,
    };

    console.log("Project Data:", projectData);

    try {
      const txnResponse = await writeAsync({
        args: [
          // Assuming your contract expects the project data in this format
          BigInt(co2OffsetPlanned),
          BigInt(tokenAmountRequired),
          BigInt(regionalCode),
          BigInt(category),
          BigInt(isProjectOpen),
          metadataProject,
        ],
      });
      console.log("Transaction Response:", txnResponse);
    } catch (error) {
      console.error("Transaction Error:", error);
    }
  };

  return (
    <>
      <MetaHeader title="Create Climate Action Project" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl text-center mb-6">Create a New Project</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          {/* CO2 Offset Planned */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">CO2 Offset Planned in Metric Tons</label>
            <input
              type="number"
              value={co2OffsetPlanned}
              onChange={e => setCo2OffsetPlanned(parseInt(e.target.value))}
              className="input w-full mt-1"
            />
          </div>

          {/* Token Amount Required */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Cost per Metric Ton</label>
            <input
              type="number"
              value={tokenAmountRequired}
              onChange={e => setTokenAmountRequired(parseInt(e.target.value))}
              className="input w-full mt-1"
            />
          </div>

          {/* Regional Code */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <select
              value={regionalCode}
              onChange={e => setRegionalCode(parseInt(e.target.value))}
              className="block w-full mt-1"
            >
              <option value="Global">Global</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
          {/* Category */}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={e => setCategory(parseInt(e.target.value))}
              className="block w-full mt-1"
            >
              {climateChangeCategories.map((cat, index) => (
                <option key={index} value={index}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {/* Is Project Open */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Is it a Global Fund Project?</label>
            <select
              value={isProjectOpen}
              onChange={e => setIsProjectOpen(e.target.value === "true")}
              className="block w-full mt-1"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Is Project Open */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Have you been verified already?</label>
            <select
              value={isProjectOpen}
              onChange={e => setIsProjectOpen(e.target.value === "true")}
              className="block w-full mt-1"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Metadata Project */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description of your Project</label>
            <input
              type="text"
              value={metadataProject}
              onChange={e => setMetadataProject(e.target.value)}
              className="input w-full mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
