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
import { useState, useContext } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@/components/ui/use-toast";
import * as React from "react";
import { InvestorsListContext } from "../../../utilities/context/InvestorsListContext";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddInvestorButton = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  const [stage, setStage] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { user, getAccessTokenSilently } = useAuth0();
  const { fetchData } = useContext(InvestorsListContext)!;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!name && !type && !company && !stage && !email) {
      toast({
        variant: "destructive",
        title: "Hang on!",
        description: "No investor details added",
      });
      return;
    }

    const token = await getAccessTokenSilently();
    const auth0Id = user?.sub;
    const body = {
      name,
      type,
      company,
      stage,
      email,
      auth0Id,
    };
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/investors`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result.data);
      console.log(name, company, email, type, stage);
      setName("");
      setStage("");
      setEmail("");
      setType("");
      setCompany("");
      fetchData();
      setIsOpen(false);

      toast({
        description: "New investor added!",
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className=" dark:bg-blue-700 dark:hover:bg-blue-800 "
        >
          Add Investor
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            setIsOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Add Investor Details</DialogTitle>
            <DialogDescription>Create a new investor record</DialogDescription>
          </DialogHeader>
          <div className="grid gap-8 py-4 mt-2">
            <div className="grid grid-cols-4 items-center gap-6 my-3">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                className="col-span-3"
                placeholder="Enter investor name"
                onChange={(e) => setName(e.target.value)}
              />
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                value={company}
                className="col-span-3"
                placeholder="Enter company name"
                onChange={(e) => setCompany(e.target.value)}
              />

              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={type} onValueChange={(value) => setType(value)}>
                <SelectTrigger className="w-[180px] col-span-3">
                  <SelectValue placeholder="Investor type" />
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
              <Label htmlFor="stage" className="text-right">
                Stage
              </Label>
              <Select value={stage} onValueChange={(value) => setStage(value)}>
                <SelectTrigger className="w-[180px] col-span-3">
                  <SelectValue placeholder="Funding stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Pre Seed">Pre Seed</SelectItem>
                    <SelectItem value="Seed">Seed</SelectItem>
                    <SelectItem value="Series A">Series A</SelectItem>
                    <SelectItem value="Series B">Series B</SelectItem>
                    <SelectItem value="Series C">Series C</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                className="col-span-3"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Record</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddInvestorButton;
