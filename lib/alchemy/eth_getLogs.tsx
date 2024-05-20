import getAlchemyRpcUrl from "./getAlchemyRpcUrl";
import { baseSepolia } from "viem/chains";

export const ethGetLogs = async () => {
  const endpoint = getAlchemyRpcUrl(baseSepolia.id);

  const payload = {
    id: 1,
    jsonrpc: "2.0",
    method: "eth_getLogs",
    params: [
      {
        address: ["0x4200000000000000000000000000000000000021"],
        fromBlock: "0x99B9DD",
        toBlock: "0x9B0A58",
        topics: [
          "0x8bf46bf4cfd674fa735a3d63ec1c9ad4153f033c290341f3a588b75685141b35",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x00000000000000000000000035ce1fb8caa3758190ac65edbcbc9647b8800e8f",
        ],
      },
    ],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching logs:", error);
    return [];
  }
};
