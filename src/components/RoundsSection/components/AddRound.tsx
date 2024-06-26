import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

const AddRound = ({ getAllRounds }: { getAllRounds: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [stage, setStage] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();
  const { toast } = useToast();

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    const auth0Id = user?.sub;

    const body = {
      name,
      description,
      stage,
      target,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/startup/${auth0Id}/rounds`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setName("");
      setStage("");
      setTarget("");
      setDescription("");
      // console.log(result.data);
      toast({
        title: `Round created: ${name}`,
      });
      getAllRounds();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="outline"
          size="default"
          className=" dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Create Round
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[340px]">
        <SheetHeader className="mb-6">
          <SheetTitle>Create Round</SheetTitle>
          <SheetDescription>Enter funding round details</SheetDescription>
        </SheetHeader>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          className="mt-2 mb-6"
          placeholder="Enter round name"
          onChange={(e) => setName(e.target.value)}
        />
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          className="mt-2 mb-6 h-40"
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Label htmlFor="target">Target Size</Label>
        <Input
          id="target"
          value={target}
          className="mt-2 mb-6"
          type="number"
          min="0"
          placeholder="Enter round target size"
          onChange={(e) => setTarget(e.target.value)}
        />
        <Label htmlFor="stage" className="">
          Funding Stage
        </Label>
        <Select value={stage} onValueChange={(value) => setStage(value)}>
          <SelectTrigger className="w-w-full col-span-3 mt-2">
            <SelectValue placeholder="Stage" />
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
        <SheetClose asChild>
          <Button
            variant="outline"
            size="default"
            className=" dark:bg-blue-700 dark:hover:bg-blue-800 mt-10 w-full disabled:opacity-20"
            onClick={() => handleSubmit()}
            disabled={!name || !description || !stage || !target}
          >
            Add Round
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};
export default AddRound;
