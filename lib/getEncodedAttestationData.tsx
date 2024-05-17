import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

const getEncodedAttestationData = (
  fid: any,
  castHash: any,
  tip: any,
  parentFid: any,
  parentCastHash: any
) => {
  const schemaEncoder = new SchemaEncoder(
    "uint256 fid, string castHash, uint256 tip, uint256 parentFid, string parentCastHash"
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "fid", value: fid, type: "uint256" },
    {
      name: "castHash",
      value: castHash,
      type: "string",
    },
    { name: "tip", value: tip, type: "uint256" },
    { name: "parentFid", value: parentFid, type: "uint256" },
    {
      name: "parentCastHash",
      value: parentCastHash,
      type: "string",
    },
  ]);
  return encodedData;
};

export default getEncodedAttestationData;
