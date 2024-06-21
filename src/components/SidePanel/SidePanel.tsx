// import ModeToggle from "./ModeToggle";
import LogoutButton from "./LogoutButton";
import PanelButton from "./PanelButton";
import { Home } from "lucide-react";
import { Users } from "lucide-react";
import { Video } from "lucide-react";

const SidePanel = () => {
  return (
    <>
      <nav className="fixed z-50 h-full top-0 flex flex-col justify-between w-20 px-4 py-4 border-r dark:bg-[#0c0b1b] bg-blue-50 ">
        <div className="flex flex-col items-center gap-6 mt-4">
          <ul className="flex flex-col space-y-6">
            <PanelButton link="/dashboard/overview" icon={<Home size={18} />} />
            <PanelButton
              link="/dashboard/investors"
              icon={<Users size={18} />}
            />
            <PanelButton link="/dashboard/meetings" icon={<Video size={18} />} />
          </ul>
        </div>
        <div className="border-t pt-4">
          <div className="flex flex-col gap-6 items-center">
            {/* <ModeToggle /> */}
            <LogoutButton />
          </div>
        </div>
      </nav>
    </>
  );
};
export default SidePanel;
