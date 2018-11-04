// Get visible fields
export default fields => {
  return fields.sort((a, b) => {
    return a.title < b.title ? 1 : -1;
  });
};
