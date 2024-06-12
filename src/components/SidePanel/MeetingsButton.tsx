import { Button } from "../ui/button";
import { Video } from "lucide-react";
import { NavLink } from "react-router-dom";

const MeetingsButton = () => {
  return (
    <NavLink
      to={"/dashboard/meetings"}
      className={({ isActive }) => {
        return isActive ? "text-indigo-700 dark:text-indigo-400" : "null";
      }}
    >
      <Button variant="outline" size="icon" className="rounded-full">
        <Video size={18} />
      </Button>
    </NavLink>
  );
};

export default MeetingsButton;
