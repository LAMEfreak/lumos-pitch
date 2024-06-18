import { useGetCalls } from "../../../hooks/useGetCalls";
import UpcomingMeetingCard from "./components/UpcomingMeetingCard";
import { Call } from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const UpcomingCallsList = ({
  type,
}: {
  type: "ended" | "upcoming" | "recordings";
}): React.ReactNode => {
  const { upcomingCalls, isLoading } = useGetCalls();
  const navigate = useNavigate();

  const getUpcomingCalls = () => {
    if (type === "upcoming") {
      return upcomingCalls;
      } else {
      return [];
    }
  };
  
  const getNoCallsMessage = (): string => {
    return "No calls are scheduled";
    };
    
    const calls = getUpcomingCalls();
    const noCallsMessage = getNoCallsMessage();
    console.log(calls);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-16 items-center">
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color="#fff"
          radius="12"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }
  console.log(calls);

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call) => {
          return (
            <UpcomingMeetingCard
              key={(meeting as Call).id}
              title={(meeting as Call).state.custom.description}
              date={(meeting as Call).state?.startsAt?.toLocaleString()}
              isPreviousMeeting={type === "ended"}
              handleClick={() => navigate(`/meeting/${meeting.id}`)}
              link={
                type === "upcoming"
                  ? `${import.meta.env.VITE_SOME_LOCAL_SERVER}/meeting/${
                      (meeting as Call).id
                    }`
                  : ""
              }
              buttonText={type === "recordings" ? "Play recording" : "Start"}
            />
          );
        })
      ) : (
        <p className={`mt-4`}>{noCallsMessage}</p>
      )}
    </section>
  );
};

export default UpcomingCallsList;
