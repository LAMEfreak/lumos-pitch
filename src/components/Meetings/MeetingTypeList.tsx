import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MeetingCard from "./MeetingCard";
import { CalendarPlus } from "lucide-react";
import { useStreamVideoClient, Call } from "@stream-io/video-react-sdk";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MeetingTypeList = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  // Initialize Stream Video Client
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({
          description: "Please select a date and time",
          variant: "destructive",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) {
        throw new Error("Failed to create call");
      }
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        navigate(`/meeting/${call.id}`);
      }

      toast({
        description: "Meeting created",
      });
      return;
    } catch (error) {
      toast({
        description: "Failed to create call",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="grid grid-cols-2 gap-6">
      <Dialog>
        <DialogTrigger>
          {" "}
          <MeetingCard
            icon={CalendarPlus}
            title="New"
            description="Start instant meeting"
            color="bg-orange-700 text-left"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Start a Meeting</DialogTitle>
            <DialogDescription>
              Spin up a video call room to pitch to investors
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button onClick={() => createMeeting()}>Start meeting</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Two variants depending on whether meeting is scheduled */}
      {!callDetails ? (
        <Dialog>
          <DialogTrigger>
            <MeetingCard
              icon={CalendarPlus}
              title="Schedule"
              description="Plan a meeting"
              color="bg-blue-700"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="mb-4">Schedule Meeting</DialogTitle>
              <Label htmlFor="description" className="pb-3">
                Add a description
              </Label>
              <Input
                id="description"
                value={values.description}
                type="text"
                placeholder="Enter meeting details..."
                onChange={(e) =>
                  setValues({
                    ...values,
                    description: e.target.value,
                  })
                }
              />
              <Label htmlFor="description" className="pb-3">
                Select date and time
              </Label>
            </DialogHeader>

            <DialogFooter className="mt-4">
              <Button
                onClick={() => {
                  console.log(values);
                }}
              >
                Schedule meeting
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog>
          <DialogTrigger>
            <MeetingCard
              icon={CalendarPlus}
              title="Schedule"
              description="Plan a meeting"
              color="bg-blue-700"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-4">
              <Button
                onClick={() => {
                  // navigator.clipboard.writeText(meetingLink);
                  // toast({
                  //   description: "Link copied",
                  // });
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog>
        <DialogTrigger>
          <MeetingCard
            icon={CalendarPlus}
            title="Join"
            description="via invitation link"
            color="bg-rose-700"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
export default MeetingTypeList;
