import { redirect, type RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    index: true,
    async loader() {
      return redirect("/auth");
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
      const { default: Dashboard } =
        await import("../pages/dashboard/Dashboard.tsx");
      return { Component: Dashboard };
    },
  },

  {
    path: "*",
    lazy: async () => {
      const { default: NotFound } = await import("../pages/NotFound.tsx");
      return { Component: NotFound };
    },
  },
];

export default routes;
