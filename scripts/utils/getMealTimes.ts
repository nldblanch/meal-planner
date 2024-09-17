export const getApproxStartTime = (title: string, date: Date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const time = title === "Breakfast" ? "06" : title === "Lunch" ? "11" : "16";
  return new Date(`${year}-${month}-${day}T${time}:00:00.000Z`);
};
export const getApproxEndTime = (title: string, date: Date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const time = title === "Breakfast" ? "07" : title === "Lunch" ? "12" : "17";
  return new Date(`${year}-${month}-${day}T${time}:00:00.000Z`);
};
