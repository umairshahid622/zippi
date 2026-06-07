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
    path: "workspace",
    errorElement: createElement(SmartErrorBoundary),
    lazy: async () => {
      const { default: WorkSpace } =
        await import("../pages/workspace/Workspace.tsx");
      return { Component: WorkSpace };
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
