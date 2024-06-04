import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useContext } from "react";
import { InvestorsListContext } from "../../../utilities/context/InvestorsListContext";

const ActionMenu = ({ investorId }: { investorId: number }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const { fetchData } = useContext(InvestorsListContext)!;

  // console.log(investorId);

  const deleteRecord = async (id: number) => {
    try {
      const token = await getAccessTokenSilently();
      const result = await axios.delete(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/investors/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result);
      fetchData();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <AlertDialog
      open={isEditDialogOpen || isDeleteDialogOpen}
      onOpenChange={
        isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
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

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Investor</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you wish to delete this investor record?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteRecord(investorId);
            }}
            className="dark:bg-red-900 dark:hover:bg-red-900/90 dark:text-slate-50"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ActionMenu;
