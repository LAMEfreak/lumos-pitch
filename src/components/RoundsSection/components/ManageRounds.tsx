export interface SelectedRoundProps {
  stage: string;
  target: number;
  name: string;
  description: string;
  id: number;
  startupId: number;
}

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageRounds = ({
  selectedRound,
  getAllRounds,
}: {
  selectedRound: SelectedRoundProps;
  getAllRounds: () => void;
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();
  const { toast } = useToast();

  console.log(selectedRound, "selectedRound at ManageButton level");

  const [name, setName] = useState(selectedRound?.name);
  const [target, setTarget] = useState(selectedRound?.target);
  const [description, setDescription] = useState(selectedRound?.description);
  const [stage, setStage] = useState(selectedRound?.stage);

  const deleteRecord = async (id: number) => {
    try {
      const token = await getAccessTokenSilently();
      const auth0Id = user?.sub;

      const result = await axios.delete(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/startup/${auth0Id}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result);
      toast({
        description: "Round succesfully deleted",
      });
      getAllRounds();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const editRecord = async (id: number) => {
    try {
      const token = await getAccessTokenSilently();
      const auth0Id = user?.sub;
      const body = {
        name,
        description,
        target,
        stage,
      };

      const result = await axios.put(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/startup/${auth0Id}/${id}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("result", result);
      toast({
        description: "Round details succesfully updated",
      });
      getAllRounds();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    setName(selectedRound?.name);
    setTarget(selectedRound?.target);
    setDescription(selectedRound?.description);
    setStage(selectedRound?.stage);
  }, [selectedRound]); // Listen for changes in currentRound

  return (
    <AlertDialog
      open={isEditDialogOpen || isDeleteDialogOpen}
      onOpenChange={
        isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="dark:active-border-transparent dark:focus:ring-0 dark:focus:ring-offset-0"
          >
            Manage
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setIsEditDialogOpen(true)}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="dark:hover:bg-red-900 cursor-pointer"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isEditDialogOpen && (
        <Sheet open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <SheetContent className="w-[400px] sm:w-[340px]">
            <SheetHeader className="mb-6">
              <SheetTitle>Edit Round</SheetTitle>
              <SheetDescription>Update funding round details</SheetDescription>
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
            <Input
              id="description"
              value={description}
              className="mt-2 mb-6"
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
              onChange={(e) => setTarget(Number(e.target.value))}
            />
            <Label htmlFor="stage">Funding Stage</Label>
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
                className=" dark:bg-blue-700 dark:hover:bg-blue-800 mt-10 w-full"
                onClick={() => editRecord(selectedRound.id)}
              >
                Update Round
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      )}
      {isDeleteDialogOpen && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Delete?`}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you wish to delete this funding round? All details
              and tagged investors will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                console.log(`deleted ${selectedRound.name}`);
                deleteRecord(selectedRound.id);
              }}
              className="dark:bg-red-900 dark:hover:bg-red-700/90 dark:text-slate-50"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
export default ManageRounds;
