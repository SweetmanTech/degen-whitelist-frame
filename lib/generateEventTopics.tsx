import { encodeEventTopics, parseAbiItem, zeroAddress } from "viem";
import { easAbi } from "./abi/eas";
import { getPublicClient } from "./clients";
import { baseSepolia } from "viem/chains";

const getEventTopics = () => {
  const topics = encodeEventTopics({
    abi: easAbi,
    eventName: "Attested",
    args: {
      attester: "0x35ce1fb8caa3758190ac65edbcbc9647b8800e8f",
    },
  });

  return topics;
};

export default getEventTopics;
