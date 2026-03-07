import { redirect } from "react-router-dom";

export async function logoutAction() {
  localStorage.removeItem("token");
  return redirect("/login");
}
