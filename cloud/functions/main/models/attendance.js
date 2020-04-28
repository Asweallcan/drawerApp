const Attendance = ({ title, file, date, _id }) => ({
  title,
  file,
  date,
  _id,
});

Attendance.__TABLE__ = "Attendances";

module.exports = Attendance;
