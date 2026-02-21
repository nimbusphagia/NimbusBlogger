export type Role = "AUTHOR" | "ADMIN" | "VIEWER";

export type User = {
  id: string;
  email: string;
  role: Role;
};

