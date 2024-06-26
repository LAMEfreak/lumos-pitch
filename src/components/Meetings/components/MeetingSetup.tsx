import { Button } from "@/components/ui/button";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const { useCallEndedAt } = useCallStateHooks();
  const callEnded = useCallEndedAt();
  // console.log(callEnded);

  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used within stream call component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return callEnded ? (
    <div className="h-screen flex flex-col justify-center items-center">
      <p>This call has ended.</p>
    </div>
  ) : (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-semibold">Setup</h1>
      <VideoPreview className="w-3/5 p-4" />
      <div className="flex h-10 justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        variant="outline"
        size="default"
        className="dark:bg-blue-700 dark:hover:bg-blue-80"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Call
      </Button>
    </div>
  );
};

export default MeetingSetup;
