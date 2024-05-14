const fallbackHash = "0x024b63b7b95cf9acf2287b3864ed3e9641b4ac41";

const getCast = async (hash = fallbackHash) => {
  const options = {
    method: "GET",
    headers: { accept: "application/json", api_key: "NEYNAR_API_DOCS" },
  };

  const response = await fetch(
    `https://api.neynar.com/v2/farcaster/cast?identifier=${hash}&type=hash`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.cast)
    .catch((err) => console.error(err));
  console.log(response);
  console.log(response);
  return response;
};

export default getCast;
