import { baseSepolia } from "viem/chains";
import { getPublicClient } from "../clients";
import getDecodedLog from "../getDecodedLog";
import { easAbi } from "../abi/eas";
import { EAS } from "../consts";

const getAttestations = async (rawEvents: any[]) => {
  const publicClient = getPublicClient(baseSepolia.id);
  const wagmiContract = {
    address: EAS,
    abi: easAbi,
    functionName: "getAttestation",
  } as const;

  // Generate the contracts array for multicall
  const contracts = rawEvents.map((event) => {
    const decoded = getDecodedLog(event) as any;
    return {
      ...wagmiContract,
      args: [decoded?.args?.uid],
    };
  }) as any;

  const results = await publicClient.multicall({ contracts });

  return results;
};

export default getAttestations;
