export const getDateTime = () => {
  let now = new Date();
  return now;
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if (month.toString().length == 1) {
    month = "0" + month;
  }
  if (day.toString().length == 1) {
    day = "0" + day;
  }
  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }
  if (second.toString().length == 1) {
    second = "0" + second;
  }
  const dateTime =
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  return dateTime;
};
// const time1 = `${year}-${month}-${prevDay}T23:00:00.000Z`
export const getStartOfDay = (date) => {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() - 1);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); 
  const day = String(dateObj.getDate()).padStart(2, "0");
  return new Date(`${year}-${month}-${day}T23:00:00.000Z`);
};
export const getEndOfDay = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); 
  const day = String(dateObj.getDate()).padStart(2, "0");
  return new Date(`${year}-${month}-${day}T23:00:00.000Z`);
};
