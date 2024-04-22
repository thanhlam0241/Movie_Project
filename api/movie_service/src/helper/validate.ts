export function checkNumberString(str: string | null | undefined) {
  if (!str) {
    return null;
  }
  const value = Number(str);
  if (isNaN(value)) {
    return null;
  }
  return value;
}

export function getNumberString(str: any) {
  return typeof str === "string" ? checkNumberString(str) : null;
}

export function getSortOrder(sortOrder: "asc" | "desc" | any) {
  if (sortOrder === "desc") {
    return -1;
  }
  return 1;
}
