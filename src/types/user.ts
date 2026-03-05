export type Role = "AUTHOR" | "ADMIN" | "VIEWER";

export type User = {
  id: string;
  name?: string;
  email: string;
  role: Role;
};

