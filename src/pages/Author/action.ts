import { type ActionFunctionArgs } from "react-router-dom";
import { apiClient } from "../../api/client";

type AuthorForm = {
  intent?: 'changePassword',
  authorId: string,
  name: string;
  imgUrl?: string;
  description?: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

type ActionError = { type: 'error'; message: string };

function validatePasswordChange(
  oldPassword?: string,
  newPassword?: string,
  confirmPassword?: string
): ActionError | null {
  if (!oldPassword) return { type: 'error', message: 'Old password is required' };
  if (!newPassword) return { type: 'error', message: 'New password is required' };
  if (!confirmPassword) return { type: 'error', message: 'Please confirm your new password' };
  if (newPassword !== confirmPassword) return { type: 'error', message: "Passwords don't match" };
  if (newPassword.length < 8) return { type: 'error', message: 'Password must be at least 8 characters' };
  if (oldPassword === newPassword) return { type: 'error', message: 'New password must be different from old password' };
  return null;
}

export async function authorAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const { authorId, intent, name, imgUrl, description, email, oldPassword, newPassword, confirmPassword } = Object.fromEntries(formData) as AuthorForm;

    if (intent === 'changePassword') {
      const validationError = validatePasswordChange(oldPassword, newPassword, confirmPassword);
      if (validationError) return validationError;

      await apiClient(`/users/${authorId}`, { method: 'PATCH', body: JSON.stringify({ name, email, password: newPassword }) });
      return { type: 'changePassword' };
    } else {
      await apiClient(`/users/${authorId}`, { method: 'PATCH', body: JSON.stringify({ name, imgUrl, description, email }) });
      return { type: 'updateInfo' };
    }
  } catch (error) {
    if (error instanceof Response) throw error;
    return { type: 'error' as const, message: 'Server error' };
  }
}
