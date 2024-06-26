import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./pages/ErrorBoundary.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import MainLayout from "./pages/MainLayout.tsx";
import { AuthenticationGuard } from "./utilities/AuthenticationGuard.tsx";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/utilities/ThemeProvider.tsx";
import Dashboard from "./pages/Dashboard";
import InvestorsMasterList from "./components/InvestorsMasterList/InvestorsMasterList.tsx";
import InvestorsListProvider from "./utilities/context/InvestorsListProvider.tsx";
import Meetings from "./pages/Meetings.tsx";
import StreamProviderClient from "@/utilities/StreamProviderClient.tsx";
import MeetingPage from "./components/Meetings/MeetingPage.tsx";
import CloseBrowserPage from "./pages/CloseBrowserPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: <AuthenticationGuard component={MainLayout} />,
    children: [
      {
        path: "/dashboard/overview",
        element: <AuthenticationGuard component={Dashboard} />,
      },

      {
        path: "/dashboard/meetings",
        element: <AuthenticationGuard component={Meetings} />,
      },

      {
        path: "/dashboard/investors",
        element: (
          <InvestorsListProvider>
            <AuthenticationGuard component={InvestorsMasterList} />
          </InvestorsListProvider>
        ),
      },
    ],
  },
  {
    path: "/meeting/:id",
    element: <MeetingPage />,
  },
  {
    path: "/close",
    element: <CloseBrowserPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_SOME_DOMAIN}
      clientId={import.meta.env.VITE_SOME_CLIENT_ID}
      authorizationParams={{
        redirect_uri: "https://lumos-pitch.netlify.app/dashboard/overview",
        audience: import.meta.env.VITE_SOME_AUDIENCE,
        // scope:
        //   "read:current_user update:current_user_metadata openid profile email",
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <StreamProviderClient>
          <RouterProvider router={router} />
          <Toaster />
        </StreamProviderClient>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
