import { NullableRoundProps } from "../../pages/Dashboard";
import { Target } from "lucide-react";
import ManageRounds from "./components/ManageRounds";

const RoundsSection = ({
  getAllRounds,
  selectedRound,
}: {
  getAllRounds: () => void;
  selectedRound: NullableRoundProps;
}) => {

  // console.log("selectedRound at roundsSectionlevel", selectedRound);

  return (
    <main className="flex flex-col w-full">
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
        <div className="grid gap-8 mt-10 grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-4">
          <div className="dark:bg-green-900 dark:border-green-800 border dark:bg-opacity-40 rounded-md py-4 px-6">
            <div className="flex justify-between items-center dark:text-gray-600">
              <p className="text-md dark:text-green-500 font-medium">Raised</p>
              <Target size={24} />
            </div>
            <p className="text-3xl mt-6 font-semibold mb-2">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(0)}
            </p>
            {/* <p>{investorCount}</p> */}
          </div>
          <div className="dark:bg-blue-900 dark:border-blue-800 border dark:bg-opacity-40 rounded-md py-4 px-6">
            <div className="flex justify-between items-center dark:text-gray-600">
              <p className="text-md dark:text-blue-400 font-medium">
                Committed
              </p>
              <Target size={24} />
            </div>
            <p className="text-3xl mt-6 font-semibold mb-2">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(0)}
            </p>
            {/* <p>{investorCount}</p> */}
          </div>
          <div className="dark:bg-fuchsia-900 dark:border-fuchsia-800 border dark:bg-opacity-40 rounded-md py-4 px-6">
            <div className="flex justify-between items-center dark:text-gray-600">
              <p className="text-md dark:text-fuchsia-400 font-medium">
                Target Size
              </p>
              <Target size={24} />
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
          <div className="dark:bg-cyan-900 dark:border-cyan-800 border dark:bg-opacity-40 rounded-md py-4 px-6">
            <div className="flex justify-between items-center dark:text-gray-600">
              <p className="text-md dark:text-cyan-400 font-medium">
                Investors
              </p>
              <Target size={24} />
            </div>
            <p className="text-3xl mt-6 font-semibold mb-2">12</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RoundsSection;
