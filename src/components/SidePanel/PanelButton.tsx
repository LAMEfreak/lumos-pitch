import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";

const PanelButton = ({
  link,
  icon,
}: {
  link: string;
  icon: React.ReactNode;
}): React.ReactNode => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => {
        return isActive ? "text-indigo-700 dark:text-indigo-400" : "null";
      }}
    >
      <Button variant="outline" size="icon" className="rounded-full">
        {icon}
      </Button>
    </NavLink>
  );
};
export default PanelButton;
