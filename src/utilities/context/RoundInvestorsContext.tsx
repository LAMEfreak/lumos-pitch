import { createContext } from "react";
import { RoundInvestor } from "../../components/RoundsSection/RoundInvestorsSection/columns";

interface RoundInvestorsContextData {
  currentRoundInvestors: RoundInvestor[];
  getRoundInvestors: () => Promise<void>;
}

export const RoundInvestorsContext =
  createContext<RoundInvestorsContextData | null>(null);