import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import { RoundInvestor, columns } from "./columns";
import { RoundProps } from "@/pages/Dashboard";
// import { useGetRoundInvestors } from "./useGetRoundInvestors";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import TagInvestorButton from "./TagInvestorButton";
import InvestorsListProvider from "@/utilities/context/InvestorsListProvider";

export const RoundInvestorsSection = ({
  selectedRound,
}: {
  selectedRound: RoundProps;
}) => {
  const [currentRoundInvestors, setCurrentRoundInvestors] = useState<
    RoundInvestor[]
  >([]);
  // const getRoundInvestors = useGetRoundInvestors(
  //   setCurrentRoundInvestors,
  //   selectedRound
  // );
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
    <main className="relative flex flex-col mx-auto">
      <InvestorsListProvider>
        <TagInvestorButton selectedRoundId={selectedRound?.id} />
      </InvestorsListProvider>
      <DataTable columns={columns} data={currentRoundInvestors} />
    </main>
  );
};

export default RoundInvestorsSection;
