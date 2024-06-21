import { RoundInvestor } from "../../components/RoundsSection/RoundInvestorsSection/columns";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { RoundInvestorsContext } from "./RoundInvestorsContext";

const RoundInvestorsProvider = ({
  children,
  selectedRoundId,
}: {
  children: React.ReactNode;
  selectedRoundId: number;
}) => {
  const [currentRoundInvestors, setCurrentRoundInvestors] = useState<
    RoundInvestor[]
  >([] as RoundInvestor[]);

  const { user, getAccessTokenSilently } = useAuth0();

  const getRoundInvestors = async () => {
    const auth0Id = user?.sub;
    const token = await getAccessTokenSilently();
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SOME_BACKEND_SERVER
        }/startup/${auth0Id}/roundInvestors/${selectedRoundId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentRoundInvestors(response.data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getRoundInvestors();
  }, []);

  return (
    <RoundInvestorsContext.Provider
      value={{ currentRoundInvestors, getRoundInvestors }}
    >
      {children}
    </RoundInvestorsContext.Provider>
  );
};

export default RoundInvestorsProvider;
