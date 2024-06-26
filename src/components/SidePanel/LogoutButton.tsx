import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: import.meta.env.VITE_SOME_LOCAL_SERVER,
      },
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-red-100 dark:hover:bg-red-800 hover:bg-red-200 hover:border-red-200"
      onClick={handleLogout}
    >
      <LogOut size={18} />
    </Button>
  );
};

export default LogoutButton;
