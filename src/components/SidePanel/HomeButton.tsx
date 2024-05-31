import { Button } from "../ui/button";
import { Home } from "lucide-react";
import { NavLink } from "react-router-dom";

const HomeButton = () => {
  return (
    <NavLink
      to={"/dashboard/overview"}
      className={({ isActive }) => {
        return isActive ? "text-indigo-700 dark:text-indigo-300" : "null";
      }}
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
      >
        <Home size={18} />
      </Button>
    </NavLink>
  );
};

export default HomeButton;
