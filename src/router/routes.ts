import { redirect, type RouteObject } from "react-router";
import SmartErrorBoundary from "../components/common/ErrorBoundary.tsx";
import { createElement } from "react";

const routes: RouteObject[] = [
  {
    index: true,
    async loader() {
      return redirect("/auth");
    },
  },
  {
    path: "auth",
    errorElement: createElement(SmartErrorBoundary),
    lazy: async () => {
      const { default: Auth } = await import("../pages/auth/Auth.tsx");
      return { Component: Auth };
    },
  },
  {
    path: "dashboard",
    errorElement: createElement(SmartErrorBoundary),
    lazy: async () => {
      const { default: Dashboard } =
        await import("../pages/dashboard/Dashboard.tsx");
      return { Component: Dashboard };
    },
  },

  {
    path: "*",
    errorElement: createElement(SmartErrorBoundary),
    lazy: async () => {
      const { default: NotFound } = await import("../pages/NotFound.tsx");
      return { Component: NotFound };
    },
  },
  
];

export default routes;
