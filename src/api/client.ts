const BASE_URL = import.meta.env.VITE_NIMBUS_API_URL;

export async function apiClient<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw res;
  }

  if (res.status === 204) {
    return null as T;
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (null as T);
}
