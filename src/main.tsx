import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./pages/ErrorBoundary.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import Dashboard from "./pages/Dashboard.tsx";
import { AuthenticationGuard } from "./utilities/AuthenticationGuard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "dashboard",
    element: <AuthenticationGuard component={Dashboard} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-wnqp04xircjjnguk.us.auth0.com"
      clientId="7zZvVwOD8axKOS5AjVuT1aNX9wDHfvuU"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/dashboard",
        // TODO: Set up API audience
        // Scope is only needed for Authorisation Claims
        // audience: "https://dev-wnqp04xircjjnguk.us.auth0.com/api/v2/",
        // scope: "read:current_user update:current_user_metadata",
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
