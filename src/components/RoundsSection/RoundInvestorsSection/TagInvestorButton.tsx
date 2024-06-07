import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@/components/ui/use-toast";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TagInvestorButton = () => {
  const [raised, setRaised] = useState(0);
  const [committed, setCommitted] = useState(0);
  const [selectedInvestor, setSelectedInvestor] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { user, getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const auth0Id = user?.sub;

    if (!raised && !committed && !selectedInvestor) {
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
      roundId,
      investorId,
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
      console.log(result.data);

      setSelectedInvestor("");
      setRaised(0);
      setCommitted(0);
      setIsOpen(false);
      toast({
        description: "Investor succesfullly tagged to round!",
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

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
            console.log("Investor tagged to round");
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
                value={selectedInvestor}
                onValueChange={(value) => setSelectedInvestor(value)}
              >
                <SelectTrigger className="w-[180px] col-span-3">
                  <SelectValue placeholder="Select Investor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Angel">Angel</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Government">Government</SelectItem>
                    <SelectItem value="PE">PE</SelectItem>
                    <SelectItem value="VC">VC</SelectItem>
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
