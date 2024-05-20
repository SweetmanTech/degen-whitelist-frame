"use client";

import { ethGetLogs } from "@/lib/alchemy/eth_getLogs";
import getEventTopics from "@/lib/generateEventTopics";
import { useEffect, useState } from "react";
import Attestation from "../Attestation";
import getAttestations from "@/lib/eas/getAttestations";
import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";

const Attestations = () => {
  const topics = getEventTopics();
  const [attestations, setAttestations] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const logs = await ethGetLogs();
      const response = await getAttestations(logs);
      const decodedAttestations = response
        .map((attestation: any) =>
          getDecodedAttestationData(attestation.result[9])
        )
        .filter((attestation: any) => attestation !== false);
      setAttestations(decodedAttestations as any);
    };
    init();
  }, []);

  return (
    <div>
      TOPICS
      <div>
        {topics.map((topic) => (
          <p>{JSON.stringify(topic)}</p>
        ))}
      </div>
      ATTESTATIONS ({attestations.length})
      <div id="logs">
        {attestations.map((attestation) => (
          <Attestation attestation={attestation} />
        ))}
      </div>
    </div>
  );
};

export default Attestations;
