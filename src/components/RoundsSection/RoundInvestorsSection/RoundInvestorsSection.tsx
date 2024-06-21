import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { RoundInvestorsContext } from "../../../utilities/context/RoundInvestorsContext";
import TagInvestorButton from "./TagInvestorButton";
import InvestorsListProvider from "@/utilities/context/InvestorsListProvider";
import { useContext } from "react";

export const RoundInvestorsSection = ({
  selectedRoundId,
}: {
  selectedRoundId: number;
}) => {
  const { currentRoundInvestors } = useContext(
    RoundInvestorsContext
  )!;

  return (
    <main className="relative flex flex-col mx-auto">
      <InvestorsListProvider>
        <TagInvestorButton selectedRoundId={selectedRoundId} />
      </InvestorsListProvider>
      <DataTable columns={columns} data={currentRoundInvestors} />
    </main>
  );
};

export default RoundInvestorsSection;
