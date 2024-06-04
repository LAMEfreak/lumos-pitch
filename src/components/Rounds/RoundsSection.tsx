import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Target } from "lucide-react";

const dummyData = {
  stage: "Series A",
  target: 500000,
  roundName: "Series A VC",
  description:
    "Funds for expansion into US Market. Fuelling corporate development and technical expertise.",
  investorCount: 12,
  commitment_amount: 40000,
};

const {
  stage,
  target,
  roundName,
  description,
  investorCount,
  commitment_amount,
} = dummyData;

const rounds = [
  {
    value: roundName,
    label: roundName,
  },
  {
    value: "SEA Money Series B",
    label: "SEA Money Series B",
  },
  {
    value: "Grab Series G",
    label: "Grab Series G",
  },
  {
    value: "GFE Seed Round",
    label: "GFE Seed Round",
  },
];

const RoundsSection = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  console.log(value);

  return (
    <section className="border dark:bg-gradient-to-br from-[#020417] to-[#2b021a] flex flex-col rounded-lg">
      <div className="flex justify-between m-8 gap-8">
        <div className="text-left ml-2">
          <div className="flex items-center">
            <p className="text-xl font-semibold mr-4">{value}</p>
            <p className="text-xs align-middle px-3 py-1 rounded-full text-blue-500 dark:text-blue-300 bg-blue-100 dark:bg-blue-950">
              {stage}
            </p>
          </div>
          <p className="mt-4 line-clamp-2 dark:text-gray-500 max-w-[60ch]">
            {description}
          </p>
          <div className="grid gap-6 mt-4 grid-cols-2">
            <div className="dark:bg-teal-900 dark:bg-opacity-20 mt-4 rounded-md py-4 px-6">
              <div className="flex justify-between items-center dark:text-gray-600">
                <p className="text-lg dark:text-gray-400 font-medium">Target</p>
                <Target size={24} />
              </div>
              <p className="text-4xl mt-6 font-semibold mb-4">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(target)}
              </p>
              {/* <p>{investorCount}</p> */}
            </div>
            <div className="dark:bg-teal-900 dark:bg-opacity-20 mt-4 rounded-md py-4 px-6">
              <div className="flex justify-between items-center dark:text-gray-600">
                <p className="text-lg dark:text-gray-400 font-medium">
                  Committed
                </p>
                <Target size={24} />
              </div>
              <p className="text-4xl mt-6 font-semibold mb-4 dark:text-blue-300">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(commitment_amount)}
              </p>
              {/* <p>{investorCount}</p> */}
            </div>
          </div>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? rounds.find((round) => round.value === value)?.label
                : "Select round..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search round..." className="h-9" />
              <CommandList>
                <CommandEmpty>No round found.</CommandEmpty>
                <CommandGroup>
                  {rounds.map((round) => (
                    <CommandItem
                      key={round.value}
                      value={round.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {round.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === round.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
};

export default RoundsSection;
