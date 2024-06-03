import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./pages/ErrorBoundary.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import Layout from "./pages/Layout.tsx";
import { AuthenticationGuard } from "./utilities/AuthenticationGuard.tsx";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/utilities/ThemeProvider.tsx";
import Sessions from "./pages/Sessions.tsx";
import Dashboard from "./pages/Dashboard";
import Investors from "./pages/Investors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: <AuthenticationGuard component={Layout} />,
    children: [
      {
        path: "/dashboard/overview",
        element: <AuthenticationGuard component={Dashboard} />,
      },
      {
        path: "/dashboard/sessions",
        element: <AuthenticationGuard component={Sessions} />,
      },
      {
        path: "/dashboard/investors",
        element: <AuthenticationGuard component={Investors} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_SOME_DOMAIN}
      clientId={import.meta.env.VITE_SOME_CLIENT_ID}
      authorizationParams={{
        redirect_uri: "http://localhost:5173/dashboard/overview",
        audience: import.meta.env.VITE_SOME_AUDIENCE,
        // scope:
        //   "read:current_user update:current_user_metadata openid profile email",
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
