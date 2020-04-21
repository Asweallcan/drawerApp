const moment = require("moment");

module.exports = {
  attendanceDate: (date) => {
    return moment(date).format("YYYY-MM-DD");
  },
};
