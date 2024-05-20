"use client";

import { ethGetLogs } from "@/lib/alchemy/eth_getLogs";
import getEventTopics from "@/lib/generateEventTopics";
import { useEffect, useState } from "react";
import Attestation from "../Attestation";
import getAttestations from "@/lib/eas/getAttestations";
import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";

const Attestations = () => {
  const topics = getEventTopics();
  const [rawEvents, setRawEvents] = useState([]);
  const [attestations, setAttestations] = useState([]);

  useEffect(() => {
    const init = async () => {
      const logs = await ethGetLogs();
      setRawEvents(logs);
      const response = await getAttestations(logs);
      console.log("SWEETS ATTESTATIONS", response);
      const decodedAttestations = response.map((attestation) =>
        getDecodedAttestationData(attestation.result[9])
      );
      setAttestations(decodedAttestations);
      console.log("SWEETS DECODED ATTESTATIONS", decodedAttestations);
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
