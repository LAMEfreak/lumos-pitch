import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: "http://localhost:5173/",
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-full py-3 mt-2 w-80 bg-red-600 hover:bg-red-700 transition-all duration-300"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
