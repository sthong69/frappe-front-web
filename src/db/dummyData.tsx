export const TAFS: string[] = ["TAF 1", "TAF 2", "TAF 3", "TAF 4", "TAF 5"];
export const FORMATIONS: string[] = [
  "Formation 1",
  "Formation 2",
  "Formation 3",
  "Formation 4",
  "Formation 5",
];

export const CAMPUSES: string[] = ["Brest", "Rennes", "Nantes"];
export const ENCADRANTS: string[] = [
  "Encadrant 1",
  "Encadrant 2",
  "Encadrant 3",
];

export const adminUser = {
  id: 1,
  user_name: "admin",
  first_name: "NomAdmin",
  last_name: "PrénomAdmin",
  email: "admin@frappe.fr",
  phone_number: "0600000000",
  campus_id: 1,
  supervisor: true,
  student: false,
};

export const userUser = {
  id: 2,
  user_name: "user",
  first_name: "NomUser",
  last_name: "PrénomUser",
  email: "user@frappe.fr",
  phone_number: "0600000000",
  campus_id: 2,
  supervisor: false,
  student: true,
};
