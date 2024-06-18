import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { toast } from "../../ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string | undefined;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const UpcomingMeetingCard = ({
  title,
  date,
  isPreviousMeeting,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section className="flex min-h-[200px] w-full flex-col justify-between rounded-lg bg-[#070814] border border-[#232325] p-8">
      <article className="flex flex-col gap-5">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="font-normal">{date}</p>
        </div>
      </article>
      <article className={cn("flex justify-end relative", {})}>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={handleClick}
              variant="outline"
              className="rounded px-10 mr-2 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
            >
              {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="px-10"
              variant="secondary"
            >
              Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default UpcomingMeetingCard;
