import { Button } from "../ui/button";
import { Video } from "lucide-react";
import { NavLink } from "react-router-dom";

const SessionsButton = () => {
  return (
    <NavLink
      to={"/dashboard/sessions"}
      className={({ isActive }) => {
        return isActive ? "text-indigo-700 dark:text-indigo-300" : "null";
      }}
    >
      <Button variant="outline" size="icon" className="rounded-full">
        <Video size={18} />
      </Button>
    </NavLink>
  );
};

export default SessionsButton;
