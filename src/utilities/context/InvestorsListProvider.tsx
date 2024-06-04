import { Investor } from "../../components/InvestorsMasterList/columns";
import axios from "axios";
import { useState, useEffect } from "react";
import { InvestorsListContext } from "./InvestorsListContext";
import { useAuth0 } from "@auth0/auth0-react";

const InvestorsListProvider = ({ children }: { children: React.ReactNode }) => {
  const [investorsList, setInvestorsList] = useState<Investor[]>(
    [] as Investor[]
  );
  const { user, getAccessTokenSilently } = useAuth0();

  const fetchData = async () => {
    // const result = await getData();
    const token = await getAccessTokenSilently();
    const auth0Id = user?.sub;

    try {
      const result = await axios.get(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/investors/${auth0Id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInvestorsList(result.data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InvestorsListContext.Provider value={{ investorsList, fetchData }}>
      {children}
    </InvestorsListContext.Provider>
  );
};

export default InvestorsListProvider;
