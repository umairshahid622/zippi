import { redirect, type RouteObject } from "react-router";
import SmartErrorBoundary from "../components/shared/ErrorBoundary.tsx";
import { createElement } from "react";
import { store } from "../store/index.ts";
import { PublicOnlyRoute } from "../components/auth/PublicOnlyRoute.tsx";
import { ProtectedRoute } from "../components/auth/ProtectedRoute.tsx";

const routes: RouteObject[] = [
  {
    index: true,
    async loader() {
      const accessToken = store.getState().auth.token;
      const isAuthenticated = !!accessToken;
      return redirect(isAuthenticated ? "/workspace" : "/auth");
    },
  },
  {
    path: "auth",
    errorElement: createElement(SmartErrorBoundary),
    hydrateFallbackElement: createElement(() => null),
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
          return {
            Component: () =>
              createElement(
                PublicOnlyRoute,
                null,
                createElement(OAuthCallback),
              ),
          };
        },
      },
    ],
  },
  {
    path: "workspace",
    errorElement: createElement(SmartErrorBoundary),
    hydrateFallbackElement: createElement(() => null),
    lazy: async () => {
      const { default: WorkSpace } =
        await import("../features/workspace/Workspace.tsx");
      return {
        Component: () =>
          createElement(ProtectedRoute, null, createElement(WorkSpace)),
      };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: WorkspaceIndex } =
            await import("../features/workspace/WorkspaceIndex.tsx");
          return { Component: WorkspaceIndex };
        },
      },
      {
        path: ":workspaceId",
        lazy: async () => {
          const { default: WorkspaceRedirect } =
            await import("../features/workspace/WorkspaceRedirect.tsx");
          return { Component: WorkspaceRedirect };
        },
      },
      {        
        path: ":workspaceId/channel/:channelId",
        lazy: async () => {
          const { default: ChannelView } =
            await import("../features/workspace/ChannelView.tsx");
          return { Component: ChannelView };
        },
      },
    ],
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
