// Get visible fields
export default fields => {
  return fields.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
};
