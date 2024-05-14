import { MINIMUM_DEGEN_TIP } from "./consts";

const includesDegenComment = (comments: any[]) => {
  let maxDegen = 0;

  comments.forEach((comment) => {
    const matches = comment.text.match(/(\d+)\s*\$DEGEN/);
    if (matches && matches[1]) {
      const degenAmount = parseInt(matches[1], 10);
      if (degenAmount > maxDegen) {
        maxDegen = degenAmount;
      }
    }
  });

  return maxDegen >= MINIMUM_DEGEN_TIP;
};

export default includesDegenComment;
