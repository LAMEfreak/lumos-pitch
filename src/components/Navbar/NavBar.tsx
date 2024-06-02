import { useState, useEffect } from "react";

const getTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getDate = () => {
  const now = new Date();
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(now);
};

const NavBar = () => {
  const [time, setTime] = useState(getTime());
  const [date, setDate] = useState(getDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTime());
      setDate(getDate());
      console.log("Updating time and date");
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [time, date]);

  return (
    <section className="px-10 text-right py-4 border-b flex justify-between">
      <div className="flex gap-4">
        <p className="font-semibold">Startup</p>
        <p className="text-xs px-2 py-1 rounded-full text-blue-500 dark:text-blue-300 bg-blue-100 dark:bg-blue-900">
          Industry
        </p>
      </div>
      <div className="flex gap-4 text-middle">
        <p className="text-md font-medium">{time}</p>
        <p className="text-md">{date}</p>
      </div>
    </section>
  );
};
export default NavBar;
