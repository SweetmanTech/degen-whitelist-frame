"use client";

import { ethGetLogs } from "@/lib/alchemy/eth_getLogs";
import getEventTopics from "@/lib/generateEventTopics";
import { useEffect, useState } from "react";

const Attestations = () => {
  const topics = getEventTopics();
  const [rawEvents, setRawEvents] = useState([]);

  // console.log("SWEETS TOPICS", topics);

  useEffect(() => {
    const init = async () => {
      const logs = await ethGetLogs();
      console.log("SWEETS LOGS", logs);
      setRawEvents(logs);
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
      RAW LOGS
      <div id="logs">
        {rawEvents.map((event) => (
          <p>{JSON.stringify(event)}</p>
        ))}
      </div>
    </div>
  );
};

export default Attestations;
