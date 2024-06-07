import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { DataTable } from "./DataTable";
import { RoundInvestor, columns } from "./columns";
import { RoundProps } from "@/pages/Dashboard";

export const RoundInvestorsSection = ({
  selectedRound,
}: {
  selectedRound: RoundProps;
}) => {
  const [currentRoundInvestors, setCurrentRoundInvestors] = useState<
    RoundInvestor[]
  >([]);
  const { user, getAccessTokenSilently } = useAuth0();
  // console.log(selectedRound, "SELECTEDROUND");

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

  useEffect(() => {
    getRoundInvestors();
  }, [selectedRound?.id]);

  // console.log(currentRoundInvestors, "INVESTORSROUND");

  return (
    <main className="relative mx-auto mt-4">
      <DataTable columns={columns} data={currentRoundInvestors} />
    </main>
  );
};

export default RoundInvestorsSection;
