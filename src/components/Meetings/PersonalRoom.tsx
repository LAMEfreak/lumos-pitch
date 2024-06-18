import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useGetCallById } from "../../../hooks/useGetCallById";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";

const PersonalRoom = () => {
  const { user } = useAuth0();
  const meetingId = crypto.randomUUID();
  const { call } = useGetCallById(meetingId!);
  const client = useStreamVideoClient();
  const navigate = useNavigate();

  const meetingLink = `${
    import.meta.env.VITE_SOME_LOCAL_SERVER
  }/meeting/${meetingId}?personal=true`;

  const Table = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    return (
      <div className="flex flex-col gap-2 xl:flex-row items-center">
        <p className="font-medium lg:text-md text-gray-400">{title}</p>
        <p className="truncate font-bold max-sm:max-w-[320px] lg:text-lg ">
          {description}
        </p>
      </div>
    );
  };

  const startRoom = async () => {
    if (!client || !user) return;
    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    toast({
      description: "Joined Personal Room",
    });
    navigate(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className="flex size-full flex-col gap-10">
      <div className="flex w-full flex-col gap-8 lg:max-w-[900px]">
        <Table title="Topic:" description={`${user?.name}'s meeting room`} />
        {/* <Table title="Meeting ID:" description={`${meetingId}`} /> */}
        <Table title="Invite Link:" description={`${meetingLink}`} />
      </div>
      <div className="flex gap-5">
        <Button onClick={startRoom}>Start Meeting</Button>
        <Button
          variant={"outline"}
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation Link
        </Button>
      </div>
    </section>
  );
};
export default PersonalRoom;
