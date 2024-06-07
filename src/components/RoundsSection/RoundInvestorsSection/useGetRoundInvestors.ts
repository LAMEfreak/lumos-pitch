import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { RoundProps } from "@/pages/Dashboard";
import { RoundInvestor } from "./columns";

export const useGetRoundInvestors = (
  setCurrentRoundInvestors: React.Dispatch<
    React.SetStateAction<RoundInvestor[]>
  >,
  selectedRound: RoundProps
) => {
  const { user, getAccessTokenSilently } = useAuth0();

  const getRoundInvestors = async () => {
    const auth0Id = user?.sub;
    const token = await getAccessTokenSilently();
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SOME_BACKEND_SERVER
        }/startup/${auth0Id}/roundInvestors/${selectedRound?.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentRoundInvestors(response.data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return getRoundInvestors;
};
