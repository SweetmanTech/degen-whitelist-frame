const getDegenTip = (comments: any[]) => {
  let maxDegen = 0;
  let tipCastHash = "";

  comments.forEach((comment) => {
    const matches = comment.text.match(/(\d+)\s*\$DEGEN/);
    if (matches && matches[1]) {
      const degenAmount = parseInt(matches[1], 10);
      if (degenAmount > maxDegen) {
        maxDegen = degenAmount;
        tipCastHash = comment.hash;
      }
    }
  });

  return { tip: maxDegen, tipCastHash };
};

export default getDegenTip;
