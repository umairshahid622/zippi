import { redirect, type RouteObject } from "react-router";
import SmartErrorBoundary from "../components/common/ErrorBoundary.tsx";
import { createElement } from "react";
import { store } from "../store/index.ts";

const requireAuth = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  const token = store.getState().auth.token;

  if (!isAuthenticated || !token) {
    return redirect("/auth");
  }
  return null;
};

const requireGuest = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  const token = store.getState().auth.token;

  if (isAuthenticated && token) {
    return redirect("/workspace");
  }
  return null;
};

const routes: RouteObject[] = [
  {
    index: true,
    async loader() {
      const isAuthenticated = store.getState().auth.isAuthenticated;
      return redirect(isAuthenticated ? "/workspace" : "/auth");
    },
  },
  {
    path: "auth",
    errorElement: createElement(SmartErrorBoundary),
    loader: requireGuest,
    lazy: async () => {
      const { default: Auth } = await import("../pages/auth/Auth.tsx");
      return { Component: Auth };
    },
  },
  {
    path: "workspace",
    errorElement: createElement(SmartErrorBoundary),
    loader: requireAuth, 
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
