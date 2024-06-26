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
import EndCallButton from "./EndCallButton";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "../../ui/use-toast";
import { useAuth0 } from "@auth0/auth0-react";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const { user } = useAuth0();

  const callingState = useCallCallingState();
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
  // console.log(user);

  return (
    <section className="relative h-screen w-full p-4 overflow-hidden mb-4">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1200px] items-center">
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
          onLeave={async () => {
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
        <EndCallButton />
      </div>
    </section>
  );
};
export default MeetingRoom;
