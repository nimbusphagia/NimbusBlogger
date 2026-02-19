import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 403) {
      return <h1>Unauthorized</h1>;
    }

    if (error.status === 401) {
      return <h1>Please login</h1>;
    }
  }

  return <h1>Something went wrong</h1>;
}

