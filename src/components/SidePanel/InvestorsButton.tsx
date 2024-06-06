import { Button } from "../ui/button";
import { Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const InvestorsButton = () => {
  return (
    <NavLink
      to={"/dashboard/investors"}
      className={({ isActive }) => {
        return isActive ? "text-indigo-700 dark:text-indigo-400" : "null";
      }}
    >
      <Button variant="outline" size="icon" className="rounded-full">
        <Users size={18} />
      </Button>
    </NavLink>
  );
};

export default InvestorsButton;
