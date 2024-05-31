import ModeToggle from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import SessionsButton from "./SessionsButton";
import HomeButton from "./HomeButton";

const SidePanel = () => {
  const { user } = useAuth0();

  return (
    <>
      <nav className="sticky flex flex-col justify-between w-20 px-4 py-4 border-r">
        <div className="flex flex-col items-center gap-6 mt-4">
          <Avatar>
            <AvatarImage src={user?.picture} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <ul className="flex flex-col space-y-6">
            <HomeButton />
            <SessionsButton />
          </ul>
        </div>
        <div className="border-t pt-4">
          <div className="flex flex-col gap-6 items-center">
            <ModeToggle />
            <LogoutButton />
          </div>
        </div>
      </nav>
    </>
  );
};
export default SidePanel;
