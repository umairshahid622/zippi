import type { RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    index: true,
    lazy: async () => {
      const { default: Auth } = await import("../pages/auth/Auth.tsx");
      return { Component: Auth };
    },
  },
  {
    path: "auth",
    lazy: async () => {
      const { default: Auth } = await import("../pages/auth/Auth.tsx");
      return { Component: Auth };
    },
  },
  {
    path: "dashboard",
    lazy: async () => {
      const { default: Dashboard } = await import("../pages/dashboard/Dashboard.tsx");
      return { Component: Dashboard };
    },
  },
];

export default routes;
