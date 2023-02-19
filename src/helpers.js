export const truncate = (text, limit) => {
  let allText = text.split(" ");
  allText = allText.length > limit ? allText.slice(0, limit - 1) : allText;
  return allText.join(" ") + "  ...";
}