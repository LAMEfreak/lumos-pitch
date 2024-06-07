import { ColumnDef } from "@tanstack/react-table";
import ActionMenuRoundInvestors from "./ActionMenuRoundInvestors";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Change typecast of raised if column type issue can be resolved
export type RoundInvestor = {
  id: number;
  roundId: number;
  investorId: number;
  raised: string | number | null;
  committed: number | null;
};

export const columns: ColumnDef<RoundInvestor>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">Id</div>,
  },
  {
    accessorKey: "raised",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Raised
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row: RoundInvestor | null) =>
      row && row.raised ? row.raised : "-",
  },
  {
    accessorKey: "committed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Committed
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row: RoundInvestor | null) =>
      row && row.committed ? row.committed : "-",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const investor = row.original;

      return <ActionMenuRoundInvestors investor={investor} />;
    },
  },
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
];
