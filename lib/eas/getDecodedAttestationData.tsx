import getSchemaEncoder from "./getSchemaEncoder";

const getDecodedAttestationData = (rawData: any) => {
  const schemaEncoder = getSchemaEncoder();
  try {
    const decoded = schemaEncoder.decodeData(
      "0x000000000000000000000000000000000000000000000000000000000004048400000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000004d00000000000000000000000000000000000000000000000000000000000378d70000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000002a30783065316366303036356531393862346533663462336466323461626164363866646233376432366500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a30783666633839656232373061336537613031633333613033376237356239316136353737643561653400000000000000000000000000000000000000000000"
    );

    console.log("SWEETS decoded", decoded);
    return decoded;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default getDecodedAttestationData;
