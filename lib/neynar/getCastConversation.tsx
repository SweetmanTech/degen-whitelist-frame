const fallbackHash = "0x024b63b7b95cf9acf2287b3864ed3e9641b4ac41";

const getCastConversation = async (hash = fallbackHash) => {
  const options = {
    method: "GET",
    headers: { accept: "application/json", api_key: "NEYNAR_API_DOCS" },
  };

  const response = await fetch(
    `https://api.neynar.com/v2/farcaster/cast/conversation?identifier=${hash}&type=hash&reply_depth=2&include_chronological_parent_casts=false`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.conversation.cast)
    .catch((err) => console.error(err));
  console.log(response);
  console.log(response);
  return response;
};

export default getCastConversation;
