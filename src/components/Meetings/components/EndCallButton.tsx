import { Button } from "@/components/ui/button";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";
import { toast } from "../../ui/use-toast";

const EndCallButton = () => {
  const navigate = useNavigate();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;
  
  if (!isMeetingOwner) {
    return null
  }

  return (
    <Button
      onClick={async () => {
        await call?.endCall();
        navigate("/dashboard/meetings");
        toast({
          description: "Call ended",
        });
      }}
      variant="destructive"
    >
      End call
    </Button>
  );
};
export default EndCallButton;
