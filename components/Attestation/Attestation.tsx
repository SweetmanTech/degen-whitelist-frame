import { useEffect } from "react";

const Attestation = ({ attestation }: any) => {
  return (
    <div>
      {attestation.map((item, index) => (
        <p key={index}>
          <strong>{item.name}:</strong> {item.value.value.toString()}
        </p>
      ))}
      <hr />
    </div>
  );
};

export default Attestation;
