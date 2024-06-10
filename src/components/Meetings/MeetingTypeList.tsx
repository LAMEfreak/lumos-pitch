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

import MeetingCard from "./MeetingCard";
import { CalendarPlus } from "lucide-react";

const MeetingTypeList = () => {
  const createMeeting = () => {
    console.log(`meeting created`);
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
              Open a video call room to pitch to investors
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button onClick={() => createMeeting()}>Start Meeting</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <MeetingCard
            icon={CalendarPlus}
            title="Schedule"
            description="Schedule meeting"
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
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
