import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../utilities/PageLoader";
import SidePanel from "@/components/SidePanel/SidePanel";
import NavBar from "@/components/Navbar/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  console.log(user);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    isAuthenticated && (
      <div className="flex size-full ">
        <SidePanel />
        <div className="flex ml-20 flex-col size-full">
          <NavBar />
          <main className="h-full mt-4">
            <Outlet />
          </main>
        </div>
      </div>
    )
  );
};
export default Layout;
