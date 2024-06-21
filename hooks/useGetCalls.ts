import { useState, useEffect } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useAuth0 } from "@auth0/auth0-react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useAuth0();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.sub) return;
      setIsLoading(true);
      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            // MIGHT HAVE TO USE user.nickname because of StreamProviderClient.tsx
            $or: [
              { created_by_user_id: user.nickname },
              { members: { $in: [user.nickname] } },
            ],
          },
        });
        setCalls(calls);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCalls();
  }, [client, user?.sub, user?.nickname]);

  const now = new Date();
  
  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
    });
    
    // console.log(calls);
    // console.log(upcomingCalls);
  return {
    endedCalls,
    upcomingCalls,
    recordings: calls,
    isLoading,
  };
};
