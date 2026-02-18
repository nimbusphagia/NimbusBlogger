import { apiClient } from "../../api/client";
import { redirect, type ActionFunctionArgs } from "react-router-dom";

type AuthResponse = {
  accessToken: string;
};

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Invalid form data");
  }

  const req: RequestInit = {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }
  try {
    const res = await apiClient<AuthResponse>("/auth", req);
    localStorage.setItem("token", res.accessToken);
    return redirect("/");
  } catch (err) {
    return { error: "Invalid email or password" };
  }

}
