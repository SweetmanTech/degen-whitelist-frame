import { easAbi } from "./abi/eas";
import { CHAIN, EAS as EASContractAddress } from "./consts";
import { whitelistAccount, whitelistClient } from "./clients/whitelistClient";

const attest = async (args: any[]) => {
  try {
    const tx = await whitelistClient.writeContract({
      account: whitelistAccount,
      address: EASContractAddress,
      abi: easAbi,
      chain: CHAIN,
      functionName: "attest",
      args,
    });
    console.log("Transaction successful:", tx);
    return tx;
  } catch (err) {
    console.error("Error during attestation:", err);
    return false;
  }
};

export default attest;
