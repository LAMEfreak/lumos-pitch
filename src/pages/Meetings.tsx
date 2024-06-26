import MeetingTypeList from "@/components/Meetings/MeetingTypeList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingCallsList from "@/components/Meetings/UpcomingCallsList";
import { useEffect, useState } from "react";

const Meetings = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 60000);
    return () => window.clearInterval(intervalId);
  }, []);

  
  const clock = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    new Date()
  );

  return (
    <section className="container text-left size-full pt-8 flex flex-col gap-6">
      <h1 className="text-2xl mb-0">Meetings</h1>
      <Tabs defaultValue="meeting" className="w-full flex flex-col">
        <div className="self-start">
          <TabsList className="mb-4">
            <TabsTrigger value="meeting">Create Meeting</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="meeting">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full rounded-lg bg-[#0D0A1A] p-10">
              <div className="flex h-full justify-between">
                <div className="flex self-end flex-col">
                  <p className="text-5xl font-bold">{clock}</p>
                  <p className="text-lg text-slate-400 mt-4">{date}</p>
                </div>
              </div>
            </div>
            <MeetingTypeList />
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          <UpcomingCallsList type="upcoming" />
        </TabsContent>
        {/* <TabsContent value="personal">
        <PersonalRoom />
        </TabsContent> */}
      </Tabs>
    </section>
  );
};
export default Meetings;
