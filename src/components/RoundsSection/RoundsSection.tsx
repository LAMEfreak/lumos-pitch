import { NullableRoundProps } from "../../pages/Dashboard";
import ManageRounds from "./components/ManageRounds";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  CircleDollarSign,
  Handshake,
  Crosshair,
  UsersRound,
} from "lucide-react";
import { RoundInvestor } from "./RoundInvestorsSection/columns";

// export interface InvestorProps {
//   id: number;
//   committed: number;
//   raised: number;
//   investorId: number;
//   roundId: number;
// }

const RoundsSection = ({
  getAllRounds,
  selectedRound,
}: {
  getAllRounds: () => void;
  selectedRound: NullableRoundProps;
}) => {
  // console.log("selectedRound at roundsSectionlevel", selectedRound);
  const { user, getAccessTokenSilently } = useAuth0();
  const [currentRoundInvestors, setCurrentRoundInvestors] = useState<
    RoundInvestor[] | null
  >(null);
  const [progress, setProgress] = useState(0);

  // To resolve if DB issue can be solved
  const totalRaised = currentRoundInvestors?.reduce((acc, investor) => {
    return acc + Number(investor.raised);
  }, 0);

  const totalCommitted = currentRoundInvestors?.reduce((acc, investor) => {
    return acc + investor.committed;
  }, 0);

  const calculateProgressBar = Math.min(
    100,
    ((totalRaised ?? 0) / (selectedRound?.target ?? 0)) * 100
  );

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

  useEffect(() => {
    const timer = setTimeout(() => setProgress(calculateProgressBar), 300);
    return () => clearTimeout(timer);
  }, [calculateProgressBar]);

  return (
    <main className="flex flex-col w-full mt-4">
      <section className="border dark:bg-gradient-to-br from-[#020417] to-[#2b021a] relative flex flex-col text-left p-10 rounded-lg">
        <div className="absolute right-10 top-9">
          <div className="flex gap-4">
            <ManageRounds
              selectedRound={selectedRound}
              getAllRounds={getAllRounds}
            />
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-2xl font-semibold mr-6"> {selectedRound?.name}</p>
          <p className="text-xs align-middle px-3 py-1 rounded-full text-blue-500 dark:text-blue-300 bg-blue-100 dark:bg-blue-950">
            {selectedRound?.stage}
          </p>
        </div>
        <p className="mt-6 line-clamp-2 dark:text-gray-500 max-w-[70ch]">
          {selectedRound?.description}
        </p>
        <div className="my-8 flex items-center">
          <Progress
            value={progress}
            className="w-[30%] dark:bg-gray-900"
            max={selectedRound?.target}
          />
          <p className="ml-6 text-gray-500">
            <span className="font-semibold dark:text-green-300 text-xl mr-1">
              {calculateProgressBar}%
            </span>{" "}
            of target raised
          </p>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-4">
          <div className="dark:bg-green-700 dark:border-green-700 border dark:bg-opacity-40 rounded-md py-4 px-6">
            <div className="flex justify-between items-center">
              <p className="text-md dark:text-green-500 font-medium">Raised</p>
              <CircleDollarSign size={24} className="dark:text-green-400" />
            </div>
            <p className="text-3xl mt-6 font-semibold mb-2">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(totalRaised || 0)}
            </p>
          </div>
          <div className="dark:bg-blue-700 dark:border-blue-700 border dark:bg-opacity-40 rounded-md py-4 px-6">
            <div className="flex justify-between items-center">
              <p className="text-md dark:text-blue-400 font-medium">
                Committed
              </p>
              <Handshake size={24} className="dark:text-blue-400" />
            </div>
            <p className="text-3xl mt-6 font-semibold mb-2">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(totalCommitted || 0)}
            </p>
          </div>
          <div className="dark:bg-fuchsia-700 dark:border-fuchsia-700 border dark:bg-opacity-40 rounded-md py-4 px-6">
            <div className="flex justify-between dark:text-fuchsia-400 items-center">
              <p className="text-md  font-medium">Target Size</p>
              <Crosshair size={24} className="" />
            </div>
            <p className="text-3xl mt-6 font-semibold mb-2">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(selectedRound?.target || 0)}
            </p>
            {/* <p>{investorCount}</p> */}
          </div>
          <div className="dark:bg-cyan-700 dark:border-cyan-700 border dark:bg-opacity-40 rounded-md py-4 px-6">
            <div className="flex justify-between items-center dark:text-cyan-400">
              <p className="text-md font-medium">Investors</p>
              <UsersRound size={24} />
            </div>
            <p className="text-3xl mt-6 font-semibold mb-2">
              {currentRoundInvestors?.length}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RoundsSection;
