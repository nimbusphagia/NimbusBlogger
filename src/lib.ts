export function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value !== "string") {
    throw new Response(`Missing or invalid ${key}`, { status: 400 });
  }
  return value;
}
