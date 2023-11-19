import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface Token {
  owner: string;
  co2OffsetPlanned: bigint;
  tokenAmountPaid: bigint;
  co2ActuallyOffset: bigint;
  fundingDateTimestamp: bigint;
  projectId: bigint;
  regionalCode: bigint;
  category: string;
  openFundingOrClosed: boolean;
  metadataProject: string;
  tokenId: number;
}

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

const ERC721TokensOverview: NextPage = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [expandedTokenId, setExpandedTokenId] = useState<number | null>(null);

  const readContracts = Array.from({ length: 3 }, (_, i) =>
    useScaffoldContractRead({
      contractName: "WorldBoatClimateActions",
      functionName: "getTokenStats",
      args: [BigInt(i + 1)],
    }),
  );

  useEffect(() => {
    const newTokens = readContracts
      .map((contract, index) => {
        const data = contract.data;
        if (data) {
          return {
            owner: data.owner,
            co2OffsetPlanned: data.co2OffsetPlanned,
            tokenAmountPaid: data.tokenAmountPaid,
            co2ActuallyOffset: data.co2ActuallyOffset,
            fundingDateTimestamp: data.fundingDateTimestamp,
            projectId: data.projectId,
            regionalCode: data.regionalCode,
            category: climateChangeCategories[Number(data.category)] || "Unknown Category",
            openFundingOrClosed: data.openFundingOrClosed,
            metadataProject: data.metadataProject,
            tokenId: index + 1,
          };
        }
        return null;
      })
      .filter(Boolean);

    setTokens(newTokens);
  }, [readContracts]);

  const toggleCard = (tokenId: number) => {
    setExpandedTokenId(expandedTokenId === tokenId ? null : tokenId);
  };

  return (
    <>
      <MetaHeader title="ERC721 Tokens Overview" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl text-center mb-6">Your ERC721 Tokens</h1>
        <div className="flex overflow-x-auto gap-4">
          {tokens.map(token => (
            <div
              key={token.tokenId}
              onClick={() => toggleCard(token.tokenId)}
              className={`card ${expandedTokenId === token.tokenId ? "expanded" : ""}`}
            >
              <h2>Token #{token.tokenId}</h2>
              {expandedTokenId === token.tokenId && (
                <div className="text-left p-4">
                  <p>
                    <strong>Owner:</strong> {token.owner}
                  </p>
                  <p>
                    <strong>CO2 Offset Planned:</strong> {token.co2OffsetPlanned.toString()}
                  </p>
                  <p>
                    <strong>Token Amount Paid:</strong> {token.tokenAmountPaid.toString()}
                  </p>
                  <p>
                    <strong>CO2 Actually Offset:</strong> {token.co2ActuallyOffset.toString()}
                  </p>
                  <p>
                    <strong>Funding Date:</strong>{" "}
                    {new Date(Number(token.fundingDateTimestamp) * 1000).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Project ID:</strong> {token.projectId.toString()}
                  </p>
                  <p>
                    <strong>Regional Code:</strong> {token.regionalCode.toString()}
                  </p>
                  <p>
                    <strong>Category:</strong> {token.category}
                  </p>
                  <p>
                    <strong>Project Status:</strong> {token.openFundingOrClosed ? "Open" : "Closed"}
                  </p>
                  <p>
                    <strong>Project Description:</strong> {token.metadataProject}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ERC721TokensOverview;
