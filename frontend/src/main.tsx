import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ConfigProvider, theme } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routeTree } from "./routeTree.gen.ts";

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#3b82f6",
        },
      }}
    >
      <RouterProvider router={getRouter()}></RouterProvider>
    </ConfigProvider>
  </StrictMode>,
);
