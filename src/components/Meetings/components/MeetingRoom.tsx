import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList } from "lucide-react";
import { useLocation } from "react-router-dom";
import EndCallButton from "./EndCallButton";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "../../ui/use-toast";
import { useAuth0 } from "@auth0/auth0-react";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  // If personal room, show end call button
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isPersonalRoom = searchParams.get("personal") === "true";
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  console.log(showParticipants);
  const { useCallCallingState } = useCallStateHooks();
  const { user } = useAuth0();

  const callingState = useCallCallingState();
  console.log(isPersonalRoom);
  const navigate = useNavigate();

  if (callingState !== CallingState.JOINED) {
    <ThreeDots
      visible={true}
      height="80"
      width="60"
      color="#fff"
      radius="12"
      ariaLabel="three-dots-loading"
    />;
  }

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="left" />;
    }
  };
  console.log(user);

  return (
    <section className="relative h-screen w-full p-4 overflow-hidden mb-4">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-2 flex w-full justify-center gap-5 items-center">
        <CallControls
          onLeave={() => {
            if (!user) {
              navigate("/close");
            } else {
              navigate("/dashboard/meetings");
              toast({
                description: "Call ended",
              });
            }
          }}
        />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-full transition-all duration-100 ease-in-out bg-[#19232d] p-[10px] hover:bg-[#4c535b]">
              <LayoutList size={18} />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="p-2 mb-2">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, i) => (
              <div className="" key={i}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <Users size={20} className="text-white" />
          </div>
        </button> */}
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};
export default MeetingRoom;
