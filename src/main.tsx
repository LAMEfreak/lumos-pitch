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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-wnqp04xircjjnguk.us.auth0.com"
      clientId="7zZvVwOD8axKOS5AjVuT1aNX9wDHfvuU"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/dashboard/overview",
        // TODO: Set up API audience
        // Scope is only needed for Authorisation Claims
        // audience: "https://dev-wnqp04xircjjnguk.us.auth0.com/api/v2/",
        // scope: "read:current_user update:current_user_metadata",
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
