import { isRouteErrorResponse, useRouteError } from "react-router";


export default function SmartErrorBoundary() {
  const error = useRouteError();

  // Handles explicit fetch rejections (e.g., throwing a 404 or 500 response from a loader)
  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col item-center justify-center h-screen">
        <h1>{error.status} Error</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  // Handles standard JavaScript runtime code crashes
  if (error instanceof Error) {
    return (
      <div className="flex flex-col item-center justify-center h-screen">
        <h1>Application Crash</h1>
        <pre>{error.message}</pre>
      </div>
    );
  }

  return <h1>Unknown Fatal Error</h1>;
}

