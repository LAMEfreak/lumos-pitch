import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import MeetingSetup from "./components/MeetingSetup";
import MeetingRoom from "./components/MeetingRoom";
import { useGetCallById } from "../../../hooks/useGetCallById";
import { ThreeDots } from "react-loader-spinner";

const MeetingPage = () => {
  const { user, isLoading } = useAuth0();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { id } = useParams();
  const { call, isCallLoading } = useGetCallById(id!);
  console.log(id);

  if (isCallLoading) {
    console.log(isCallLoading);

    return (
      <div className="h-screen flex justify-center items-center">
        <ThreeDots
          visible={true}
          height="80"
          width="60"
          color="#fff"
          radius="12"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  return (
    <main className="h-screen size-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
