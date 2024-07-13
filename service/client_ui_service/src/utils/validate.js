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

// Function to convert datetime string to yyyy-mm-dd
export function convertToYYYYMMDD(datetimeString) {
  const date = new Date(datetimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
