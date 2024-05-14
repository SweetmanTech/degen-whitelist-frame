/** @jsxImportSource frog/jsx */

import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { getFarcasterUserAddress } from "@coinbase/onchainkit/farcaster";
import { getProfileInfo } from "@/lib/airstack/getProfileInfo";
import { Address } from "viem";
import { getAddressChannels } from "@/lib/airstack/getAddressChannels";
import { VERCEL_URL } from "@/lib/consts";
import { getChannelMembers } from "@/lib/airstack/getChannelMembers";
import getCast from "@/lib/neynar/getCast";
import getFidCommentsFromDirectReplies from "@/lib/getFidCommentsFromDirectReplies";
import getCastConversation from "@/lib/neynar/getCastConversation";
import includesDegenComment from "@/lib/includesDegenComment";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
});

app.frame("/", async (c) => c.res(getHomeFrame()));

app.frame("/verify", async (c) => {
  console.log("Verifying...");
  const { frameData } = c;
  console.log("get fid from frameData", frameData);
  const { castId, fid } = frameData as any;
  const { hash } = castId;
  console.log("get cast hash", frameData);
  console.log("get cast from hash", hash);
  const rawConversation = await getCastConversation(hash);
  console.log("get comments from cast", rawConversation);
  const comments = getFidCommentsFromDirectReplies(
    rawConversation.direct_replies,
    fid
  );

  console.log("get sufficient tip casts from comments", comments);
  const hasTippedDegen = includesDegenComment(comments);
  console.log("hasTippedDegen", hasTippedDegen);
  return c.res(getVerifyFrame(hasTippedDegen));
});

app.frame("/fid/:fid", async (c) => {
  const fid = parseInt(c.req.param("fid"), 10);
  const { avatar, name, bio, randomChannelNames, nextChannel } =
    await getFidParams(fid);
  const channelMemberResponse = await getChannelMembers(
    nextChannel?.channelId || "sonata"
  );
  const participants =
    channelMemberResponse.data.FarcasterChannelParticipants
      .FarcasterChannelParticipant;
  const nextMember = participants[0];
  const nextFid = nextMember.participantId;
  return c.res(
    getMemberFrame(avatar, fid, name, bio, randomChannelNames, nextFid)
  );
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);

const getFidParams = async (fid: number) => {
  const addresses = await getFarcasterUserAddress(fid);
  const firstAddress = addresses?.verifiedAddresses?.[0] as Address;
  const profiles = await getProfileInfo([firstAddress]);
  const domain = profiles?.data?.Domains?.Domain?.[0];
  const social = profiles?.data?.Socials?.Social;
  const farcasterProfile = social?.find?.(
    (profile: any) => profile.dappName === "farcaster"
  );
  const avatar = domain?.avatar;
  const name = farcasterProfile?.profileName;
  const bio = farcasterProfile?.profileBio;
  const channelResponse = await getAddressChannels(firstAddress);
  const channels =
    channelResponse?.data?.FarcasterChannelParticipants
      ?.FarcasterChannelParticipant;

  const shuffledChannels = channels?.sort?.(() => 0.5 - Math.random()) || [];
  const randomChannelNames = shuffledChannels
    .slice(0, 3)
    .map((channel: any) => `/${channel.channelName}`)
    .join(" ");
  return {
    avatar,
    name,
    bio,
    randomChannelNames,
    nextChannel: shuffledChannels[0],
  };
};

const getMemberFrame = (
  avatar: string,
  fid: number,
  name: string,
  bio: string,
  randomChannelNames: string,
  nextFid: number = fid + 1
) => {
  const postPath = `/fid/${nextFid}`;

  return {
    action: postPath,
    image: `${VERCEL_URL}/giphy.gif`,
    intents: [
      <Button.Redirect location={`https://warpcast.com/${name}`}>
        Follow
      </Button.Redirect>,
      <Button>Next</Button>,
    ],
  };
};

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
