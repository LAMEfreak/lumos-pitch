import ModeToggle from "./ModeToggle";
import { NavLink, Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import SessionsButton from "./SessionsButton";
import HomeButton from "./HomeButton";

const Nav = () => {
  const { user } = useAuth0();

  return (
    <>
      <nav className="fixed flex flex-col justify-between left-0 top-0 h-full w-24 px-4 py-4 border-r">
        <div className="flex flex-col items-center gap-6 mt-4">
          <Avatar>
            <AvatarImage src={user?.picture} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <ul className="flex flex-col space-y-6">
            <NavLink to={"/dashboard"}>
              <HomeButton />
            </NavLink>
            <NavLink to={"/dashboard/sessions"}>
              <SessionsButton />
            </NavLink>
          </ul>
        </div>
        <div className="border-t pt-4">
          <div className="flex flex-col gap-6 items-center">
            <ModeToggle />
            <LogoutButton />
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Nav;
