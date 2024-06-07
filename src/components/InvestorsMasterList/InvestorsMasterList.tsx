import { columns } from "./columns";
import DataTable from "./DataTable";
import { useContext, useEffect } from "react";
import AddInvestorButton from "./table_components/AddInvestorButton";
import { InvestorsListContext } from "../../utilities/context/InvestorsListContext";

export const InvestorsMasterList = () => {
  const { investorsList, fetchData } = useContext(InvestorsListContext)!;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container relative mx-auto mt-8">
      <h1 className="text-2xl mb-0 text-left">Investors</h1>
      <div className="absolute right-8 top-16 flex gap-4">
        <AddInvestorButton />
      </div>
      <DataTable columns={columns} data={investorsList} />
    </section>
  );
};

export default InvestorsMasterList;
