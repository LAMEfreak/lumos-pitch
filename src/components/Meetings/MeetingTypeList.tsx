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
import ReactDatePicker from "react-datepicker";
import { Video } from "lucide-react";
import { Link2 } from "lucide-react";

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
  console.log(client);
  
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
      console.log(call, 'call created');
      

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

  const meetingLink = `${import.meta.env.VITE_SOME_LOCAL_SERVER}/meeting/${
    callDetails?.id
  }`;

  return (
    <section className="grid grid-cols-2 gap-6">
      <Dialog>
        <DialogTrigger>
          {" "}
          <MeetingCard
            icon={Video}
            title="New"
            description="Start instant meeting"
            color="dark:bg-orange-500 dark:border-orange-500 border dark:bg-opacity-40"
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

      <Dialog>
        <DialogTrigger>
          <MeetingCard
            icon={CalendarPlus}
            title="Schedule"
            description="Plan a meeting"
            color="dark:bg-blue-700 dark:border-blue-700 border dark:bg-opacity-40"
          />
        </DialogTrigger>
        {!callDetails ? (
          <DialogContent className="sm:max-w-[425px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMeeting();
              }}
            >
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
                <Label htmlFor="description" className="py-4">
                  Select date and time
                </Label>
                <ReactDatePicker
                  selected={values.dateTime}
                  onChange={(date) => setValues({ ...values, dateTime: date! })}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full rounded-md p-3 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
                />
              </DialogHeader>

              <DialogFooter className="mt-6">
                <Button type="submit" disabled={!values.description}>
                  Schedule meeting
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Meeting Created</DialogTitle>
              <DialogDescription>
                Your meeting has been created. Here's the link to share
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-4">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(meetingLink);
                  toast({
                    description: "Link copied",
                  });
                }}
                className="w-full"
              >
                Copy Meeting Link
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <MeetingCard
            icon={Link2}
            title="Join"
            description="via invitation link"
            color="dark:bg-pink-700 dark:border-pink-700 border dark:bg-opacity-40"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="mb-4">Join Meeting</DialogTitle>
            <Input
              type="text"
              placeholder="Enter meeting link"
              onChange={(e) =>
                setValues({
                  ...values,
                  link: e.target.value,
                })
              }
            />
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button
              disabled={!values.link}
              onClick={() => {
                window.location.href = `${values.link}`;
              }}
            >
              Join now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
export default MeetingTypeList;
