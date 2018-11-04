// Get visible contentTypes
export default contentTypes => {
  return contentTypes.sort((a, b) => {
    return a.title < b.title ? 1 : -1;
  });
};
