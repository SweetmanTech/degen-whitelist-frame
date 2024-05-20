import { useEffect, useState } from "react";

const Attestation = ({ attestation }: any) => {
  const [allowance, setAllowance] = useState(null);
  const fid = attestation
    .find((item: any) => item.name === "fid")
    ?.value.value.toString();

  useEffect(() => {
    const fetchAllowance = async () => {
      try {
        console.log("SWEETS GETTING ALLOWANCE", fid);

        const response = await fetch(`/api/degen?fid=${fid}`);
        const data = await response.json();
        console.log("SWEETS ALLOWANCE", data);
        setAllowance(data[0]);
      } catch (error) {
        console.error("Error fetching allowance:", error);
      }
    };

    if (fid) {
      fetchAllowance();
    }
  }, [fid]);

  return (
    <div>
      <p>
        <strong>wallet:</strong> {allowance?.wallet_address}
      </p>
      <p>
        <strong>allowance:</strong> {allowance?.tip_allowance}
      </p>
      {attestation.map((item: any, index: number) => (
        <p key={index}>
          <strong>{item.name}:</strong> {item.value.value.toString()}
        </p>
      ))}
      <hr />
    </div>
  );
};

export default Attestation;
