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
  image: `${VERCEL_URL}/images/giphy.gif`,
  intents: [
    <Button>Join Whitelist</Button>,
    <Button.Redirect location={`https://warpcast.com/newtroarts`}>
      Follow
    </Button.Redirect>,
  ],
});

const getVerifyFrame = (hasTippedDegen: boolean) => ({
  action: "/",
  image: `${VERCEL_URL}/images/${
    hasTippedDegen ? "unlock.gif" : "insert-token.gif"
  }`,
  intents: [
    <Button>Check Again</Button>,
    <Button.Redirect location={`https://warpcast.com/newtroarts`}>
      Follow
    </Button.Redirect>,
  ],
});
