// import moment from "moment";

// Get visible contentTypes
export default (contentTypes, { sortBy }) => {
  return contentTypes.sort((a, b) => {
    if (sortBy === "createdAt") {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === "lastUpdated") {
      return a.lastUpdated < b.lastUpdated ? 1 : -1;
    } else if (sortBy === "title") {
      return a.title < b.title ? 1 : -1;
    }
  });
};
