const formatDate = (date = Date) =>
  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

module.exports = {
  formatDate,
};
