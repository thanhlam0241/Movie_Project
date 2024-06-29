export function formatDate(dateInput) {
  try {
    let date = new Date(dateInput);
    let datePart = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
      .map((n, i) => n.toString().padStart(i === 2 ? 4 : 2, "0"))
      .join("/");
    let timePart = [date.getHours(), date.getMinutes(), date.getSeconds()]
      .map((n, i) => n.toString().padStart(2, "0"))
      .join(":");
    return datePart + " " + timePart;
  } catch (ex) {
    console.log(ex);
    return "";
  }
}
