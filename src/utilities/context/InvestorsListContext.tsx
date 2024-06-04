import { createContext } from "react";
import { Investor } from "../../components/InvestorsMasterList/columns";

interface InvestorsListContextData {
  investorsList: Investor[];
  fetchData: () => Promise<void>;
}

export const InvestorsListContext =
  createContext<InvestorsListContextData | null>(null);
