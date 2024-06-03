import ModeToggle from "./ModeToggle";
import LogoutButton from "./LogoutButton";
import SessionsButton from "./SessionsButton";
import HomeButton from "./HomeButton";
import InvestorsButton from "./InvestorsButton";

const SidePanel = () => {
  return (
    <>
      <nav className="sticky flex flex-col justify-between w-20 px-4 py-4 border-r bg-[#080a1b]">
        <div className="flex flex-col items-center gap-6 mt-4">
          <ul className="flex flex-col space-y-6">
            <HomeButton />
            <SessionsButton />
            <InvestorsButton />
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
