export function getZip() {
  if (typeof window === "undefined") return "48104";
  return localStorage.getItem("zip") || "48104";
}

export function setZip(zip: string) {
  localStorage.setItem("zip", zip);
}

