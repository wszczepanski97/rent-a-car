export enum UserRole {
  COORDINATOR = "KOORDYNATOR",
  CLEANER = "PRACOWNIK MYJNI",
  MECHANIC = "MECHANIK",
  DRIVER = "KIEROWCA",
  CLIENT = "KLIENT",
}

export type UserRoleKey =
  | "COORDINATOR"
  | "CLEANER"
  | "MECHANIC"
  | "DRIVER"
  | "CLIENT";
