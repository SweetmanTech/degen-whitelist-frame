import getSchemaEncoder from "./getSchemaEncoder";

const getDecodedAttestationData = (rawData: any) => {
  const schemaEncoder = getSchemaEncoder();
  try {
    const decoded = schemaEncoder.decodeData(rawData);
    return decoded;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getDecodedAttestationData;
