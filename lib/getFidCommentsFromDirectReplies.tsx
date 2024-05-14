const getFidCommentsFromDirectReplies = (directReplies: any[], fid: number) => {
  return directReplies.filter((reply: any) => reply.author.fid === fid);
};

export default getFidCommentsFromDirectReplies;
