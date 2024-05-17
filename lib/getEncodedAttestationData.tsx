import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { zeroAddress } from "viem";

const getEncodedAttestationData = (fid: any, castHash: any, tip: any) => {
  const schemaEncoder = new SchemaEncoder(
    "uint256 fid, string castHash, uint256 tip, address collectionAddress"
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "fid", value: fid, type: "uint256" },
    {
      name: "castHash",
      value: castHash,
      type: "string",
    },
    { name: "tip", value: tip, type: "uint256" },
    { name: "collectionAddress", value: zeroAddress, type: "address" },
  ]);
  return encodedData;
};

export default getEncodedAttestationData;
