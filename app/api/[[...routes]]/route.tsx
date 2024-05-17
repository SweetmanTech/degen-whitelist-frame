/** @jsxImportSource frog/jsx */

import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { VERCEL_URL } from "@/lib/consts";
import getFidCommentsFromDirectReplies from "@/lib/getFidCommentsFromDirectReplies";
import getCastConversation from "@/lib/neynar/getCastConversation";
import includesDegenComment from "@/lib/includesDegenComment";

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
  const hasTippedDegen = includesDegenComment(comments);
  return c.res(getVerifyFrame(hasTippedDegen));
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);

const getHomeFrame = () => ({
  action: "/verify",
  image: `${VERCEL_URL}/images/home.png`,
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
    image: `${VERCEL_URL}/images/${
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
