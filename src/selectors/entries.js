// Get visible entries
export default (entries, contentType) => {
  if (contentType) {
    return entries.filter(entry => {
      return entry.contentTypeId === contentType._id;
    });
  }
  // return entries.sort((a, b) => {
  //   return a.title < b.title ? 1 : -1;
  // });
  else {
    return entries;
  }
};
