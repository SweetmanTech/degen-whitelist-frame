/** @jsxImportSource frog/jsx */

import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { MINIMUM_DEGEN_TIP, FRAME_URL } from "@/lib/consts";
import getFidCommentsFromDirectReplies from "@/lib/getFidCommentsFromDirectReplies";
import getCastConversation from "@/lib/neynar/getCastConversation";
import getDegenTipAmount from "@/lib/getDegenTipAmount";
import attest from "@/lib/attest";
import getEncodedAttestationData from "@/lib/getEncodedAttestationData";
import getAttestArgs from "@/lib/getAttestArgs";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
});

app.frame("/", async (c) => c.res(getHomeFrame()));

app.frame("/verify", async (c) => {
  const { frameData } = c;
  const { castId, fid } = frameData as any;
  const { hash } = castId;
  const rawConversation = await getCastConversation(hash);
  const comments = getFidCommentsFromDirectReplies(
    rawConversation.direct_replies,
    fid
  );
  const tip = getDegenTipAmount(comments);
  const hasTippedDegen = tip >= MINIMUM_DEGEN_TIP;
  let successfulAttest = false;
  if (hasTippedDegen) {
    const encodedData = getEncodedAttestationData(fid, hash, tip);
    const args = getAttestArgs(encodedData);
    successfulAttest = Boolean(await attest(args));
  }
  return c.res(getVerifyFrame(successfulAttest));
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);

const getHomeFrame = () => ({
  action: "/verify",
  image: `${FRAME_URL}/images/home.png`,
  imageAspectRatio: "1:1" as any,
  intents: [
    <Button>Join Whitelist</Button>,
    <Button.Redirect location={`https://warpcast.com/newtroarts`}>
      Follow
    </Button.Redirect>,
  ],
});

const getVerifyFrame = (hasTippedDegen: boolean) => {
  const intents = [
    hasTippedDegen ? (
      <Button.Redirect
        location={`https://warpcast.com/~/compose?text=I+am+whitelisted!!!&embeds%5B%5D=https://degen-whitelist-frame.vercel.app/api`}
      >
        Share
      </Button.Redirect>
    ) : (
      <Button>Check Again</Button>
    ),
    <Button.Redirect location={`https://warpcast.com/newtroarts`}>
      Follow
    </Button.Redirect>,
  ];
  const response = {
    image: `${FRAME_URL}/images/${
      hasTippedDegen ? "success.png" : "requirements.png"
    }`,
    imageAspectRatio: "1:1" as any,
    intents,
  } as any;

  if (!hasTippedDegen) {
    response.action = "/verify";
  }
  return response;
};
