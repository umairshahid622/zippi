import { redirect, type RouteObject } from "react-router";
import SmartErrorBoundary from "../components/common/ErrorBoundary.tsx";
import { createElement } from "react";
import { store } from "../store/index.ts";
import { PublicOnlyRoute } from "../components/auth/PublicOnlyRoute.tsx";
import { ProtectedRoute } from "../components/auth/ProtectedRoute.tsx";

const routes: RouteObject[] = [
  {
    index: true,
    async loader() {
      const isAuthenticated = !!store.getState().auth.token;
      return redirect(isAuthenticated ? "/workspace" : "/auth");
    },
  },
  {
    path: "auth",
    errorElement: createElement(SmartErrorBoundary),

    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Auth } = await import("../features/auth/Auth.tsx");
          return {
            Component: () =>
              createElement(PublicOnlyRoute, null, createElement(Auth)),
          };
        },
      },
      {
        path: "callback", // This becomes /auth/callback
        lazy: async () => {
          const { default: OAuthCallback } =
            await import("../features/auth/OAuthCallback.tsx");
          return { Component: OAuthCallback };
        },
      },
    ],
  },
  {
    path: "workspace",
    errorElement: createElement(SmartErrorBoundary),
    lazy: async () => {
      const { default: WorkSpace } =
        await import("../features/workspace/Workspace.tsx");
      return {
        Component: () =>
          createElement(ProtectedRoute, null, createElement(WorkSpace)),
      };
    },
  },

  {
    path: "*",
    errorElement: createElement(SmartErrorBoundary),
    lazy: async () => {
      const { default: NotFound } = await import("../features/NotFound.tsx");
      return { Component: NotFound };
    },
  },
];

export default routes;
