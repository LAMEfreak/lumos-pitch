import { Button } from "@/components/ui/button";
import { RoundInvestor } from "./columns";

import { Investor } from "../../InvestorsMasterList/columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@/components/ui/use-toast";
import { InvestorsListContext } from "../../../utilities/context/InvestorsListContext";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TagInvestorButton = ({
  selectedRoundId,
}: {
  selectedRoundId: number;
}) => {
  const [raised, setRaised] = useState(0);
  const [committed, setCommitted] = useState(0);
  const [filteredInvestors, setFilteredInvestors] = useState([] as Investor[]);
  const [selectedInvestor, setSelectedInvestor] = useState({} as Investor);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { user, getAccessTokenSilently } = useAuth0();
  const { investorsList } = useContext(InvestorsListContext) || {}; // Add null check here

  console.log(investorsList);
  console.log(selectedRoundId);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const auth0Id = user?.sub;

    if (!raised && !committed) {
      toast({
        variant: "destructive",
        title: "Hang on!",
        description: "Missing investor details",
      });
      return;
    }

    const body = {
      raised,
      committed,
      roundId: selectedRoundId,
      investorId: selectedInvestor.id,
    };

    try {
      const result = await axios.post(
        `${
          import.meta.env.VITE_SOME_BACKEND_SERVER
        }/startup/${auth0Id}/roundInvestors`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedInvestor({} as Investor);
      setRaised(0);
      setCommitted(0);
      setIsOpen(false);
      toast({
        description: "Investor succesfullly tagged to round!",
      });
      console.log(result.data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  // To return investor's id given their name
  const findInvestorByName = (name: string, investors: Investor[]) => {
    return investors.find((investor) => investor.name === name);
  };

  // To filter investors in dropdown selection based on whether already added to round
  const filterAddedInvestors = async () => {
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

      return response.data;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    // Compare existing round investors with all investors tagged to user, to filter out already tagged investors
    const fetchFilteredInvestors = async () => {
      const existingRoundInvestors = await filterAddedInvestors();

      const roundInvestorIds = existingRoundInvestors?.map(
        (investor: RoundInvestor) => investor.investorId
      );

      console.log(roundInvestorIds);
      
      
      const availableInvestors = investorsList?.filter(
        (investor) => !roundInvestorIds?.includes(investor?.id)
      );
      
      setFilteredInvestors(availableInvestors as Investor[]); // Add type assertion here
    };
    if (investorsList) {
      fetchFilteredInvestors();
    }
  }, [investorsList]);

  console.log(filteredInvestors);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="default" className=" self-end">
          Tag Investor to Round
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <DialogHeader>
            <DialogTitle>Tag an investor to the round</DialogTitle>
            <DialogDescription>
              Enter amounts committed and/or raised
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-8 mt-4">
            <div className="grid grid-cols-4 items-center gap-6 my-3">
              <Label htmlFor="type" className="text-right">
                Investor
              </Label>
              <Select
                value={selectedInvestor?.name}
                onValueChange={(value) => {
                  if (investorsList) {
                    const investor = findInvestorByName(value, investorsList);
                    setSelectedInvestor(investor);
                  }
                }}
              >
                <SelectTrigger className="w-[180px] col-span-3">
                  <SelectValue placeholder="Select Investor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filteredInvestors?.map((investor) => {
                      return (
                        <SelectItem key={investor?.id} value={investor?.name}>
                          {investor?.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Label htmlFor="committed" className="text-right">
                Committed
              </Label>
              <Input
                id="committed"
                value={committed}
                type="number"
                min={0}
                className="col-span-3"
                placeholder="Enter commited amount ($)"
                onChange={(e) => setCommitted(Number(e.target.value))}
              />
              <Label htmlFor="raised" className="text-right">
                Raised
              </Label>
              <Input
                id="raised"
                value={raised}
                type="number"
                min={0}
                className="col-span-3"
                placeholder="Enter raised amount ($)"
                onChange={(e) => setRaised(Number(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Tag Investor</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default TagInvestorButton;
