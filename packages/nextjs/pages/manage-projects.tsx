import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useWalletClient } from "wagmi";
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
  const { data: walletClient } = useWalletClient();

  console.log(walletClient);
  const { data: stat } = useScaffoldContractRead({
    contractName: "WorldBoatClimateActions",
    functionName: "getTokenStats",
    args: [1n],
  });

  console.log(stat);

  useEffect(() => {
    // Assuming stat is updated with the contract read
    if (stat) {
      // Transform the stat object to the Token interface
      const tokenData: Token = {
        owner: stat.owner,
        co2OffsetPlanned: stat.co2OffsetPlanned,
        tokenAmountPaid: stat.tokenAmountPaid,
        co2ActuallyOffset: stat.co2ActuallyOffset,
        fundingDateTimestamp: stat.fundingDateTimestamp,
        projectId: stat.projectId,
        regionalCode: stat.regionalCode,
        category: climateChangeCategories[Number(stat.category)] || "Unknown Category",
        openFundingOrClosed: stat.openFundingOrClosed,
        metadataProject: stat.metadataProject,
        tokenId: 1, // Assuming tokenId is 1 for this example
      };
      setTokens([tokenData]);
    }
  }, [stat]);

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
              key={token.tokenId.toString()}
              className="card bg-white shadow-lg rounded-lg p-4"
              onClick={() => toggleCard(token.tokenId)}
            >
              <h2 className="text-xl font-semibold mb-2">Your Contributions: #{token.tokenId.toString()}</h2>
              {expandedTokenId === token.tokenId && (
                <div className="text-left">
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
                    {new Date(Number(token.fundingDateTimestamp * BigInt(1000))).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Project ID:</strong> {token.projectId.toString()}
                  </p>
                  <p>
                    <strong>Regional Code:</strong> {token.regionalCode.toString()}
                  </p>
                  <p>
                    <strong>Category:</strong> {token.category.toString()}
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
