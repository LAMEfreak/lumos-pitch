import MeetingTypeList from "@/components/Meetings/MeetingTypeList";

const Meetings = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  return (
    <section className="container text-left size-full mt-8 flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full rounded-lg bg-cover bg-banner-image p-8">
          <div className="flex flex-col h-full justify-between">
            <p className="bg-sky-900 text-center px-8 bg-opacity-40 backdrop-blur-lg max-w-[300px] rounded-md text-base font-normal py-2">
              Upcoming Meeting at: 12:30 PM
            </p>
            <div className="flex flex-col">
              <p className="text-5xl font-bold">{time}</p>
              <p className="text-lg text-slate-400 my-2">{date}</p>
            </div>
          </div>
        </div>
        <MeetingTypeList />
      </div>
    </section>
  );
};
export default Meetings;
